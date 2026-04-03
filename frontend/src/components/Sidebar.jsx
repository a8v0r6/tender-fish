import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 nav-gradient border-r border-white/10 flex-col z-40 pt-24 shadow-2xl">
      <div className="px-8 mb-10">
        <h2 className="font-['Noto_Serif'] text-xl font-black text-white tracking-tighter">TenderFish</h2>
        <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-black mt-1">Strategic Procurement</p>
      </div>
      <nav className="flex-grow">
        {[
          { to: '/discovery', icon: 'search', label: 'Tender Discovery' },
          { to: '/application', icon: 'edit_note', label: 'Application Helper' },
          { to: '/bids', icon: 'gavel', label: 'Bid Assistance' },
          { to: '/materials', icon: 'inventory_2', label: 'Raw Materials' },
          { to: '/finance', icon: 'payments', label: 'Finance & Lending' }
        ].map((item) => (
          <Link key={item.to} to={item.to} className={`flex items-center gap-4 px-8 py-4 transition-all text-[11px] font-black uppercase tracking-widest ${isActive(item.to) ? 'bg-white/10 text-white border-l-4 border-secondary' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>
            <span className="material-symbols-outlined text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-8">
        <Link to="/application" className="block w-full bg-secondary text-white py-4 rounded-lg font-black text-center text-[10px] uppercase tracking-widest shadow-lg shadow-secondary/20 hover:brightness-110">
          New Application
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
