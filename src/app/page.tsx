import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import HowItWorks from "@/components/HowItWorks";
import InteractiveQuiz from "@/components/InteractiveQuiz";
import Testimonials from "@/components/Testimonials";
import ComparisonTable from "@/components/ComparisonTable";
import FAQ from "@/components/FAQ";
import VisualStats from "@/components/VisualStats";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollVideoBackground from "@/components/ScrollVideoBackground";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <ScrollVideoBackground />
        <Hero />
        <ProblemSolution />
        <HowItWorks />
        <InteractiveQuiz />
        <VisualStats />
        <Testimonials />
        {/* <ComparisonTable /> */}
        {/* <FAQ /> */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
