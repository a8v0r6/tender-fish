const FinancePage = () => (
  <main className="lg:ml-64 pt-24 p-8 hero-gradient min-h-screen">
    <header className="mb-12">
      <h1 className="text-4xl font-black text-primary mb-3">Finance & <span className="text-secondary italic">Lending</span></h1>
      <p className="text-on-surface-variant font-light text-lg">Fuel your MSME growth with tailored capital solutions.</p>
    </header>

    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/50 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="md:col-span-2 space-y-12">
        <h2 className="text-2xl font-black text-primary">EMI Calculator</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between"><label className="text-[10px] font-black uppercase text-outline">Loan Amount</label><span className="text-2xl font-black text-primary">₹ 45.0 L</span></div>
            <input type="range" className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none accent-primary" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between"><label className="text-[10px] font-black uppercase text-outline">Tenure</label><span className="text-2xl font-black text-primary">24 Months</span></div>
            <input type="range" className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none accent-primary" />
          </div>
        </div>
      </div>
      <div className="bg-primary rounded-3xl p-10 flex flex-col justify-center items-center text-center text-white shadow-2xl">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-white/50">Estimated Monthly EMI</p>
        <p className="text-5xl font-black mb-10 tracking-tighter">₹ 2,04,560</p>
        <button className="w-full bg-white text-primary py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:shadow-xl transition-all">Check Eligibility</button>
      </div>
    </div>
  </main>
);

export default FinancePage;
