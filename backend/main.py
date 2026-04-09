"""
FastAPI Backend for TenderFish Bid Assistance
Combines TinyFish market research with custom AI prediction engine
"""
from fastapi import FastAPI, HTTPException, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from models import BidRequest, BidResponse
from bid_engine import predict_optimal_bid
from market_research import research_competitor_bids, research_material_costs
from auth import UserRegister, UserLogin, get_password_hash, create_access_token, verify_password, get_current_user
from database import SessionLocal, init_db, BidRecord, UserProfile
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from alerts import send_tender_alert
from bid_autopsy import router as bid_autopsy_router  # New: Bid Autopsy
# from tinyfish import search_tenders  # Ready for live integration
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Database
init_db()

# Initialize Scheduler
scheduler = AsyncIOScheduler()

async def check_for_new_tenders():
    """Background task to scan for tenders and alert users."""
    db = SessionLocal()
    try:
        users = db.query(UserProfile).filter(UserProfile.telegram_id != None).all()
        for user in users:
            # In a real scenario, we'd use tinyfish to search live portals
            # For now, we'll simulate a match based on mock data
            print(f"Checking alerts for {user.company_name}...")
            # TODO: Implement live search logic here
    finally:
        db.close()

scheduler.add_job(check_for_new_tenders, 'interval', hours=6)
scheduler.start()

# Rate Limiting
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="TenderFish Bid Assistance API",
    description="AI-powered bid price optimization for government tenders",
    version="2.0.0"
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for Tailscale/Production flexibility
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Bid Autopsy routes
app.include_router(bid_autopsy_router)

@app.get("/")
async def root():
    """API health check"""
    return {
        "message": "TenderFish Bid Assistance API",
        "status": "active",
        "version": "2.0.0"
    }

@app.post("/api/auth/register")
async def register_user(user: UserRegister):
    db = SessionLocal()
    try:
        existing = db.query(UserProfile).filter(UserProfile.email == user.email).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        new_user = UserProfile(
            email=user.email,
            hashed_password=get_password_hash(user.password),
            company_name=user.company_name
        )
        db.add(new_user)
        db.commit()
        return {"message": "User registered successfully"}
    finally:
        db.close()

@app.post("/api/auth/login")
async def login_user(user: UserLogin):
    db = SessionLocal()
    try:
        db_user = db.query(UserProfile).filter(UserProfile.email == user.username).first()
        if not db_user or not verify_password(user.password, db_user.hashed_password):
            raise HTTPException(status_code=401, detail="Incorrect email or password")
        
        token = create_access_token(data={"sub": db_user.email})
        return {"access_token": token, "token_type": "bearer"}
    finally:
        db.close()

@app.post("/api/bid-assistance", response_model=BidResponse)
@limiter.limit("30/minute")
async def get_bid_recommendation(request: Request, bid_request: BidRequest):
    """
    Main endpoint for bid price optimization.
    Uses TinyFish for market research + custom AI engine for predictions.
    """
    db = SessionLocal()
    try:
        result = await predict_optimal_bid(bid_request)
        
        # Save to Database
        new_bid = BidRecord(
            tender_id=bid_request.tender_id,
            estimated_cost=bid_request.estimated_cost,
            recommended_bid=result['bid_range']['recommended'],
            strategy=result['strategy'],
            margin_percentage=result['margin_percentage']
        )
        db.add(new_bid)
        db.commit()
        
        return BidResponse(**result)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Bid prediction failed: {str(e)}"
        )
    finally:
        db.close()

@app.get("/api/market-research/competitors")
async def get_competitor_analysis(
    category: str = "civil",
    state: str = "India",
    tender_value: float = 1000000
):
    """
    Standalone market research endpoint for competitor analysis.
    """
    try:
        data = await research_competitor_bids(category, state, tender_value)
        return {
            "category": category,
            "state": state,
            "tender_value": tender_value,
            "analysis": data
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Market research failed: {str(e)}"
        )

@app.get("/api/market-research/materials")
async def get_material_costs(
    category: str = "civil",
    state: str = "India"
):
    """
    Standalone market research endpoint for material costs.
    """
    try:
        data = await research_material_costs(category, state)
        return {
            "category": category,
            "state": state,
            "material_analysis": data
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Material research failed: {str(e)}"
        )

@app.post("/api/bid-assistance/batch")
async def batch_bid_analysis(requests: list[BidRequest]):
    """
    Process multiple bid requests in batch.
    Useful for comparing multiple tenders.
    """
    if len(requests) > 10:
        raise HTTPException(
            status_code=400,
            detail="Maximum 10 tenders per batch request"
        )

    results = []
    for req in requests:
        try:
            result = await predict_optimal_bid(req)
            results.append(result)
        except Exception as e:
            results.append({
                "tender_id": req.tender_id,
                "error": str(e)
            })

    return {"batch_results": results}

@app.get("/api/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "services": {
            "tinyfish_api": "available",
            "bid_engine": "active",
            "market_research": "active"
        },
        "version": "2.0.0"
    }


if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )
