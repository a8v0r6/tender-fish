# """
# Test script for TenderFish Bid Assistance API
# """
import requests
import json

# API base URL
BASE_URL = "http://localhost:8000"

def test_health_check():
    """Test API health"""
    response = requests.get(f"{BASE_URL}/api/health")
    print("Health Check:", response.json())

def test_bid_assistance():
    """Test bid prediction endpoint"""
    payload = {
        "tender_id": "RJ-901-PWD",
        "estimated_cost": 2500000,  # ₹25 lakhs
        "competitor_count": 6,
        "company_size": "small",
        "risk_appetite": "moderate",
        "past_win_rate": 0.35,
        "urgency_score": 7,
        "category": "civil",
        "state": "Rajasthan"
    }

    response = requests.post(
        f"{BASE_URL}/api/bid-assistance",
        json=payload,
        headers={"Content-Type": "application/json"}
    )

    if response.status_code == 200:
        result = response.json()
        print("\n=== BID ASSISTANCE RESULT ===")
        print(f"Tender ID: {result['tender_id']}")
        print(f"Recommended Bid: ₹{result['bid_range']['recommended']:,.0f}")
        print(f"Margin: {result['margin_percentage']:.1f}%")
        print(f"Strategy: {result['strategy']}")
        print(f"Confidence: {result['bid_range']['confidence']:.1%}")
        print(f"Expected Bidders: {result['competitor_analysis']['expected_bidders']}")
        print(f"Risk Factors: {len(result['risk_factors'])} identified")
        print(f"Action Items: {len(result['action_items'])} recommended")
        print("\nReasoning:")
        print(result['reasoning'])
    else:
        print(f"Error: {response.status_code} - {response.text}")

def test_market_research():
    """Test market research endpoints"""
    # Test competitor analysis
    response = requests.get(
        f"{BASE_URL}/api/market-research/competitors",
        params={
            "category": "civil",
            "state": "Maharashtra",
            "tender_value": 5000000
        }
    )
    print("\n=== COMPETITOR ANALYSIS ===")
    print(response.json())

    # Test material costs
    response = requests.get(
        f"{BASE_URL}/api/market-research/materials",
        params={"category": "civil", "state": "Maharashtra"}
    )
    print("\n=== MATERIAL COSTS ===")
    print(response.json())

if __name__ == "__main__":
    print("Testing TenderFish Bid Assistance API...")

    try:
        test_health_check()
        test_bid_assistance()
        test_market_research()
    except requests.exceptions.ConnectionError:
        print("❌ API server not running. Start with: python main.py")
    except Exception as e:
        print(f"❌ Test failed: {e}")