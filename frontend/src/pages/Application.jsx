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
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    loanAmount: '',
    purpose: '',
    employment: '',
    city: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        loanAmount: location.state.prefilledAmount || prev.loanAmount,
        purpose: location.state.prefilledPurpose || prev.purpose
      }));
      // If purpose is prefilled, skip to step 2
      if (location.state.prefilledPurpose) {
        setStep(2);
      }
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectLoanType = (type) => {
    setFormData({ ...formData, purpose: type });
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/leads', {
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

          {/* Step Indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '28px' }}>
            {[1, 2].map(s => (
              <div key={s} style={{
                width: s === step ? '48px' : '32px',
                height: '6px',
                borderRadius: '99px',
                background: s === step ? '#F59E0B' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#F0F4FF', minHeight: '500px' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>

          {/* ======= STEP 1: Choose Loan Type ======= */}
          {step === 1 && (
            <div className="fade-in">
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1E3A5F' }}>
                  What type of loan are you looking for?
                </h2>
                <p style={{ color: '#6B7280', marginTop: '8px' }}>
                  Select one to continue with your application.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '16px',
              }}>
                {LOAN_TYPES.map(loan => (
                  <button
                    key={loan.value}
                    onClick={() => selectLoanType(loan.value)}
                    style={{
                      background: formData.purpose === loan.value
                        ? 'linear-gradient(135deg, #4F46E5, #7C3AED)'
                        : '#fff',
                      color: formData.purpose === loan.value ? '#fff' : '#1E3A5F',
                      border: formData.purpose === loan.value
                        ? '2px solid #4F46E5'
                        : '2px solid #E5E7EB',
                      borderRadius: '16px',
                      padding: '24px 16px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.25s ease',
                      boxShadow: formData.purpose === loan.value
                        ? '0 8px 24px rgba(79,70,229,0.3)'
                        : '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                    onMouseEnter={e => {
                      if (formData.purpose !== loan.value) {
                        e.currentTarget.style.borderColor = '#A5B4FC';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(79,70,229,0.12)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (formData.purpose !== loan.value) {
                        e.currentTarget.style.borderColor = '#E5E7EB';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                      }
                    }}
                  >
                    <div style={{ fontSize: '36px', marginBottom: '8px' }}>{loan.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: '16px' }}>{loan.value}</div>
                    <div style={{
                      fontSize: '12px',
                      marginTop: '4px',
                      opacity: 0.7,
                      color: formData.purpose === loan.value ? '#E0E7FF' : '#6B7280',
                    }}>{loan.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ======= STEP 2: Fill Details ======= */}
          {step === 2 && (
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
                }} onClick={() => setStep(1)}>
                  {LOAN_TYPES.find(l => l.value === formData.purpose)?.icon} {formData.purpose}
                  <span style={{ opacity: 0.7, fontSize: '13px' }}>✏️ Change</span>
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

                  {/* Row 3: Loan Amount + Employment */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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

              {/* Go Back link */}
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button onClick={() => setStep(1)} style={{
                  background: 'none',
                  border: 'none',
                  color: '#4F46E5',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '15px',
                  textDecoration: 'underline',
                }}>
                  ← Back to Loan Type Selection
                </button>
              </div>
            </div>
          )}
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
    </div>
  );
}

export default Application;
