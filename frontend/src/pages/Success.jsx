import { Link } from 'react-router-dom';

function Success() {
  return (
    <div className="container fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
      <div className="glass-card success-container">
        <div className="success-icon">✓</div>
        <h2>Application Submitted!</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          Thank you for choosing Loansolutions. Your lead has been securely recorded, and our team will contact you shortly.
        </p>
        <Link to="/" className="btn btn-primary">Return Home</Link>
      </div>
    </div>
  );
}

export default Success;
