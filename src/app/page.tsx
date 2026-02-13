import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import HowItWorks from "@/components/HowItWorks";
import InteractiveQuiz from "@/components/InteractiveQuiz";
import Testimonials from "@/components/Testimonials";
import VisualStats from "@/components/VisualStats";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import CanvasSequence from "@/components/CanvasSequence";
import OverlaySection from "@/components/OverlaySection";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Fixed canvas — tracks scroll internally */}
      <CanvasSequence />

      {/* Scrollable content layer — floats above the canvas */}
      <div className="relative z-10" style={{ pointerEvents: "none" }}>
        <main>
          {/* ─── HERO ─── */}
          <OverlaySection align="center" className="min-h-screen pt-16">
            <div style={{ pointerEvents: "auto" }}>
              <Hero />
            </div>
          </OverlaySection>

          {/* Spacer — book starts opening */}
          <div className="h-[60vh]" />

          {/* ─── PROBLEM / SOLUTION ─── */}
          <OverlaySection align="center" className="min-h-screen">
            <div style={{ pointerEvents: "auto" }}>
              <ProblemSolution />
            </div>
          </OverlaySection>

          <div className="h-[40vh]" />

          {/* ─── HOW IT WORKS ─── */}
          <OverlaySection align="center" className="min-h-screen" id="how-it-works">
            <div style={{ pointerEvents: "auto" }}>
              <HowItWorks />
            </div>
          </OverlaySection>

          <div className="h-[40vh]" />

          {/* ─── INTERACTIVE QUIZ ─── */}
          <OverlaySection align="center" className="min-h-screen" id="try-it">
            <div style={{ pointerEvents: "auto" }}>
              <InteractiveQuiz />
            </div>
          </OverlaySection>

          <div className="h-[40vh]" />

          {/* ─── VISUAL STATS ─── */}
          <OverlaySection align="center">
            <div style={{ pointerEvents: "auto" }}>
              <VisualStats />
            </div>
          </OverlaySection>

          <div className="h-[40vh]" />

          {/* ─── TESTIMONIALS ─── */}
          <OverlaySection align="center" className="min-h-screen">
            <div style={{ pointerEvents: "auto" }}>
              <Testimonials />
            </div>
          </OverlaySection>

          <div className="h-[40vh]" />

          {/* ─── FINAL CTA ─── */}
          <OverlaySection align="center" className="min-h-screen" id="join">
            <div style={{ pointerEvents: "auto" }}>
              <FinalCTA />
            </div>
          </OverlaySection>

          <div className="h-[20vh]" />
        </main>

        {/* Footer — fully interactive */}
        <div style={{ pointerEvents: "auto" }}>
          <Footer />
        </div>
      </div>
    </>
  );
}
