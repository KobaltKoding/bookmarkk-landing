import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const TALLY_FORM_URL = "https://tally.so/embed/A7v0NW?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}><X size={20} /></button>

          <div className="tally-wrapper">
            <iframe
              src={TALLY_FORM_URL}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Join Bookmarkk"
              style={{ background: 'transparent', minHeight: '100%' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WaitlistModal;
