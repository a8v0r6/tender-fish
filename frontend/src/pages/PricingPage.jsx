const PricingPage = () => (
  <main className="lg:ml-64 pt-24 p-8 text-center min-h-screen">
    <h1 className="text-5xl md:text-7xl font-black text-primary mb-8 tracking-tight">Pay as you <span className="text-secondary italic">grow.</span></h1>
    <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-20 font-light">Empowering Indian MSMEs with AI-driven tender intelligence. Choose a plan that fits your ambition.</p>

    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <article className="bg-white p-12 rounded-3xl border border-outline-variant/30 shadow-xl flex flex-col text-left">
        <p className="text-[10px] font-black uppercase tracking-widest text-outline mb-4">Starter</p>
        <p className="text-5xl font-black text-primary mb-10 tracking-tighter">₹1,999<span className="text-sm font-medium text-outline">/mo</span></p>
        <ul className="space-y-6 mb-12 flex-grow text-sm font-medium">
          <li className="flex gap-4"><span className="material-symbols-outlined text-secondary">check_circle</span> Daily Notifications</li>
          <li className="flex gap-4"><span className="material-symbols-outlined text-secondary">check_circle</span> Basic Document Prep</li>
        </ul>
        <button className="w-full py-4 rounded-xl border-2 border-primary text-primary font-black uppercase text-[10px] tracking-widest">Get Started</button>
      </article>

      <article className="bg-white p-12 rounded-3xl border-2 border-secondary shadow-2xl flex flex-col text-left relative scale-105 z-10">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-black px-6 py-1.5 rounded-full uppercase tracking-widest">Most Popular</div>
        <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-4">Growth</p>
        <p className="text-5xl font-black text-primary mb-10 tracking-tighter">₹5,999<span className="text-sm font-medium text-outline">/mo</span></p>
        <ul className="space-y-6 mb-12 flex-grow text-sm font-bold text-primary">
          <li className="flex gap-4"><span className="material-symbols-outlined text-secondary">stars</span> AI Technical Review</li>
          <li className="flex gap-4"><span className="material-symbols-outlined text-secondary">check_circle</span> Unlimited Alerts</li>
          <li className="flex gap-4"><span className="material-symbols-outlined text-secondary">check_circle</span> Priority Support</li>
        </ul>
        <button className="w-full py-5 bg-secondary text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl">Choose Growth</button>
      </article>

      <article className="bg-white p-12 rounded-3xl border border-outline-variant/30 shadow-xl flex flex-col text-left">
        <p className="text-[10px] font-black uppercase tracking-widest text-outline mb-4">Enterprise</p>
        <p className="text-4xl font-black text-primary mb-10 tracking-tight">Custom</p>
        <ul className="space-y-6 mb-12 flex-grow text-sm font-medium">
          <li className="flex gap-4"><span className="material-symbols-outlined text-secondary">check_circle</span> Dedicated Manager</li>
          <li className="flex gap-4"><span className="material-symbols-outlined text-secondary">check_circle</span> API Access</li>
        </ul>
        <button className="w-full py-4 rounded-xl border-2 border-primary text-primary font-black uppercase text-[10px] tracking-widest">Contact Sales</button>
      </article>
    </div>
  </main>
);

export default PricingPage;
