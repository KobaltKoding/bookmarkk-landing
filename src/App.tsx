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
import CanvasSequence from './components/CanvasSequence';
import OverlaySection from './components/OverlaySection';

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
      {/* Fixed navbar */}
      <Navbar onJoinClick={openModal} />

      {/* Fixed canvas — tracks scroll internally */}
      <CanvasSequence />

      {/*
        Scrollable content layer.
        Total height drives the 240-frame animation.
        Sections float ABOVE the canvas via z-index.
      */}
      <div className="scroll-content-layer">
        {/* ─── BEAT 1: HERO (0–15%) ─── */}
        <OverlaySection align="center" className="hero-overlay">
          <Hero onJoinClick={openModal} />
        </OverlaySection>

        {/* Spacer — book starts opening */}
        <div className="spacer-60" />

        {/* ─── BEAT 2: PROGRESS / PROBLEM (15–40%) ─── */}
        <OverlaySection align="left" className="min-h-screen" id="overview">
          <ProblemSection />
        </OverlaySection>

        <div className="spacer-40" />

        {/* ─── BEAT 3: SOCIAL / HOW IT WORKS (40–65%) ─── */}
        <OverlaySection align="right" className="min-h-screen" id="how-it-works">
          <HowItWorks />
        </OverlaySection>

        <div className="spacer-40" />

        {/* ─── BEAT 4: RETENTION / SOCIAL PROOF (65–80%) ─── */}
        <OverlaySection align="center" className="min-h-screen" id="features">
          <SocialProof />
        </OverlaySection>

        <div className="spacer-40" />

        {/* ─── BEAT 4.5: DIFFERENTIATION (80–85%) ─── */}
        <OverlaySection align="center" className="min-h-screen">
          <Differentiation />
        </OverlaySection>

        <div className="spacer-40" />

        {/* ─── BEAT 5: CTA (85–100%) ─── */}
        <OverlaySection align="center" className="min-h-screen" id="community">
          <FinalCTA onJoinClick={openModal} />
        </OverlaySection>

        <div className="spacer-20" />

        {/* Footer sits at the bottom, fully interactive */}
        <Footer onOpenLegal={openLegalModal} />
      </div>

      {/* Modals — untouched */}
      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
      <LegalModal isOpen={isLegalModalOpen} onClose={closeLegalModal} initialTab={legalTab} />
    </div>
  );
}

export default App;
