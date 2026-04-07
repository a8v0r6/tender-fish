import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import TopNavBar from './components/TopNavBar';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import DiscoveryPage from './pages/DiscoveryPage';
import ApplicationPage from './pages/ApplicationPage';
import BidAssistancePage from './pages/BidAssistancePage';
import RawMaterialsPage from './pages/RawMaterialsPage';
import FinancePage from './pages/FinancePage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const AppContent = () => {
  const location = useLocation();
  const showSidebar = !['/', '/login', '/register'].includes(location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <TopNavBar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      {/* Mobile Menu Overlay - Available on all pages */}
      <div className={`fixed inset-0 z-40 lg:hidden bg-black/50 transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className={`w-64 h-full bg-primary transform transition-transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar />
        </div>
      </div>

      {/* Desktop Sidebar - Only on app pages */}
      {showSidebar && <div className="hidden lg:block"><Sidebar /></div>}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/discovery" element={<DiscoveryPage />} />
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/bids" element={<BidAssistancePage />} />
        <Route path="/materials" element={<RawMaterialsPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
