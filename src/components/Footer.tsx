interface FooterProps {
  onOpenLegal: (tab: 'privacy' | 'terms') => void;
}

const Footer = ({ onOpenLegal }: FooterProps) => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">bookmarkk</div>

        <div className="footer-links">
          <button onClick={() => onOpenLegal('privacy')}>Privacy Policy</button>
          <button onClick={() => onOpenLegal('terms')}>Terms of Service</button>
        </div>

        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} bookmarkk. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
