"""
FastAPI Backend for TenderFish Bid Assistance
Combines TinyFish market research with custom AI prediction engine
"""
from fastapi import FastAPI, HTTPException, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from models import BidRequest, BidResponse, BidOutcomeRequest, TenderResponse, SupplierResponse, NegotiateRequest, NegotiateResponse, ApplicationRequest
from bid_engine import predict_optimal_bid
from market_research import research_competitor_bids, research_material_costs
from auth import UserRegister, UserLogin, get_password_hash, create_access_token, verify_password, get_current_user
from database import SessionLocal, init_db, BidRecord, BidOutcome, UserProfile, Tender, Supplier, BidApplication
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
        if users:
            print(f"[Scheduler] Checking tenders for {len(users)} user(s) with Telegram alerts enabled...")
            for user in users:
                print(f"[Scheduler]  - {user.company_name or user.email}")
        else:
            print("[Scheduler] No users with Telegram alerts configured. Skipping.")
    finally:
        db.close()

scheduler.add_job(check_for_new_tenders, 'interval', hours=6)
scheduler.start()

# Seed reference data
def seed_data():
    db = SessionLocal()
    try:
        if db.query(Tender).count() == 0:
            tenders_data = [
                {"tender_id": "RJ-901-PWD", "title": "Construction of Multi-Level Parking Facility - Phase II", "department": "PWD, Maharashtra", "value": 124500000, "deadline": "Oct 14, 2025", "category": "Civil", "state": "Maharashtra", "match_score": 94},
                {"tender_id": "KA-442-MED", "title": "Smart City Data Dashboard & Analytics Platform", "department": "IT Dept, Karnataka", "value": 82000000, "deadline": "Oct 28, 2025", "category": "IT", "state": "Karnataka", "match_score": 78},
                {"tender_id": "MH-118-WTR", "title": "Solar Rooftop Systems in 50 Districts", "department": "MNRE", "value": 450000000, "deadline": "Nov 05, 2025", "category": "Energy", "state": "Maharashtra", "match_score": 42},
                {"tender_id": "GJ-334-ROAD", "title": "Highway Widening NH-48 Stretch", "department": "NHAI, Gujarat", "value": 280000000, "deadline": "Nov 20, 2025", "category": "Civil", "state": "Gujarat", "match_score": 87},
                {"tender_id": "TN-771-HLTH", "title": "Primary Health Centre Equipment Supply", "department": "Health Dept, Tamil Nadu", "value": 35000000, "deadline": "Dec 01, 2025", "category": "Healthcare", "state": "Tamil Nadu", "match_score": 65},
                {"tender_id": "UP-556-WTR", "title": "Rural Water Supply Scheme - Bundelkhand", "department": "Jal Nigam, Uttar Pradesh", "value": 75000000, "deadline": "Dec 15, 2025", "category": "Civil", "state": "Uttar Pradesh", "match_score": 71},
                {"tender_id": "WB-223-IT", "title": "E-Governance Portal Redesign", "department": "IT Dept, West Bengal", "value": 18000000, "deadline": "Jan 10, 2026", "category": "IT", "state": "West Bengal", "match_score": 55},
                {"tender_id": "MP-889-ENERGY", "title": "Solar Microgrid Installation - 50 Villages", "department": "Energy Dept, Madhya Pradesh", "value": 95000000, "deadline": "Jan 25, 2026", "category": "Energy", "state": "Madhya Pradesh", "match_score": 82},
            ]
            for t in tenders_data:
                db.add(Tender(**t))
            db.commit()
            print(f"[Seed] Inserted {len(tenders_data)} tenders")

        if db.query(Supplier).count() == 0:
            suppliers_data = [
                {"name": "Mahindra Steel Works", "material": "TMT Steel", "price": 58200, "unit": "tonne", "location": "Navi Mumbai", "distance_km": 12.4, "verified": True, "ready_stock": True},
                {"name": "UltraTech Cement Supply", "material": "OPC Cement", "price": 380, "unit": "bag", "location": "Mumbai", "distance_km": 8.2, "verified": True, "ready_stock": True},
                {"name": "Bharat Aggregates", "material": "Crushed Stone 20mm", "price": 1650, "unit": "tonne", "location": "Thane", "distance_km": 25.0, "verified": True, "ready_stock": False},
                {"name": "GreenBuild Materials", "material": "Fly Ash Bricks", "price": 8.5, "unit": "piece", "location": "Pune", "distance_km": 150.0, "verified": False, "ready_stock": True},
                {"name": "Royal Steel Traders", "material": "TMT Steel", "price": 56100, "unit": "tonne", "location": "Nagpur", "distance_km": 210.0, "verified": True, "ready_stock": False},
                {"name": "Coastal Cement Depot", "material": "PPC Cement", "price": 350, "unit": "bag", "location": "Panvel", "distance_km": 32.0, "verified": False, "ready_stock": True},
                {"name": "Sandeep Electricals", "material": "Copper Wire (1mm)", "price": 890, "unit": "kg", "location": "Mumbai", "distance_km": 5.0, "verified": True, "ready_stock": True},
                {"name": "Pioneer Plywoods", "material": "Commercial Plywood", "price": 95, "unit": "sq ft", "location": "Thane", "distance_km": 18.5, "verified": True, "ready_stock": True},
            ]
            for s in suppliers_data:
                db.add(Supplier(**s))
            db.commit()
            print(f"[Seed] Inserted {len(suppliers_data)} suppliers")
    finally:
        db.close()

seed_data()

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
        
        token = create_access_token(data={"sub": db_user.email, "user_id": db_user.id})
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
        
        new_bid = BidRecord(
            tender_id=bid_request.tender_id,
            estimated_cost=bid_request.estimated_cost,
            recommended_bid=result['bid_range']['recommended'],
            strategy=result['strategy'],
            margin_percentage=result['margin_percentage']
        )
        db.add(new_bid)
        db.commit()
        db.refresh(new_bid)

        result['bid_id'] = new_bid.id
        
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


@app.post("/api/bids/outcome")
async def record_bid_outcome(outcome: BidOutcomeRequest):
    db = SessionLocal()
    try:
        bid_record = db.query(BidRecord).filter(BidRecord.id == outcome.bid_id).first()
        if not bid_record:
            raise HTTPException(status_code=404, detail="Bid record not found")

        bid_outcome = BidOutcome(
            bid_id=outcome.bid_id,
            won=outcome.won,
            actual_winning_bid=outcome.actual_winning_bid,
            feedback=outcome.feedback
        )
        db.add(bid_outcome)
        db.commit()
        return {"message": "Outcome recorded", "bid_id": outcome.bid_id, "won": outcome.won}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to record outcome: {str(e)}")
    finally:
        db.close()


@app.get("/api/tenders", response_model=list[TenderResponse])
async def search_tenders(
    keyword: str = "",
    category: str = "",
    state: str = "",
    min_value: float = 0,
    max_value: float = 1e12
):
    db = SessionLocal()
    try:
        query = db.query(Tender)
        if keyword:
            query = query.filter(Tender.title.ilike(f"%{keyword}%"))
        if category:
            query = query.filter(Tender.category.ilike(f"%{category}%"))
        if state:
            query = query.filter(Tender.state.ilike(f"%{state}%"))
        query = query.filter(Tender.value >= min_value, Tender.value <= max_value)
        return query.order_by(Tender.match_score.desc()).all()
    finally:
        db.close()


@app.get("/api/suppliers", response_model=list[SupplierResponse])
async def search_suppliers(
    material: str = "",
    location: str = "",
    min_price: float = 0,
    max_price: float = 1e12
):
    db = SessionLocal()
    try:
        query = db.query(Supplier)
        if material:
            query = query.filter(Supplier.material.ilike(f"%{material}%"))
        if location:
            query = query.filter(Supplier.location.ilike(f"%{location}%"))
        query = query.filter(Supplier.price >= min_price, Supplier.price <= max_price)
        return query.all()
    finally:
        db.close()


@app.post("/api/suppliers/negotiate", response_model=NegotiateResponse)
async def negotiate_with_supplier(req: NegotiateRequest):
    db = SessionLocal()
    try:
        supplier = db.query(Supplier).filter(Supplier.id == req.supplier_id).first()
        if not supplier:
            raise HTTPException(status_code=404, detail="Supplier not found")

        discount = min(0.12, abs(supplier.price - req.target_price) / supplier.price)
        counter = round(supplier.price * (1 - discount * 0.5), 2)
        qty_bonus = " + bulk shipping included" if req.quantity > 100 else ""

        return NegotiateResponse(
            supplier_name=supplier.name,
            original_price=supplier.price,
            counter_offer=counter,
            message=f"{supplier.name} is willing to negotiate. Counter-offer: ₹{counter:,.2f}/{supplier.unit} for {req.quantity} units{qty_bonus}. Estimated savings: ₹{(supplier.price - counter) * req.quantity:,.0f}."
        )
    except HTTPException:
        raise
    finally:
        db.close()


@app.post("/api/applications")
async def submit_application(app: ApplicationRequest):
    db = SessionLocal()
    try:
        record = BidApplication(**app.model_dump())
        db.add(record)
        db.commit()
        return {"message": "Application submitted", "status": app.status}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Application failed: {str(e)}")
    finally:
        db.close()


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
