import { useState } from 'react';
import { useToast } from '../components/Toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://100.116.31.114:8000';

const STEPS = ['Company Profile', 'Business Documents', 'Financial Details', 'Tender Selection', 'Review & Submit'];

const ApplicationPage = () => {
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    company_name: '',
    business_type: 'Manufacturing (MSME)',
    turnover: '',
    contact_email: '',
    contact_phone: '',
    gstin: '',
    tender_id: '',
  });

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const canProceed = () => {
    if (step === 0) return form.company_name && form.business_type && form.contact_email;
    if (step === 3) return form.tender_id;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnover: parseFloat(form.turnover) || 0, status: 'submitted' })
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
      toast('Application submitted successfully!', 'success');
    } catch (err) {
      toast(`Error: ${err.message}`, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="lg:ml-64 pt-24 p-8 hero-gradient min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-3xl p-16 shadow-2xl text-center max-w-lg">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-3xl font-black text-primary mb-4">Application Submitted</h2>
          <p className="text-on-surface-variant mb-8">Your tender application for <strong>{form.tender_id}</strong> has been received. Our team will review and guide you through the next steps.</p>
          <button onClick={() => { setStep(0); setSubmitted(false); setForm({ company_name: '', business_type: 'Manufacturing (MSME)', turnover: '', contact_email: '', contact_phone: '', gstin: '', tender_id: '' }); }} className="bg-primary text-white px-10 py-4 rounded-xl font-bold">Submit Another</button>
        </div>
      </main>
    );
  }

  return (
    <main className="lg:ml-64 pt-24 p-8 hero-gradient min-h-screen">
      <header className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-black text-primary mb-3">Application <span className="text-secondary italic">Helper</span></h1>
        <p className="text-lg text-on-surface-variant font-light">Craft compliant, winning technical bids based on your historical data and MSME profile.</p>
      </header>

      <div className="flex gap-2 mb-8 max-w-5xl">
        {STEPS.map((s, i) => (
          <div key={i} className={`flex-1 h-2 rounded-full ${i <= step ? 'bg-primary' : 'bg-outline-variant/30'}`} />
        ))}
      </div>

      <div className="bg-white rounded-3xl p-10 shadow-2xl border border-primary/5 max-w-5xl">
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-outline-variant/20">
          <h2 className="text-2xl font-black text-primary">{STEPS[step]}</h2>
          <span className="text-outline uppercase text-[10px] font-black tracking-widest">Step {step + 1} of {STEPS.length}</span>
        </div>

        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-outline tracking-widest">Company Name *</label>
              <input className="w-full bg-surface p-4 rounded-xl border border-outline-variant/30 focus:ring-primary focus:border-primary" placeholder="e.g. Bharat Infrastructure Ltd." value={form.company_name} onChange={update('company_name')} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-outline tracking-widest">Business Type *</label>
              <select className="w-full bg-surface p-4 rounded-xl border border-outline-variant/30" value={form.business_type} onChange={update('business_type')}>
                <option>Manufacturing (MSME)</option>
                <option>Services</option>
                <option>Trading</option>
                <option>Construction</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-outline tracking-widest">Turnover (FY 2023-24)</label>
              <input className="w-full bg-surface p-4 rounded-xl border border-outline-variant/30" placeholder="₹ 5,00,00,000" value={form.turnover} onChange={update('turnover')} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-outline tracking-widest">Contact Email *</label>
              <input type="email" className="w-full bg-surface p-4 rounded-xl border border-outline-variant/30" placeholder="contact@company.com" value={form.contact_email} onChange={update('contact_email')} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-outline tracking-widest">Contact Phone</label>
              <input className="w-full bg-surface p-4 rounded-xl border border-outline-variant/30" placeholder="+91 98765 43210" value={form.contact_phone} onChange={update('contact_phone')} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-outline tracking-widest">GSTIN</label>
              <input className="w-full bg-surface p-4 rounded-xl border border-outline-variant/30" placeholder="27AAABC1234A1Z5" value={form.gstin} onChange={update('gstin')} />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8 mb-10">
            <p className="text-sm text-outline">Upload the following documents to strengthen your bid compliance.</p>
            {['MSME Registration Certificate', 'GST Registration', 'PAN Card', 'Business Address Proof', 'Past Performance Certificates'].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                <div>
                  <p className="font-bold text-sm">{doc}</p>
                  <p className="text-[10px] text-outline uppercase">PDF or image, max 5MB</p>
                </div>
                <label className="cursor-pointer bg-primary text-white px-6 py-2 rounded-lg text-xs font-bold uppercase hover:brightness-110">
                  Upload
                  <input type="file" className="hidden" accept=".pdf,.jpg,.png" />
                </label>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-outline tracking-widest">Audited Balance Sheet (₹)</label>
              <input className="w-full bg-surface p-4 rounded-xl border border-outline-variant/30" placeholder="e.g. 25000000" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-outline tracking-widest">Net Profit (Last FY)</label>
              <input className="w-full bg-surface p-4 rounded-xl border border-outline-variant/30" placeholder="e.g. 3500000" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-outline tracking-widest">Working Capital Available</label>
              <input className="w-full bg-surface p-4 rounded-xl border border-outline-variant/30" placeholder="e.g. 8000000" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-outline tracking-widest">Credit Limit from Bank</label>
              <input className="w-full bg-surface p-4 rounded-xl border border-outline-variant/30" placeholder="e.g. 15000000" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase text-outline tracking-widest">Bank Details for EMD</label>
              <input className="w-full bg-surface p-4 rounded-xl border border-outline-variant/30" placeholder="Bank Name, Account Number, IFSC Code" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 mb-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-outline tracking-widest">Tender ID / GEM ID *</label>
              <input className="w-full bg-surface p-4 rounded-xl border border-outline-variant/30" placeholder="e.g. RJ-901-PWD" value={form.tender_id} onChange={update('tender_id')} />
            </div>
            <div className="bg-secondary/5 p-6 rounded-2xl">
              <h4 className="font-bold text-sm mb-3">Documents Required for this Tender</h4>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-secondary rounded-full" /> Technical Bid (as per BOQ)</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-secondary rounded-full" /> Financial Bid with price schedule</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-secondary rounded-full" /> EMD proof (2-5% of tender value)</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-secondary rounded-full" /> Self-attested copies of all certificates</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-secondary rounded-full" /> Undertaking on non-judicial stamp paper</li>
              </ul>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-outline tracking-widest">Additional Notes</label>
              <textarea className="w-full bg-surface p-4 rounded-xl border border-outline-variant/30 h-24" placeholder="Any special conditions or clarifications..." />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8 mb-10">
            <div className="bg-surface-container-low rounded-2xl p-8">
              <h3 className="font-black text-primary text-lg mb-6">Application Summary</h3>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div><span className="text-outline text-[10px] uppercase font-black">Company</span><p className="font-bold">{form.company_name || '—'}</p></div>
                <div><span className="text-outline text-[10px] uppercase font-black">Type</span><p className="font-bold">{form.business_type}</p></div>
                <div><span className="text-outline text-[10px] uppercase font-black">Turnover</span><p className="font-bold">{form.turnover || '—'}</p></div>
                <div><span className="text-outline text-[10px] uppercase font-black">Tender ID</span><p className="font-bold">{form.tender_id || '—'}</p></div>
                <div><span className="text-outline text-[10px] uppercase font-black">Email</span><p className="font-bold">{form.contact_email}</p></div>
                <div><span className="text-outline text-[10px] uppercase font-black">GSTIN</span><p className="font-bold">{form.gstin || '—'}</p></div>
              </div>
            </div>
            <div className="bg-primary/5 p-6 rounded-2xl">
              <p className="text-sm text-on-surface-variant">By submitting, you confirm that all information provided is accurate and you agree to TenderFish's terms of service.</p>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-sm border border-outline-variant/30 disabled:opacity-30">Back</button>
          {step < STEPS.length - 1 ? (
            <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} className="bg-primary text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl hover:brightness-110 disabled:opacity-50">Continue</button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting} className="bg-secondary text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl hover:brightness-110 disabled:opacity-50">
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default ApplicationPage;
