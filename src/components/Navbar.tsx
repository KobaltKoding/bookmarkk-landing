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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <div className="nav-logo">bookmarkk</div>
        <button className="btn-primary" onClick={onJoinClick}>
          Join Season 1
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
