from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import sessionmaker, relationship, declarative_base
from datetime import datetime
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./tenderfish.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    company_name = Column(String, index=True)
    telegram_id = Column(String, nullable=True)  # For alerts
    company_size = Column(String)
    preferred_state = Column(String, nullable=True)
    preferred_category = Column(String, nullable=True)
    max_tender_value = Column(Float, nullable=True)
    past_win_rate = Column(Float, default=0.3)
    risk_appetite = Column(String, default="moderate")
    created_at = Column(DateTime, default=datetime.utcnow)
    
    bids = relationship("BidRecord", back_populates="profile")
    documents = relationship("BidDocument", back_populates="profile")


class BidRecord(Base):
    __tablename__ = "bid_records"

    id = Column(Integer, primary_key=True, index=True)
    tender_id = Column(String, index=True)
    estimated_cost = Column(Float)
    recommended_bid = Column(Float)
    strategy = Column(String)
    margin_percentage = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    profile_id = Column(Integer, ForeignKey("user_profiles.id"))
    
    profile = relationship("UserProfile", back_populates="bids")
    outcome = relationship("BidOutcome", back_populates="bid", uselist=False)


class BidOutcome(Base):
    __tablename__ = "bid_outcomes"

    id = Column(Integer, primary_key=True, index=True)
    bid_id = Column(Integer, ForeignKey("bid_records.id"))
    won = Column(Boolean)
    actual_winning_bid = Column(Float, nullable=True)
    feedback = Column(String, nullable=True)
    recorded_at = Column(DateTime, default=datetime.utcnow)
    
    bid = relationship("BidRecord", back_populates="outcome")


class BidDocument(Base):
    __tablename__ = "bid_documents"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user_profiles.id"))
    filename = Column(String)
    filepath = Column(String)
    document_type = Column(String)  # 'lost_bid', 'won_bid', 'emD', etc.
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    analysis_status = Column(String, default="pending")  # pending, processing, complete, failed

    profile = relationship("UserProfile", back_populates="documents")
    analysis = relationship("BidAnalysis", back_populates="document", uselist=False)


class BidAnalysis(Base):
    __tablename__ = "bid_analyses"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("bid_documents.id"))
    analyzed_at = Column(DateTime, default=datetime.utcnow)
    summary = Column(String)
    reason_for_loss = Column(String)
    improvement_tips = Column(String)  # JSON string of tips
    confidence_score = Column(Float)

    document = relationship("BidDocument", back_populates="analysis")


def init_db():
    Base.metadata.create_all(bind=engine)
