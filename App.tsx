
import React, { useState } from 'react';
import { GamePhase, Question, GameState } from './types';
import TileGrid from './components/TileGrid';
import QuestionBox from './components/QuestionBox';

// The mystery image provided by the user
const MYSTERY_IMAGE = "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=2000&auto=format&fit=crop"; 

const QUESTIONS: Question[] = [
  {
    id: 0,
    category: 'general',
    question: "What is the capital city of India?",
    options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
    correctAnswer: "New Delhi",
    explanation: "New Delhi has been the capital of India since 1911."
  },
  {
    id: 1,
    category: 'math',
    question: "What is 15 + 27?",
    options: ["32", "41", "42", "52"],
    correctAnswer: "42",
    explanation: "15 + 27 = 42."
  },
  {
    id: 2,
    category: 'general',
    question: "Which Indian state is famously known as 'God's Own Country'?",
    options: ["Tamil Nadu", "Karnataka", "Kerala", "Goa"],
    correctAnswer: "Kerala",
    explanation: "Kerala is known for its lush green landscapes and tranquil backwaters."
  },
  {
    id: 3,
    category: 'math',
    question: "What is 12 multiplied by 6?",
    options: ["62", "72", "82", "54"],
    correctAnswer: "72",
    explanation: "12 * 6 = 72."
  },
  {
    id: 4,
    category: 'general',
    question: "What is the national fruit of India?",
    options: ["Apple", "Banana", "Mango", "Guava"],
    correctAnswer: "Mango",
    explanation: "The Mango (Mangifera indica) is the national fruit of India."
  },
  {
    id: 5,
    category: 'math',
    question: "What is 150 minus 75?",
    options: ["65", "75", "85", "95"],
    correctAnswer: "75",
    explanation: "150 - 75 = 75."
  },
  {
    id: 6,
    category: 'general',
    question: "Which is the classical dance form that originated in Kerala?",
    options: ["Bharatanatyam", "Kathak", "Kathakali", "Kuchipudi"],
    correctAnswer: "Kathakali",
    explanation: "Kathakali is a major form of classical Indian dance characterized by its elaborate makeup and costumes."
  },
  {
    id: 7,
    category: 'math',
    question: "What is 9 times 9?",
    options: ["71", "81", "91", "89"],
    correctAnswer: "81",
    explanation: "9 * 9 = 81."
  },
  {
    id: 8,
    category: 'general',
    question: "Who is known as the 'Father of the Nation' in India?",
    options: ["Jawaharlal Nehru", "Subhas Chandra Bose", "Mahatma Gandhi", "Sardar Patel"],
    correctAnswer: "Mahatma Gandhi",
    explanation: "Mahatma Gandhi led India to independence through non-violent civil disobedience."
  },
  {
    id: 9,
    category: 'math',
    question: "What is 40 divided by 8?",
    options: ["4", "5", "6", "8"],
    correctAnswer: "5",
    explanation: "40 / 8 = 5."
  }
];

const TILE_COUNT = 10;

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const App: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.SETUP);
  const [gameState, setGameState] = useState<GameState>(() => ({
    theme: 'India & Kerala Trivia',
    imageUrl: MYSTERY_IMAGE,
    questions: shuffleArray(QUESTIONS),
    currentQuestionIndex: 0,
    revealedTiles: [],
    score: 0,
    totalTiles: TILE_COUNT
  }));
  const [showFeedback, setShowFeedback] = useState<{ correct: boolean, explanation: string } | null>(null);
  const [showBonusMessage, setShowBonusMessage] = useState(false);

  const startGame = () => {
    setPhase(GamePhase.PLAYING);
  };

  const handleAnswer = (selected: string) => {
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    const isCorrect = selected === currentQuestion.correctAnswer;

    setShowFeedback({
      correct: isCorrect,
      explanation: currentQuestion.explanation
    });

    if (isCorrect) {
      setGameState(prev => {
        const nextTile = prev.revealedTiles.length;
        return {
          ...prev,
          revealedTiles: [...prev.revealedTiles, nextTile],
          score: prev.score + 1
        };
      });
    }
  };

  const nextQuestion = () => {
    setShowFeedback(null);
    if (gameState.currentQuestionIndex + 1 < gameState.questions.length) {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      setPhase(GamePhase.REVEALED);
      setShowBonusMessage(true);
    }
  };

  const resetGame = () => {
    setPhase(GamePhase.SETUP);
    setShowBonusMessage(false);
    setGameState({
      theme: 'India & Kerala Trivia',
      imageUrl: MYSTERY_IMAGE,
      questions: shuffleArray(QUESTIONS),
      currentQuestionIndex: 0,
      revealedTiles: [],
      score: 0,
      totalTiles: TILE_COUNT
    });
  };

  const isPerfect = gameState.score === TILE_COUNT;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600 rounded-full blur-[120px]"></div>
      </div>

      <header className="mb-8 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-2">
          Trivia Mystery Reveal
        </h1>
        <p className="text-slate-400 text-lg">Test your knowledge to uncover the secret image.</p>
      </header>

      <main className="w-full max-w-6xl relative z-10 flex flex-col items-center">
        
        {phase === GamePhase.SETUP && (
          <div className="bg-slate-900/80 border border-slate-800 p-10 rounded-3xl shadow-2xl w-full max-w-md backdrop-blur-xl text-center">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🇮🇳</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">India & Kerala Challenge</h2>
            <p className="text-slate-400 mb-8">10 Questions. 1 Mystery Image. Can you reveal the whole picture?</p>
            <button 
              onClick={startGame}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              Start Quiz
            </button>
          </div>
        )}

        {phase === GamePhase.PLAYING && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start w-full">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-full flex justify-between items-center mb-2 px-2">
                <div className="text-sm font-bold bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
                  Revealed: <span className="text-blue-400">{gameState.revealedTiles.length} / {TILE_COUNT}</span>
                </div>
                <div className="text-sm font-bold bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
                  Question: <span className="text-emerald-400">{gameState.currentQuestionIndex + 1} / {gameState.questions.length}</span>
                </div>
              </div>
              
              <TileGrid 
                imageUrl={gameState.imageUrl!} 
                revealedTiles={gameState.revealedTiles} 
                totalTiles={gameState.totalTiles} 
              />
            </div>

            <div className="flex flex-col items-center lg:items-start">
              {showFeedback ? (
                <div className={`
                  w-full max-w-lg p-8 rounded-2xl border flex flex-col items-center text-center animate-in fade-in zoom-in duration-300
                  ${showFeedback.correct ? 'bg-emerald-900/20 border-emerald-800/50' : 'bg-red-900/20 border-red-800/50'}
                `}>
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 text-4xl
                    ${showFeedback.correct ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}
                  `}>
                    {showFeedback.correct ? '✓' : '✗'}
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${showFeedback.correct ? 'text-emerald-400' : 'text-red-400'}`}>
                    {showFeedback.correct ? 'Correct Answer!' : 'Incorrect'}
                  </h3>
                  <p className="text-slate-300 mb-8 leading-relaxed">
                    {showFeedback.explanation}
                  </p>
                  <button 
                    onClick={nextQuestion}
                    className="bg-white text-slate-900 font-bold px-10 py-4 rounded-xl hover:bg-slate-200 transition-all shadow-xl"
                  >
                    Next Question
                  </button>
                </div>
              ) : (
                <QuestionBox 
                  question={gameState.questions[gameState.currentQuestionIndex]} 
                  onAnswer={handleAnswer}
                  disabled={!!showFeedback}
                />
              )}
            </div>
          </div>
        )}

        {phase === GamePhase.REVEALED && (
          <div className="max-w-4xl w-full flex flex-col items-center animate-in fade-in duration-1000 relative">
            <div className="mb-8 text-center">
              <h2 className={`text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${isPerfect ? 'from-yellow-400 to-orange-500' : 'from-slate-400 to-slate-600'}`}>
                {isPerfect ? 'Mystery Unlocked!' : 'Incomplete Reveal'}
              </h2>
              <p className="text-slate-400">
                Final Score: <span className={`${isPerfect ? 'text-emerald-400' : 'text-red-400'} font-bold`}>{gameState.score} out of 10</span>
              </p>
              {!isPerfect && (
                <p className="text-slate-500 text-sm mt-2">Get all questions correct next time to reveal the full image!</p>
              )}
            </div>

            <div className="mb-10 w-full max-w-lg">
              <TileGrid 
                imageUrl={gameState.imageUrl!} 
                revealedTiles={gameState.revealedTiles} 
                totalTiles={gameState.totalTiles} 
              />
            </div>

            <button 
              onClick={resetGame}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-12 py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20"
            >
              Try Again
            </button>

            {/* Sticky/Fixed Bonus Message Popup */}
            {showBonusMessage && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 p-4">
                <div className="relative bg-slate-900 border-2 border-indigo-500 p-10 rounded-3xl shadow-[0_0_30px_rgba(99,102,241,0.4)] max-w-md w-full text-center">
                  <button 
                    onClick={() => setShowBonusMessage(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                    aria-label="Close message"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                    🎁
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Secret Reward!</h3>
                  <p className="text-indigo-200 text-xl font-medium leading-relaxed italic">
                    "Find me and Say <span className="text-white font-bold not-italic">Saadhanam Kayil undo</span> you will get the thrasher."
                  </p>
                  <div className="mt-8">
                    <button 
                      onClick={() => setShowBonusMessage(false)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-lg transition-all"
                    >
                      Got it!
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-12 text-slate-500 text-sm relative z-10">
        India & Kerala Trivia Challenge • Offline Mode
      </footer>
    </div>
  );
};

export default App;
