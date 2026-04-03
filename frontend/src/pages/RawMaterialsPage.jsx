const RawMaterialsPage = () => (
  <main className="lg:ml-64 pt-24 p-8 hero-gradient min-h-screen">
    <header className="mb-12">
      <h1 className="text-4xl font-black text-primary mb-8 tracking-tight">Raw Material <span className="text-secondary italic">Procurement</span></h1>
      <div className="glass-nav p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-2xl border border-white/50">
        <div className="flex-grow flex items-center px-6 py-4">
          <span className="material-symbols-outlined text-primary/40 mr-4">inventory_2</span>
          <input className="w-full bg-transparent border-none focus:ring-0 text-lg font-medium" placeholder="Search Materials (e.g. TMT Steel)" />
        </div>
        <button className="bg-primary text-white px-12 py-4 rounded-xl font-black uppercase text-sm tracking-widest">Find Suppliers</button>
      </div>
    </header>

    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
      <div className="xl:col-span-8 space-y-8">
        <article className="bg-white rounded-3xl border border-primary/5 shadow-xl p-8 hover:shadow-2xl transition-all">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-primary">Mahindra Steel Works</h3>
              <p className="text-sm text-outline mt-1">12.4 km • Navi Mumbai</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-outline uppercase tracking-widest">Quote</p>
              <p className="text-3xl font-black text-secondary">₹58,200<span className="text-sm font-medium text-outline">/t</span></p>
            </div>
          </div>
          <div className="flex gap-4 mb-8">
            <span className="bg-secondary/5 text-secondary px-3 py-1 rounded-full text-[10px] font-black uppercase">Ready Stock</span>
            <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase">MSME Verified</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="border border-primary/20 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest text-primary hover:bg-primary/5">Negotiate via AI</button>
            <button className="bg-primary text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest">Get Firm Quote</button>
          </div>
        </article>
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
          </div>
        </div>
      </aside>
    </div>
  </main>
);

export default RawMaterialsPage;
