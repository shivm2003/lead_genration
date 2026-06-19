import { useNavigate } from 'react-router-dom';

function VehicleLoan() {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate('/application', { state: { prefilledPurpose: 'Vehicle Loan' } });
  };

  return (
    <div className="fade-in">
      <section className="hero" style={{ padding: '60px 0', background: '#FDF4FF' }}>
        <div className="container">
          <h1 style={{ fontSize: '42px', color: '#86198F' }}>Vehicle Loan</h1>
          <p>Drive home your dream car or two-wheeler with our quick and easy vehicle finance options.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="glass-card" style={{ marginTop: 0 }}>
            <h2 style={{ color: '#111827', fontSize: '28px', marginBottom: '16px' }}>Hit the Road Faster</h2>
            <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '32px' }}>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>🚗 Up to 100% on-road financing available</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>🚗 Flexible repayment options up to 7 years</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>🚗 Minimal documentation and instant approval</li>
              <li style={{ marginBottom: '12px', fontSize: '18px' }}>🚗 Loans available for both new and used vehicles</li>
            </ul>
            <button onClick={handleApply} className="btn btn-primary btn-block" style={{ backgroundColor: '#D946EF' }}>Apply For Vehicle Loan</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VehicleLoan;
