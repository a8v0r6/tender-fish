import { Link } from 'react-router-dom';

const ApplicationPage = () => (
  <main className="lg:ml-64 pt-24 p-8 hero-gradient min-h-screen">
    <header className="mb-10 max-w-3xl">
      <h1 className="text-4xl font-black text-primary mb-3">Application <span className="text-secondary italic">Helper</span></h1>
      <p className="text-lg text-on-surface-variant font-light">Craft compliant, winning technical bids based on your historical data and MSME profile.</p>
    </header>

    <div className="bg-white rounded-3xl p-10 shadow-2xl border border-primary/5 max-w-5xl">
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-outline-variant/20">
        <h2 className="text-2xl font-black text-primary">Company Profile</h2>
        <span className="text-outline uppercase text-[10px] font-black tracking-widest">Step 1 of 5</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-outline tracking-widest">Company Name</label>
          <input className="w-full bg-surface p-4 rounded-xl border-outline-variant/30 focus:ring-primary focus:border-primary" placeholder="e.g. Bharat Infrastructure Ltd." />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-outline tracking-widest">Business Type</label>
          <select className="w-full bg-surface p-4 rounded-xl border-outline-variant/30">
            <option>Manufacturing (MSME)</option>
            <option>Services</option>
            <option>Trading</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-outline tracking-widest">Turnover (FY 2023-24)</label>
          <input className="w-full bg-surface p-4 rounded-xl border-outline-variant/30" placeholder="₹ 5,00,00,000" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-outline tracking-widest">Tender ID / GEM ID</label>
          <input className="w-full bg-surface p-4 rounded-xl border-outline-variant/30" placeholder="Search active tenders..." />
        </div>
      </div>
      <div className="flex justify-end">
        <Link to="/bids" className="bg-primary text-white px-10 py-5 rounded-xl font-bold uppercase tracking-widest shadow-xl hover:brightness-110">Continue to Technical Bid</Link>
      </div>
    </div>
  </main>
);

export default ApplicationPage;
