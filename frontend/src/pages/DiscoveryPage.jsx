import { useState, useEffect } from 'react';
import TenderCard from '../components/TenderCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://100.116.31.114:8000';

const DiscoveryPage = () => {
  const [keyword, setKeyword] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTenders = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (stateFilter) params.append('state', stateFilter);
      const res = await fetch(`${API_URL}/api/tenders?${params}`);
      if (!res.ok) throw new Error('Failed to fetch tenders');
      setTenders(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTenders(); }, []);

  return (
    <main className="lg:ml-64 pt-24 p-8 hero-gradient min-h-screen">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-primary mb-8 tracking-tight">Tender <span className="text-secondary italic">Discovery</span></h1>
        <div className="bg-white/70 backdrop-blur-md p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-xl border border-white/50">
          <div className="flex-grow flex items-center px-6 py-4">
            <span className="material-symbols-outlined text-primary/40 mr-4">search</span>
            <input className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium" placeholder="Keywords (e.g. Solar Panels, Road Construction)" type="text" value={keyword} onChange={e => setKeyword(e.target.value)} onKeyDown={e => e.key === 'Enter' && fetchTenders()} />
          </div>
          <div className="md:w-56 border-l border-outline-variant/30 flex items-center px-6">
            <select className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold appearance-none" value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
              <option value="">All States</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
            </select>
          </div>
          <button onClick={fetchTenders} disabled={loading} className="bg-primary text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:brightness-110 shadow-lg shadow-primary/20 disabled:opacity-50">Find Tenders</button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-6">
          {loading && <div className="text-center py-20 text-outline text-lg">Searching tenders...</div>}
          {error && <div className="bg-red-50 text-red-700 p-6 rounded-xl">{error}</div>}
          {!loading && !error && tenders.length === 0 && (
            <div className="text-center py-20 text-outline"><p className="text-2xl mb-2">No tenders found</p><p className="text-sm">Try adjusting your search or filters</p></div>
          )}
          {!loading && tenders.map(t => <TenderCard key={t.id} tender={t} />)}
        </div>
        <aside className="xl:col-span-4 space-y-6">
          <section className="bg-white p-6 rounded-2xl shadow-lg border border-primary/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shadow-lg"><span className="material-symbols-outlined text-white">psychology</span></div>
              <div><p className="font-headline font-bold text-primary">AI Advisor</p><p className="text-[10px] uppercase font-black text-outline tracking-widest">Always Online</p></div>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl text-sm italic text-on-surface-variant leading-relaxed mb-6">
              {tenders.length > 0
                ? `I've found ${tenders.length} tender(s) matching your criteria. The highest match is "${tenders[0].title}" at ${tenders[0].match_score}% win probability.`
                : "Enter keywords to discover matching tenders. I'll analyze win probability for each one."}
            </div>
            <button className="w-full bg-primary text-white py-3 rounded-xl font-bold uppercase tracking-widest text-[10px]">Analyze All Match Details</button>
          </section>
        </aside>
      </div>
    </main>
  );
};

export default DiscoveryPage;
