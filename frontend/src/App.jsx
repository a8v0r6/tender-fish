import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
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
import BidAutopsyPage from './pages/BidAutopsyPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

const AppContent = () => {
  const location = useLocation();
  const showSidebar = !['/', '/login', '/register'].includes(location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const protect = (element) => <ProtectedRoute>{element}</ProtectedRoute>;

  return (
    <>
      <TopNavBar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <div className={`fixed inset-0 z-40 lg:hidden bg-black/50 transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className={`w-64 h-full bg-primary transform transition-transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar onLinkClick={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>

      {showSidebar && <div className="hidden lg:block"><Sidebar /></div>}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/discovery" element={protect(<DiscoveryPage />)} />
        <Route path="/application" element={protect(<ApplicationPage />)} />
        <Route path="/bids" element={protect(<BidAssistancePage />)} />
        <Route path="/materials" element={protect(<RawMaterialsPage />)} />
        <Route path="/finance" element={protect(<FinancePage />)} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/autopsy" element={protect(<BidAutopsyPage />)} />
      </Routes>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
