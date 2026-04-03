import { TENDERS } from '../data/tenders';
import TenderCard from '../components/TenderCard';

const BidAssistancePage = () => (
  <main className="lg:ml-64 pt-24 p-8 bg-surface-bright min-h-screen">
    <header className="mb-10">
      <h1 className="text-4xl font-black text-primary mb-3">Bid Assistance <span className="text-secondary italic">Dashboard</span></h1>
      <p className="text-on-surface-variant">Monitor live auctions and optimize your bid strategy with AI-driven insights.</p>
    </header>

    <div className="flex items-center gap-3 mb-8">
      <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
      <h2 className="text-sm font-black uppercase tracking-widest text-red-600">Live Now: Active Auctions</h2>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {TENDERS.slice(0, 2).map((tender) => (
        <TenderCard key={tender.id} tender={tender} showActions={false} />
      ))}
    </div>

    <section className="bg-white rounded-3xl border border-primary/5 shadow-2xl p-10">
      <h3 className="text-2xl font-black text-primary mb-8">Bid Preparation (BOQ)</h3>
      <div className="overflow-x-auto rounded-2xl border border-outline-variant/10">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low text-[10px] font-black uppercase tracking-widest text-outline">
            <tr>
              <th className="p-4">Item</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Material</th>
              <th className="p-4">Labor</th>
              <th className="p-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            <tr className="border-b border-outline-variant/10">
              <td className="p-4">Earthwork Foundation</td>
              <td className="p-4">450</td>
              <td className="p-4">₹12,000</td>
              <td className="p-4">₹45,000</td>
              <td className="p-4 text-right font-black">₹65,500</td>
            </tr>
            <tr className="border-b border-outline-variant/10">
              <td className="p-4">Reinforced Concrete M25</td>
              <td className="p-4">120</td>
              <td className="p-4">₹8,40,000</td>
              <td className="p-4">₹1,20,000</td>
              <td className="p-4 text-right font-black">₹10,08,000</td>
            </tr>
          </tbody>
          <tfoot className="bg-primary text-white">
            <tr className="font-black">
              <td className="p-4" colSpan="4">ESTIMATED TOTAL</td>
              <td className="p-4 text-right text-lg">₹ 10,73,500</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  </main>
);

export default BidAssistancePage;
