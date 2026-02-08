import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  // UPDATE: User provided Tally URL
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
          className="modal-content glass"
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

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          z-index: 2000;
          padding: 2rem 1rem;
          /* Allow the overlay itself to scroll if the modal is tall */
          overflow-y: auto;
          display: flex;
          align-items: flex-start; /* Aligns to top so we can scroll down */
          justify-content: center;
        }

        .modal-content {
          width: 100%;
          max-width: 500px;
          border-radius: 24px;
          padding: 1.5rem;
          position: relative;
          background: var(--bg-surface);
          border: 1px solid rgba(139, 92, 246, 0.2);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          overflow: hidden;
          /* Remove max-height to let it grow */
          height: auto;
          display: flex;
          flex-direction: column;
          /* Margin auto centers it vertically when there is space */
          margin: auto; 
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          color: var(--text-dim);
          padding: 0.5rem;
          border-radius: 50%;
          z-index: 20;
          background: rgba(0,0,0,0.4);
        }
        .close-btn:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .tally-wrapper {
          width: 100%;
          /* Fixed height large enough for the form without scroll */
          height: 650px; 
          background: transparent;
          overflow: hidden;
        }

        @media (max-width: 600px) {
          .modal-content {
            border-radius: 16px;
            /* Ensure it fits width but height is flexible */
            width: 100%;
          }
          
          /* Slightly shorter for mobile if needed, or keep tall */
          .tally-wrapper {
             height: 700px;
          }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default WaitlistModal;
