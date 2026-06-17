import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Landing() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleQuickLead = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call or directly submit a quick lead
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Quick Lead',
          email: 'pending@user.com',
          phone: phone,
          loanAmount: amount,
          purpose: 'General'
        })
      });

      if (response.ok) {
        navigate('/success');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      {/* Top Promotional Banner */}
      <div style={{ width: '100%', overflow: 'hidden', backgroundColor: '#EEF2FF' }}>
        <img src="/banner.png" alt="Promotional Banner" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
      </div>

      {/* 1. Hero Section with Split Layout & Mini Form */}
      <section className="hero" style={{ padding: '60px 0' }}>
        <div className="container hero-split">
          <div className="hero-text">
            <h1 style={{ color: '#1E3A8A' }}>Loans That Make Sense.<br />Approvals in Minutes.</h1>
            <p style={{ color: '#4B5563', fontSize: '18px', maxWidth: '500px' }}>
              Compare the best personal, home, and business loans from 50+ trusted lending partners. Get instant eligibility checks and zero hidden fees.
            </p>
            <ul style={{ listStyleType: 'none', padding: 0, marginTop: '24px', textAlign: 'left', display: 'inline-block' }}>
              <li style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>✅ No Impact on CIBIL Score</li>
              <li style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>✅ 100% Paperless Process</li>
              <li style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>✅ Lowest Interest Rates Guaranteed</li>
            </ul>
          </div>

          <div className="hero-form-container">
            <h3>Check Eligibility Instantly</h3>
            <form onSubmit={handleQuickLead}>
              <div className="form-group">
                <label htmlFor="quick-phone">Mobile Number</label>
                <input 
                  type="tel" 
                  id="quick-phone" 
                  placeholder="+91 98765 43210" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="quick-amount">Desired Loan Amount (₹)</label>
                <input 
                  type="number" 
                  id="quick-amount" 
                  placeholder="5,00,000" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={loading} style={{ backgroundColor: '#F59E0B', color: '#fff' }}>
                {loading ? 'Processing...' : 'Unlock Best Offers'}
              </button>
            </form>
            <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '16px', textAlign: 'center' }}>
              By clicking, you agree to our Terms & Conditions and Privacy Policy.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Partners Banner */}
      <div className="partners-banner">
        <div className="container">
          <div className="partners-title">Our Top Lending Partners</div>
          <div className="partners-grid">
            <span className="partner-logo">HDFC BANK</span>
            <span className="partner-logo">ICICI BANK</span>
            <span className="partner-logo">AXIS BANK</span>
            <span className="partner-logo">SBI</span>
            <span className="partner-logo">KOTAK</span>
            <span className="partner-logo">BAJAJ FINSERV</span>
          </div>
        </div>
      </div>

      {/* 3. Trust Badges Banner */}
      <div className="trust-badges-banner">
        <div className="container badges-grid">
          <div className="badge-item">
            <div className="badge-icon">⚡</div>
            <span>Instant Approval</span>
          </div>
          <div className="badge-item">
            <div className="badge-icon">📱</div>
            <span>100% Digital</span>
          </div>
          <div className="badge-item">
            <div className="badge-icon">🛡️</div>
            <span>Bank-Grade Security</span>
          </div>
          <div className="badge-item">
            <div className="badge-icon">💰</div>
            <span>Lowest EMIs</span>
          </div>
        </div>
      </div>

      {/* 4. Statistics / Scale Banner */}
      <div className="stats-banner">
        <div className="container stats-grid">
          <div className="stat-item">
            <h3>₹5,000+ Cr</h3>
            <p>Loans Disbursed</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Banking Partners</p>
          </div>
          <div className="stat-item">
            <h3>1.2 Million</h3>
            <p>Happy Customers</p>
          </div>
        </div>
      </div>

      {/* Original Sections Retained for SEO/Depth */}
      <section className="section" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <div className="section-header">
            <h2>Select Your Loan Type</h2>
            <p>We offer tailored financial products to meet your unique needs.</p>
          </div>
          
          <div className="grid-3">
            <Link to="/personal" className="feature-card">
              <div className="icon-wrapper">👤</div>
              <h3>Personal Loan</h3>
              <p>Quick funds for medical emergencies, weddings, or personal milestones. Get approved in minutes.</p>
            </Link>
            <Link to="/home" className="feature-card">
              <div className="icon-wrapper">🏠</div>
              <h3>Home Loan</h3>
              <p>Turn your dream home into reality with our low-interest, long-term housing finance solutions.</p>
            </Link>
            <Link to="/business" className="feature-card">
              <div className="icon-wrapper">💼</div>
              <h3>Business Loan</h3>
              <p>Scale your enterprise with our flexible working capital and term loans tailored for SMEs.</p>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Landing;
