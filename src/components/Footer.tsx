interface FooterProps {
  onOpenLegal: (tab: 'privacy' | 'terms') => void;
}

const Footer = ({ onOpenLegal }: FooterProps) => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>bookmarkk</div>
          <p style={{ color: 'var(--text-dim)' }}>Conquer your reading list.</p>
        </div>



        <div className="footer-legal">
          <p>&copy; {new Date().getFullYear()} bookmarkk. All rights reserved.</p>
          <div className="legal-links">
            <button onClick={() => onOpenLegal('privacy')} className="legal-link">Privacy Policy</button>
            <button onClick={() => onOpenLegal('terms')} className="legal-link">Terms of Service</button>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
