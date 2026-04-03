import { Link, useLocation } from 'react-router-dom';

const TopNavBar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-emerald-900/5 flex justify-between items-center px-8 py-4">
      <Link to="/" className="font-['Noto_Serif'] text-2xl font-black text-primary tracking-tight">TenderFish</Link>
      <div className="hidden md:flex gap-10 items-center">
        {isHome ? (
          <>
            <a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-semibold tracking-tight cursor-pointer">How it works</a>
            <Link to="/pricing" className="text-sm text-on-surface-variant hover:text-primary transition-colors font-semibold tracking-tight">Pricing</Link>
            <a className="text-sm text-on-surface-variant hover:text-primary transition-colors font-semibold tracking-tight cursor-pointer">Login</a>
            <Link to="/discovery" className="bg-primary text-white px-6 py-2.5 rounded text-sm font-bold shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-[0.98]">
              Start Free Trial
            </Link>
          </>
        ) : (
          <>
            <Link to="/discovery" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors tracking-tight">Tender Discovery</Link>
            <Link to="/application" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors tracking-tight">Application Helper</Link>
            <Link to="/materials" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors tracking-tight">Raw Materials</Link>
            <Link to="/finance" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors tracking-tight">Finance & Lending</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default TopNavBar;
