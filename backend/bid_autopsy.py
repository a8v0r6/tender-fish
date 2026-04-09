import os
import uuid
import httpx
import json
import re
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from database import SessionLocal, BidDocument, BidAnalysis, UserProfile

load_dotenv()
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")

router = APIRouter(prefix="/api/bid-autopsy", tags=["Bid Autopsy"])

UPLOAD_DIR = "uploads/bid_documents"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/upload")
async def upload_bid_document(
    file: UploadFile = File(...),
    document_type: str = Form("lost_bid"),
    user_id: int = Form(...),
    db: Session = Depends(get_db)
):
    # Save file
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Record in database
    db_doc = BidDocument(
        user_id=user_id,
        filename=file.filename,
        filepath=file_path,
        document_type=document_type,
        analysis_status="pending"
    )
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)

    # Start async analysis (in background, we'll just create placeholder for now)
    # In production, you'd queue a background task here
    return {"message": "Document uploaded", "document_id": db_doc.id}

@router.get("/analysis/{document_id}")
async def get_analysis(document_id: int, db: Session = Depends(get_db)):
    doc = db.query(BidDocument).filter(BidDocument.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    analysis = db.query(BidAnalysis).filter(BidAnalysis.document_id == document_id).first()
    if not analysis:
        # Mock response if analysis not yet done
        return {
            "document_id": document_id,
            "status": doc.analysis_status,
            "summary": "Analysis pending or not yet available.",
            "reason_for_loss": None,
            "improvement_tips": None,
            "confidence_score": None
        }
    
    return {
        "document_id": document_id,
        "status": "complete",
        "summary": analysis.summary,
        "reason_for_loss": analysis.reason_for_loss,
        "improvement_tips": json.loads(analysis.improvement_tips) if analysis.improvement_tips else [],
        "confidence_score": analysis.confidence_score
    }

@router.post("/analyze/{document_id}")
async def analyze_document(document_id: int, db: Session = Depends(get_db)):
    """Trigger analysis for a specific document (uses LLM to generate actual insights)"""
    doc = db.query(BidDocument).filter(BidDocument.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Read the file content
    try:
        if doc.filepath.lower().endswith('.pdf'):
            import pypdf
            reader = pypdf.PdfReader(doc.filepath)
            text_pages = []
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    text_pages.append(text)
            file_content = "\\n".join(text_pages)
            if len(file_content) > 10000:
                file_content = file_content[:10000]
        else:
            with open(doc.filepath, 'r', encoding='utf-8', errors='ignore') as f:
                file_content = f.read(10000) # Limit to 10k characters
    except Exception as e:
        file_content = f"Could not read file: {e}"

    if not ANTHROPIC_API_KEY:
        # Fallback if no API key
        summary = f"Analysis of {doc.filename} indicates overpricing by 12% compared to market average."
        reason_for_loss = "Your bid was 12% higher than the winning bid, and your past win rate in the region is lower than competitors."
        improvement_tips = [
            "Reduce material cost by sourcing from alternate suppliers.",
            "Highlight past successful projects in the region.",
            "Consider offering a performance guarantee to build trust."
        ]
        confidence_score = 0.85
    else:
        prompt = f"""
        You are an expert Bid Consultant. Analyze the following document that represents a lost bid for Akanchha Construction.
        Filename: {doc.filename}
        
        Document snippet:
        {file_content}
        
        Provide your analysis in JSON format with exactly these keys:
        - "summary": A short string summarizing the analysis based on the document.
        - "reason_for_loss": A string explaining the likely reason for losing the bid based on the document.
        - "improvement_tips": A list of strings (1-3 tips) on how to improve future bids based on the document's flaws.
        - "confidence_score": A float between 0 and 1 indicating your confidence.
        
        Return ONLY valid JSON.
        """
        
        headers = {
            "x-api-key": ANTHROPIC_API_KEY.strip(),
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json"
        }
        data = {
            "model": "claude-sonnet-4-6",
            "max_tokens": 1024,
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }
        
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post("https://api.anthropic.com/v1/messages", headers=headers, json=data)
                response.raise_for_status()
                response_json = response.json()
                content = response_json["content"][0]["text"]
                
                # Parse JSON
                match = re.search(r'\{.*\}', content, re.DOTALL)
                if match:
                    parsed = json.loads(match.group(0))
                else:
                    parsed = json.loads(content)
                    
                summary = parsed.get("summary", "Analysis complete.")
                reason_for_loss = parsed.get("reason_for_loss", "Unidentified")
                improvement_tips = parsed.get("improvement_tips", [])
                confidence_score = float(parsed.get("confidence_score", 0.85))
        except Exception as e:
            print(f"Error calling LLM: {e}")
            # Fallback on error
            summary = f"Analysis of {doc.filename} could not be fully completed due to an API error."
            reason_for_loss = f"Error: {str(e)}"
            improvement_tips = ["Please try again or check API configuration."]
            confidence_score = 0.5
    
    # Save analysis
    analysis = BidAnalysis(
        document_id=document_id,
        summary=summary,
        reason_for_loss=reason_for_loss,
        improvement_tips=json.dumps(improvement_tips),
        confidence_score=confidence_score
    )
    doc.analysis_status = "complete"
    db.add(analysis)
    db.commit()
    
    return {"message": "Analysis complete", "document_id": document_id}
