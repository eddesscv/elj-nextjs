import React, { useEffect, useState } from 'react';
import { Question } from '../types/quiz';

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answerIndex: number) => void;
  timeRemaining: number;
  isAnswered: boolean;
  selectedAnswer: number | null;
  showExplanation: boolean;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  timeRemaining,
  isAnswered,
  selectedAnswer,
  showExplanation,
}) => {
  const progress = ((questionNumber - 1) / totalQuestions) * 100;
  const timeProgress = (timeRemaining / 30) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getOptionClass = (index: number) => {
    let baseClass = 'w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ';
    
    if (!isAnswered) {
      return baseClass + 'border-gray-200 hover:border-blue-500 hover:bg-blue-50';
    }
    
    if (index === question.correctAnswer) {
      return baseClass + 'border-green-500 bg-green-50 text-green-800';
    }
    
    if (index === selectedAnswer && index !== question.correctAnswer) {
      return baseClass + 'border-red-500 bg-red-50 text-red-800';
    }
    
    return baseClass + 'border-gray-200 bg-gray-50 text-gray-600';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {questionNumber} of {totalQuestions}</span>
          <span>{Math.floor(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Timer */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Time Remaining</span>
          <span className={`text-sm font-bold ${timeRemaining <= 10 ? 'text-red-600' : 'text-gray-600'}`}>
            {timeRemaining}s
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${
              timeRemaining <= 10 ? 'bg-red-500' : 'bg-green-500'
            }`}
            style={{ width: `${timeProgress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
          <span className="text-sm text-gray-500">{question.category}</span>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
          {question.question}
        </h2>
        
        <div className="grid gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !isAnswered && onAnswer(index)}
              disabled={isAnswered}
              className={getOptionClass(index)}
            >
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold mr-4">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="font-medium">{option}</span>
                {isAnswered && index === question.correctAnswer && (
                  <svg className="w-5 h-5 ml-auto text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {isAnswered && index === selectedAnswer && index !== question.correctAnswer && (
                  <svg className="w-5 h-5 ml-auto text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && question.explanation && (
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-blue-800 font-medium mb-1">Explanation</h4>
              <p className="text-blue-700 text-sm leading-relaxed">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};