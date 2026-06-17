import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Calculator() {
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [tenure, setTenure] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const navigate = useNavigate();

  const formatINR = (num) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(num);

  const handleCalculate = (e) => {
    e.preventDefault();
    const p = parseFloat(amount);
    const rate = parseFloat(interest);
    const years = parseFloat(tenure);

    if (p > 0 && rate >= 0 && years > 0) {
      let payment = 0;
      if (rate === 0) {
        payment = p / (years * 12);
      } else {
        const i = (rate / 100) / 12;
        const n = years * 12;
        payment = p * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
      }
      const total = payment * years * 12;
      const interestPaid = total - p;
      setMonthlyPayment(formatINR(payment));
      setTotalPayment(formatINR(total));
      setTotalInterest(formatINR(interestPaid));
    }
  };

  const handleApply = () => {
    navigate('/application', { state: { prefilledAmount: amount } });
  };

  // Calculate percentage for donut chart
  const principalPct = (totalPayment && amount) ? ((parseFloat(amount) / parseFloat(totalPayment.replace(/,/g, ''))) * 100) : 0;

  return (
    <div className="fade-in">
      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #1E3A5F 0%, #4F46E5 100%)',
        color: '#fff',
        padding: '60px 0 40px',
        textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '12px' }}>
            📊 EMI Calculator
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.85, maxWidth: '600px', margin: '0 auto' }}>
            Plan your finances with precision. Instantly calculate your monthly EMI, total interest, and full repayment amount.
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#F0F4FF' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>

          {/* LEFT: Calculator Form */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            border: '1px solid #E5E7EB',
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: '#1E3A5F' }}>
              Enter Loan Details
            </h2>
            <p style={{ color: '#6B7280', marginBottom: '28px', fontSize: '14px' }}>
              Adjust the values to see your estimated repayment breakdown.
            </p>

            <form onSubmit={handleCalculate}>
              <div className="form-group">
                <label htmlFor="calc-amount" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>💰</span> Loan Amount (₹)
                </label>
                <input
                  type="number"
                  id="calc-amount"
                  placeholder="e.g. 5,00,000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="1000"
                />
                {amount && (
                  <span style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', display: 'block' }}>
                    ₹ {formatINR(parseFloat(amount) || 0)}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="calc-interest" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>📈</span> Interest Rate (% per annum)
                </label>
                <input
                  type="number"
                  id="calc-interest"
                  placeholder="e.g. 10.5"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  required
                  step="0.1"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="calc-tenure" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>📅</span> Loan Tenure (Years)
                </label>
                <input
                  type="number"
                  id="calc-tenure"
                  placeholder="e.g. 5"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  required
                  min="1"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block" style={{
                fontSize: '18px',
                padding: '16px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                marginTop: '8px',
              }}>
                Calculate EMI →
              </button>
            </form>
          </div>

          {/* RIGHT: Results Panel */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            border: '1px solid #E5E7EB',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: monthlyPayment ? 'flex-start' : 'center',
            alignItems: 'center',
          }}>
            {monthlyPayment === null ? (
              <div style={{ textAlign: 'center', color: '#9CA3AF' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🧮</div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#6B7280' }}>Your Results Will Appear Here</h3>
                <p style={{ fontSize: '14px', marginTop: '8px' }}>Fill in the form and click "Calculate EMI" to see your breakdown.</p>
              </div>
            ) : (
              <div className="fade-in" style={{ width: '100%' }}>
                {/* Monthly EMI Highlight */}
                <div style={{
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  color: '#fff',
                  borderRadius: '16px',
                  padding: '28px',
                  textAlign: 'center',
                  marginBottom: '24px',
                }}>
                  <p style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8, marginBottom: '8px' }}>
                    Your Monthly EMI
                  </p>
                  <div style={{ fontSize: '42px', fontWeight: 800 }}>₹{monthlyPayment}</div>
                </div>

                {/* Breakdown Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div style={{
                    background: '#F0F4FF',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    border: '1px solid #E0E7FF',
                  }}>
                    <p style={{ fontSize: '12px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                      Principal Amount
                    </p>
                    <p style={{ fontSize: '22px', fontWeight: 700, color: '#4F46E5' }}>
                      ₹{formatINR(parseFloat(amount))}
                    </p>
                  </div>
                  <div style={{
                    background: '#FFF7ED',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    border: '1px solid #FFEDD5',
                  }}>
                    <p style={{ fontSize: '12px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                      Total Interest
                    </p>
                    <p style={{ fontSize: '22px', fontWeight: 700, color: '#F59E0B' }}>
                      ₹{totalInterest}
                    </p>
                  </div>
                </div>

                {/* Total Payable */}
                <div style={{
                  background: '#ECFDF5',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  border: '1px solid #D1FAE5',
                  marginBottom: '24px',
                }}>
                  <p style={{ fontSize: '12px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                    Total Amount Payable
                  </p>
                  <p style={{ fontSize: '28px', fontWeight: 800, color: '#10B981' }}>
                    ₹{totalPayment}
                  </p>
                </div>

                {/* Visual Bar */}
                <div style={{ marginBottom: '24px' }}>
                  <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px', fontWeight: 600 }}>Principal vs Interest</p>
                  <div style={{
                    width: '100%',
                    height: '14px',
                    borderRadius: '99px',
                    background: '#F59E0B',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${principalPct}%`,
                      height: '100%',
                      background: '#4F46E5',
                      borderRadius: '99px 0 0 99px',
                      transition: 'width 0.6s ease-in-out',
                    }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '12px', color: '#6B7280' }}>
                    <span>🔵 Principal ({principalPct.toFixed(1)}%)</span>
                    <span>🟡 Interest ({(100 - principalPct).toFixed(1)}%)</span>
                  </div>
                </div>

                {/* CTA */}
                <button onClick={handleApply} className="btn btn-block" style={{
                  fontSize: '18px',
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  color: '#fff',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                }}>
                  ✅ Apply For This Loan Now
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom Info Strip */}
      <div style={{
        background: '#111827',
        color: '#D1D5DB',
        padding: '40px 0',
        textAlign: 'center',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', opacity: 0.7 }}>Interest Rates From</p>
            <p style={{ fontSize: '28px', fontWeight: 800, color: '#4F46E5' }}>8.5% p.a.</p>
          </div>
          <div>
            <p style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', opacity: 0.7 }}>Max Loan Amount</p>
            <p style={{ fontSize: '28px', fontWeight: 800, color: '#10B981' }}>₹50 Lakh</p>
          </div>
          <div>
            <p style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', opacity: 0.7 }}>Tenure Up To</p>
            <p style={{ fontSize: '28px', fontWeight: 800, color: '#F59E0B' }}>30 Years</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
