"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import HowItWorks from "@/components/HowItWorks";
import InteractiveQuiz from "@/components/InteractiveQuiz";
// import Testimonials from "@/components/Testimonials"; // Hidden until real testimonials
import VisualStats from "@/components/VisualStats";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import CanvasSequence from "@/components/CanvasSequence";
import WaitlistModal from "@/components/WaitlistModal";
import LegalModal from "@/components/LegalModal";

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<"privacy" | "terms">("privacy");

  const openWaitlist = () => setIsWaitlistOpen(true);
  const openLegal = (tab: "privacy" | "terms") => {
    setLegalTab(tab);
    setIsLegalOpen(true);
  };

  return (
    <>
      <Navbar onJoinClick={openWaitlist} />
      {/* <CanvasSequence /> */}
      <main className="relative z-10">
        <Hero onJoinClick={openWaitlist} />
        <ProblemSolution />
        <HowItWorks />
        <InteractiveQuiz onJoinClick={openWaitlist} />
        <VisualStats />
        {/* <Testimonials /> — Hidden until real testimonials */}
        <FinalCTA onJoinClick={openWaitlist} />
      </main>
      <Footer onOpenLegal={openLegal} />

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        initialTab={legalTab}
      />
    </>
  );
}
