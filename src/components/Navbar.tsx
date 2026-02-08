import { useState, useEffect } from 'react';



const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
      <div className="container nav-content">
        <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>bookmarkk</div>
        <div className="nav-links">
          <button onClick={() => scrollToSection('mission')}>The Mission</button>
          <button onClick={() => scrollToSection('how-it-works')}>How it Works</button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
