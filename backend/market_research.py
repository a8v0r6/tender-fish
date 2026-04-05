"""
Market Research Module - Uses TinyFish to gather competitive intelligence
"""
from typing import Optional
import json
import os

# Initialize TinyFish client only if API key is available
try:
    from tinyfish import TinyFish
    client = TinyFish()
    TINYFISH_AVAILABLE = True
except ValueError:
    # No API key provided - will use mock data
    client = None
    TINYFISH_AVAILABLE = False


async def research_competitor_bids(
    category: str,
    state: str,
    tender_value: float
) -> dict:
    """
    Use TinyFish to research historical bid data for similar tenders.
    Returns competitor analysis with pricing insights.
    Falls back to mock data if TinyFish is unavailable.
    """
    if not TINYFISH_AVAILABLE:
        print("TinyFish not available - using mock competitor data")
        return get_mock_competitor_data(category, state)

    try:
        # Scrape GeM or tender portal for historical data
        goal = f"""
        Research historical bid data for {category} tenders in {state} India.
        Find average winning bid prices, number of bidders, and price ranges.
        Tender value is approximately ₹{tender_value:,.0f}.
        Respond in JSON format with:
        - avg_winning_bid_percentage: average winning bid as % of estimated cost
        - typical_bidder_count: average number of bidders
        - price_range_low: lowest typical bid %
        - price_range_high: highest typical bid %
        - market_competitiveness: "low", "medium", or "high"
        """

        with client.agent.stream(
            url="https://gem.gov.in",
            goal=goal,
        ) as stream:
            result = ""
            for event in stream:
                result += str(event)

            # Parse the result (handle potential JSON in text)
            try:
                return json.loads(result)
            except:
                # Fallback to mock data if scraping fails
                return get_mock_competitor_data(category, state)
    except Exception as e:
        print(f"Market research failed: {e}")
        return get_mock_competitor_data(category, state)


async def research_material_costs(
    category: str,
    state: str
) -> dict:
    """
    Research current material costs and market trends.
    Falls back to mock data if TinyFish is unavailable.
    """
    if not TINYFISH_AVAILABLE:
        print("TinyFish not available - using mock material data")
        return get_mock_material_data(category, state)

    try:
        goal = f"""
        Find current material costs and market trends for {category} projects in {state}, India.
        Include steel, cement, labor rates if applicable.
        Respond in JSON with:
        - material_trend: "rising", "stable", or "falling"
        - labor_availability: "scarce", "moderate", or "abundant"
        - seasonal_factor: "peak", "off-peak", or "normal"
        - key_materials: list of material names with current prices
        """

        with client.agent.stream(
            url="https://www.indiastat.com",
            goal=goal,
        ) as stream:
            result = ""
            for event in stream:
                result += str(event)

            try:
                return json.loads(result)
            except:
                return get_mock_material_data(category, state)
    except Exception as e:
        print(f"Material research failed: {e}")
        return get_mock_material_data(category, state)


def get_mock_competitor_data(category: str, state: str) -> dict:
    """Fallback mock data when scraping is unavailable."""
    # Category-based adjustments
    category_multipliers = {
        "civil": {"avg_winning_bid": 92, "bidder_count": 8, "competitiveness": "high"},
        "it": {"avg_winning_bid": 88, "bidder_count": 12, "competitiveness": "high"},
        "energy": {"avg_winning_bid": 95, "bidder_count": 5, "competitiveness": "medium"},
        "healthcare": {"avg_winning_bid": 90, "bidder_count": 6, "competitiveness": "medium"},
    }
    
    base = category_multipliers.get(category.lower(), {
        "avg_winning_bid": 91,
        "bidder_count": 7,
        "competitiveness": "medium"
    })
    
    return {
        "avg_winning_bid_percentage": base["avg_winning_bid"],
        "typical_bidder_count": base["bidder_count"],
        "price_range_low": base["avg_winning_bid"] - 8,
        "price_range_high": base["avg_winning_bid"] + 5,
        "market_competitiveness": base["competitiveness"]
    }


def get_mock_material_data(category: str, state: str) -> dict:
    """Fallback mock material data."""
    return {
        "material_trend": "stable",
        "labor_availability": "moderate",
        "seasonal_factor": "normal",
        "key_materials": [
            {"name": "Steel (TMT)", "price_per_ton": 52000, "trend": "rising"},
            {"name": "Cement (OPC)", "price_per_bag": 380, "trend": "stable"},
            {"name": "Labor (skilled)", "price_per_day": 850, "trend": "rising"}
        ]
    }
