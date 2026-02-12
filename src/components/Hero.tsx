interface HeroProps {
  onJoinClick: () => void;
}

const Hero = ({ onJoinClick }: HeroProps) => {
  return (
    <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h1 className="hero-title">bookmarkk</h1>

      <p className="hero-subtitle">
        Turn reading into a{' '}
        <span className="highlight">sport you can win</span>.
      </p>

      <p className="hero-tagline">
        Proof-based progress · Social accountability · Real transformation
      </p>

      <div style={{ marginTop: '1rem', pointerEvents: 'auto' }}>
        <button className="btn-cta-primary" onClick={onJoinClick}>
          Join Season 1
        </button>
      </div>
    </div>
  );
};

export default Hero;
