import { useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import Sidebar from '../components/Sidebar';
import { useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://100.116.31.114:8000';

const BidAutopsyPage = () => {
  const location = useLocation();
  const showSidebar = location.pathname !== '/';
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setAnalysis(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('document_type', 'lost_bid');
      formData.append('user_id', '1'); // TODO: Get from auth context

      const uploadRes = await fetch(`${API_URL}/api/bid-autopsy/upload`, {
        method: 'POST',
        body: formData
      });

      if (!uploadRes.ok) throw new Error('Upload failed');

      const uploadData = await uploadRes.json();
      const docId = uploadData.document_id;

      // Trigger analysis
      await fetch(`${API_URL}/api/bid-autopsy/analyze/${docId}`, { method: 'POST' });

      // Get results
      const analysisRes = await fetch(`${API_URL}/api/bid-autopsy/analysis/${docId}`);
      const analysisData = await analysisRes.json();

      setAnalysis(analysisData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-bright">
      <TopNavBar />
      {showSidebar && <Sidebar />}
      <main className={`${showSidebar ? 'lg:ml-64' : ''} pt-24 p-8`}>
        <header className="mb-10">
          <h1 className="text-4xl font-black text-primary mb-3">Bid Autopsy 🔍</h1>
          <p className="text-on-surface-variant">Upload a lost bid PDF to understand why you didn't win and how to improve.</p>
        </header>

        <div className="bg-white rounded-3xl border border-primary/5 shadow-2xl p-10 max-w-3xl">
          <div className="border-2 border-dashed border-outline-variant/30 rounded-2xl p-10 text-center">
            <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="bid-upload" />
            <label htmlFor="bid-upload" className="cursor-pointer">
              <div className="text-6xl mb-4">📄</div>
              <p className="text-lg font-medium text-primary">Click to upload your lost bid PDF</p>
              <p className="text-sm text-outline mt-2">We'll analyze it and tell you exactly what went wrong</p>
            </label>
            {file && <p className="mt-4 font-bold text-secondary">{file.name}</p>}
          </div>

          {error && <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl">{error}</div>}

          <button 
            onClick={handleUpload}
            disabled={!file || loading}
            className="mt-6 w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Run Autopsy'}
          </button>
        </div>

        {analysis && analysis.status === 'complete' && (
          <div className="mt-10 bg-white rounded-3xl border border-primary/5 shadow-2xl p-10 max-w-3xl">
            <h2 className="text-2xl font-black text-primary mb-6">Analysis Results</h2>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-outline mb-2">Summary</h3>
              <p className="text-on-surface-variant">{analysis.summary}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-outline mb-2">Reason for Loss</h3>
              <p className="text-red-600 font-medium">{analysis.reason_for_loss}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-outline mb-2">Improvement Tips</h3>
              <ul className="list-disc list-inside text-on-surface-variant space-y-2">
                {analysis.improvement_tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/10">
              <p className="text-sm text-outline">Confidence Score: {(analysis.confidence_score * 100).toFixed(0)}%</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BidAutopsyPage;
