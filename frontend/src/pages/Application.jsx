import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Application() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    loanAmount: '',
    purpose: ''
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
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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
    <div className="container fade-in" style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
      <div className="glass-card">
        <h2>Loan Application</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
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
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="rahul.sharma@gmail.com" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
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
          <div className="form-group">
            <label htmlFor="loanAmount">Desired Loan Amount (₹)</label>
            <input 
              type="number" 
              name="loanAmount" 
              id="loanAmount" 
              placeholder="500000" 
              value={formData.loanAmount}
              onChange={handleChange}
              required 
              min="1000" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="purpose">Loan Purpose</label>
            <select 
              name="purpose" 
              id="purpose" 
              value={formData.purpose}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a purpose...</option>
              <option value="Personal">Personal</option>
              <option value="Home">Home</option>
              <option value="Auto">Auto</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
        {error && <div style={{ color: '#EF4444', marginTop: '16px', textAlign: 'center' }}>{error}</div>}
      </div>
    </div>
  );
}

export default Application;
