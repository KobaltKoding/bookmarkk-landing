const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Bookmarkk</div>
          <p style={{ color: 'var(--text-dim)' }}>Conquer your reading list.</p>
        </div>



        <div className="footer-bottom">
          <p>© 2026 Bookmarkk. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms</a>
          </div>
        </div>
      </div>

      <style>{`

      `}</style>
    </footer>
  );
};

export default Footer;
