import { useState } from 'react';

const PricingPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(1);

  const faqItems = [
    {
      id: 0,
      question: 'Can I switch plans mid-year?',
      answer: 'Yes, you can upgrade your plan at any time. The remaining balance on your current plan will be credited towards your new selection.'
    },
    {
      id: 1,
      question: 'How does the AI Bid Assistant work?',
      answer: 'Our AI scans the tender document for technical compliance requirements and compares them against your past performance and registered company credentials to give you a "Fit Score" and a gap analysis for your submission.'
    },
    {
      id: 2,
      question: 'Do you offer free trials for MSMEs?',
      answer: 'Yes, we offer a 14-day free trial for all MSME-registered businesses. No credit card required to get started.'
    },
    {
      id: 3,
      question: 'What support do I get for EMD payments?',
      answer: 'Our Finance & Lending partners offer up to ₹50 lakh in EMD financing at competitive rates exclusively for TenderFish users.'
    }
  ];

  return (
    <main className="lg:ml-64">
      {/* Hero Section */}
      <section className="px-8 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-headline text-5xl md:text-7xl font-black text-primary mb-8 leading-[1.1] tracking-tight">
            Win more tenders. <br/><span className="text-secondary italic font-medium">Pay as you grow.</span>
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-12 text-lg font-light leading-relaxed">
            Empowering Indian MSMEs with AI-driven tender intelligence and seamless application support. Choose a plan that fits your ambition.
          </p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center gap-5 mb-20">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Monthly</span>
            <button className="w-14 h-7 bg-primary rounded-full p-1 flex items-center transition-all hover:shadow-md">
              <div className="w-5 h-5 bg-white rounded-full ml-auto shadow-sm"></div>
            </button>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Yearly</span>
            <span className="bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-on-tertiary-fixed-variant text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Save 20%</span>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Starter */}
            <div className="bg-white p-10 flex flex-col text-left rounded-2xl border border-outline-variant/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-500">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-3">Starter</span>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-headline font-black text-primary tracking-tighter">₹1,999</span>
                <span className="text-on-surface-variant/60 font-medium">/mo</span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-10 min-h-[48px] font-medium opacity-80">Essential tools for small businesses looking to enter the public procurement landscape.</p>
              <ul className="space-y-5 mb-12 flex-grow">
                <li className="flex items-start gap-4 text-sm font-medium">
                  <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                  <span>Daily Tender Notifications</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-medium">
                  <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                  <span>Basic Document Checklist</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-medium">
                  <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                  <span>Email Support</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-medium opacity-30 grayscale">
                  <span className="material-symbols-outlined text-lg">cancel</span>
                  <span>AI Bid Assistance</span>
                </li>
              </ul>
              <button className="w-full py-4 rounded-lg border-2 border-primary text-primary font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary hover:text-white transition-all">Get Started</button>
            </div>

            {/* Growth (Popular) */}
            <div className="bg-white p-10 flex flex-col text-left rounded-2xl border-2 border-secondary relative z-10 scale-105 shadow-[0_40px_100px_-20px_rgba(0,55,44,0.15)] transition-all duration-500">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-white text-[10px] font-black px-6 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">Most Popular</div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-3">Growth</span>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-headline font-black text-primary tracking-tighter">₹5,999</span>
                <span className="text-on-surface-variant/60 font-medium">/mo</span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-10 min-h-[48px] font-medium opacity-80">Comprehensive AI-powered suite for scaling enterprises winning recurring contracts.</p>
              <ul className="space-y-5 mb-12 flex-grow">
                <li className="flex items-start gap-4 text-sm font-bold text-primary">
                  <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                  <span>Unlimited Tender Matches</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-bold text-primary">
                  <span className="material-symbols-outlined text-secondary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
                  <span>AI Assistant: Technical Review</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-bold text-primary">
                  <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                  <span>Bid Probability Scoring</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-bold text-primary">
                  <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                  <span>Priority Document Prep</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-bold text-primary">
                  <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                  <span>24/7 Priority Support</span>
                </li>
              </ul>
              <button className="w-full py-5 bg-secondary text-white rounded-lg font-black uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-secondary/20 hover:brightness-110 transition-all">Choose Growth</button>
            </div>

            {/* Enterprise */}
            <div className="bg-white p-10 flex flex-col text-left rounded-2xl border border-outline-variant/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-500">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-3">Enterprise</span>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-headline font-black text-primary tracking-tight">Custom</span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-10 min-h-[48px] font-medium opacity-80">High-volume bidding with dedicated consultants and white-glove integration.</p>
              <ul className="space-y-5 mb-12 flex-grow">
                <li className="flex items-start gap-4 text-sm font-medium">
                  <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                  <span>Everything in Growth</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-medium">
                  <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                  <span>Dedicated Account Manager</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-medium">
                  <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                  <span>API Access for ERPs</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-medium">
                  <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                  <span>Raw Material Financing Desk</span>
                </li>
              </ul>
              <button className="w-full py-4 rounded-lg border-2 border-primary text-primary font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary hover:text-white transition-all">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="max-w-7xl mx-auto px-8 py-32">
        <h2 className="font-headline text-5xl font-black text-primary text-center mb-20 tracking-tight">Deep Feature Comparison</h2>
        <div className="overflow-hidden rounded-3xl border border-outline-variant/20 shadow-2xl shadow-primary/5 bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-primary to-primary/90 text-white text-left">
                <th className="p-8 font-black uppercase tracking-[0.2em] text-[11px] border-b border-white/5">Capabilities</th>
                <th className="p-8 font-black uppercase tracking-[0.2em] text-[11px] text-center border-b border-white/5">Starter</th>
                <th className="p-8 font-black uppercase tracking-[0.2em] text-[11px] text-center border-b border-white/5 bg-secondary/20">Growth</th>
                <th className="p-8 font-black uppercase tracking-[0.2em] text-[11px] text-center border-b border-white/5">Enterprise</th>
              </tr>
            </thead>
            <tbody className="text-sm text-on-surface">
              <tr className="bg-surface-container-low/30 border-b border-outline-variant/10">
                <td className="p-6 px-8 font-bold text-primary">Daily Tender Alerts</td>
                <td className="p-6 text-center font-medium opacity-60">Included</td>
                <td className="p-6 text-center font-black text-secondary">Unlimited</td>
                <td className="p-6 text-center font-medium">Unlimited</td>
              </tr>
              <tr className="bg-white border-b border-outline-variant/10">
                <td className="p-6 px-8 font-bold text-primary">AI Technical Advisor</td>
                <td className="p-6 text-center opacity-30">—</td>
                <td className="p-6 text-center"><span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span></td>
                <td className="p-6 text-center"><span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span></td>
              </tr>
              <tr className="bg-surface-container-low/30 border-b border-outline-variant/10">
                <td className="p-6 px-8 font-bold text-primary">EMD Financing Support</td>
                <td className="p-6 text-center opacity-30">—</td>
                <td className="p-6 text-center font-medium">Standard</td>
                <td className="p-6 text-center font-black">Priority</td>
              </tr>
              <tr className="bg-white border-b border-outline-variant/10">
                <td className="p-6 px-8 font-bold text-primary">Custom Search Filters</td>
                <td className="p-6 text-center font-medium opacity-60">Up to 3</td>
                <td className="p-6 text-center font-medium">Up to 20</td>
                <td className="p-6 text-center font-bold">Unlimited</td>
              </tr>
              <tr className="bg-surface-container-low/30 border-b border-outline-variant/10">
                <td className="p-6 px-8 font-bold text-primary">Team Seats</td>
                <td className="p-6 text-center font-medium opacity-60">1 User</td>
                <td className="p-6 text-center font-medium">5 Users</td>
                <td className="p-6 text-center font-bold">Unlimited</td>
              </tr>
              <tr className="bg-white">
                <td className="p-6 px-8 font-bold text-primary">Draft Review Feedback</td>
                <td className="p-6 text-center opacity-30">—</td>
                <td className="p-6 text-center font-medium">AI Review</td>
                <td className="p-6 text-center font-black text-primary">Human Expert Review</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-8 py-32">
        <h2 className="font-headline text-5xl font-black text-primary text-center mb-20 tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className={`border rounded-2xl overflow-hidden transition-all ${
                expandedFaq === item.id
                  ? 'border-secondary bg-surface-container-low/50 shadow-lg'
                  : 'border-outline-variant/30 bg-white hover:shadow-xl hover:shadow-primary/5'
              }`}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === item.id ? -1 : item.id)}
                className="w-full flex items-center justify-between p-8 text-left hover:bg-surface-container-low/30 transition-colors"
              >
                <span className="font-bold text-primary text-lg">{item.question}</span>
                <span className="material-symbols-outlined text-primary/40 transition-colors">
                  {expandedFaq === item.id ? 'remove' : 'add'}
                </span>
              </button>
              {expandedFaq === item.id && (
                <div className={`p-8 pt-0 text-on-surface-variant leading-relaxed font-light ${expandedFaq === item.id ? 'border-t border-secondary/10' : ''}`}>
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="bg-gradient-to-r from-primary to-primary/90 py-32 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto bg-white/80 backdrop-blur-md border border-white/20 p-16 rounded-[40px] shadow-2xl">
          <h2 className="font-headline text-5xl md:text-6xl font-black text-primary mb-8 tracking-tight">Ready to win your next tender?</h2>
          <p className="text-on-surface-variant text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">Join 12,000+ Indian MSMEs using TenderFish to navigate government procurement with digital precision.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="px-12 py-5 bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-on-tertiary-fixed font-black uppercase tracking-[0.2em] text-xs rounded-xl shadow-2xl shadow-tertiary-fixed/30 hover:scale-105 transition-all">Start Free Trial</button>
            <button className="px-12 py-5 border-2 border-primary text-primary font-black uppercase tracking-[0.2em] text-xs rounded-xl hover:bg-primary hover:text-white transition-all">Book a Demo</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PricingPage;
