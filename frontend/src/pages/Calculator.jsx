import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Calculator() {
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [tenure, setTenure] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const navigate = useNavigate();

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
      const formattedPayment = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(payment);
      setMonthlyPayment(formattedPayment);
    }
  };

  const handleApply = () => {
    // Optionally, pass the amount in history state so Application can read it
    navigate('/application', { state: { prefilledAmount: amount } });
  };

  return (
    <div className="container fade-in" style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
      <div className="glass-card">
        <h2>Loan Calculator</h2>
        <form onSubmit={handleCalculate}>
          <div className="form-group">
            <label htmlFor="calc-amount">Loan Amount (₹)</label>
            <input 
              type="number" 
              id="calc-amount" 
              placeholder="e.g. 500000" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required 
              min="1000" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="calc-interest">Interest Rate (%)</label>
            <input 
              type="number" 
              id="calc-interest" 
              placeholder="e.g. 5.5" 
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              required 
              step="0.1" 
              min="0" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="calc-tenure">Loan Term (Years)</label>
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
          <button type="submit" className="btn btn-primary btn-block">Calculate</button>
        </form>
        
        {monthlyPayment !== null && (
          <div className="calc-result fade-in">
            <h3>Estimated Monthly Payment</h3>
            <div className="amount">₹{monthlyPayment}</div>
            <div style={{ marginTop: '16px' }}>
              <button onClick={handleApply} className="btn btn-primary btn-block">Apply For This Loan</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calculator;
