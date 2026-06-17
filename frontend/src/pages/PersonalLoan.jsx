import { useNavigate } from 'react-router-dom';

function PersonalLoan() {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate('/application', { state: { prefilledPurpose: 'Personal' } });
  };

  return (
    <div className="fade-in">
      <section className="hero" style={{ padding: '60px 0', background: '#EEF2FF' }}>
        <div className="container">
          <h1 style={{ fontSize: '42px' }}>Personal Loans Tailored For You</h1>
          <p>Get instant approval on personal loans up to ₹15,000,000. No hidden fees, completely transparent.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="glass-card" style={{ marginTop: 0 }}>
            <h2 style={{ color: '#111827', fontSize: '28px', marginBottom: '16px' }}>Why Choose Our Personal Loan?</h2>
            <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '32px' }}>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>✅ Instant online approval</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>✅ Lowest interest rates starting at 10.5% p.a.</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>✅ Flexible repayment tenure up to 5 years</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>✅ Minimal documentation required</li>
            </ul>
            <button onClick={handleApply} className="btn btn-primary btn-block">Apply For Personal Loan Now</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PersonalLoan;
