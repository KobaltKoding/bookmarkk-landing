const ProblemSection = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h2 className="section-heading-large">
        Progress you can{' '}
        <span className="highlight-amber">prove.</span>
      </h2>

      <div className="section-body-text">
        <p>
          70% of people want to read more. Most fail because progress is invisible.
        </p>
        <p>
          No fake streaks. No vanity metrics. Just real, verified reading progress
          powered by AI-generated quizzes.
        </p>
        <p>
          Your XP is earned by passing chapter quizzes, not self-reported logging.
          Reading is the only self-improvement habit with no scoreboard—
          <strong style={{ color: 'rgba(255,255,255,0.9)' }}>bookmarkk fixes this.</strong>
        </p>
      </div>

      <div className="glass-card">
        <div className="indicator">
          <div className="pulse-dot" />
          <span className="indicator-text">AI Quiz · Chapter 3</span>
        </div>
        <p className="quote">
          "What was the core argument the author made about habit formation?"
        </p>
      </div>
    </div>
  );
};

export default ProblemSection;
