const Mission = () => {
  const stats = [
    { label: 'Quiz Completion Rate', value: '85%' },
    { label: 'XP Earned by Beta Group', value: '12,400+' },
    { label: 'Avg. Reading Session', value: '42m' }
  ];

  return (
    <section className="mission" id="mission">
      <div className="container">
        <div className="mission-content glass">
          <div className="mission-text">
            <h2 className="section-title" style={{ color: 'var(--primary)', marginBottom: '2rem' }}>Our Mission</h2>
            <p className="mission-copy">
              "We aren't just a book app. We are a progress and proof network for long-form learning.
              Our mission is to turn passive reading into a shareable, verified identity."
            </p>
          </div>

          <div className="stats-bar">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
