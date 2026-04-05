"""
Bid Prediction Engine - Combines market research with statistical models
to recommend optimal bid prices for tenders.
"""
from models import BidRequest, BidRange, CompetitorAnalysis, MarketInsight
from market_research import research_competitor_bids, research_material_costs
import math


async def predict_optimal_bid(request: BidRequest) -> dict:
    """
    Main prediction function that combines:
    1. Market research (via TinyFish)
    2. Statistical bid optimization
    3. Risk-adjusted pricing
    4. Competitive positioning
    
    Returns comprehensive bid recommendation with reasoning.
    """
    
    # Step 1: Gather market intelligence
    competitor_data = await research_competitor_bids(
        category=request.category or "general",
        state=request.state or "India",
        tender_value=request.estimated_cost
    )
    
    material_data = await research_material_costs(
        category=request.category or "general",
        state=request.state or "India"
    )
    
    # Step 2: Calculate optimal bid using multiple strategies
    strategies = calculate_bid_strategies(request, competitor_data)
    
    # Step 3: Select best strategy based on risk appetite
    recommended = select_best_strategy(strategies, request.risk_appetite)
    
    # Step 4: Build comprehensive response
    bid_range = BidRange(
        minimum=recommended["minimum"],
        recommended=recommended["recommended"],
        maximum=recommended["maximum"],
        confidence=recommended["confidence"]
    )
    
    competitor_analysis = CompetitorAnalysis(
        expected_bidders=competitor_data.get("typical_bidder_count", 5),
        avg_bid_range=f"{competitor_data.get('price_range_low', 85)}% - {competitor_data.get('price_range_high', 98)}% of estimated cost",
        price_pressure=competitor_data.get("market_competitiveness", "medium"),
        differentiation_opportunity=get_differentiation_opportunity(request, competitor_data)
    )
    
    market_insights = MarketInsight(
        material_trend=material_data.get("material_trend", "stable"),
        labor_availability=material_data.get("labor_availability", "moderate"),
        seasonal_factor=material_data.get("seasonal_factor", "normal"),
        recommendation=get_market_recommendation(material_data, competitor_data)
    )
    
    # Step 5: Generate strategy explanation
    reasoning = generate_reasoning(request, recommended, competitor_data, material_data)
    
    return {
        "tender_id": request.tender_id,
        "bid_range": bid_range,
        "competitor_analysis": competitor_analysis,
        "market_insights": market_insights,
        "strategy": recommended["strategy_name"],
        "risk_factors": identify_risks(request, material_data, competitor_data),
        "action_items": generate_action_items(request, recommended),
        "margin_percentage": round(((recommended["recommended"] - request.estimated_cost) / request.estimated_cost) * 100, 2),
        "reasoning": reasoning
    }


def calculate_bid_strategies(request: BidRequest, competitor_data: dict) -> list:
    """
    Calculate multiple bid strategies and return them for comparison.
    
    Strategies:
    1. Conservative: Higher margin, lower win probability
    2. Moderate: Balanced margin vs win probability
    3. Aggressive: Lower margin, higher win probability
    4. Market-Aligned: Based on historical winning bids
    """
    
    cost = request.estimated_cost
    avg_winning_pct = competitor_data.get("avg_winning_bid_percentage", 92) / 100
    bidder_count = competitor_data.get("typical_bidder_count", 5)
    
    # Strategy 1: Conservative (high margin, lower win chance)
    conservative_margin = 0.18  # 18% margin
    conservative = {
        "strategy_name": "Conservative Premium",
        "minimum": cost * 1.08,
        "recommended": cost * (1 + conservative_margin),
        "maximum": cost * 1.25,
        "confidence": 0.75,
        "win_probability": 0.25,
        "description": "Higher margin, suitable for unique capabilities"
    }
    
    # Strategy 2: Moderate (balanced)
    moderate_margin = 0.12  # 12% margin
    moderate = {
        "strategy_name": "Balanced Approach",
        "minimum": cost * 1.05,
        "recommended": cost * (1 + moderate_margin),
        "maximum": cost * 1.18,
        "confidence": 0.85,
        "win_probability": 0.45,
        "description": "Optimal balance of margin and competitiveness"
    }
    
    # Strategy 3: Aggressive (low margin, high win chance)
    aggressive_margin = 0.06  # 6% margin
    aggressive = {
        "strategy_name": "Aggressive Pricing",
        "minimum": cost * 1.02,
        "recommended": cost * (1 + aggressive_margin),
        "maximum": cost * 1.12,
        "confidence": 0.90,
        "win_probability": 0.70,
        "description": "Maximum win probability, minimal margin"
    }
    
    # Strategy 4: Market-Aligned (based on historical data)
    market_margin = avg_winning_pct - 1.0  # Adjust based on market
    market_aligned = {
        "strategy_name": "Market-Aligned",
        "minimum": cost * (avg_winning_pct - 0.05),
        "recommended": cost * avg_winning_pct,
        "maximum": cost * (avg_winning_pct + 0.08),
        "confidence": 0.80,
        "win_probability": 0.55,
        "description": "Aligned with historical winning bid patterns"
    }
    
    return [conservative, moderate, aggressive, market_aligned]


def select_best_strategy(strategies: list, risk_appetite: str) -> dict:
    """
    Select the best strategy based on user's risk appetite.
    """
    strategy_map = {
        "conservative": 0,  # Conservative Premium
        "moderate": 1,      # Balanced Approach
        "aggressive": 2     # Aggressive Pricing
    }
    
    idx = strategy_map.get(risk_appetite, 1)
    return strategies[idx]


def get_differentiation_opportunity(request: BidRequest, competitor_data: dict) -> str:
    """
    Identify opportunities to differentiate beyond price.
    """
    competitiveness = competitor_data.get("market_competitiveness", "medium")
    
    if competitiveness == "high":
        return "Focus on quality, past performance, and technical innovation to stand out"
    elif competitiveness == "low":
        return "Price competitiveness is key; emphasize cost efficiency"
    else:
        return "Balance price with strong technical proposal and compliance record"


def get_market_recommendation(material_data: dict, competitor_data: dict) -> str:
    """
    Generate market-specific recommendation.
    """
    trend = material_data.get("material_trend", "stable")
    competitiveness = competitor_data.get("market_competitiveness", "medium")
    
    if trend == "rising" and competitiveness == "high":
        return "Rising costs + high competition: Bid quickly before costs increase further"
    elif trend == "falling":
        return "Falling material costs: Consider slightly lower bids to stay competitive"
    else:
        return "Stable market conditions: Focus on quality and compliance differentiation"


def identify_risks(request: BidRequest, material_data: dict, competitor_data: dict) -> list:
    """
    Identify key risk factors for the bid.
    """
    risks = []
    
    # Material cost risks
    if material_data.get("material_trend") == "rising":
        risks.append("Rising material costs may erode profit margins")
    
    # Competition risks
    if competitor_data.get("market_competitiveness") == "high":
        risks.append("High competition may drive prices below sustainable levels")
    
    # Company-specific risks
    if request.past_win_rate < 0.2:
        risks.append("Low historical win rate suggests need for stronger differentiation")
    
    if request.urgency_score >= 8:
        risks.append("High urgency may lead to underpricing; maintain discipline")
    
    # Labor risks
    if material_data.get("labor_availability") == "scarce":
        risks.append("Labor scarcity may cause project delays and cost overruns")
    
    # Seasonal risks
    if material_data.get("seasonal_factor") == "peak":
        risks.append("Peak season may increase costs and reduce resource availability")
    
    return risks if risks else ["No significant risks identified"]


def generate_action_items(request: BidRequest, strategy: dict) -> list:
    """
    Generate actionable next steps.
    """
    items = [
        f"Target bid price: ₹{strategy['recommended']:,.0f}",
        "Prepare technical compliance documents",
        "Verify all statutory requirements (GST, EMD, etc.)",
        "Review past successful bids in this category"
    ]
    
    if strategy["win_probability"] < 0.4:
        items.insert(0, "⚠️ Low win probability - consider strengthening technical proposal")
    
    if request.past_win_rate < 0.3:
        items.append("Consider partnering with experienced firm for JV bid")
    
    return items


def generate_reasoning(
    request: BidRequest,
    strategy: dict,
    competitor_data: dict,
    material_data: dict
) -> str:
    """
    Generate human-readable explanation of the recommendation.
    """
    margin_pct = ((strategy["recommended"] - request.estimated_cost) / request.estimated_cost) * 100
    
    reasoning = (
        f"Based on analysis of {competitor_data.get('typical_bidder_count', 5)} expected bidders "
        f"and historical winning bids at {competitor_data.get('avg_winning_bid_percentage', 92)}% of estimated cost, "
        f"we recommend a {strategy['strategy_name'].lower()} approach.\n\n"
        
        f"Your estimated cost: ₹{request.estimated_cost:,.0f}\n"
        f"Recommended bid: ₹{strategy['recommended']:,.0f} ({margin_pct:.1f}% margin)\n"
        f"Win probability: {strategy['win_probability']*100:.0f}%\n\n"
        
        f"Market conditions: {material_data.get('material_trend', 'stable').capitalize()} material costs, "
        f"{material_data.get('labor_availability', 'moderate')} labor availability.\n\n"
        
        f"This {'conservative' if request.risk_appetite == 'conservative' else 'balanced' if request.risk_appetite == 'moderate' else 'aggressive'} "
        f"strategy aligns with your {request.risk_appetite} risk appetite and "
        f"{'prioritizes margin protection' if request.risk_appetite == 'conservative' else 'balances margin with win probability' if request.risk_appetite == 'moderate' else 'maximizes win probability'}."
    )
    
    return reasoning
