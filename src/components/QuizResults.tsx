import React from 'react';
import { QuizResult } from '../types/quiz';

interface QuizResultsProps {
  result: QuizResult;
  onRestart: () => void;
  onBackToHome: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  result,
  onRestart,
  onBackToHome,
}) => {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  const minutes = Math.floor(result.timeSpent / 60);
  const seconds = result.timeSpent % 60;

  const getGradeInfo = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100', message: 'Outstanding! You\'re a culture expert!' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100', message: 'Excellent work! Great cultural knowledge!' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100', message: 'Good job! You have solid cultural awareness!' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100', message: 'Not bad! Room for improvement!' };
    if (percentage >= 50) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-100', message: 'Fair attempt! Keep studying!' };
    return { grade: 'F', color: 'text-red-600', bg: 'bg-red-100', message: 'Keep practicing! You\'ll improve!' };
  };

  const gradeInfo = getGradeInfo(percentage);

  const correctAnswers = result.answers.filter(answer => answer.isCorrect).length;
  const incorrectAnswers = result.answers.filter(answer => !answer.isCorrect).length;
  const averageTimePerQuestion = Math.round(result.timeSpent / result.totalQuestions);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-3xl font-bold mb-4">
          {gradeInfo.grade}
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
        <p className="text-xl text-gray-600 mb-4">{gradeInfo.message}</p>
        <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {percentage}%
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{correctAnswers}</div>
          <div className="text-sm text-gray-600">Correct Answers</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">{incorrectAnswers}</div>
          <div className="text-sm text-gray-600">Incorrect Answers</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-gray-600">Total Time</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">{averageTimePerQuestion}s</div>
          <div className="text-sm text-gray-600">Avg. per Question</div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Performance Breakdown</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Correct Answers</span>
            <div className="flex items-center gap-4">
              <div className="w-32 bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(correctAnswers / result.totalQuestions) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-600 w-12">
                {Math.round((correctAnswers / result.totalQuestions) * 100)}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Time Efficiency</span>
            <div className="flex items-center gap-4">
              <div className="w-32 bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((30 / averageTimePerQuestion) * 100, 100)}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-600 w-12">
                {Math.min(Math.round((30 / averageTimePerQuestion) * 100), 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Try Again
        </button>
        <button
          onClick={onBackToHome}
          className="bg-white text-gray-700 border-2 border-gray-200 px-8 py-4 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
        >
          Choose Different Category
        </button>
      </div>

      {/* Share Results */}
      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">Share your results:</p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Share on Twitter
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Share on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};