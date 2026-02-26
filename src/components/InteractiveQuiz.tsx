"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";
import confetti from "canvas-confetti";

// [... keeping all bookQuestions data exactly the same - copying from original ...]
const bookQuestions = {
    "Atomic Habits": {
        author: "James Clear",
        cover: "/assets/book-covers/AtomicHabits.webp",
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
        cover: "/assets/book-covers/ikiagi.jpeg",
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
    "Psychology of Money": {
        author: "Morgan Housel",
        cover: "/assets/book-covers/psychology_of_money.webp",
        questions: [
            {
                id: 1,
                question: "What does Morgan Housel argue is the most important factor in financial success?",
                options: [
                    "Intelligence and education",
                    "Behavior and psychology",
                    "Access to insider information",
                    "Starting with a large inheritance",
                ],
                correctAnswer: 1,
                explanation: "Housel argues that financial success is more about behavior than intelligence. How you behave with money matters more than what you know.",
            },
            {
                id: 2,
                question: "What concept does Housel use to explain why people make different financial decisions?",
                options: [
                    "Risk tolerance profiles",
                    "Economic class theory",
                    "No one is crazy — everyone has different experiences",
                    "Generational wealth gaps",
                ],
                correctAnswer: 2,
                explanation: "Housel argues that no one is crazy — people make financial decisions based on their unique life experiences, which vary enormously from person to person.",
            },
            {
                id: 3,
                question: "What is the key lesson about compounding in the book?",
                options: [
                    "Start investing as late as possible for maximum returns",
                    "Warren Buffett's wealth came mostly after age 65 due to compounding",
                    "Compounding only works for the ultra-wealthy",
                    "You need to earn a high salary for compounding to matter",
                ],
                correctAnswer: 1,
                explanation: "Housel highlights that the vast majority of Warren Buffett's wealth came after his 65th birthday, demonstrating the extraordinary power of long-term compounding.",
            },
        ],
    },
    "Harry Potter": {
        author: "J.K. Rowling",
        cover: "/assets/book-covers/hp.jpeg",
        questions: [
            {
                id: 1,
                question: "What is the core of Harry Potter's wand made from?",
                options: [
                    "Dragon heartstring",
                    "Unicorn hair",
                    "Phoenix feather",
                    "Veela hair",
                ],
                correctAnswer: 2,
                explanation: "Harry's wand contains a phoenix feather core — specifically from Fawkes, Dumbledore's phoenix, which also gave the feather in Voldemort's wand.",
            },
            {
                id: 2,
                question: "What does the Mirror of Erised show?",
                options: [
                    "The future",
                    "The deepest desire of the viewer's heart",
                    "Hidden enemies",
                    "The truth about any person",
                ],
                correctAnswer: 1,
                explanation: "The Mirror of Erised shows the deepest, most desperate desire of one's heart. 'Erised' is 'desire' spelled backwards.",
            },
            {
                id: 3,
                question: "What is a Horcrux?",
                options: [
                    "A powerful defensive spell",
                    "A magical creature from the Forbidden Forest",
                    "An object containing a piece of a wizard's soul",
                    "A potion that grants immortality",
                ],
                correctAnswer: 2,
                explanation: "A Horcrux is an object in which a Dark wizard has hidden a fragment of their soul for the purpose of attaining immortality.",
            },
        ],
    },
    "The Hunger Games": {
        author: "Suzanne Collins",
        cover: "/assets/book-covers/hunger.jpeg",
        questions: [
            {
                id: 1,
                question: "Why does Katniss volunteer as tribute?",
                options: [
                    "She wants fame and glory",
                    "She is forced by the government",
                    "To take her younger sister Prim's place",
                    "To prove she is the strongest fighter",
                ],
                correctAnswer: 2,
                explanation: "Katniss volunteers to take the place of her younger sister Primrose, whose name was drawn in the reaping for the 74th Hunger Games.",
            },
            {
                id: 2,
                question: "What is the name of the country where The Hunger Games takes place?",
                options: [
                    "Dystopia",
                    "The Capitol",
                    "New America",
                    "Panem",
                ],
                correctAnswer: 3,
                explanation: "The story is set in Panem, a nation built on the ruins of what was once North America, consisting of the Capitol and 12 (originally 13) districts.",
            },
            {
                id: 3,
                question: "What role does Haymitch Abernathy play in Katniss's journey?",
                options: [
                    "He is the Head Gamemaker",
                    "He is her mentor and former Hunger Games victor",
                    "He is the president of District 12",
                    "He is a rebel spy from the Capitol",
                ],
                correctAnswer: 1,
                explanation: "Haymitch is the only living Hunger Games victor from District 12 and serves as mentor to both Katniss and Peeta.",
            },
        ],
    },
    "Zero to One": {
        author: "Peter Thiel and Blake Masters",
        cover: "/assets/book-covers/zero_to_one.webp",
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

    // Trigger confetti on completion
    useEffect(() => {
        if (finished && score > 0) {
            const duration = 3000;
            const end = Date.now() + duration;

            const colors = ['#FEBD17', '#5B9BF5'];

            (function frame() {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 1,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }, [finished, score]);

    const questions = bookQuestions[selectedBook as keyof typeof bookQuestions].questions;
    const bookAuthor = bookQuestions[selectedBook as keyof typeof bookQuestions].author;
    const bookCover = bookQuestions[selectedBook as keyof typeof bookQuestions].cover;


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
            setTimeout(() => setShowXP(false), 2000);
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
        <section className="py-16 px-6 relative bg-[#1A2B6B]" ref={ref} id="try-it">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] mb-4">
                        <span className="text-[#FEBD17]">Try a Bookmarkk quiz</span>
                    </h2>
                    <p className="text-lg text-white/80 font-medium max-w-xl mx-auto">
                        Our users love this feature, it makes finishing every chapter worth it.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="rounded-[2.5rem] p-3 md:p-5 flex flex-col min-h-[500px] shadow-2xl bg-white"
                >
                    {/* Header - Only show during active quiz, hide on completion */}
                    {started && !finished && (
                        <div className="px-4 py-4 flex items-center gap-3">
                            <button
                                onClick={reset}
                                className="w-10 h-10 bg-[#1A2B6B]/10 flex items-center justify-center rounded-sm shrink-0 hover:bg-[#1A2B6B]/20 transition-colors"
                            >
                                <X className="w-6 h-6 text-[#1A2B6B] stroke-[2.5]" />
                            </button>

                            <div className="flex-1 flex flex-col gap-2">
                                <div className="h-2.5 bg-[#1A2B6B]/10 rounded-full overflow-hidden relative">
                                    <motion.div
                                        className="h-full rounded-full origin-left"
                                        initial={{ width: "100%" }}
                                        animate={{
                                            width: `${(timeLeft / 30) * 100}%`,
                                            backgroundColor: timeLeft < 10 ? "#ef4444" : "#FEBD17"
                                        }}
                                        transition={{
                                            width: { duration: 1, ease: "linear" },
                                            backgroundColor: { duration: 0.3 }
                                        }}
                                    />
                                </div>
                                {/* Question Dots */}
                                <div className="flex gap-1.5 px-0.5">
                                    {questions.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < currentQuestion ? "bg-[#FEBD17]" :
                                                i === currentQuestion ? "bg-[#1A2B6B]/40" : "bg-[#1A2B6B]/10"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#FEBD17] px-3 py-1.5 rounded-md min-w-[50px] text-center">
                                <span className={`text-sm font-black tabular-nums transition-colors ${timeLeft < 10 ? "text-red-500" : "text-[#1A2B6B]"}`}>
                                    {timeLeft}s
                                </span>
                            </div>
                        </div>
                    )}

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
                                    {/* Book Cover Selector */}
                                    <div className="w-full space-y-4">
                                        <label className="block text-[#1A2B6B]/50 text-xs uppercase tracking-wider font-bold text-center">
                                            Choose Your Book
                                        </label>
                                        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
                                            {availableBooks.map((book) => {
                                                const bookData = bookQuestions[book as keyof typeof bookQuestions];
                                                const isSelected = selectedBook === book;
                                                return (
                                                    <motion.button
                                                        key={book}
                                                        onClick={() => setSelectedBook(book)}
                                                        whileHover={{ y: -4 }}
                                                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                                        className="relative group"
                                                    >
                                                        <div className={`relative aspect-[2/3] rounded-md overflow-hidden shadow-lg transition-all border-4 ${isSelected ? 'border-[#FEBD17]' : 'border-transparent'
                                                            }`}
                                                            style={{
                                                                boxShadow: isSelected ? '0 0 20px rgba(254,189,23,0.4)' : 'inset 2px 0 4px rgba(0,0,0,0.2)'
                                                            }}
                                                        >
                                                            <img
                                                                src={bookData.cover}
                                                                alt={book}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setStarted(true)}
                                        className="w-full bg-[#FEBD17] hover:bg-[#FFD54F] text-[#1A2B6B] py-3 rounded-xl font-black text-base transition-colors mt-auto uppercase tracking-wider shadow-lg"
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
                                    className="flex-1 flex flex-col items-center justify-center text-center space-y-5 py-8"
                                >
                                    <div className="text-6xl">
                                        {score === questions.length ? "🎉" : score >= 2 ? "👏" : score === 0 ? "😅" : "💪"}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-[#1A2B6B] mb-2">
                                            {score === 0 ? "Not quite there yet!" : "Great job!"}
                                        </h3>
                                        <p className="text-[#1A2B6B]/70 text-lg font-medium mb-4">
                                            You got {score}/{questions.length} correct
                                        </p>
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                            className="inline-flex items-center gap-2 bg-emerald-500/20 border-2 border-emerald-400/50 px-6 py-3 rounded-2xl"
                                        >
                                            <Zap className="w-5 h-5 text-emerald-400" fill="currentColor" />
                                            <span className="text-emerald-400 font-black text-2xl">
                                                +{score * 10} XP earned
                                            </span>
                                        </motion.div>
                                    </div>

                                    <div className="space-y-2 text-[#1A2B6B]/60 text-sm max-w-sm">
                                        {score === 0 ? (
                                            <p className="font-medium text-[#1A2B6B]/70">
                                                Join Bookmarkk to turn those pages into progress. <br />
                                                <span className="font-bold text-[#1A2B6B]">We'll help you remember what you read! 📚</span>
                                            </p>
                                        ) : (
                                            <>
                                                <p className="font-medium">
                                                    This is how every chapter works in Bookmarkk.
                                                </p>
                                                <p className="font-bold text-base text-[#1A2B6B]">
                                                    Read. Quiz. Grow. Compete.
                                                </p>
                                            </>
                                        )}
                                    </div>

                                    <div className="space-y-3 w-full">
                                        <button
                                            onClick={onJoinClick}
                                            className="w-full bg-[#FEBD17] hover:bg-[#FFD54F] text-[#1A2B6B] py-3 rounded-xl font-black text-base transition-colors uppercase tracking-wider shadow-lg"
                                        >
                                            Join Waitlist
                                        </button>
                                        <button
                                            onClick={reset}
                                            className="w-full bg-[#1A2B6B]/10 hover:bg-[#1A2B6B]/20 text-[#1A2B6B] py-3 rounded-xl font-black text-base transition-colors uppercase tracking-wider"
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
                                    {/* Enhanced XP Animation */}
                                    <AnimatePresence>
                                        {showXP && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 0, scale: 0, rotate: 0 }}
                                                animate={{
                                                    opacity: [0, 1, 1, 0],
                                                    y: -100,
                                                    scale: 1,
                                                    rotate: [0, 10, -5, 0]
                                                }}
                                                exit={{ opacity: 0, scale: 0 }}
                                                transition={{
                                                    duration: 2,
                                                    scale: { type: "spring", stiffness: 400, damping: 12 },
                                                    rotate: { duration: 0.5 }
                                                }}
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
                                            >
                                                <div className="bg-[#FEBD17] text-[#1A2B6B] px-6 md:px-10 py-3 md:py-5 rounded-2xl shadow-2xl font-black text-2xl md:text-4xl flex items-center gap-1 md:gap-2 whitespace-nowrap"
                                                    style={{
                                                        boxShadow: '0 0 40px rgba(254,189,23,0.6), 0 20px 50px rgba(0,0,0,0.3)'
                                                    }}
                                                >
                                                    <Zap className="w-5 h-5 md:w-8 md:h-8" fill="currentColor" />
                                                    +10 XP
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <h3 className="text-xl md:text-2xl font-black text-[#1A2B6B] leading-[1.2] mb-6">
                                        {q.question}
                                    </h3>

                                    <div className="space-y-3 flex-1">
                                        {q.options.map((option, i) => {
                                            const isSelected = i === selectedAnswer;
                                            const isCorrect = i === q.correctAnswer;

                                            let optionClass = "bg-[#1A2B6B]/5 border-[#1A2B6B]/10 text-[#1A2B6B]/70 hover:border-[#5B9BF5]";

                                            if (isSelected) {
                                                optionClass = "bg-[#5B9BF5]/20 border-[#5B9BF5] text-[#1A2B6B]";
                                            }

                                            if (answered) {
                                                if (isCorrect) {
                                                    optionClass = "bg-emerald-500/20 border-emerald-500/50 text-emerald-600";
                                                } else if (isSelected) {
                                                    optionClass = "bg-red-500/20 border-red-500/50 text-red-600";
                                                } else {
                                                    optionClass = "bg-transparent opacity-40 border-transparent text-[#1A2B6B]/40";
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
                                                        ? (isCorrect ? "border-emerald-600" : isSelected ? "border-red-600" : "border-transparent opacity-0")
                                                        : "border-[#1A2B6B]/10 group-hover:border-[#5B9BF5]"
                                                        }`} />
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-6 pt-3">
                                        {answered ? (
                                            <button
                                                onClick={nextQuestion}
                                                className="w-full bg-[#FEBD17] hover:bg-[#FFD54F] text-[#1A2B6B] py-3 rounded-xl font-black text-base transition-colors uppercase tracking-wider shadow-lg"
                                            >
                                                {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleCheckAnswer}
                                                disabled={selectedAnswer === null}
                                                className={`w-full py-3 rounded-xl font-black text-base transition-all uppercase tracking-wider shadow-lg ${selectedAnswer !== null
                                                    ? "bg-[#FEBD17] text-[#1A2B6B]"
                                                    : "bg-[#1A2B6B]/5 text-[#1A2B6B]/30 cursor-not-allowed"
                                                    }`}
                                            >
                                                Check Answer
                                            </button>
                                        )}

                                        {answered && (
                                            <motion.p
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-center mt-4 text-[#1A2B6B]/60 text-sm font-medium px-4"
                                            >
                                                "{q.explanation}"
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
