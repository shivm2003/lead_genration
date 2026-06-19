import { useNavigate } from 'react-router-dom';

function GoldLoan() {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate('/application', { state: { prefilledPurpose: 'Gold Loan' } });
  };

  return (
    <div className="fade-in">
      <section className="hero" style={{ padding: '60px 0', background: '#FFFBEB' }}>
        <div className="container">
          <h1 style={{ fontSize: '42px', color: '#B45309' }}>Gold Loan</h1>
          <p>Pledge your gold jewelry for instant cash with complete safety and transparency.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="glass-card" style={{ marginTop: 0 }}>
            <h2 style={{ color: '#111827', fontSize: '28px', marginBottom: '16px' }}>Instant Funds from Gold</h2>
            <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '32px' }}>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>✨ Highest per gram rate in the market</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>✨ Disbursement in as little as 30 minutes</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>✨ 100% safety and insurance for your gold</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>✨ Flexible repayment options including Bullet payment</li>
            </ul>
            <button onClick={handleApply} className="btn btn-primary btn-block" style={{ backgroundColor: '#F59E0B' }}>Apply For Gold Loan</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GoldLoan;
