const HowItWorks = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h2 className="section-heading-large">
        Read together.<br />
        <span className="highlight-purple" style={{
          background: 'linear-gradient(to right, #6366F1, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Compete weekly.
        </span>
      </h2>

      <div className="section-body-text">
        <p>Join leagues that reset every 7 days—fresh competition keeps you showing up.</p>
        <p>Climb the leaderboard with verified XP from real reading.</p>
        <p>Build your reading identity around proof and progress, not just logging.</p>
        <p>See where you rank in real-time. Track streaks, books finished, time read.</p>
      </div>

      <div className="icon-badges icon-badges--right">
        {['👑', '🔥', '📚'].map((icon, i) => (
          <div key={i} className="icon-badge">
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
