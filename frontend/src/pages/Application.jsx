import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LOAN_TYPES = [
  { value: 'Home Loan', icon: '🏠', desc: 'Buy your dream home' },
  { value: 'Loan Against Property', icon: '🏢', desc: 'Unlock property value' },
  { value: 'Personal Loan', icon: '👤', desc: 'For personal needs' },
  { value: 'Business Loan', icon: '💼', desc: 'Grow your business' },
  { value: 'Vehicle Loan', icon: '🚗', desc: 'Own your vehicle' },
  { value: 'Education Loan', icon: '🎓', desc: 'Invest in education' },
  { value: 'Gold Loan', icon: '✨', desc: 'Pledge gold, get cash' },
];

function Application() {
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    loanAmount: '',
    purpose: '',
    employment: '',
    city: '',
    pincode: '',
  });
  const [showLoanPopup, setShowLoanPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mobile detection & scroll-gated form
  const [isMobile, setIsMobile] = useState(false);
  const [formRevealed, setFormRevealed] = useState(false);
  const [showMobileSheet, setShowMobileSheet] = useState(false);
  const [sheetClosing, setSheetClosing] = useState(false);
  const [sheetDismissed, setSheetDismissed] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setFormRevealed(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll-gated form reveal on mobile
  useEffect(() => {
    if (!isMobile) { setFormRevealed(true); return; }
    const handleScroll = () => {
      if (window.scrollY > 250) setFormRevealed(true);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  useEffect(() => {
    let prefilledPurpose = '';
    if (location.state) {
      prefilledPurpose = location.state.prefilledPurpose;
      setFormData(prev => ({
        ...prev,
        loanAmount: location.state.prefilledAmount || prev.loanAmount,
        purpose: location.state.prefilledPurpose || prev.purpose
      }));
    }
    
    // Show popup immediately if no purpose is provided
    if (!prefilledPurpose && !formData.purpose) {
      // On mobile, show bottom sheet; on desktop, show center popup
      if (window.innerWidth <= 768) {
        setTimeout(() => setShowMobileSheet(true), 500);
      } else {
        setShowLoanPopup(true);
      }
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectLoanType = (type) => {
    setFormData({ ...formData, purpose: type });
    setShowLoanPopup(false);
    dismissMobileSheet();
  };

  const dismissMobileSheet = () => {
    setSheetClosing(true);
    setTimeout(() => {
      setShowMobileSheet(false);
      setSheetClosing(false);
      setSheetDismissed(true);
    }, 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/success');
      } else {
        throw new Error(data.error || 'Failed to submit application.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-page fade-in">
      {/* Hero Banner */}
      <section className="app-hero">
        <div className="container">
          <h1 className="app-hero-title">
            📝 Apply for a Loan
          </h1>
          <p className="app-hero-sub">
            Complete a quick application and get matched with the best offers from 50+ lending partners.
          </p>
          {/* Mobile: quick trust indicators */}
          <div className="app-hero-trust">
            <span>⚡ Instant Approval</span>
            <span>🔒 Secure</span>
            <span>📱 100% Digital</span>
          </div>
        </div>
      </section>

      <section className="app-form-section">
        <div className="container app-form-container">

          {/* Selected Loan Badge */}
          <div className="app-loan-badge-wrap">
            <button
              className="app-loan-badge"
              onClick={() => {
                if (isMobile) {
                  setShowMobileSheet(true);
                  setSheetDismissed(false);
                } else {
                  setShowLoanPopup(true);
                }
              }}
            >
              {formData.purpose ? (
                <>
                  <span className="app-loan-badge-icon">
                    {LOAN_TYPES.find(l => l.value === formData.purpose)?.icon}
                  </span>
                  <span>{formData.purpose}</span>
                  <span className="app-loan-badge-change">✏️ Change</span>
                </>
              ) : (
                <>
                  <span className="app-loan-badge-icon">📋</span>
                  <span>Select Loan Type</span>
                  <span className="app-loan-badge-change">Tap here</span>
                </>
              )}
            </button>
          </div>

          {/* ======= FORM CARD — scroll-gated on mobile ======= */}
          <div
            ref={formRef}
            className={`app-form-card ${isMobile ? (formRevealed ? 'app-form--revealed' : 'app-form--hidden') : ''}`}
          >
            <div className="app-form-header">
              <h2>Your Details</h2>
              <p>We just need a few details to match you with the best lenders.</p>
            </div>

            <form onSubmit={handleSubmit} className="app-form">
              {/* Row 1: Name + Phone */}
              <div className="app-form-row">
                <div className="app-form-group">
                  <label htmlFor="fullName">
                    <span className="app-form-label-icon">👤</span>
                    Full Name <span className="app-form-req">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Rahul Sharma"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="app-form-group">
                  <label htmlFor="phone">
                    <span className="app-form-label-icon">📱</span>
                    Mobile Number <span className="app-form-req">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Row 2: Email + City */}
              <div className="app-form-row">
                <div className="app-form-group">
                  <label htmlFor="email">
                    <span className="app-form-label-icon">📧</span>
                    Email <span className="app-form-optional">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="rahul@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="app-form-group">
                  <label htmlFor="city">
                    <span className="app-form-label-icon">📍</span>
                    Address
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Mumbai"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 3: Pincode + Employment */}
              <div className="app-form-row">
                <div className="app-form-group">
                  <label htmlFor="pincode">
                    <span className="app-form-label-icon">📮</span>
                    Pincode <span className="app-form-req">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    id="pincode"
                    placeholder="400001"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    maxLength="6"
                  />
                </div>
                <div className="app-form-group">
                  <label htmlFor="employment">
                    <span className="app-form-label-icon">🏢</span>
                    Employment Type
                  </label>
                  <select
                    name="employment"
                    id="employment"
                    value={formData.employment}
                    onChange={handleChange}
                  >
                    <option value="">Select...</option>
                    <option value="Salaried">Salaried</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Business Owner">Business Owner</option>
                    <option value="Professional">Professional (Doctor/CA/etc.)</option>
                    <option value="Student">Student</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Loan Amount */}
              <div className="app-form-group app-form-group--full">
                <label htmlFor="loanAmount">
                  <span className="app-form-label-icon">💰</span>
                  Desired Loan Amount (₹) <span className="app-form-req">*</span>
                </label>
                <input
                  type="number"
                  name="loanAmount"
                  id="loanAmount"
                  placeholder="5,00,000"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  required
                  min="1000"
                />
              </div>

              {error && (
                <div className="app-form-error">
                  ⚠️ {error}
                </div>
              )}

              <button type="submit" className="app-form-submit" disabled={loading}>
                {loading ? '⏳ Submitting...' : '✅ Submit Application'}
              </button>
            </form>

            <p className="app-form-secure">
              🔒 Your information is encrypted and secure. We never share your data without consent.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges Banner */}
      <div className="trust-badges-banner">
        <div className="container badges-grid">
          <div className="badge-item">
            <div className="badge-icon-wrapper"><span className="badge-icon">⚡</span></div>
            <h4>Instant Approval</h4>
            <p>Get funds credited in minutes</p>
          </div>
          <div className="badge-item">
            <div className="badge-icon-wrapper"><span className="badge-icon">📱</span></div>
            <h4>100% Digital</h4>
            <p>Zero paperwork required</p>
          </div>
          <div className="badge-item">
            <div className="badge-icon-wrapper"><span className="badge-icon">🛡️</span></div>
            <h4>Bank-Grade Security</h4>
            <p>Your data is fully encrypted</p>
          </div>
          <div className="badge-item">
            <div className="badge-icon-wrapper"><span className="badge-icon">💰</span></div>
            <h4>Lowest EMIs</h4>
            <p>Competitive interest rates</p>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP LOAN TYPE POPUP ===== */}
      {showLoanPopup && (
        <div className="app-popup-overlay" onClick={() => setShowLoanPopup(false)}>
          <div className="app-popup fade-in" onClick={(e) => e.stopPropagation()}>
            <button
              className="app-popup-close"
              onClick={() => setShowLoanPopup(false)}
            >
              ✕
            </button>
            <div className="app-popup-head">
              <h2>Select Your Loan Type</h2>
              <p>Choose the type of loan you are applying for to continue.</p>
            </div>
            
            <div className="loan-type-grid">
              {LOAN_TYPES.map(loan => (
                <button
                  key={loan.value}
                  type="button"
                  className={`app-loan-option ${formData.purpose === loan.value ? 'is-selected' : ''}`}
                  onClick={() => selectLoanType(loan.value)}
                >
                  <div className="app-loan-option-icon">{loan.icon}</div>
                  <div className="app-loan-option-label">{loan.value}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== MOBILE TOP SHEET FOR LOAN TYPES ===== */}
      {showMobileSheet && (
        <>
          <div
            className={`app-sheet-backdrop ${!sheetClosing ? 'is-visible' : ''}`}
            onClick={dismissMobileSheet}
          />
          <div className={`app-top-sheet ${sheetClosing ? 'is-closing' : 'is-open'}`}>
            <div className="app-sheet-header">
              <h3 className="app-sheet-title">Select Your Loan Type</h3>
              <button className="app-sheet-close" onClick={dismissMobileSheet}>✕</button>
            </div>
            <p className="app-sheet-subtitle">Choose the loan type to get started.</p>
            <div className="app-sheet-grid">
              {LOAN_TYPES.map(loan => (
                <button
                  key={loan.value}
                  type="button"
                  className={`app-sheet-option ${formData.purpose === loan.value ? 'is-selected' : ''}`}
                  onClick={() => selectLoanType(loan.value)}
                >
                  <span className="app-sheet-option-icon">{loan.icon}</span>
                  <span className="app-sheet-option-title">{loan.value}</span>
                  <span className="app-sheet-option-desc">{loan.desc}</span>
                </button>
              ))}
            </div>
            <div className="app-sheet-handle" />
          </div>
        </>
      )}

      {/* ===== MOBILE FLOATING CTA ===== */}
      {isMobile && sheetDismissed && !showMobileSheet && (
        <button
          className="app-mobile-fab"
          onClick={() => {
            if (formRef.current) {
              formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }}
        >
          📝 Fill Application
        </button>
      )}
    </div>
  );
}

export default Application;
