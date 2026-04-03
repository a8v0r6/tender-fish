import { Link } from 'react-router-dom';

const TenderCard = ({ tender, showActions = true }) => (
  <article className="bg-white rounded-2xl border border-outline-variant/20 p-6 hover:shadow-xl transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div>
        <span className="bg-primary/5 text-primary text-[10px] font-black px-3 py-1 rounded-sm border border-primary/10 uppercase tracking-widest">{tender.category}</span>
        <h3 className="text-2xl font-bold text-primary mt-2 group-hover:text-secondary transition-colors">{tender.title}</h3>
        <p className="text-xs text-outline font-medium mt-1">{tender.dept}</p>
      </div>
      <div className="bg-secondary/5 border border-secondary/20 p-3 rounded-xl text-center">
        <p className="text-[10px] font-black text-secondary uppercase tracking-widest">Match</p>
        <p className="text-2xl font-black text-secondary">{tender.match}</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-6 py-4 border-y border-outline-variant/10 mb-6">
      <div>
        <p className="text-[9px] font-black text-outline uppercase tracking-widest">Value</p>
        <p className="text-lg font-bold text-primary">₹ {tender.value}</p>
      </div>
      <div>
        <p className="text-[9px] font-black text-outline uppercase tracking-widest">Deadline</p>
        <p className="text-sm font-bold text-primary">{tender.deadline}</p>
      </div>
      <div>
        <p className="text-[9px] font-black text-outline uppercase tracking-widest">Tender ID</p>
        <p className="text-sm font-bold text-primary">{tender.id}</p>
      </div>
    </div>

    {showActions && (
      <div className="flex justify-end gap-4">
        <button className="px-6 py-3 border border-primary/20 text-primary font-black uppercase text-[10px] rounded-lg hover:bg-surface transition-all">Details</button>
        <Link to="/application" className="px-6 py-3 bg-primary text-white font-black uppercase text-[10px] rounded-lg shadow-lg hover:brightness-110">Start Application</Link>
      </div>
    )}
  </article>
);

export default TenderCard;
