import { motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

const Navbar = ({ onJoinClick }: { onJoinClick: () => void }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'navbar--scrolled' : 'navbar--transparent'}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="nav-left">
        <span className="nav-logo">bookmarkk</span>
        <div className="nav-links">
          {['Overview', 'Features', 'How It Works', 'Community'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      <div className="nav-right">
        <button className="btn-nav-cta" onClick={onJoinClick}>
          <div className="btn-glow" />
          <span>Join Season 1</span>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
