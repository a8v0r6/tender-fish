import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import TopNavBar from './components/TopNavBar';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import DiscoveryPage from './pages/DiscoveryPage';
import ApplicationPage from './pages/ApplicationPage';
import BidAssistancePage from './pages/BidAssistancePage';
import RawMaterialsPage from './pages/RawMaterialsPage';
import FinancePage from './pages/FinancePage';
import PricingPage from './pages/PricingPage';

const AppContent = () => {
  const location = useLocation();
  const showSidebar = location.pathname !== '/';

  return (
    <>
      <TopNavBar />
      {showSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
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
