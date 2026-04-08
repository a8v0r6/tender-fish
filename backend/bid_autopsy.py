import os
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from database import SessionLocal, BidDocument, BidAnalysis, UserProfile
import json

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
    """Trigger analysis for a specific document (for demo, returns mock data)"""
    doc = db.query(BidDocument).filter(BidDocument.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Mock analysis result
    summary = f"Analysis of {doc.filename} indicates overpricing by 12% compared to market average."
    reason_for_loss = "Your bid was 12% higher than the winning bid, and your past win rate in the region is lower than competitors."
    improvement_tips = [
        "Reduce material cost by sourcing from alternate suppliers.",
        "Highlight past successful projects in the region.",
        "Consider offering a performance guarantee to build trust."
    ]
    
    # Save analysis
    analysis = BidAnalysis(
        document_id=document_id,
        summary=summary,
        reason_for_loss=reason_for_loss,
        improvement_tips=json.dumps(improvement_tips),
        confidence_score=0.85
    )
    doc.analysis_status = "complete"
    db.add(analysis)
    db.commit()
    
    return {"message": "Analysis complete", "document_id": document_id}
