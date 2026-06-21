import { useState, useEffect } from 'react';
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
      setShowLoanPopup(true);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectLoanType = (type) => {
    setFormData({ ...formData, purpose: type });
    setShowLoanPopup(false);
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
    <div className="fade-in">
      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #1E3A5F 0%, #4F46E5 100%)',
        color: '#fff',
        padding: '50px 0 35px',
        textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '12px' }}>
            📝 Apply for a Loan
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.85, maxWidth: '550px', margin: '0 auto' }}>
            Complete a quick application and get matched with the best offers from 50+ lending partners.
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#F0F4FF', minHeight: '500px' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>

          {/* ======= FORM VIEW ======= */}
          <div className="fade-in">
            {/* Selected Loan Badge */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                color: '#fff',
                padding: '10px 24px',
                borderRadius: '99px',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
              }} onClick={() => setShowLoanPopup(true)}>
                {formData.purpose ? (
                  <>
                    {LOAN_TYPES.find(l => l.value === formData.purpose)?.icon} {formData.purpose}
                    <span style={{ opacity: 0.7, fontSize: '13px' }}>✏️ Change</span>
                  </>
                ) : (
                  <>
                    📋 Select Loan Type
                    <span style={{ opacity: 0.7, fontSize: '13px' }}>✏️ Click here</span>
                  </>
                )}
              </span>
            </div>

              <div style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                border: '1px solid #E5E7EB',
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1E3A5F', marginBottom: '6px' }}>
                  Your Details
                </h2>
                <p style={{ color: '#6B7280', marginBottom: '28px', fontSize: '14px' }}>
                  We just need a few details to match you with the best lenders.
                </p>

                <form onSubmit={handleSubmit}>
                  {/* Row 1: Name + Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label htmlFor="fullName" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '18px' }}>👤</span> Full Name <span style={{ color: '#EF4444' }}>*</span>
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
                    <div className="form-group">
                      <label htmlFor="phone" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '18px' }}>📱</span> Mobile Number <span style={{ color: '#EF4444' }}>*</span>
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label htmlFor="email" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '18px' }}>📧</span> Email <span style={{ color: '#9CA3AF', fontSize: '12px' }}>(Optional)</span>
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
                    <div className="form-group">
                      <label htmlFor="city" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '18px' }}>📍</span> Address
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label htmlFor="pincode" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '18px' }}>📮</span> Pincode <span style={{ color: '#EF4444' }}>*</span>
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
                    <div className="form-group">
                      <label htmlFor="employment" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '18px' }}>🏢</span> Employment Type
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

                  {/* Row 4: Loan Amount */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginTop: '20px' }}>
                    <div className="form-group">
                      <label htmlFor="loanAmount" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '18px' }}>💰</span> Desired Loan Amount (₹) <span style={{ color: '#EF4444' }}>*</span>
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
                  </div>

                  {error && (
                    <div style={{
                      background: '#FEF2F2',
                      color: '#EF4444',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      marginBottom: '16px',
                      border: '1px solid #FECACA',
                    }}>
                      ⚠️ {error}
                    </div>
                  )}

                  <button type="submit" className="btn btn-block" disabled={loading} style={{
                    fontSize: '18px',
                    padding: '16px',
                    borderRadius: '12px',
                    background: loading
                      ? '#9CA3AF'
                      : 'linear-gradient(135deg, #10B981, #059669)',
                    color: '#fff',
                    fontWeight: 700,
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginTop: '8px',
                  }}>
                    {loading ? '⏳ Submitting...' : '✅ Submit Application'}
                  </button>
                </form>

                <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '16px', textAlign: 'center' }}>
                  🔒 Your information is encrypted and secure. We never share your data without consent.
                </p>
              </div>
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

      {/* LOAN TYPE POPUP OVERLAY */}
      {showLoanPopup && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backdropFilter: 'blur(4px)'
        }}>
          <div className="fade-in" style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '700px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <button 
              onClick={() => setShowLoanPopup(false)}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: '#F3F4F6', border: 'none', borderRadius: '50%',
                width: '36px', height: '36px', fontSize: '18px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#4B5563'
              }}
            >
              ✕
            </button>
            <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '10px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#1E3A5F' }}>
                Select Your Loan Type
              </h2>
              <p style={{ color: '#6B7280', marginTop: '8px', fontSize: '15px' }}>
                Choose the type of loan you are applying for to continue.
              </p>
            </div>
            
            <div className="loan-type-grid">
              {LOAN_TYPES.map(loan => (
                <button
                  key={loan.value}
                  type="button"
                  onClick={() => selectLoanType(loan.value)}
                  style={{
                    background: formData.purpose === loan.value ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' : '#F9FAFB',
                    color: formData.purpose === loan.value ? '#fff' : '#1E3A5F',
                    border: formData.purpose === loan.value ? '2px solid #4F46E5' : '2px solid #E5E7EB',
                    borderRadius: '16px',
                    padding: '20px 12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    if (formData.purpose !== loan.value) {
                      e.currentTarget.style.borderColor = '#A5B4FC';
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (formData.purpose !== loan.value) {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.background = '#F9FAFB';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{loan.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>{loan.value}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Application;
