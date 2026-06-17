import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function Success() {
  const canvasRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);

    // Confetti animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316'];
    const confettiCount = 150;
    const confetti = [];

    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * w,
        y: Math.random() * h - h,
        w: Math.random() * 12 + 6,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.2,
        drift: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.7 + 0.3,
      });
    }

    let animId;
    let elapsed = 0;
    const duration = 5000;
    const startTime = Date.now();

    function draw() {
      elapsed = Date.now() - startTime;
      const fadeOut = elapsed > duration - 1500 ? Math.max(0, 1 - (elapsed - (duration - 1500)) / 1500) : 1;

      ctx.clearRect(0, 0, w, h);

      confetti.forEach((c) => {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.angle);
        ctx.globalAlpha = c.opacity * fadeOut;
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        ctx.restore();

        c.y += c.speed;
        c.x += c.drift;
        c.angle += c.spin;

        if (c.y > h + 20) {
          c.y = -20;
          c.x = Math.random() * w;
        }
      });

      if (elapsed < duration) {
        animId = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    }

    draw();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="success-page">
      <canvas ref={canvasRef} className="confetti-canvas" />

      {/* Floating orbs background */}
      <div className="success-orbs">
        <div className="success-orb success-orb-1"></div>
        <div className="success-orb success-orb-2"></div>
        <div className="success-orb success-orb-3"></div>
      </div>

      <div className={`success-main-content ${show ? 'success-visible' : ''}`}>
        {/* Animated checkmark */}
        <div className="success-check-wrapper">
          <div className="success-check-ring"></div>
          <div className="success-check-ring success-check-ring-2"></div>
          <div className="success-check-circle">
            <svg className="success-check-svg" viewBox="0 0 52 52">
              <path className="success-check-path" fill="none" d="M14 27l7.8 7.8L38 17" />
            </svg>
          </div>
        </div>

        <h1 className="success-title">Application Submitted!</h1>
        <p className="success-subtitle">
          Congratulations! Your loan application has been securely received by our team.
        </p>

        {/* Info cards */}
        <div className="success-info-grid">
          <div className="success-info-card">
            <div className="success-info-icon">📧</div>
            <h4>Email Confirmation</h4>
            <p>Check your inbox for a confirmation with your reference number.</p>
          </div>
          <div className="success-info-card">
            <div className="success-info-icon">📞</div>
            <h4>Expert Callback</h4>
            <p>A loan specialist will reach out within 24 hours.</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="success-timeline">
          <h3 className="success-timeline-title">What Happens Next</h3>
          <div className="success-timeline-items">
            <div className="success-timeline-item">
              <div className="success-timeline-dot success-timeline-dot-active">
                <span>✓</span>
              </div>
              <div className="success-timeline-content">
                <strong>Application Received</strong>
                <span>Your details are securely saved</span>
              </div>
            </div>
            <div className="success-timeline-item">
              <div className="success-timeline-dot">
                <span>2</span>
              </div>
              <div className="success-timeline-content">
                <strong>Document Verification</strong>
                <span>Our team reviews your documents</span>
              </div>
            </div>
            <div className="success-timeline-item">
              <div className="success-timeline-dot">
                <span>3</span>
              </div>
              <div className="success-timeline-content">
                <strong>Loan Approval</strong>
                <span>Get your personalized offer</span>
              </div>
            </div>
            <div className="success-timeline-item">
              <div className="success-timeline-dot">
                <span>4</span>
              </div>
              <div className="success-timeline-content">
                <strong>Disbursement</strong>
                <span>Funds credited to your account</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="success-actions">
          <Link to="/" className="btn btn-primary success-btn-home">
            <span>🏠</span> Return Home
          </Link>
          <Link to="/calculator" className="btn btn-secondary success-btn-calc">
            <span>📊</span> Try Loan Calculator
          </Link>
        </div>

        {/* Trust footer */}
        <div className="success-trust">
          <div className="success-trust-item">
            <span>🔒</span> 256-Bit Encrypted
          </div>
          <div className="success-trust-item">
            <span>⭐</span> 4.9/5 Rated
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
