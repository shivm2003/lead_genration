import { useNavigate } from 'react-router-dom';

function BusinessLoan() {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate('/application', { state: { prefilledPurpose: 'Business' } });
  };

  return (
    <div className="fade-in">
      <section className="hero" style={{ padding: '60px 0', background: '#F3E8FF' }}>
        <div className="container">
          <h1 style={{ fontSize: '42px' }}>Fuel Your Business Growth</h1>
          <p>Unsecured business loans to help you expand, purchase inventory, or manage cash flow seamlessly.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="glass-card" style={{ marginTop: 0 }}>
            <h2 style={{ color: '#111827', fontSize: '28px', marginBottom: '16px' }}>Accelerate Your Enterprise</h2>
            <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '32px' }}>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>🚀 Capital up to ₹50,000,000</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>🚀 No collateral required for eligible SMEs</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>🚀 Fast track processing within 48 hours</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>🚀 Flexible repayment schedules</li>
            </ul>
            <button onClick={handleApply} className="btn btn-primary btn-block" style={{ backgroundColor: '#9333EA' }}>Get Business Funding</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BusinessLoan;
