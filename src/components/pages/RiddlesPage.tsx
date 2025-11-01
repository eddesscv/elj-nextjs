import React, { useState } from 'react';

interface RiddlesPageProps {
  onBack: () => void;
}

export const RiddlesPage: React.FC<RiddlesPageProps> = ({ onBack }) => {
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const riddles = [
    {
      id: 1,
      riddle: "I have keys but no locks. I have space but no room. You can enter, but you can't go outside. What am I?",
      answer: "A keyboard",
      explanation: "A keyboard has keys (letters/numbers), space (spacebar), and you can enter (Enter key), but it's not a physical space you can go into."
    },
    {
      id: 2,
      riddle: "The more you take, the more you leave behind. What am I?",
      answer: "Footsteps",
      explanation: "The more steps you take while walking, the more footprints you leave behind."
    },
    {
      id: 3,
      riddle: "I'm tall when I'm young, and short when I'm old. What am I?",
      answer: "A candle",
      explanation: "A candle is tall when new (young) and gets shorter as it burns (gets old)."
    },
    {
      id: 4,
      riddle: "What has hands but cannot clap?",
      answer: "A clock",
      explanation: "A clock has hands (hour and minute hands) but they cannot clap like human hands."
    },
    {
      id: 5,
      riddle: "I speak without a mouth and hear without ears. I have no body, but come alive with wind. What am I?",
      answer: "An echo",
      explanation: "An echo 'speaks' by repeating sounds, 'hears' the original sound, has no physical form, and can be carried by wind."
    }
  ];

  const handleNextRiddle = () => {
    if (currentRiddle < riddles.length - 1) {
      setCurrentRiddle(currentRiddle + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevRiddle = () => {
    if (currentRiddle > 0) {
      setCurrentRiddle(currentRiddle - 1);
      setShowAnswer(false);
    }
  };

  const currentRiddleData = riddles[currentRiddle];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-6 bg-white/20 text-white border border-white/30 px-6 py-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            ← Back to Home
          </button>
          <span className="text-yellow-300 text-6xl mb-6 block">🧩</span>
          <h1 className="text-4xl font-bold mb-4">English Riddles</h1>
          <p className="text-xl text-indigo-100">Challenge your mind with these brain teasers</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <div className="text-center mb-6">
            <span className="text-sm text-indigo-200">
              Riddle {currentRiddle + 1} of {riddles.length}
            </span>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentRiddle + 1) / riddles.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-6 leading-relaxed">
              {currentRiddleData.riddle}
            </h2>
            
            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900 px-8 py-3 rounded-lg font-semibold transition-colors transform hover:scale-105"
              >
                Show Answer
              </button>
            ) : (
              <div className="bg-white/20 rounded-xl p-6">
                <div className="text-yellow-300 text-4xl mb-4">💡</div>
                <h3 className="text-xl font-bold mb-2">Answer:</h3>
                <p className="text-2xl font-semibold text-yellow-300 mb-4">
                  {currentRiddleData.answer}
                </p>
                <div className="bg-indigo-500/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Explanation:</h4>
                  <p className="text-indigo-100">{currentRiddleData.explanation}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevRiddle}
              disabled={currentRiddle === 0}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                currentRiddle === 0
                  ? 'bg-white/10 text-white/50 cursor-not-allowed'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              ← Previous
            </button>
            
            <div className="text-center">
              <div className="text-sm text-indigo-200">Difficulty</div>
              <span className="bg-orange-500 text-orange-900 px-3 py-1 rounded-full text-sm font-semibold">
                Medium
              </span>
            </div>
            
            <button
              onClick={handleNextRiddle}
              disabled={currentRiddle === riddles.length - 1}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                currentRiddle === riddles.length - 1
                  ? 'bg-white/10 text-white/50 cursor-not-allowed'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Next →
            </button>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Riddle Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold text-yellow-300">75</div>
                <div className="text-sm text-indigo-200">Total Riddles</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-300">564</div>
                <div className="text-sm text-indigo-200">Daily Challenge</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-300">18</div>
                <div className="text-sm text-indigo-200">Participants</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};