import { Link } from 'react-router-dom';
import { TENDERS } from '../data/tenders';
import TenderCard from '../components/TenderCard';

const DiscoveryPage = () => (
  <main className="lg:ml-64 pt-24 p-8 hero-gradient min-h-screen">
    <header className="mb-12">
      <h1 className="text-4xl font-black text-primary mb-8 tracking-tight">Tender <span className="text-secondary italic">Discovery</span></h1>
      <div className="bg-white/70 backdrop-blur-md p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-xl border border-white/50">
        <div className="flex-grow flex items-center px-6 py-4">
          <span className="material-symbols-outlined text-primary/40 mr-4">search</span>
          <input className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium" placeholder="Keywords (e.g. Solar Panels, Road Construction)" type="text" />
        </div>
        <div className="md:w-56 border-l border-outline-variant/30 flex items-center px-6">
          <select className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold appearance-none">
            <option>All States</option>
            <option>Maharashtra</option>
            <option>Karnataka</option>
          </select>
        </div>
        <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:brightness-110 shadow-lg shadow-primary/20">Find Tenders</button>
      </div>
    </header>

    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <div className="xl:col-span-8 space-y-6">
        {TENDERS.map((tender) => (
          <TenderCard key={tender.id} tender={tender} />
        ))}
      </div>
      <aside className="xl:col-span-4 space-y-6">
        <section className="bg-white p-6 rounded-2xl shadow-lg border border-primary/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shadow-lg"><span className="material-symbols-outlined text-white">psychology</span></div>
            <div><p className="font-headline font-bold text-primary">AI Advisor</p><p className="text-[10px] uppercase font-black text-outline tracking-widest">Always Online</p></div>
          </div>
          <div className="bg-surface-container-low p-4 rounded-xl text-sm italic text-on-surface-variant leading-relaxed mb-6">
            "I've found 4 new civil tenders matching your recent work in Maharashtra. The parking facility project has a high 94% win probability."
          </div>
          <button className="w-full bg-primary text-white py-3 rounded-xl font-bold uppercase tracking-widest text-[10px]">Analyze All Match Details</button>
        </section>
      </aside>
    </div>
  </main>
);

export default DiscoveryPage;
