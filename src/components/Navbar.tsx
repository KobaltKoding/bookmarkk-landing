import { useState, useEffect } from 'react';

const Navbar = ({ onJoinClick }: { onJoinClick: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`} style={{
      background: scrolled ? 'rgba(255,255,255,0.9)' : 'transparent',
      boxShadow: scrolled ? 'var(--shadow-sm)' : 'none'
    }}>
      <div className="container nav-content">
        <div className="logo" style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          fontFamily: 'var(--font-heading)',
          color: 'var(--text-main)'
        }}>
          bookmarkk
        </div>
        <div className="nav-links">
          <button className="btn-primary" onClick={onJoinClick} style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
            Join Season 1
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
