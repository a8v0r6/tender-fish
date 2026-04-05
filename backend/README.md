# TenderFish Bid Assistance API

AI-powered bid price optimization for government tenders using TinyFish market research + custom prediction engine.

## Architecture

**Hybrid AI Approach:**
- **TinyFish**: Real-time market research and competitor analysis
- **Custom Engine**: Statistical bid optimization with risk-adjusted pricing
- **FastAPI**: High-performance async API with automatic OpenAPI docs

## Features

- 🎯 **Optimal Bid Prediction**: AI recommends best bid price based on market data
- 📊 **Competitor Analysis**: Research historical winning bids and competitor behavior
- 📈 **Market Intelligence**: Real-time material costs and labor trends
- ⚖️ **Risk Assessment**: Identify risks and mitigation strategies
- 📋 **Action Items**: Step-by-step guidance for bid preparation
- 🔄 **Batch Processing**: Analyze multiple tenders simultaneously

## Quick Start

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Set Environment Variables
Create `.env` file:
```env
# TinyFish API credentials (if required)
TINYFISH_API_KEY=your_key_here

# API Configuration
PORT=8000
DEBUG=true
```

### 3. Start the API Server
```bash
python main.py
```

API will be available at: http://localhost:8000
Interactive docs at: http://localhost:8000/docs

### 4. Test the API
```bash
python test_api.py
```

## API Endpoints

### Main Bid Prediction
```http
POST /api/bid-assistance
Content-Type: application/json

{
  "tender_id": "RJ-901-PWD",
  "estimated_cost": 2500000,
  "competitor_count": 6,
  "company_size": "small",
  "risk_appetite": "moderate",
  "past_win_rate": 0.35,
  "urgency_score": 7,
  "category": "civil",
  "state": "Rajasthan"
}
```

**Response:**
```json
{
  "tender_id": "RJ-901-PWD",
  "bid_range": {
    "minimum": 2625000,
    "recommended": 2875000,
    "maximum": 3000000,
    "confidence": 0.85
  },
  "competitor_analysis": {
    "expected_bidders": 6,
    "avg_bid_range": "87% - 97% of estimated cost",
    "price_pressure": "medium",
    "differentiation_opportunity": "Balance price with strong technical proposal"
  },
  "market_insights": {
    "material_trend": "stable",
    "labor_availability": "moderate",
    "seasonal_factor": "normal",
    "recommendation": "Stable market conditions: Focus on quality and compliance"
  },
  "strategy": "Balanced Approach",
  "risk_factors": ["High competition may drive prices below sustainable levels"],
  "action_items": [
    "Target bid price: ₹2,875,000",
    "Prepare technical compliance documents",
    "Verify all statutory requirements"
  ],
  "margin_percentage": 15.0,
  "reasoning": "Based on analysis of 6 expected bidders..."
}
```

### Market Research (Standalone)
```http
GET /api/market-research/competitors?category=civil&state=Maharashtra&tender_value=5000000
GET /api/market-research/materials?category=civil&state=Maharashtra
```

### Batch Processing
```http
POST /api/bid-assistance/batch
Content-Type: application/json

[
  {
    "tender_id": "MH-118-WTR",
    "estimated_cost": 1800000,
    "category": "civil",
    "state": "Maharashtra"
  },
  {
    "tender_id": "KA-442-MED",
    "estimated_cost": 3200000,
    "category": "healthcare",
    "state": "Karnataka"
  }
]
```

## Bid Prediction Logic

### Strategies Available
1. **Conservative Premium**: 18% margin, 25% win probability
2. **Balanced Approach**: 12% margin, 45% win probability
3. **Aggressive Pricing**: 6% margin, 70% win probability
4. **Market-Aligned**: Based on historical winning bid patterns

### Risk Factors Considered
- Material cost trends (rising/stable/falling)
- Labor availability (scarce/moderate/abundant)
- Competition level (low/medium/high)
- Company win rate history
- Project urgency
- Seasonal factors

### Market Research Sources
- **GeM Portal**: Historical bid data and winning prices
- **IndiaStat**: Material costs and economic indicators
- **Government Tender Sites**: Competitor analysis and trends

## Integration with Frontend

### React Hook Example
```javascript
import { useState } from 'react';

function BidAssistance() {
  const [bidData, setBidData] = useState(null);

  const getBidRecommendation = async (tenderData) => {
    const response = await fetch('/api/bid-assistance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tenderData)
    });
    const result = await response.json();
    setBidData(result);
  };

  return (
    <div>
      {/* Your bid assistance UI */}
      {bidData && (
        <div>
          <h3>Recommended Bid: ₹{bidData.bid_range.recommended.toLocaleString()}</h3>
          <p>Confidence: {(bidData.bid_range.confidence * 100).toFixed(1)}%</p>
          <p>Strategy: {bidData.strategy}</p>
        </div>
      )}
    </div>
  );
}
```

## Development

### Project Structure
```
backend/
├── main.py              # FastAPI application
├── models.py            # Pydantic data models
├── bid_engine.py        # Core prediction logic
├── market_research.py   # TinyFish integration
├── test_api.py          # API testing script
└── requirements.txt     # Python dependencies
```

### Adding New Features
1. **New Prediction Models**: Add to `bid_engine.py`
2. **New Data Sources**: Extend `market_research.py`
3. **New Endpoints**: Add to `main.py`
4. **New Models**: Update `models.py`

### Testing
```bash
# Run all tests
python test_api.py

# Manual testing with curl
curl -X POST "http://localhost:8000/api/bid-assistance" \
  -H "Content-Type: application/json" \
  -d '{"tender_id":"TEST-001","estimated_cost":1000000,"category":"civil"}'
```

## Deployment

### Docker
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables
```env
PORT=8000
DEBUG=false
TINYFISH_API_KEY=your_production_key
CORS_ORIGINS=https://yourdomain.com
```

## Future Enhancements

- **Machine Learning Models**: Train on historical bid data for better predictions
- **Real-time Market Data**: Integration with more data sources
- **Advanced Risk Modeling**: Monte Carlo simulations for uncertainty
- **Competitor Profiling**: Detailed competitor analysis and tracking
- **Bid Optimization**: Dynamic bid adjustment based on real-time auction data

## License

Proprietary - TenderFish Technologies Private Limited