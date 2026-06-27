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

          {/* Hamburger button — mobile only */}
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

          {/* Desktop nav links + mobile overlay */}
          {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/calculator" onClick={() => setMenuOpen(false)}>Calculator</Link>
            <Link to="/application" className="btn btn-primary nav-btn" onClick={() => setMenuOpen(false)}>Apply Now</Link>
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
