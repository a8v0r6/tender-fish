import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';

const HomePage = () => {
  return (
    <main>
      {/* Hero */}
      <section className="hero-gradient pt-44 pb-28 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative">
          <div>
            <h1 className="font-headline text-5xl md:text-7xl text-primary font-black leading-[1.1] mb-8 tracking-tight">
              Winning tenders, <br />
              <span className="text-secondary italic font-medium">simplified.</span>
            </h1>
            <p className="text-xl text-on-surface-variant mb-10 leading-relaxed max-w-lg font-light">
              The precision-engineered portal for Indian MSMEs. AI-driven matching discovers high-value contracts before your competition.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link to="/pricing" className="bg-primary text-white px-10 py-5 rounded-lg font-bold text-lg shadow-xl shadow-primary/20 hover:bg-primary/95 transition-all">
                Start your free trial
              </Link>
              <Link to="/discovery" className="bg-white text-primary px-10 py-5 rounded-lg font-bold text-lg border border-outline-variant hover:border-primary/30 transition-all flex items-center gap-2">
                See demo
                <span className="material-symbols-outlined text-sm">play_circle</span>
              </Link>
            </div>
          </div>
          <div className="relative group">
            <div className="relative z-10 bg-white p-2.5 rounded-xl shadow-[0_32px_64px_-12px_rgba(0,55,44,0.15)] border border-white transition-transform duration-700 group-hover:-translate-y-2">
              <img
                alt="TenderFish Dashboard"
                className="w-full h-auto rounded-lg grayscale-[0.1] contrast-[1.02]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyJby-U-MN9L7ZC8Cg8i2N6-ZFcNXZCWrs0-eq3NRdYiWTcotmt4FBSNMIcZQ8vr5QZXQEtpupJxAPrMcn0xcQbk4rZxTjkRNcKES0MZIe18SKFgJsOSU9QV-I6xPcFifrq4r81Rf3GuIt9NMmEL-xNcRHO3GCSalLPWJ1KiQRSJtGzGQL1Exo9BESDjblY8gGoP8swusNgxrkHuv89kwEJFdmzLkQRZrg6-44dFJg9la6-XJlSVvGCsSqJjBLkvBIxWIZpNXBj7c"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-full h-full bg-secondary/5 rounded-xl -z-0"></div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="px-8 -mt-16 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="glass-panel p-2.5 flex flex-col md:flex-row gap-2 shadow-2xl rounded-2xl">
            <div className="flex-1 flex items-center px-6">
              <span className="material-symbols-outlined text-primary/40 mr-4">search</span>
              <input className="w-full border-none focus:ring-0 bg-transparent py-5 text-on-surface placeholder:text-outline/60 text-lg font-medium" placeholder="Search keywords (e.g. NHAI Road)..." type="text" />
            </div>
            <div className="md:w-56 px-6 border-l border-outline-variant/30 flex items-center">
              <select className="w-full border-none focus:ring-0 bg-transparent py-5 text-on-surface appearance-none font-semibold text-sm">
                <option>All States</option>
                <option>Maharashtra</option>
                <option>Karnataka</option>
              </select>
            </div>
            <div className="md:w-64 px-6 border-l border-outline-variant/30 flex items-center">
              <select className="w-full border-none focus:ring-0 bg-transparent py-5 text-on-surface appearance-none font-semibold text-sm">
                <option>All Categories</option>
                <option>Civil Works</option>
                <option>IT & Telecom</option>
              </select>
            </div>
            <button className="bg-secondary text-white px-12 py-5 rounded-xl font-black uppercase tracking-widest text-sm hover:brightness-110 shadow-lg shadow-secondary/20 transition-all">
              Search
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 items-center justify-center">
            <span className="text-[10px] font-black uppercase text-outline tracking-widest">Trending</span>
            <span className="bg-surface-container-high/50 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-white hover:shadow-md transition-all">NHAI Road</span>
            <span className="bg-surface-container-high/50 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-white hover:shadow-md transition-all">Solar Projects</span>
            <span className="bg-surface-container-high/50 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-white hover:shadow-md transition-all">Smart City</span>
            <span className="bg-surface-container-high/50 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold border border-outline-variant/30 cursor-pointer hover:bg-white hover:shadow-md transition-all">Defence</span>
          </div>
        </div>
      </section>

      {/* Desktop Ticker */}
      <div className="bg-primary text-white/90 py-3.5 mt-16 overflow-hidden flex border-y border-white/5 hidden md:flex">
        <div className="scrolling-marquee flex gap-16 items-center">
          <span className="flex items-center gap-3 text-sm font-medium tracking-tight">
            <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 text-[9px] font-black rounded-sm">NEW</span>
            CPWD: Building Construction in Mumbai
            <span className="text-white/40 mx-2">|</span>
            <span className="text-white">₹12.4 Cr</span>
            <span className="text-white/40 mx-2">|</span>
            <span className="text-secondary-fixed font-bold">12 Days Left</span>
          </span>
          <span className="flex items-center gap-3 text-sm font-medium tracking-tight">
            <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 text-[9px] font-black rounded-sm">NEW</span>
            BSNL: Optical Fiber Laying
            <span className="text-white/40 mx-2">|</span>
            <span className="text-white">₹4.2 Cr</span>
            <span className="text-white/40 mx-2">|</span>
            <span className="text-secondary-fixed font-bold">08 Days Left</span>
          </span>
          <span className="flex items-center gap-3 text-sm font-medium tracking-tight">
            <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 text-[9px] font-black rounded-sm">NEW</span>
            NHAI: Highway Maintenance
            <span className="text-white/40 mx-2">|</span>
            <span className="text-white">₹45.8 Cr</span>
            <span className="text-white/40 mx-2">|</span>
            <span className="text-secondary-fixed font-bold">21 Days Left</span>
          </span>
          <span className="flex items-center gap-3 text-sm font-medium tracking-tight">
            <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 text-[9px] font-black rounded-sm">NEW</span>
            CPWD: Building Construction in Mumbai
            <span className="text-white/40 mx-2">|</span>
            <span className="text-white">₹12.4 Cr</span>
            <span className="text-white/40 mx-2">|</span>
            <span className="text-secondary-fixed font-bold">12 Days Left</span>
          </span>
        </div>
      </div>

      {/* Mobile Ticker Stack */}
      <div className="bg-primary text-white/90 py-4 mt-16 md:hidden border-y border-white/5">
        <div className="space-y-3 px-4">
          <div className="flex items-center gap-3 text-xs font-medium tracking-tight">
            <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 text-[8px] font-black rounded-sm">NEW</span>
            <span className="flex-1">CPWD: Building Construction in Mumbai • ₹12.4 Cr • <span className="text-secondary-fixed font-bold">12 Days</span></span>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium tracking-tight">
            <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 text-[8px] font-black rounded-sm">NEW</span>
            <span className="flex-1">BSNL: Optical Fiber Laying • ₹4.2 Cr • <span className="text-secondary-fixed font-bold">08 Days</span></span>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium tracking-tight">
            <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 text-[8px] font-black rounded-sm">NEW</span>
            <span className="flex-1">NHAI: Highway Maintenance • ₹45.8 Cr • <span className="text-secondary-fixed font-bold">21 Days</span></span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <StatCard value="48,000+" label="Active Tenders" />
          <StatCard value="28" label="States Covered" />
          <StatCard value="₹380 Cr" label="Contract Value Won" />
          <StatCard value="4,200+" label="Active MSMEs" />
          </div>
        </div>
      </section>

      {/* Market Verticals */}
      <section className="py-32 px-8 bg-surface-container-lowest relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6">
            <div>
              <h2 className="font-headline text-5xl text-primary font-black tracking-tight mb-4">Market Verticals</h2>
              <p className="text-on-surface-variant font-light text-lg">Detailed coverage across India's growing infrastructure sectors.</p>
            </div>
            <a className="text-secondary font-bold flex items-center gap-2 group text-sm uppercase tracking-widest cursor-pointer">
              All sectors <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_right_alt</span>
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-10 rounded-2xl border border-outline-variant/30 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group">
              <div className="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors">construction</span>
              </div>
              <h3 className="font-bold text-xl text-primary mb-1">Civil Works</h3>
              <p className="text-sm text-outline font-medium">12,402 Contracts</p>
            </div>
            <div className="bg-white p-10 rounded-2xl border border-outline-variant/30 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group">
              <div className="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors">devices</span>
              </div>
              <h3 className="font-bold text-xl text-primary mb-1">IT & Telecom</h3>
              <p className="text-sm text-outline font-medium">8,115 Contracts</p>
            </div>
            <div className="bg-white p-10 rounded-2xl border border-outline-variant/30 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group">
              <div className="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors">bolt</span>
              </div>
              <h3 className="font-bold text-xl text-primary mb-1">Energy</h3>
              <p className="text-sm text-outline font-medium">5,209 Contracts</p>
            </div>
            <div className="bg-white p-10 rounded-2xl border border-outline-variant/30 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group">
              <div className="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors">medical_services</span>
              </div>
              <h3 className="font-bold text-xl text-primary mb-1">Healthcare</h3>
              <p className="text-sm text-outline font-medium">3,982 Contracts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Execution */}
      <section id="how-it-works" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="font-headline text-5xl text-primary font-black mb-6">Strategic Execution</h2>
            <div className="w-24 h-1.5 bg-tertiary-fixed-dim mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-outline-variant/40 -z-0"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white border border-outline-variant/50 shadow-xl shadow-primary/5 flex items-center justify-center text-primary mb-8 group hover:border-primary transition-all">
                <span className="material-symbols-outlined text-3xl">search_insights</span>
              </div>
              <h4 className="font-bold text-2xl text-primary mb-4 tracking-tight">Discover</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed px-4">AI identifies high-fit opportunities from 5,000+ daily portals.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white border border-outline-variant/50 shadow-xl shadow-primary/5 flex items-center justify-center text-primary mb-8 hover:border-primary transition-all">
                <span className="material-symbols-outlined text-3xl">history_edu</span>
              </div>
              <h4 className="font-bold text-2xl text-primary mb-4 tracking-tight">Bid Intelligence</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed px-4">Market analytics to optimize pricing and increase win probability.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white border border-outline-variant/50 shadow-xl shadow-primary/5 flex items-center justify-center text-primary mb-8 hover:border-primary transition-all">
                <span className="material-symbols-outlined text-3xl">inventory</span>
              </div>
              <h4 className="font-bold text-2xl text-primary mb-4 tracking-tight">Supply Chain</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed px-4">Connect with vetted manufacturers to lock in project costs.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary text-white shadow-2xl shadow-primary/30 flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-3xl">account_balance</span>
              </div>
              <h4 className="font-bold text-2xl text-primary mb-4 tracking-tight">Project Finance</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed px-4">Instant BG/LC and credit lines to operationalize your contract.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="py-32 px-8 bg-surface-container-lowest border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-headline text-5xl text-primary font-black mb-20 text-center">The Complete Ecosystem</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-1 bg-primary mb-8"></div>
              <h3 className="font-headline text-2xl text-primary mb-4">Tender Discovery</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">Personalized real-time alerts for local and national tenders with granular filtering.</p>
              <div className="text-[10px] font-black text-secondary tracking-widest uppercase py-2 px-3 bg-secondary/5 rounded inline-block">AI-Powered</div>
            </div>
            <div className="bg-white p-10 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-1 bg-secondary mb-8"></div>
              <h3 className="font-headline text-2xl text-primary mb-4">Compliance Hub</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">Automated documentation validation to ensure zero disqualifications on technical bids.</p>
              <div className="text-[10px] font-black text-secondary tracking-widest uppercase py-2 px-3 bg-secondary/5 rounded inline-block">Efficiency</div>
            </div>
            <div className="bg-white p-10 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-1 bg-tertiary-fixed-dim mb-8"></div>
              <h3 className="font-headline text-2xl text-primary mb-4">JV Matchmaking</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">Connect with partners to fulfill high-value pre-qualification criteria collectively.</p>
              <div className="text-[10px] font-black text-secondary tracking-widest uppercase py-2 px-3 bg-secondary/5 rounded inline-block">Support</div>
            </div>
            <div className="bg-white p-10 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-1 bg-primary mb-8"></div>
              <h3 className="font-headline text-2xl text-primary mb-4">Material Sourcing</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">Exclusive direct-from-factory pricing through our network of industrial partners.</p>
              <div className="text-[10px] font-black text-secondary tracking-widest uppercase py-2 px-3 bg-secondary/5 rounded inline-block">Logistics</div>
            </div>
            <div className="bg-white p-10 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-1 bg-on-tertiary-container mb-8"></div>
              <h3 className="font-headline text-2xl text-primary mb-4">Growth Capital</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">Collateral-free working capital tailored specifically for government contracts.</p>
              <div className="text-[10px] font-black text-secondary tracking-widest uppercase py-2 px-3 bg-secondary/5 rounded inline-block">Financing</div>
            </div>
            <div className="bg-white p-10 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-1 bg-outline mb-8"></div>
              <h3 className="font-headline text-2xl text-primary mb-4">Pricing Data</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">Access L1/L2 pricing history for departments to bid with surgical precision.</p>
              <div className="text-[10px] font-black text-secondary tracking-widest uppercase py-2 px-3 bg-secondary/5 rounded inline-block">Intelligence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-8 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="flex flex-col">
              <div className="text-tertiary-fixed-dim text-6xl font-headline italic mb-6">"</div>
              <p className="text-xl italic text-primary leading-relaxed mb-10 font-light">TenderFish reduced our discovery time by 90%. We used to miss small-value tenders that were perfect; now we see everything.</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center font-bold text-primary">AS</div>
                <div>
                  <p className="font-bold text-primary tracking-tight">Ankit Sharma</p>
                  <p className="text-xs font-black uppercase tracking-widest text-outline/60 mt-1">VP Ops, Precision Infra</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-tertiary-fixed-dim text-6xl font-headline italic mb-6">"</div>
              <p className="text-xl italic text-primary leading-relaxed mb-10 font-light">The analytics on competitor pricing is a game-changer. We won our last three bids because we knew exactly where the ceiling was.</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center font-bold text-primary">PP</div>
                <div>
                  <p className="font-bold text-primary tracking-tight">Priya Patel</p>
                  <p className="text-xs font-black uppercase tracking-widest text-outline/60 mt-1">Founder, GreenTech</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-tertiary-fixed-dim text-6xl font-headline italic mb-6">"</div>
              <p className="text-xl italic text-primary leading-relaxed mb-10 font-light">Financing was always a hurdle. TenderFish helped us secure a BG in 48 hours. Absolute lifeline for our business growth.</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center font-bold text-primary">RI</div>
                <div>
                  <p className="font-bold text-primary tracking-tight">Rajesh Iyer</p>
                  <p className="text-xs font-black uppercase tracking-widest text-outline/60 mt-1">MD, Iyer Electricals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary-container/40 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-24">
            <h2 className="font-headline text-5xl text-white font-black mb-6 tracking-tight">Scale Your Ambition</h2>
            <p className="text-on-primary-container text-lg font-light">Professional solutions for growing and established contractors.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-12 rounded-3xl flex flex-col hover:bg-white/10 transition-all">
              <h3 className="text-white text-xl font-bold mb-2">Starter</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black text-white tracking-tighter">₹2,499</span>
                <span className="text-white/50 text-sm">/mo</span>
              </div>
              <ul className="space-y-5 mb-12 text-sm text-white/70">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-fixed text-sm">check_circle</span> 50 Tender Alerts</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-fixed text-sm">check_circle</span> State-level filtering</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-fixed text-sm">check_circle</span> AI-Powered Matching</li>
              </ul>
              <button className="w-full bg-white/10 text-white py-4 rounded-xl font-bold border border-white/20 hover:bg-white hover:text-primary transition-all mt-auto">Start Today</button>
            </div>
            <div className="bg-white p-12 rounded-3xl flex flex-col relative shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border-2 border-tertiary-fixed-dim/20 scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg border border-tertiary-fixed-dim/30">Most Popular</div>
              <h3 className="text-primary text-xl font-bold mb-2">Growth</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black text-primary tracking-tighter">₹5,999</span>
                <span className="text-outline text-sm">/mo</span>
              </div>
              <ul className="space-y-5 mb-12 text-sm text-on-surface-variant font-medium">
                <li className="flex items-center gap-3 text-primary"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Unlimited Daily Alerts</li>
                <li className="flex items-center gap-3 text-primary"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Pan-India Portal Access</li>
                <li className="flex items-center gap-3 text-primary"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Competitor Analytics Hub</li>
                <li className="flex items-center gap-3 text-primary"><span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Priority Bid Support</li>
              </ul>
              <button className="w-full bg-secondary text-white py-5 rounded-xl font-black uppercase tracking-[0.2em] text-xs hover:shadow-2xl hover:shadow-secondary/30 transition-all mt-auto">Choose Growth</button>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-12 rounded-3xl flex flex-col hover:bg-white/10 transition-all">
              <h3 className="text-white text-xl font-bold mb-2">Enterprise</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-2xl font-black text-white uppercase tracking-widest">Custom</span>
              </div>
              <ul className="space-y-5 mb-12 text-sm text-white/70">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-fixed text-sm">check_circle</span> Dedicated Account Manager</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-fixed text-sm">check_circle</span> API Access & Integration</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary-fixed text-sm">check_circle</span> White-label Portal Option</li>
              </ul>
              <button className="w-full bg-white/10 text-white py-4 rounded-xl font-bold border border-white/20 hover:bg-white hover:text-primary transition-all mt-auto">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

