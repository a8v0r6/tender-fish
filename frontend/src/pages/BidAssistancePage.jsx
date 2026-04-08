import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://100.116.31.114:8000';

const BidAssistancePage = () => {
  const [formData, setFormData] = useState({
    tender_id: '',
    estimated_cost: '',
    competitor_count: 5,
    company_size: 'small',
    risk_appetite: 'moderate',
    past_win_rate: 0.35,
    urgency_score: 7,
    category: 'civil',
    state: ''
  });

  const [bidResult, setBidResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['estimated_cost', 'competitor_count', 'past_win_rate', 'urgency_score'].includes(name)
        ? parseFloat(value) || value
        : value
    }));
  };

  const handleOutcome = async (won) => {
    if (!bidResult) return;
    // In a real app, this would call a backend endpoint to save the outcome
    alert(`Outcome recorded: ${won ? 'Won' : 'Lost'}! This will help refine future AI predictions.`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBidResult(null);

    try {
      const response = await fetch(`${API_URL}/api/bid-assistance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'API request failed');
      }

      const data = await response.json();
      setBidResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="lg:ml-64 pt-24 p-8 bg-surface-bright min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-primary mb-3">Bid Assistance <span className="text-secondary italic">Dashboard</span></h1>
        <p className="text-on-surface-variant">Get AI-powered bid recommendations based on your project details.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-primary/5 shadow-2xl p-10 mb-10">
        <h2 className="text-2xl font-black text-primary mb-6">Tender Details</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Tender ID</label>
            <input type="text" name="tender_id" value={formData.tender_id} onChange={handleChange} className="w-full border rounded-lg p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Estimated Cost (₹)</label>
            <input type="number" name="estimated_cost" value={formData.estimated_cost} onChange={handleChange} className="w-full border rounded-lg p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Expected Competitors</label>
            <input type="number" name="competitor_count" value={formData.competitor_count} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Company Size</label>
            <select name="company_size" value={formData.company_size} onChange={handleChange} className="w-full border rounded-lg p-2">
              <option value="micro">Micro</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Risk Appetite</label>
            <select name="risk_appetite" value={formData.risk_appetite} onChange={handleChange} className="w-full border rounded-lg p-2">
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Past Win Rate (0-1)</label>
            <input type="number" step="0.01" name="past_win_rate" value={formData.past_win_rate} onChange={handleChange} className="w-full border rounded-lg p-2" min="0" max="1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Urgency (1-10)</label>
            <input type="number" name="urgency_score" value={formData.urgency_score} onChange={handleChange} className="w-full border rounded-lg p-2" min="1" max="10" />
          </div>
        </div>
        <button type="submit" disabled={loading} className="mt-8 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-50">
          {loading ? 'Analyzing...' : 'Get Bid Recommendation'}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 text-red-700 p-6 rounded-xl mb-8">{error}</div>
      )}

      {bidResult && (
        <div className="bg-white rounded-3xl border border-primary/5 shadow-2xl p-10">
          <h3 className="text-2xl font-black text-primary mb-6">Bid Recommendation for {bidResult.tender_id}</h3>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-surface-container-low p-6 rounded-2xl">
              <p className="text-sm text-outline">Minimum Viable Bid</p>
              <p className="text-2xl font-black text-primary">₹{bidResult.bid_range.minimum.toLocaleString()}</p>
            </div>
            <div className="bg-primary text-white p-6 rounded-2xl">
              <p className="text-sm opacity-80">Recommended Bid</p>
              <p className="text-2xl font-black">₹{bidResult.bid_range.recommended.toLocaleString()}</p>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl">
              <p className="text-sm text-outline">Max Competitive Bid</p>
              <p className="text-2xl font-black text-primary">₹{bidResult.bid_range.maximum.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 mb-6">
            <div>
              <h4 className="font-bold mb-3">Strategy</h4>
              <p>{bidResult.strategy}</p>
              <p className="text-sm mt-2">Margin: {bidResult.margin_percentage}%</p>
              <p className="text-sm">Confidence: {(bidResult.bid_range.confidence * 100).toFixed(0)}%</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Competitor Analysis</h4>
              <p>Expected Bidders: {bidResult.competitor_analysis.expected_bidders}</p>
              <p>Pressure: {bidResult.competitor_analysis.price_pressure}</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold mb-3">Market Insights</h4>
            <p>Materials: {bidResult.market_insights.material_trend}</p>
            <p>Labor: {bidResult.market_insights.labor_availability}</p>
            <p>Seasonal Factor: {bidResult.market_insights.seasonal_factor}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-bold mb-3">Risk Factors</h4>
            <ul className="list-disc list-inside">
              {bidResult.risk_factors.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="font-bold mb-3">Action Items</h4>
            <ul className="list-disc list-inside">
              {bidResult.action_items.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>

          <div className="mb-6 flex gap-4">
            <button onClick={() => handleOutcome(true)} className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700">Mark as Won</button>
            <button onClick={() => handleOutcome(false)} className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700">Mark as Lost</button>
          </div>

          <div className="text-sm text-on-surface-variant">
            <h4 className="font-bold mb-2">Reasoning</h4>
            <p>{bidResult.reasoning}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default BidAssistancePage;
