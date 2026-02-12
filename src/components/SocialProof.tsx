const stats = [
  {
    value: '88%',
    label: 'now reading 2+ days/week',
    sub: '(up from 25%)',
    color: 'var(--primary)',
  },
  {
    value: '30%',
    label: 'reading 5+ days/week',
    sub: '(up from 8%)',
    color: 'var(--accent-amber)',
  },
  {
    value: '100%',
    label: 'told someone about it',
    sub: '',
    color: 'rgba(255,255,255,0.9)',
  },
  {
    value: '91%',
    label: 'would recommend',
    sub: '',
    color: 'rgba(255,255,255,0.9)',
  },
];

const SocialProof = () => {
  return (
    <div className="retention-card">
      <h2>The retention loop that works.</h2>

      <div className="retention-grid">
        {stats.map((stat, index) => (
          <div key={index} className="retention-item">
            <h3 style={{ color: stat.color }}>
              {stat.value} {stat.label}
            </h3>
            <p>
              {stat.sub
                ? `${stat.sub} — Verified through AI-powered comprehension quizzes and weekly league participation.`
                : index === 2
                  ? 'Every single beta user shared bookmarkk with someone. Organic word of mouth built on real results.'
                  : 'Net promoter score through the roof. Readers who prove their progress become lifelong advocates.'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialProof;
