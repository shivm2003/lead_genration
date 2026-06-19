import { useNavigate } from 'react-router-dom';

function LapLoan() {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate('/application', { state: { prefilledPurpose: 'Loan Against Property' } });
  };

  return (
    <div className="fade-in">
      <section className="hero" style={{ padding: '60px 0', background: '#EEF2FF' }}>
        <div className="container">
          <h1 style={{ fontSize: '42px', color: '#1E3A8A' }}>Loan Against Property</h1>
          <p>Unlock the value of your property for higher loan amounts and lower interest rates.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="glass-card" style={{ marginTop: 0 }}>
            <h2 style={{ color: '#111827', fontSize: '28px', marginBottom: '16px' }}>Maximize Your Property's Value</h2>
            <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '32px' }}>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>🏢 High loan amounts based on property value</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>🏢 Lower interest rates compared to personal loans</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>🏢 Longer repayment tenures for manageable EMIs</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>🏢 Quick processing and disbursal</li>
            </ul>
            <button onClick={handleApply} className="btn btn-primary btn-block">Apply For LAP</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LapLoan;
