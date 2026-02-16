"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const bookQuestions = {
  "Atomic Habits": {
    author: "James Clear",
    questions: [
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
    ],
  },
  "Ikigai": {
    author: "Héctor García and Francesc Miralles",
    questions: [
      {
        id: 1,
        question: 'What does the term "Ikigai" literally translate to?',
        options: [
          "Eternal youth",
          "A reason for being",
          "Hard work and discipline",
          "Peace and quiet",
        ],
        correctAnswer: 1,
        explanation: "Ikigai is a Japanese concept that means 'a reason for being' - the intersection of what you love, what you're good at, what the world needs, and what you can be paid for.",
      },
      {
        id: 2,
        question: 'According to the authors, what is the "80% Rule" (Hara Hachi Bu) regarding diet?',
        options: [
          "Drink water until you are 80% hydrated",
          "Eat only 80% of your calories from plants",
          "Stop eating when you feel 80% full",
          "Fast for 80% of the day",
        ],
        correctAnswer: 2,
        explanation: "Hara Hachi Bu is a Confucian teaching that instructs people to eat until they are 80% full, which is practiced in Okinawa and contributes to longevity.",
      },
      {
        id: 3,
        question: "Which state of being is emphasized as a key to longevity, where one loses the sense of time while being immersed in an activity?",
        options: [
          "Zen",
          "Meditation",
          "Focus",
          "Flow",
        ],
        correctAnswer: 3,
        explanation: "Flow is a state of complete immersion in an activity where you lose track of time. It's associated with happiness, productivity, and longevity.",
      },
    ],
  },
  "The Palace of Illusions": {
    author: "Chitra Banerjee Divakaruni",
    questions: [
      {
        id: 1,
        question: "From whose perspective is this reimagining of the Mahabharata told?",
        options: [
          "Kunti",
          "Gandhari",
          "Panchaali (Draupadi)",
          "Subhadra",
        ],
        correctAnswer: 2,
        explanation: "The Palace of Illusions retells the Mahabharata from Draupadi's (Panchaali's) perspective, giving voice to her experiences and emotions.",
      },
      {
        id: 2,
        question: "Who is the secret brother of the Pandavas that Panchaali feels a mysterious, tragic connection to?",
        options: [
          "Karna",
          "Abhimanyu",
          "Dhrishtadyumna",
          "Vidura",
        ],
        correctAnswer: 0,
        explanation: "Karna, the son of Kunti born before her marriage, is the secret half-brother of the Pandavas. Draupadi's complex feelings toward him are a central element of the story.",
      },
      {
        id: 3,
        question: 'What event in the "Palace of Illusions" serves as a major catalyst for the conflict with Duryodhana?',
        options: [
          "He is denied a room in the palace",
          "He falls into a pool of water he mistook for a floor",
          "He is poisoned at a banquet",
          "He loses a game of dice in the main hall",
        ],
        correctAnswer: 1,
        explanation: "Duryodhana's humiliation when he falls into a pool in the palace of illusions, combined with Draupadi's laughter, becomes a key moment that fuels his hatred.",
      },
    ],
  },
  "Zero to One": {
    author: "Peter Thiel and Blake Masters",
    questions: [
      {
        id: 1,
        question: 'What does Peter Thiel mean by going from "0 to 1"?',
        options: [
          "Taking a company public",
          "Creating something entirely new",
          "Improving an existing product by 10%",
          "Hiring your first employee",
        ],
        correctAnswer: 1,
        explanation: "Going from '0 to 1' means creating something fundamentally new and original, rather than copying or iterating on what already exists ('1 to n').",
      },
      {
        id: 2,
        question: "According to Thiel, what type of company should every entrepreneur strive to build?",
        options: [
          "A perfect competition firm",
          "A non-profit organization",
          "A creative monopoly",
          "A franchise model",
        ],
        correctAnswer: 2,
        explanation: "Thiel argues that successful companies should aim to be creative monopolies - offering something so unique and valuable that no one else can compete directly.",
      },
      {
        id: 3,
        question: 'What is the "Power Law" in venture capital as described in the book?',
        options: [
          "The law that states more employees equals less efficiency",
          "A small handful of companies radically outperform all others combined",
          "The idea that 50% of startups will always fail",
          "The rule that founders must retain 51% ownership",
        ],
        correctAnswer: 1,
        explanation: "The Power Law states that in venture capital, a small number of companies (often just one) will generate returns equal to or greater than the entire rest of the portfolio combined.",
      },
    ],
  },
  "Anxious People": {
    author: "Fredrik Backman",
    questions: [
      {
        id: 1,
        question: "What event serves as the primary catalyst for the story's plot?",
        options: [
          "A bank robbery that turns into a hostage situation",
          "A bridge collapse in a small town",
          "A suspicious death at a wedding",
          "A missing child report",
        ],
        correctAnswer: 0,
        explanation: "The story begins with a failed bank robbery that accidentally becomes a hostage situation at an apartment viewing, bringing together a group of anxious strangers.",
      },
      {
        id: 2,
        question: 'What was the "bank robber" actually trying to accomplish?',
        options: [
          "To fund a luxury vacation",
          "To pay off gambling debts",
          "To get enough money to pay rent and keep their children",
          "To protest against the banking system",
        ],
        correctAnswer: 2,
        explanation: "The robber was a desperate parent trying to get 6,500 kronor to pay rent and avoid losing custody of their children - a relatable human struggle rather than criminal intent.",
      },
      {
        id: 3,
        question: "What is the underlying theme that connects the characters trapped in the apartment?",
        options: [
          "They are all secret relatives",
          'They all have shared anxieties and are "idiots" together',
          "They are all witnesses to the same crime from years ago",
          "They all work for the same corporation",
        ],
        correctAnswer: 1,
        explanation: "The novel explores how all the characters are dealing with their own anxieties and imperfections, showing that we're all 'idiots' struggling through life together with compassion and humor.",
      },
    ],
  },
};

const availableBooks = Object.keys(bookQuestions);

export default function InteractiveQuiz({ onJoinClick }: { onJoinClick?: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [selectedBook, setSelectedBook] = useState<string>(availableBooks[0]);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showXP, setShowXP] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (started && !finished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [started, finished]);

  const questions = bookQuestions[selectedBook as keyof typeof bookQuestions].questions;
  const bookAuthor = bookQuestions[selectedBook as keyof typeof bookQuestions].author;


  const handleSelect = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null || answered) return;

    setAnswered(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore((s) => s + 1);
      setShowXP(true);
      setTimeout(() => setShowXP(false), 1500);
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
    setTimeLeft(30);
  };

  const q = questions[currentQuestion];

  return (
    <section className="py-24 px-6 relative" ref={ref} id="try-it">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm -z-10" />
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-sm uppercase tracking-widest text-[#75BAFF] mb-3 font-mono font-bold">
            Interactive Preview
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1D59BB] tracking-tighter leading-[1.1]">
            Try the Experience
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-[2.5rem] p-3 md:p-5 shadow-2xl flex flex-col min-h-[500px] backdrop-blur-[10px]"
          style={{
            background: 'rgba(252, 252, 252, 0.8)',
            border: '1px solid rgba(29, 89, 187, 0.1)'
          }}
        >
          {/* Header */}
          <div className="px-4 py-4 flex items-center gap-3">
            <button
              onClick={reset}
              className="w-10 h-10 bg-white flex items-center justify-center rounded-sm shrink-0 hover:bg-white/90 transition-colors"
            >
              <X className="w-6 h-6 text-[#1a1a1a] stroke-[2.5]" />
            </button>

            <div className="flex-1 flex flex-col gap-2">
              <div className="h-2.5 bg-[#1D59BB]/20 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full rounded-full origin-left"
                  initial={{ width: "100%" }}
                  animate={{
                    width: started && !finished ? `${(timeLeft / 30) * 100}%` : "100%",
                    backgroundColor: timeLeft < 10 && started ? "#ef4444" : "#1D59BB"
                  }}
                  transition={{
                    width: { duration: started && !finished ? 1 : 0, ease: "linear" },
                    backgroundColor: { duration: 0.3 }
                  }}
                />
              </div>
              {/* Question Dots */}
              <div className="flex gap-1.5 px-0.5">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < currentQuestion ? "bg-[#404040]" :
                      i === currentQuestion ? "bg-white/40" : "bg-white/5"
                      }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-[#1D59BB] px-3 py-1.5 rounded-md min-w-[50px] text-center">
              <span className={`text-sm font-black tabular-nums transition-colors ${timeLeft < 10 ? "text-red-500" : "text-white"}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          <div className="flex-1 px-4 pt-3 pb-6 flex flex-col">
            <AnimatePresence mode="wait">
              {!started ? (
                <motion.div
                  key="start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-3xl">
                    🧠
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1D59BB] mb-1">Test Your Knowledge</h3>
                    <p className="text-[#1D59BB]/70 text-xs px-6 font-medium">
                      Experience the Bookmarkk assessment flow with curated questions.
                    </p>
                  </div>

                  {/* Book Selector Pills */}
                  <div className="w-full space-y-2">
                    <label className="block text-[#1D59BB]/60 text-[10px] uppercase tracking-wider font-bold text-center">
                      Choose Your Book
                    </label>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {availableBooks.map((book) => (
                        <button
                          key={book}
                          onClick={() => setSelectedBook(book)}
                          className={`px-4 py-2.5 rounded-full font-bold text-xs transition-all border-2 ${selectedBook === book
                            ? 'bg-[#1D59BB] text-white border-[#1D59BB]'
                            : 'bg-[#1D59BB]/5 text-[#1D59BB] border-[#1D59BB]/20 hover:border-[#75BAFF]'
                            }`}
                        >
                          {book}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setStarted(true)}
                    className="w-full bg-[#1D59BB] hover:bg-[#1D59BB]/90 text-white py-3 rounded-xl font-black text-base transition-colors mt-auto uppercase tracking-wider shadow-lg"
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
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-5"
                >
                  <div className="text-5xl">
                    {score === questions.length ? "🎉" : score >= 1 ? "🌟" : "💪"}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1D59BB] mb-2">
                      Assessment Complete
                    </h3>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      className="mt-4"
                    >
                      <p className="text-[#75BAFF] font-black text-4xl mb-1">
                        {score * 10} XP
                      </p>
                      <p className="text-[#808080] font-medium uppercase tracking-widest text-xs">
                        out of 30 XP
                      </p>
                    </motion.div>
                  </div>

                  <div className="space-y-3 w-full">
                    <button
                      onClick={onJoinClick}
                      className="w-full bg-[#1D59BB] hover:bg-[#1D59BB]/90 text-white py-3 rounded-xl font-black text-base transition-colors uppercase tracking-wider shadow-lg"
                    >
                      Join waitlist
                    </button>
                    <button
                      onClick={reset}
                      className="w-full bg-[#1D59BB] hover:bg-[#1D59BB]/90 text-white py-3 rounded-xl font-black text-base transition-colors uppercase tracking-wider shadow-lg"
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
                  className="flex-1 flex flex-col relative"
                >
                  {/* Floating XP Animation */}
                  <AnimatePresence>
                    {showXP && (
                      <motion.div
                        initial={{ opacity: 0, y: 0, scale: 0.5 }}
                        animate={{ opacity: 1, y: -80, scale: 1 }}
                        exit={{ opacity: 0, y: -120 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
                      >
                        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-black text-3xl">
                          +10 XP
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <h3 className="text-xl md:text-2xl font-black text-[#1D59BB] leading-[1.2] mb-6">
                    {q.question}
                  </h3>

                  <div className="space-y-3 flex-1">
                    {q.options.map((option, i) => {
                      const isSelected = i === selectedAnswer;
                      const isCorrect = i === q.correctAnswer;

                      let optionClass = "bg-[#FEF3B3]/10 border-[#1D59BB]/5 text-[#1D59BB]/70 hover:border-[#75BAFF]";

                      if (isSelected) {
                        optionClass = "bg-[#1D59BB]/5 border-[#75BAFF] text-[#1D59BB]";
                      }

                      if (answered) {
                        if (isCorrect) {
                          optionClass = "bg-green-500/20 border-green-500/50 text-green-600";
                        } else if (isSelected) {
                          optionClass = "bg-red-500/20 border-red-500/50 text-red-600";
                        } else {
                          optionClass = "bg-transparent opacity-40 border-transparent text-[#1D59BB]/40";
                        }
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => handleSelect(i)}
                          disabled={answered}
                          className={`w-full flex justify-between items-center px-6 py-4 rounded-2xl border-2 transition-all duration-200 font-bold text-base group ${optionClass}`}
                        >
                          <span className="text-left">{option}</span>
                          <div className={`w-6 h-6 rounded-full border-4 shrink-0 transition-colors ${answered
                            ? (isCorrect ? "border-white" : isSelected ? "border-white" : "border-transparent opacity-0")
                            : "border-[#1D59BB]/10 group-hover:border-[#75BAFF]"
                            }`} />
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-3">
                    {answered ? (
                      <button
                        onClick={nextQuestion}
                        className="w-full bg-[#1D59BB] hover:bg-[#1D59BB]/90 text-white py-3 rounded-xl font-black text-base transition-colors uppercase tracking-wider shadow-lg"
                      >
                        {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
                      </button>
                    ) : (
                      <button
                        onClick={handleCheckAnswer}
                        disabled={selectedAnswer === null}
                        className={`w-full py-3 rounded-xl font-black text-base transition-all uppercase tracking-wider shadow-lg ${selectedAnswer !== null
                          ? "bg-[#1D59BB] text-white"
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
