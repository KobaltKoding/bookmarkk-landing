"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "What is resilience, as described in the chapter?",
    options: [
      "The ability to avoid all negative emotions.",
      "The ability to persevere and adapt to change, focusing on what matters.",
      "A state of perfect acceptance of everything.",
      "The absence of all challenges in life.",
    ],
    correctAnswer: 1,
    explanation: "Resilience is not about avoiding difficulty, but about how we respond to it by staying focused on our core principles and adapting to change.",
  },
  {
    id: 2,
    question: "What does James Clear argue is more important than setting goals?",
    options: [
      "Having a detailed plan",
      "Building better systems",
      "Increasing willpower",
      "Finding motivation",
    ],
    correctAnswer: 1,
    explanation: "Clear argues that goals are about the results you want, while systems are about the processes that lead to those results.",
  },
  {
    id: 3,
    question: 'What is the "1% better every day" concept?',
    options: [
      "Working 1% harder each day",
      "Small improvements compound over time",
      "Setting daily micro-goals",
      "Tracking 1% of your progress",
    ],
    correctAnswer: 1,
    explanation: "If you get 1% better each day for a year, you'll end up 37 times better by year's end through compound growth.",
  },
];

export default function InteractiveQuiz({ onJoinClick }: { onJoinClick?: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(58);

  useEffect(() => {
    if (started && !finished && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (started && !finished && timeLeft === 0) {
      setFinished(true);
    }
  }, [started, finished, timeLeft]);

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null || answered) return;

    setAnswered(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setTimeLeft(58);
  };

  const q = questions[currentQuestion];

  return (
    <section className="py-24 px-6 relative" ref={ref} id="try-it">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-sm uppercase tracking-widest text-text-muted mb-3 font-mono">
            Interactive Preview
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary">
            Try the Experience
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="backdrop-blur-xl bg-black/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/5"
        >
          {/* Header */}
          <div className="px-5 py-6 flex items-center gap-4">
            <button
              onClick={reset}
              className="w-10 h-10 bg-white flex items-center justify-center rounded-sm shrink-0 hover:bg-white/90 transition-colors"
            >
              <X className="w-6 h-6 text-[#1a1a1a] stroke-[2.5]" />
            </button>

            <div className="flex-1 h-2.5 bg-[#1a1a1a] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#404040] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="bg-[#1a1a1a] px-3 py-1.5 rounded-md">
              <span className="text-sm font-bold text-[#808080]">{timeLeft}s</span>
            </div>
          </div>

          <div className="flex-1 px-5 pt-4 pb-8 flex flex-col">
            <AnimatePresence mode="wait">
              {!started ? (
                <motion.div
                  key="start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-4xl">
                    🧠
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Test Your Resilience</h3>
                    <p className="text-text-secondary text-sm px-8">
                      Experience the Bookmarkk assessment flow for &ldquo;Resilience&rdquo; Chapter 1.
                    </p>
                  </div>
                  <button
                    onClick={() => setStarted(true)}
                    className="w-full bg-[#8b5e1d] hover:bg-[#a67124] text-black py-4 rounded-xl font-black text-lg transition-colors mt-auto uppercase tracking-wider"
                  >
                    Start Quiz
                  </button>
                </motion.div>
              ) : finished ? (
                <motion.div
                  key="finished"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
                >
                  <div className="text-6xl">
                    {score === questions.length ? "�" : score >= 1 ? "🌟" : "�"}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Assessment Complete
                    </h3>
                    <p className="text-[#808080] font-medium uppercase tracking-widest text-xs">
                      Score: {score} / {questions.length}
                    </p>
                  </div>

                  <div className="space-y-4 w-full">
                    <button
                      onClick={onJoinClick}
                      className="w-full bg-[#8b5e1d] hover:bg-[#a67124] text-black py-4 rounded-xl font-black text-lg transition-colors uppercase tracking-wider"
                    >
                      Join waitlist
                    </button>
                    <button
                      onClick={reset}
                      className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-bold text-lg transition-colors uppercase tracking-wider border border-white/5"
                    >
                      Try Again
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col"
                >
                  <h3 className="text-2xl md:text-[26px] font-black text-white leading-[1.2] mb-10">
                    {q.question}
                  </h3>

                  <div className="space-y-4 flex-1">
                    {q.options.map((option, i) => {
                      const isSelected = i === selectedAnswer;
                      const isCorrect = i === q.correctAnswer;

                      let optionClass = "bg-[#262626] border-transparent text-[#b0b0b0]";

                      if (isSelected) {
                        optionClass = "bg-[#333333] border-white/20 text-white";
                      }

                      if (answered) {
                        if (isCorrect) {
                          optionClass = "bg-green-500/20 border-green-500/50 text-green-400";
                        } else if (isSelected) {
                          optionClass = "bg-red-500/20 border-red-500/50 text-red-400";
                        } else {
                          optionClass = "bg-[#1a1a1a] opacity-40 border-transparent text-[#666666]";
                        }
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => handleSelect(i)}
                          disabled={answered}
                          className={`w-full text-center px-6 py-5 rounded-2xl border-2 transition-all duration-200 font-bold text-base md:text-lg leading-snug shadow-lg ${optionClass}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-4">
                    {answered ? (
                      <button
                        onClick={nextQuestion}
                        className="w-full bg-white text-black py-4 rounded-xl font-black text-lg transition-colors uppercase tracking-wider"
                      >
                        {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
                      </button>
                    ) : (
                      <button
                        onClick={handleCheckAnswer}
                        disabled={selectedAnswer === null}
                        className={`w-full py-4 rounded-xl font-black text-lg transition-all uppercase tracking-wider ${selectedAnswer !== null
                          ? "bg-[#8b5e1d] text-black shadow-[0_0_20px_rgba(139,94,29,0.3)]"
                          : "bg-[#1a1a1a] text-[#404040] cursor-not-allowed"
                          }`}
                      >
                        Check Answer
                      </button>
                    )}

                    {answered && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mt-4 text-[#808080] text-sm font-medium italic px-4"
                      >
                        &ldquo;{q.explanation}&rdquo;
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
