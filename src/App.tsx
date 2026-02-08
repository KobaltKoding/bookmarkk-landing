import { useState } from 'react';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import HowItWorks from './components/HowItWorks';
import SocialProof from './components/SocialProof';
import Differentiation from './components/Differentiation';
import FinalCTA from './components/FinalCTA';
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
      <Navbar onJoinClick={openModal} />
      <Hero onJoinClick={openModal} />
      <ProblemSection />
      <HowItWorks />
      <SocialProof />
      <Differentiation />
      <FinalCTA onJoinClick={openModal} />
      <Footer onOpenLegal={openLegalModal} />
      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
      <LegalModal isOpen={isLegalModalOpen} onClose={closeLegalModal} initialTab={legalTab} />
    </div>
  );
}

export default App;
