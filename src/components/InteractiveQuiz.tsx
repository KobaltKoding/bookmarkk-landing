"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: 1,
    question:
      "What does James Clear argue is more important than setting goals?",
    options: [
      "Having a detailed plan",
      "Building better systems",
      "Increasing willpower",
      "Finding motivation",
    ],
    correctAnswer: 1,
    explanation:
      "Clear argues that goals are about the results you want, while systems are about the processes that lead to those results.",
  },
  {
    id: 2,
    question: 'What is the "1% better every day" concept?',
    options: [
      "Working 1% harder each day",
      "Small improvements compound over time",
      "Setting daily micro-goals",
      "Tracking 1% of your progress",
    ],
    correctAnswer: 1,
    explanation:
      "If you get 1% better each day for a year, you'll end up 37 times better by year's end through compound growth.",
  },
  {
    id: 3,
    question:
      "According to the chapter, what happens to people who focus only on goals?",
    options: [
      "They achieve more success",
      "They maintain motivation longer",
      "Winners and losers have the same goals",
      "They build better habits",
    ],
    correctAnswer: 2,
    explanation:
      "Clear points out that every Olympian wants to win gold, but it's the systems that differentiate winners from losers.",
  },
];

export default function InteractiveQuiz() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore((s) => s + 1);
      setTotalXP((xp) => xp + 20);
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
    setTotalXP(0);
    setFinished(false);
  };

  const q = questions[currentQuestion];

  return (
    <section className="py-24 px-6" ref={ref} id="try-it">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-wider text-accent-purple mb-3">
            Try it yourself
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Experience the Bookmarkk difference
          </h2>
          <p className="text-text-secondary">
            Take this sample quiz from &ldquo;Atomic Habits&rdquo; Chapter 1
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="backdrop-blur-md bg-black/40 border border-white/[0.08] rounded-2xl overflow-hidden glow-purple"
        >
          {/* Quiz header */}
          <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg">&#128218;</span>
              <div>
                <p className="text-sm font-semibold">Atomic Habits</p>
                <p className="text-xs text-text-muted">
                  Ch. 1: The Surprising Power of Atomic Habits
                </p>
              </div>
            </div>
            {started && !finished && (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${i < currentQuestion
                        ? "bg-success"
                        : i === currentQuestion
                          ? "bg-accent-purple"
                          : "bg-white/10"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-text-muted ml-1">
                  {currentQuestion + 1}/{questions.length}
                </span>
              </div>
            )}
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {!started ? (
                <motion.div
                  key="start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <div className="text-5xl mb-4">&#129504;</div>
                  <h3 className="text-xl font-bold mb-2">
                    Ready to test your knowledge?
                  </h3>
                  <p className="text-text-secondary mb-6">
                    See how Bookmarkk quizzes work.
                  </p>
                  <button
                    onClick={() => setStarted(true)}
                    className="gradient-btn px-6 py-3 rounded-full font-semibold text-white"
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
                  className="text-center py-8"
                >
                  <div className="text-5xl mb-4">
                    {score === 3 ? "🎉" : score >= 2 ? "👏" : "📚"}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {score === 3
                      ? "Perfect score!"
                      : score >= 2
                        ? "Great job!"
                        : "Keep reading!"}
                  </h3>
                  <p className="text-text-secondary mb-4">
                    You got {score}/{questions.length} correct
                  </p>

                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-success/10 border border-success/30 mb-6">
                    <svg
                      className="w-5 h-5 text-success"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span className="text-success font-bold text-lg">
                      +{totalXP} XP earned
                    </span>
                  </div>

                  <p className="text-text-secondary text-sm mb-6">
                    This is how every chapter works in Bookmarkk.
                    <br />
                    Read. Quiz. Earn. Compete.
                  </p>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={reset}
                      className="px-5 py-2.5 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors"
                    >
                      Try Again
                    </button>
                    <a
                      href="#join"
                      className="gradient-btn px-5 py-2.5 rounded-full text-sm font-semibold text-white"
                    >
                      Join Waitlist
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-5">{q.question}</h3>

                  <div className="space-y-3">
                    {q.options.map((option, i) => {
                      const isCorrect = i === q.correctAnswer;
                      const isSelected = i === selectedAnswer;
                      let optionStyle =
                        "border-white/5 hover:border-white/10 hover:bg-white/5";

                      if (answered) {
                        if (isCorrect) {
                          optionStyle =
                            "border-success/50 bg-success/10 text-success";
                        } else if (isSelected && !isCorrect) {
                          optionStyle =
                            "border-red-500/50 bg-red-500/10 text-red-400";
                        } else {
                          optionStyle = "border-white/5 opacity-50";
                        }
                      } else if (isSelected) {
                        optionStyle =
                          "border-accent-purple/50 bg-accent-purple/10";
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => handleAnswer(i)}
                          disabled={answered}
                          className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 ${optionStyle} ${answered && isCorrect
                            ? "animate-[correctPulse_0.6s_ease-out]"
                            : ""
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0 ${answered && isCorrect
                                ? "border-success bg-success text-navy-900"
                                : answered && isSelected && !isCorrect
                                  ? "border-red-500 bg-red-500 text-white"
                                  : "border-current"
                                }`}
                            >
                              {answered && isCorrect
                                ? "✓"
                                : answered && isSelected && !isCorrect
                                  ? "✗"
                                  : String.fromCharCode(65 + i)}
                            </span>
                            <span className="text-sm">{option}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation & Next */}
                  <AnimatePresence>
                    {answered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4"
                      >
                        <div className="p-4 rounded-xl bg-navy-700/50 border border-white/5">
                          <p className="text-sm text-text-secondary">
                            {q.explanation}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {selectedAnswer === q.correctAnswer ? (
                            <div className="flex items-center gap-2 text-success text-sm font-medium">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                              </svg>
                              +20 XP
                            </div>
                          ) : (
                            <span className="text-sm text-text-muted">
                              No XP earned
                            </span>
                          )}
                          <button
                            onClick={nextQuestion}
                            className="gradient-btn px-5 py-2 rounded-full text-sm font-semibold text-white"
                          >
                            {currentQuestion < questions.length - 1
                              ? "Next Question"
                              : "See Results"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
