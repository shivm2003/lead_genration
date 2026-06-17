import { Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import Calculator from './pages/Calculator';
import Application from './pages/Application';
import Success from './pages/Success';
import PersonalLoan from './pages/PersonalLoan';
import BusinessLoan from './pages/BusinessLoan';
import HomeLoan from './pages/HomeLoan';

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="container nav-content">
          <Link to="/">
            <img src="/Logo.png" alt="Loansolutions Logo" className="logo-img" />
          </Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/calculator">Calculator</Link>
            <Link to="/application" className="btn btn-primary nav-btn">Apply Now</Link>
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
