from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum


class CompanySize(str, Enum):
    MICRO = "micro"
    SMALL = "small"
    MEDIUM = "medium"
    LARGE = "large"


class RiskAppetite(str, Enum):
    CONSERVATIVE = "conservative"
    MODERATE = "moderate"
    AGGRESSIVE = "aggressive"


class BidRequest(BaseModel):
    tender_id: str = Field(..., description="Unique tender identifier (e.g., RJ-901-PWD)")
    estimated_cost: float = Field(..., description="Your estimated cost to execute the project in ₹")
    competitor_count: Optional[int] = Field(5, description="Expected number of competing bidders")
    company_size: CompanySize = Field(CompanySize.SMALL, description="Your company size category")
    risk_appetite: RiskAppetite = Field(RiskAppetite.MODERATE, description="Your risk tolerance level")
    past_win_rate: Optional[float] = Field(0.3, description="Your historical win rate (0.0 to 1.0)")
    urgency_score: Optional[int] = Field(5, description="How urgently you need this project (1-10)")
    category: Optional[str] = Field(None, description="Tender category (e.g., Civil Works, IT)")
    state: Optional[str] = Field(None, description="State where tender is located")


class BidRange(BaseModel):
    minimum: float = Field(..., description="Minimum viable bid (break-even + minimal margin)")
    recommended: float = Field(..., description="AI-recommended optimal bid price")
    maximum: float = Field(..., description="Maximum competitive bid before losing advantage")
    confidence: float = Field(..., description="Confidence score in prediction (0.0 to 1.0)")


class CompetitorAnalysis(BaseModel):
    expected_bidders: int
    avg_bid_range: str
    price_pressure: str = Field(..., description="Market competition level: low/medium/high")
    differentiation_opportunity: str


class MarketInsight(BaseModel):
    material_trend: str = Field(..., description="Material cost trend: rising/stable/falling")
    labor_availability: str = Field(..., description="Labor market: scarce/moderate/abundant")
    seasonal_factor: str = Field(..., description="Seasonal impact: peak/off-peak/normal")
    recommendation: str


class BidResponse(BaseModel):
    tender_id: str
    bid_range: BidRange
    competitor_analysis: CompetitorAnalysis
    market_insights: MarketInsight
    strategy: str = Field(..., description="Recommended bidding strategy")
    risk_factors: List[str] = Field(..., description="Key risks to consider")
    action_items: List[str] = Field(..., description="Actionable next steps")
    margin_percentage: float = Field(..., description="Recommended profit margin %")
    reasoning: str = Field(..., description="Explanation of how the recommendation was derived")
