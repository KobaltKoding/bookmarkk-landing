import { useState } from 'react';
import Hero from './components/Hero';
import IntentGap from './components/IntentGap';
import HowItWorks from './components/HowItWorks';
import Mission from './components/Mission';
import Features from './components/Features';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import WaitlistModal from './components/WaitlistModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="app">
      <Navbar />
      <Hero onJoinClick={openModal} />
      <Mission />
      <IntentGap />
      <HowItWorks />
      <Features />
      <Footer />
      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
