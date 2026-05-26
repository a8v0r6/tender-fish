import { useState, useEffect } from 'react';
import { useToast } from '../components/Toast';
import { SkeletonSupplierCard } from '../components/Skeleton';

const API_URL = import.meta.env.VITE_API_URL || 'http://100.116.31.114:8000';

const RawMaterialsPage = () => {
  const toast = useToast();
  const [query, setQuery] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [negotiating, setNegotiating] = useState(null);

  const fetchSuppliers = async (material = '') => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (material) params.append('material', material);
      const res = await fetch(`${API_URL}/api/suppliers?${params}`);
      if (!res.ok) throw new Error('Failed to fetch suppliers');
      setSuppliers(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSuppliers(); }, []);

  const handleNegotiate = async (supplier) => {
    setNegotiating(supplier.id);
    try {
      const res = await fetch(`${API_URL}/api/suppliers/negotiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          supplier_id: supplier.id,
          material: supplier.material,
          target_price: supplier.price * 0.88,
          quantity: 100
        })
      });
      if (!res.ok) throw new Error('Negotiation failed');
      const data = await res.json();
      toast(data.message, 'success');
    } catch (err) {
      toast(`Negotiation failed: ${err.message}`, 'error');
    } finally {
      setNegotiating(null);
    }
  };

  return (
    <main className="lg:ml-64 pt-24 p-8 hero-gradient min-h-screen">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-primary mb-8 tracking-tight">Raw Material <span className="text-secondary italic">Procurement</span></h1>
        <div className="glass-nav p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-2xl border border-white/50">
          <div className="flex-grow flex items-center px-6 py-4">
            <span className="material-symbols-outlined text-primary/40 mr-4">inventory_2</span>
            <input className="w-full bg-transparent border-none focus:ring-0 text-lg font-medium" placeholder="Search Materials (e.g. TMT Steel)" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && fetchSuppliers(query)} />
          </div>
          <button onClick={() => fetchSuppliers(query)} disabled={loading} className="bg-primary text-white px-12 py-4 rounded-xl font-black uppercase text-sm tracking-widest disabled:opacity-50">Find Suppliers</button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-8">
          {loading && [1, 2, 3].map(i => <SkeletonSupplierCard key={i} />)}
          {error && <div className="bg-red-50 text-red-700 p-6 rounded-xl">{error}</div>}
          {!loading && !error && suppliers.length === 0 && (
            <div className="text-center py-20 text-outline"><div className="text-5xl mb-4">🔍</div><p className="text-2xl mb-2 font-bold text-primary">No suppliers found</p><p className="text-sm">Try a different material name or check spelling</p></div>
          )}
          {!loading && suppliers.map(s => (
            <article key={s.id} className="bg-white rounded-3xl border border-primary/5 shadow-xl p-8 hover:shadow-2xl transition-all">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-primary">{s.name}</h3>
                  <p className="text-sm text-outline mt-1">{s.distance_km} km • {s.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest">Quote</p>
                  <p className="text-3xl font-black text-secondary">₹{s.price.toLocaleString('en-IN')}<span className="text-sm font-medium text-outline">/{s.unit}</span></p>
                </div>
              </div>
              <div className="flex gap-4 mb-8">
                {s.ready_stock && <span className="bg-secondary/5 text-secondary px-3 py-1 rounded-full text-[10px] font-black uppercase">Ready Stock</span>}
                {s.verified && <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase">MSME Verified</span>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => handleNegotiate(s)} disabled={negotiating === s.id} className="border border-primary/20 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest text-primary hover:bg-primary/5 disabled:opacity-50">
                  {negotiating === s.id ? 'Negotiating...' : 'Negotiate via AI'}
                </button>
                <button className="bg-primary text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest">Get Firm Quote</button>
              </div>
            </article>
          ))}
        </div>

        <aside className="xl:col-span-4">
          <div className="bg-primary rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full -mr-12 -mt-12"></div>
            <h3 className="text-2xl font-headline font-bold mb-8">Market Trends</h3>
            <div className="space-y-6">
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-xs uppercase font-black text-white/50">TMT 500 Grade</span>
                <span className="text-sm font-bold text-secondary-container">↑ 2.4%</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-xs uppercase font-black text-white/50">OPC Cement</span>
                <span className="text-sm font-bold text-secondary-container">↓ 0.8%</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-xs uppercase font-black text-white/50">Fly Ash Bricks</span>
                <span className="text-sm font-bold text-secondary-container">→ 0.0%</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default RawMaterialsPage;
