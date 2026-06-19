import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Landing.css';

const PARTNER_BANKS = [
  'HDFC BANK', 'ICICI BANK', 'AXIS BANK', 'STATE BANK OF INDIA',
  'KOTAK MAHINDRA', 'BAJAJ FINSERV', 'PIRAMAL FINANCE', 'INDIA SHELTER',
  'GRIHUM HOUSING', 'TATA CAPITAL', 'MUTHOOT FINANCE', 'L&T FINANCE',
  'AU SMALL FINANCE', 'IDFC FIRST BANK', 'PNB HOUSING', 'AAVAS FINANCIERS',
  'HOME FIRST FINANCE', 'YES BANK',
];

const LOAN_PRODUCTS = [
  {
    id: '01', icon: '👤', title: 'Personal Loan',
    blurb: 'Quick funds for medical emergencies, weddings, or personal milestones — no collateral required.',
    rate: '10.50% p.a.', amount: '₹50K – ₹40L', tenure: 'Up to 5 yrs', to: '/personal',
  },
  {
    id: '02', icon: '🏠', title: 'Home Loan',
    blurb: 'Turn your dream home into reality with long-term housing finance and flexible EMI plans.',
    rate: '8.35% p.a.', amount: '₹5L – ₹5Cr', tenure: 'Up to 30 yrs', to: '/home',
  },
  {
    id: '03', icon: '💼', title: 'Business Loan',
    blurb: 'Working capital and term loans built for SMEs, traders, and self-employed professionals.',
    rate: '11.00% p.a.', amount: '₹1L – ₹75L', tenure: 'Up to 7 yrs', to: '/business',
  },
  {
    id: '04', icon: '🏢', title: 'Loan Against Property',
    blurb: 'Unlock the value of property you already own for larger amounts at lower rates.',
    rate: '9.25% p.a.', amount: '₹10L – ₹10Cr', tenure: 'Up to 15 yrs', to: '/lap',
  },
  {
    id: '05', icon: '🚗', title: 'Vehicle Loan',
    blurb: 'Drive home a new car or two-wheeler with fast disbursal and minimal documentation.',
    rate: '9.80% p.a.', amount: '₹50K – ₹20L', tenure: 'Up to 7 yrs', to: '/vehicle',
  },
  {
    id: '06', icon: '✨', title: 'Gold Loan',
    blurb: 'Pledge your gold jewellery for instant cash, with secure storage and full transparency.',
    rate: '9.00% p.a.', amount: '₹10K – ₹25L', tenure: 'Up to 3 yrs', to: '/gold',
  },
];

const STEPS = [
  { id: '01', title: 'Apply Online', text: 'Share a few basic details — name, mobile number, and loan amount. Takes under two minutes.' },
  { id: '02', title: 'Get Verified', text: 'Our partner lender reviews your eligibility and shares a personalised offer, usually same day.' },
  { id: '03', title: 'Receive Funds', text: 'Accept the offer digitally and get the amount disbursed straight to your bank account.' },
];

const FAQS = [
  { q: 'Will checking my eligibility affect my CIBIL score?', a: 'No. Our eligibility check is a soft enquiry and does not impact your credit score in any way. Your score is only affected if you proceed with a formal application.' },
  { q: 'How long does disbursal usually take?', a: 'Most personal and gold loans are disbursed within 24–48 hours of document verification. Home loans and loans against property may take 5–10 working days due to property checks.' },
  { q: 'What documents do I need?', a: 'Typically PAN, Aadhaar, the last 3 months of bank statements, and income proof (salary slips or ITR for the self-employed). Exact requirements vary by lender and product.' },
  { q: 'Is there a processing fee?', a: 'Processing fees vary by lending partner, generally between 0.5% and 2% of the loan amount. The exact fee is always shown upfront before you accept any offer.' },
  { q: 'Can I prepay or foreclose my loan early?', a: 'Yes, most of our partner lenders allow part-prepayment or full foreclosure after a lock-in period, often with minimal or zero charges on floating-rate loans.' },
];

function Landing() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const navigate = useNavigate();

  const handleQuickLead = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Quick Lead',
          email: 'pending@user.com',
          phone: phone,
          loanAmount: amount,
          purpose: 'General',
        }),
      });
      if (response.ok) {
        navigate('/success');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ls fade-in">

      {/* HERO */}
      <section className="ls-hero">
        <div className="ls-container ls-hero-grid">
          <div className="ls-hero-copy">
            <span className="ls-eyebrow">
              <span className="ls-stamp ls-stamp--mini" aria-hidden="true">RBI</span>
              Registered lending marketplace
            </span>
            <h1 className="ls-hero-title">
              Loans that make sense.<br />Approved in minutes.
            </h1>
            <p className="ls-hero-sub">
              Compare personal, home, business and gold loans from 18+ trusted
              banks and NBFCs in one place. One form, multiple offers, zero
              guesswork — and zero hidden fees.
            </p>
            <ul className="ls-hero-points">
              <li><span className="ls-tick">✓</span> No impact on your CIBIL score</li>
              <li><span className="ls-tick">✓</span> 100% paperless, fully digital process</li>
              <li><span className="ls-tick">✓</span> Transparent rates — no surprise charges</li>
            </ul>
          </div>

          <div className="ls-stub">
            <div className="ls-stub-top">
              <span className="ls-stub-label">Eligibility Pass</span>
              <span className="ls-stub-no">No. 0042</span>
            </div>
            <h3 className="ls-stub-heading">Check your eligibility instantly</h3>
            <form onSubmit={handleQuickLead} className="ls-form">
              <div className="ls-field">
                <label htmlFor="quick-phone">Mobile number</label>
                <input
                  type="tel"
                  id="quick-phone"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="ls-field">
                <label htmlFor="quick-amount">Desired loan amount (₹)</label>
                <input
                  type="number"
                  id="quick-amount"
                  placeholder="5,00,000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="ls-btn ls-btn--gold" disabled={loading}>
                {loading ? 'Processing…' : 'Unlock best offers'}
              </button>
            </form>
            <p className="ls-fineprint">
              By continuing, you agree to our Terms &amp; Conditions and Privacy Policy.
            </p>
            <div className="ls-stub-perf" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* PARTNER STAMP WALL */}
      <section className="ls-section ls-partners">
        <div className="ls-container">
          <div className="ls-partners-head">
            <h2>Backed by 18+ banking &amp; NBFC partners</h2>
            <p>Every offer you see is sourced directly from a regulated lending partner — never a middleman markup.</p>
          </div>
          <div className="ls-stamp-wall">
            {PARTNER_BANKS.map((bank, i) => (
              <div className="ls-stamp ls-stamp--bank" key={bank} style={{ '--tilt': `${(i % 2 === 0 ? -1 : 1) * (1 + (i % 3))}deg` }}>
                {bank}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="ls-section ls-values">
        <div className="ls-container">
          <div className="ls-section-head">
            <h2>Built for how India borrows</h2>
            <p>We designed every step around the things that actually slow loan-seekers down.</p>
          </div>
          <div className="ls-values-grid">
            <div className="ls-value-card">
              <span className="ls-value-icon">⚡</span>
              <h4>Instant approval</h4>
              <p>Eligibility decisions in minutes, not days — most quick personal loans are pre-approved on the same call.</p>
            </div>
            <div className="ls-value-card">
              <span className="ls-value-icon">📱</span>
              <h4>100% digital</h4>
              <p>Upload documents from your phone. No branch visits, no physical paperwork, no waiting in line.</p>
            </div>
            <div className="ls-value-card">
              <span className="ls-value-icon">🛡️</span>
              <h4>Bank-grade security</h4>
              <p>256-bit encryption on every form, and your data is shared only with the lender you choose to proceed with.</p>
            </div>
            <div className="ls-value-card">
              <span className="ls-value-icon">💰</span>
              <h4>Lowest EMIs</h4>
              <p>We compare live rates across partners so you see the lowest EMI you qualify for, not just the first offer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LOAN PRODUCTS */}
      <section className="ls-section ls-products">
        <div className="ls-container">
          <div className="ls-section-head">
            <h2>Select your loan type</h2>
            <p>Six products, one application. Rates shown are starting rates and vary by profile and lender.</p>
          </div>
          <div className="ls-products-grid">
            {LOAN_PRODUCTS.map((p) => (
              <Link to={p.to} className="ls-product-card" key={p.id}>
                <div className="ls-product-top">
                  <span className="ls-product-no">{p.id}</span>
                  <span className="ls-product-icon">{p.icon}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="ls-product-blurb">{p.blurb}</p>
                <dl className="ls-product-specs">
                  <div><dt>Rate from</dt><dd>{p.rate}</dd></div>
                  <div><dt>Amount</dt><dd>{p.amount}</dd></div>
                  <div><dt>Tenure</dt><dd>{p.tenure}</dd></div>
                </dl>
                <span className="ls-product-cta">Check eligibility →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="ls-section ls-steps">
        <div className="ls-container">
          <div className="ls-section-head ls-section-head--light">
            <h2>How it works</h2>
            <p>From application to money in your account, in three steps.</p>
          </div>
          <div className="ls-steps-row">
            {STEPS.map((s, i) => (
              <div className="ls-step" key={s.id}>
                <span className="ls-step-no">{s.id}</span>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
                {i < STEPS.length - 1 && <span className="ls-step-line" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RATE LEDGER TABLE */}
      <section className="ls-section ls-ledger">
        <div className="ls-container">
          <div className="ls-section-head">
            <h2>Rate ledger</h2>
            <p>A quick read of where each product typically lands. Your exact rate depends on credit profile and lender.</p>
          </div>
          <div className="ls-table-wrap">
            <table className="ls-table">
              <thead>
                <tr>
                  <th>Loan type</th>
                  <th>Rate from</th>
                  <th>Max amount</th>
                  <th>Max tenure</th>
                </tr>
              </thead>
              <tbody>
                {LOAN_PRODUCTS.map((p) => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td className="ls-mono">{p.rate}</td>
                    <td className="ls-mono">{p.amount.split(' – ')[1]}</td>
                    <td className="ls-mono">{p.tenure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section className="ls-section ls-eligibility">
        <div className="ls-container ls-eligibility-grid">
          <div className="ls-section-head ls-section-head--tight">
            <h2>Are you eligible?</h2>
            <p>Most applicants fall into one of these two profiles. Meeting these basics is usually enough to get matched.</p>
          </div>
          <div className="ls-eligibility-cards">
            <div className="ls-elig-card">
              <h4>Salaried</h4>
              <ul>
                <li>21–58 years of age</li>
                <li>Minimum net monthly income of ₹20,000</li>
                <li>At least 1 year in current employment</li>
                <li>Active salary account for 3+ months</li>
              </ul>
            </div>
            <div className="ls-elig-card">
              <h4>Self-employed</h4>
              <ul>
                <li>23–65 years of age</li>
                <li>Business vintage of 2+ years</li>
                <li>Minimum annual turnover as per lender norms</li>
                <li>ITR filed for the last 2 financial years</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="ls-section ls-testimonials">
        <div className="ls-container">
          <div className="ls-section-head">
            <h2>What borrowers say</h2>
            <p>Real outcomes from people who checked their eligibility with us.</p>
          </div>
          <div className="ls-testimonial-grid">
            <div className="ls-testimonial-card">
              <p>“I compared three personal loan offers in one afternoon instead of visiting three branches. Got disbursed in two days.”</p>
              <div className="ls-testimonial-foot">
                <span className="ls-stamp ls-stamp--verify">VERIFIED</span>
                <span>— Anjali R., Pune</span>
              </div>
            </div>
            <div className="ls-testimonial-card">
              <p>“The home loan rate I was shown matched what I eventually signed for — no last-minute fee surprises.”</p>
              <div className="ls-testimonial-foot">
                <span className="ls-stamp ls-stamp--verify">VERIFIED</span>
                <span>— Mohit S., Gurugram</span>
              </div>
            </div>
            <div className="ls-testimonial-card">
              <p>"As a small business owner, I needed working capital fast. The business loan process took under a week."</p>
              <div className="ls-testimonial-foot">
                <span className="ls-stamp ls-stamp--verify">VERIFIED</span>
                <span>— Karthik N., Coimbatore</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ls-section ls-faq">
        <div className="ls-container">
          <div className="ls-section-head">
            <h2>Frequently asked questions</h2>
          </div>
          <div className="ls-faq-list">
            {FAQS.map((f, i) => (
              <div className={`ls-faq-item ${openFaq === i ? 'is-open' : ''}`} key={f.q}>
                <button
                  className="ls-faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  aria-expanded={openFaq === i}
                >
                  {f.q}
                  <span className="ls-faq-icon">{openFaq === i ? '–' : '+'}</span>
                </button>
                {openFaq === i && <p className="ls-faq-answer">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="ls-stats">
        <div className="ls-container ls-stats-grid">
          <div className="ls-stat"><h3>₹5Cr+</h3><p>Loans disbursed</p></div>
          <div className="ls-stat"><h3>18+</h3><p>Banking &amp; NBFC partners</p></div>
          <div className="ls-stat"><h3>10K+</h3><p>Happy customers</p></div>
          <div className="ls-stat"><h3>24 hrs</h3><p>Average decision time</p></div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="ls-final-cta">
        <div className="ls-container ls-final-cta-inner">
          <div>
            <h2>Ready to see your offer?</h2>
            <p>It takes under two minutes and won't affect your credit score.</p>
          </div>
          <a href="#quick-phone" className="ls-btn ls-btn--gold ls-btn--lg">Check eligibility now</a>
        </div>
      </section>

      {/* COMPLIANCE NOTE */}
      <p className="ls-disclosure">
        India Shelter is a digital lending marketplace. Loans are originated and disbursed by our RBI-regulated
        banking and NBFC partners; we do not lend directly. Interest rates, fees and eligibility shown are
        indicative and subject to the partner lender's final assessment.
      </p>
    </div>
  );
}

export default Landing;