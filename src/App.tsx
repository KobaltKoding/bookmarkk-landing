import { useState } from 'react';
import Hero from './components/Hero';
import IntentGap from './components/IntentGap';
import HowItWorks from './components/HowItWorks';
import Mission from './components/Mission';
import Features from './components/Features';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import WaitlistModal from './components/WaitlistModal';
import LegalModal from './components/LegalModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openLegalModal = (tab: 'privacy' | 'terms') => {
    setLegalTab(tab);
    setIsLegalModalOpen(true);
  };
  const closeLegalModal = () => setIsLegalModalOpen(false);

  return (
    <div className="app">
      <Navbar />
      <Hero onJoinClick={openModal} />
      <Mission />
      <IntentGap />
      <HowItWorks />
      <Features />
      <Footer onOpenLegal={openLegalModal} />
      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
      <LegalModal isOpen={isLegalModalOpen} onClose={closeLegalModal} initialTab={legalTab} />
    </div>
  );
}

export default App;
