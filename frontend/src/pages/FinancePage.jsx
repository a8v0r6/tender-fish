import { useState } from 'react';

function calcEMI(P, annualRate, months) {
  const r = annualRate / 12 / 100;
  if (r === 0 || months === 0) return 0;
  return P * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
}

function formatINR(n) {
  return '₹ ' + n.toLocaleString('en-IN');
}

const FinancePage = () => {
  const [amount, setAmount] = useState(4500000);
  const [tenure, setTenure] = useState(24);
  const [rate, setRate] = useState(12);

  const emi = calcEMI(amount, rate, tenure);
  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - amount;

  return (
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
              <div className="flex justify-between">
                <label className="text-[10px] font-black uppercase text-outline">Loan Amount</label>
                <span className="text-2xl font-black text-primary">{formatINR(amount)}</span>
              </div>
              <input type="range" min={100000} max={10000000} step={50000} value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none accent-primary" />
              <div className="flex justify-between text-xs text-outline">
                <span>{formatINR(100000)}</span>
                <span>{formatINR(10000000)}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-[10px] font-black uppercase text-outline">Tenure</label>
                <span className="text-2xl font-black text-primary">{tenure} Months</span>
              </div>
              <input type="range" min={6} max={60} step={1} value={tenure}
                onChange={e => setTenure(Number(e.target.value))}
                className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none accent-primary" />
              <div className="flex justify-between text-xs text-outline">
                <span>6 Months</span>
                <span>60 Months</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-[10px] font-black uppercase text-outline">Interest Rate</label>
                <span className="text-2xl font-black text-primary">{rate}%</span>
              </div>
              <input type="range" min={8} max={18} step={0.5} value={rate}
                onChange={e => setRate(Number(e.target.value))}
                className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none accent-primary" />
              <div className="flex justify-between text-xs text-outline">
                <span>8%</span>
                <span>18%</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="bg-surface-container-low p-5 rounded-2xl">
              <p className="text-[10px] font-black uppercase text-outline mb-1">Total Interest</p>
              <p className="text-xl font-black text-primary">{formatINR(totalInterest)}</p>
            </div>
            <div className="bg-surface-container-low p-5 rounded-2xl">
              <p className="text-[10px] font-black uppercase text-outline mb-1">Total Payable</p>
              <p className="text-xl font-black text-primary">{formatINR(totalPayable)}</p>
            </div>
          </div>
        </div>
        <div className="bg-primary rounded-3xl p-10 flex flex-col justify-center items-center text-center text-white shadow-2xl">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-white/50">Estimated Monthly EMI</p>
          <p className="text-5xl font-black mb-10 tracking-tighter">{formatINR(Math.round(emi))}</p>
          <button className="w-full bg-white text-primary py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:shadow-xl transition-all">Check Eligibility</button>
        </div>
      </div>
    </main>
  );
};

export default FinancePage;
