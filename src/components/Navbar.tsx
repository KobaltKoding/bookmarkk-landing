import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const Navbar = ({ onJoinClick }: { onJoinClick: () => void }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Magnetic/Fluid scroll response
  const navOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const navScale = useTransform(scrollY, [0, 50], [1, 0.98]);

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
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ scale: navScale }}
    >
      <div className="nav-left">
        <span className="nav-logo" style={{ letterSpacing: '-0.05em' }}>bookmarkk</span>
        <div className="nav-links">
          {['Overview', 'Features', 'How It Works', 'Community'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {item}
            </motion.a>
          ))}
        </div>
      </div>

      <div className="nav-right">
        <motion.button
          className="btn-nav-cta"
          onClick={onJoinClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="btn-glow" />
          <span>Join Season 1</span>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
