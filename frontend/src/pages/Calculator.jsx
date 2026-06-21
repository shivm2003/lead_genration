import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function Calculator() {
  const [amount, setAmount] = useState('500000');
  const [interest, setInterest] = useState('10.5');
  const [tenure, setTenure] = useState('5');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const formatINR = (num) =>
    new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(Math.round(num || 0));

  // Live preview (recomputed on every keystroke, not just on submit)
  const live = useMemo(() => {
    const p = parseFloat(amount);
    const rate = parseFloat(interest);
    const years = parseFloat(tenure);
    if (!(p > 0 && rate >= 0 && years > 0)) return null;

    let payment;
    if (rate === 0) {
      payment = p / (years * 12);
    } else {
      const i = rate / 100 / 12;
      const n = years * 12;
      payment = (p * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1);
    }
    const total = payment * years * 12;
    const interestPaid = total - p;

    // amortization schedule, grouped by year, for the year-by-year balance chart
    const schedule = [];
    let balance = p;
    const monthlyRate = rate / 100 / 12;
    for (let year = 1; year <= years; year++) {
      for (let m = 0; m < 12; m++) {
        const interestPortion = balance * monthlyRate;
        const principalPortion = payment - interestPortion;
        balance = Math.max(balance - principalPortion, 0);
      }
      schedule.push({ year, balance });
    }

    return {
      payment,
      total,
      interestPaid,
      principal: p,
      principalPct: (p / total) * 100,
      schedule,
    };
  }, [amount, interest, tenure]);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (live) setResult(live);
  };

  const handleApply = () => {
    navigate('/application', { state: { prefilledAmount: amount } });
  };

  // We can just use the live data directly.
  const data = live;
  const maxBalance = data ? data.principal : 1;

  return (
    <div className="fade-in" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* ============ HERO ============ */}
      <section
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #1E3A5F 0%, #29467A 45%, #4F46E5 100%)',
          color: '#fff',
          padding: '76px 0 56px',
          overflow: 'hidden',
        }}
      >
        {/* decorative grid lines, evoking ledger paper / amortization tables */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
          }}
        />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '999px',
              padding: '6px 16px',
              marginBottom: '20px',
            }}
          >
            EMI · Interest · Amortization
          </span>
          <h1 className="calc-hero-title">
            Know your number before you sign anything.
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.85, maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
            Drag the sliders, watch the math move in real time, and see exactly how much of every
            rupee goes to the bank versus to you.
          </p>
        </div>
      </section>

      {/* ============ CALCULATOR ============ */}
      <section className="section" style={{ backgroundColor: '#F0F4FF', padding: '56px 0' }}>
        <div className="container calc-grid">
          {/* LEFT: Inputs */}
          <div className="calc-panel">
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px', color: '#1E3A5F' }}>
              Loan details
            </h2>
            <p style={{ color: '#6B7280', marginBottom: '28px', fontSize: '14px' }}>
              Updates live — no need to hit calculate first.
            </p>

            <form onSubmit={handleCalculate}>
              {/* Amount */}
              <div className="form-group" style={{ marginBottom: '26px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                  <label htmlFor="calc-amount" style={{ fontWeight: 600, color: '#1E3A5F' }}>
                    Loan amount
                  </label>
                  <span style={{ fontWeight: 700, color: '#4F46E5', fontSize: '15px' }}>
                    ₹{formatINR(amount)}
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="5000000"
                  step="10000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ width: '100%', accentColor: '#4F46E5' }}
                />
                <input
                  type="number"
                  id="calc-amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1000"
                  style={{ marginTop: '10px' }}
                />
              </div>

              {/* Interest */}
              <div className="form-group" style={{ marginBottom: '26px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                  <label htmlFor="calc-interest" style={{ fontWeight: 600, color: '#1E3A5F' }}>
                    Interest rate (p.a.)
                  </label>
                  <span style={{ fontWeight: 700, color: '#F59E0B', fontSize: '15px' }}>{interest}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="24"
                  step="0.1"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  style={{ width: '100%', accentColor: '#F59E0B' }}
                />
                <input
                  type="number"
                  id="calc-interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  step="0.1"
                  min="0"
                  style={{ marginTop: '10px' }}
                />
              </div>

              {/* Tenure */}
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                  <label htmlFor="calc-tenure" style={{ fontWeight: 600, color: '#1E3A5F' }}>
                    Tenure
                  </label>
                  <span style={{ fontWeight: 700, color: '#10B981', fontSize: '15px' }}>
                    {tenure} {tenure === '1' ? 'year' : 'years'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  style={{ width: '100%', accentColor: '#10B981' }}
                />
                <input
                  type="number"
                  id="calc-tenure"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  min="1"
                  style={{ marginTop: '10px' }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                style={{
                  fontSize: '17px',
                  padding: '15px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  marginTop: '24px',
                }}
              >
                Lock in this breakdown →
              </button>
            </form>
          </div>

          {/* RIGHT: Results */}
          <div className="calc-panel" style={{ minHeight: '460px' }}>
            {!data ? (
              <div
                style={{
                  height: '100%',
                  minHeight: '420px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: '#9CA3AF',
                }}
              >
                <div style={{ fontSize: '56px', marginBottom: '14px' }}>🧮</div>
                <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#6B7280' }}>
                  Your breakdown will appear here
                </h3>
                <p style={{ fontSize: '14px', marginTop: '8px', maxWidth: '320px' }}>
                  Set your numbers on the left, then click "Lock in this breakdown" to see the
                  full schedule.
                </p>
              </div>
            ) : (
              <div className="fade-in">
                {/* Monthly EMI Highlight */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                    color: '#fff',
                    borderRadius: '16px',
                    padding: '26px',
                    textAlign: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      opacity: 0.8,
                      marginBottom: '6px',
                    }}
                  >
                    Your monthly EMI
                  </p>
                  <div style={{ fontSize: '40px', fontWeight: 800 }}>₹{formatINR(data.payment)}</div>
                  <p style={{ fontSize: '13px', opacity: 0.75, marginTop: '4px' }}>
                    for {tenure} {tenure === '1' ? 'year' : 'years'} at {interest}% p.a.
                  </p>
                </div>

                {/* Breakdown Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                  <div
                    style={{
                      background: '#F0F4FF',
                      borderRadius: '12px',
                      padding: '18px',
                      textAlign: 'center',
                      border: '1px solid #E0E7FF',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '11px',
                        color: '#6B7280',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '6px',
                      }}
                    >
                      Principal
                    </p>
                    <p style={{ fontSize: '20px', fontWeight: 700, color: '#4F46E5' }}>
                      ₹{formatINR(data.principal)}
                    </p>
                  </div>
                  <div
                    style={{
                      background: '#FFF7ED',
                      borderRadius: '12px',
                      padding: '18px',
                      textAlign: 'center',
                      border: '1px solid #FFEDD5',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '11px',
                        color: '#6B7280',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '6px',
                      }}
                    >
                      Total interest
                    </p>
                    <p style={{ fontSize: '20px', fontWeight: 700, color: '#F59E0B' }}>
                      ₹{formatINR(data.interestPaid)}
                    </p>
                  </div>
                </div>

                {/* Total Payable */}
                <div
                  style={{
                    background: '#ECFDF5',
                    borderRadius: '12px',
                    padding: '18px',
                    textAlign: 'center',
                    border: '1px solid #D1FAE5',
                    marginBottom: '24px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '11px',
                      color: '#6B7280',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '6px',
                    }}
                  >
                    Total amount payable
                  </p>
                  <p style={{ fontSize: '26px', fontWeight: 800, color: '#10B981' }}>
                    ₹{formatINR(data.total)}
                  </p>
                </div>

                {/* Principal vs Interest bar */}
                <div style={{ marginBottom: '24px' }}>
                  <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px', fontWeight: 600 }}>
                    Principal vs interest
                  </p>
                  <div
                    style={{
                      width: '100%',
                      height: '14px',
                      borderRadius: '99px',
                      background: '#F59E0B',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${data.principalPct}%`,
                        height: '100%',
                        background: '#4F46E5',
                        borderRadius: '99px 0 0 99px',
                        transition: 'width 0.6s ease-in-out',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '6px',
                      fontSize: '12px',
                      color: '#6B7280',
                    }}
                  >
                    <span>🔵 Principal ({data.principalPct.toFixed(1)}%)</span>
                    <span>🟡 Interest ({(100 - data.principalPct).toFixed(1)}%)</span>
                  </div>
                </div>

                {/* Year-by-year balance chart */}
                {data.schedule.length > 1 && (
                  <div style={{ marginBottom: '26px' }}>
                    <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '10px', fontWeight: 600 }}>
                      Outstanding balance, year by year
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: '4px',
                        height: '90px',
                        background: '#F9FAFB',
                        borderRadius: '10px',
                        padding: '10px 10px 0',
                      }}
                    >
                      {data.schedule.map((row) => (
                        <div
                          key={row.year}
                          title={`Year ${row.year}: ₹${formatINR(row.balance)} remaining`}
                          style={{
                            flex: 1,
                            background: 'linear-gradient(180deg, #4F46E5, #7C3AED)',
                            borderRadius: '3px 3px 0 0',
                            height: `${Math.max((row.balance / maxBalance) * 100, 2)}%`,
                          }}
                        />
                      ))}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '11px',
                        color: '#9CA3AF',
                        marginTop: '4px',
                      }}
                    >
                      <span>Year 1</span>
                      <span>Year {data.schedule.length}</span>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <button
                  onClick={handleApply}
                  className="btn btn-block"
                  style={{
                    fontSize: '17px',
                    padding: '15px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    color: '#fff',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Apply for this loan now
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ BOTTOM INFO STRIP ============ */}
      <div style={{ background: '#111827', color: '#D1D5DB', padding: '40px 0', textAlign: 'center' }}>
        <div className="container calc-bottom-info">
          <div>
            <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', opacity: 0.7 }}>
              Interest rates from
            </p>
            <p style={{ fontSize: '26px', fontWeight: 800, color: '#4F46E5' }}>8.5% p.a.</p>
          </div>
          <div>
            <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', opacity: 0.7 }}>
              Max loan amount
            </p>
            <p style={{ fontSize: '26px', fontWeight: 800, color: '#10B981' }}>₹10 Crore</p>
          </div>
          <div>
            <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', opacity: 0.7 }}>
              Tenure up to
            </p>
            <p style={{ fontSize: '26px', fontWeight: 800, color: '#F59E0B' }}>30 years</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;