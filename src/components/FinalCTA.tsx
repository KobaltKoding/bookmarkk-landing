interface FinalCTAProps {
  onJoinClick: () => void;
}

const FinalCTA = ({ onJoinClick }: FinalCTAProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <h2 className="cta-title">
        Start reading.<br />
        Start <span className="highlight">proving.</span>
      </h2>

      <p className="cta-subtitle">
        Bookmarkk. Where progress is earned, not logged.
      </p>

      <div className="cta-buttons">
        <button className="btn-cta-primary" onClick={onJoinClick}>
          Join Season 1
        </button>
        <button
          className="btn-cta-outline"
          onClick={() => {
            const el = document.getElementById('how-it-works');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          See how it works
        </button>
      </div>

      <p className="cta-fine-print">
        Limited spots. We're starting with a small cohort to iterate fast.
      </p>
    </div>
  );
};

export default FinalCTA;
