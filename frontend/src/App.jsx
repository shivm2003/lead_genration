import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Calculator from './pages/Calculator';
import Application from './pages/Application';
import Success from './pages/Success';
import PersonalLoan from './pages/PersonalLoan';
import BusinessLoan from './pages/BusinessLoan';
import HomeLoan from './pages/HomeLoan';
import LapLoan from './pages/LapLoan';
import VehicleLoan from './pages/VehicleLoan';
import GoldLoan from './pages/GoldLoan';

const WHATSAPP_URL = "https://wa.me/918112570656?text=Hello%20Loansolutions%2C%20I%20am%20interested%20in%20applying%20for%20a%20loan.";

const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.677.15-.2.301-.776.98-.952 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.497-.895-.8-1.5-1.788-1.676-2.088-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.3-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.927-2.235-.244-.588-.492-.508-.677-.518-.175-.009-.376-.01-.576-.01-.2 0-.527.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.228 3.111.15.2 2.122 3.24 5.14 4.544.718.31 1.279.495 1.716.634.722.229 1.378.196 1.9.119.58-.087 1.78-.727 2.03-1.43.25-.702.25-1.304.175-1.43-.075-.125-.276-.2-.577-.35m-5.467 6.438h-.008c-1.802 0-3.57-.485-5.114-1.402l-.367-.218-3.804.998 1.015-3.708-.239-.38a9.92 9.92 0 0 1-1.523-5.267c0-5.474 4.453-9.928 9.932-9.928 2.651.001 5.144 1.033 7.017 2.908a9.866 9.866 0 0 1 2.906 7.018c-.002 5.475-4.456 9.929-9.936 9.929m8.472-18.406C18.17 0.119 15.228 0 12.005 0 5.405 0 .041 5.364.041 11.966c0 2.11.55 4.17 1.597 5.986L0 24l6.196-1.625a11.93 11.93 0 0 0 5.809 1.498h.005c6.6 0 11.964-5.365 11.967-11.967 0-3.199-1.246-6.208-3.504-8.468Z" />
  </svg>
);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="container nav-content">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src="/Logo.png" alt="Loansolutions Logo" className="logo-img" />
          </Link>

          {/* Desktop nav links + mobile overlay */}
          {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/calculator" onClick={() => setMenuOpen(false)}>Calculator</Link>
            <Link to="/application" className="btn btn-primary nav-btn" onClick={() => setMenuOpen(false)}>Apply Now</Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp nav-btn"
              onClick={() => setMenuOpen(false)}
            >
              <WhatsAppIcon size={18} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile header actions (Quick WhatsApp + Hamburger) */}
          <div className="nav-mobile-actions">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-icon-only"
              aria-label="Chat with us on WhatsApp"
              title="Chat with us on WhatsApp"
            >
              <WhatsAppIcon size={20} />
            </a>

            <button
              className={`nav-hamburger ${menuOpen ? 'is-active' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>
      </nav>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/application" element={<Application />} />
          <Route path="/success" element={<Success />} />
          <Route path="/personal" element={<PersonalLoan />} />
          <Route path="/business" element={<BusinessLoan />} />
          <Route path="/home" element={<HomeLoan />} />
          <Route path="/lap" element={<LapLoan />} />
          <Route path="/vehicle" element={<VehicleLoan />} />
          <Route path="/gold" element={<GoldLoan />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container footer-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src="/Logo.png" alt="Loansolutions Logo" style={{ height: '60px', marginBottom: '16px', opacity: 0.9 }} />
          <p>&copy; 2026 Loansolutions, a subdomain of EverythingRental. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
