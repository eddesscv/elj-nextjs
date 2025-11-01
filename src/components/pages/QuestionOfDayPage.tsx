import React, { useState } from 'react';

interface QuestionOfDayPageProps {
  onBack: () => void;
}

export const QuestionOfDayPage: React.FC<QuestionOfDayPageProps> = ({ onBack }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const question = {
    question: "Which word is the correct past tense of 'go'?",
    options: ["Goed", "Went", "Gone", "Going"],
    correctAnswer: 1,
    explanation: "The past tense of 'go' is 'went'. This is an irregular verb form that doesn't follow the typical -ed pattern."
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-700 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-6 bg-white/20 text-white border border-white/30 px-6 py-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            ← Back to Home
          </button>
          <span className="text-yellow-300 text-6xl mb-6 block">🌟</span>
          <h1 className="text-4xl font-bold mb-4">Question of the Day</h1>
          <p className="text-xl text-blue-100 mb-2">Test your daily English knowledge</p>
          <p className="text-blue-200">December 15, 2024</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <div className="mb-6">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="bg-yellow-500 text-yellow-900 px-4 py-2 rounded-full font-semibold">
                MEDIUM
              </span>
              <span className="text-blue-100">Grammar</span>
            </div>
            
            <h2 className="text-2xl font-semibold text-center mb-8">
              {question.question}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`p-4 rounded-lg transition-all font-medium ${
                    showResult
                      ? index === question.correctAnswer
                        ? 'bg-green-500 text-white'
                        : index === selectedAnswer && index !== question.correctAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-white/20 text-white/70'
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  {String.fromCharCode(65 + index)}) {option}
                </button>
              ))}
            </div>
          </div>

          {showResult && (
            <div className="mt-8 bg-white/20 rounded-xl p-6">
              <div className="text-center mb-4">
                {selectedAnswer === question.correctAnswer ? (
                  <div className="text-green-300">
                    <div className="text-4xl mb-2">🎉</div>
                    <h3 className="text-xl font-bold">Correct!</h3>
                  </div>
                ) : (
                  <div className="text-red-300">
                    <div className="text-4xl mb-2">❌</div>
                    <h3 className="text-xl font-bold">Incorrect</h3>
                    <p>The correct answer is: {question.options[question.correctAnswer]}</p>
                  </div>
                )}
              </div>
              
              <div className="bg-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Explanation:</h4>
                <p className="text-blue-100">{question.explanation}</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Daily Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold text-yellow-300">1,247</div>
                <div className="text-sm text-blue-200">Participants Today</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-300">73%</div>
                <div className="text-sm text-blue-200">Correct Answers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-300">4,161</div>
                <div className="text-sm text-blue-200">Days Running</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};