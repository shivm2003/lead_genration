import { useNavigate } from 'react-router-dom';

function HomeLoan() {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate('/application', { state: { prefilledPurpose: 'Home' } });
  };

  return (
    <div className="fade-in">
      <section className="hero" style={{ padding: '60px 0', background: '#ECFDF5' }}>
        <div className="container">
          <h1 style={{ fontSize: '42px' }}>Build Your Dream Home</h1>
          <p>Affordable housing finance with long tenures and the lowest interest rates in the market.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="glass-card" style={{ marginTop: 0 }}>
            <h2 style={{ color: '#111827', fontSize: '28px', marginBottom: '16px' }}>Unlock Your Front Door</h2>
            <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '32px' }}>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>🏡 High loan-to-value ratio</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>🏡 Tenures up to 30 years for lower EMIs</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>🏡 Subsidized rates for first-time buyers</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>🏡 Easy balance transfer facility</li>
            </ul>
            <button onClick={handleApply} className="btn btn-primary btn-block" style={{ backgroundColor: '#10B981' }}>Apply For Home Loan</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeLoan;
