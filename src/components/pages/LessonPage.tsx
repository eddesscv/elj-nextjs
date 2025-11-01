import React, { useState } from 'react';
import { useLesson } from '../../hooks/useCMS';
import { Lesson } from '../../types/quiz';
import { LoadingSpinner, ErrorMessage } from '../LoadingSpinner';

interface LessonPageProps {
  lessonId: string;
  onBack: () => void;
}

export const LessonPage: React.FC<LessonPageProps> = ({ lessonId, onBack }) => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const { data: lesson, loading, error } = useLesson(lessonId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorMessage message={error} onRetry={onBack} />
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Lesson Not Found
          </h1>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            Back to Lessons
          </button>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === lesson.exercises[currentExercise].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextExercise = () => {
    if (currentExercise < lesson.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const isLastExercise = currentExercise === lesson.exercises.length - 1;
  const currentEx = lesson.exercises[currentExercise];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-4 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back to Lessons
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {lesson.title}
          </h1>
          <p className="text-gray-600">{lesson.description}</p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
              lesson.difficulty === 'beginner'
                ? 'bg-green-100 text-green-800'
                : lesson.difficulty === 'intermediate'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {lesson.difficulty}
          </span>
        </div>

        {/* Lesson Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
        </div>

        {/* Exercises */}
        {lesson.exercises && lesson.exercises.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Practice Exercises
              </h2>
              <span className="text-sm text-gray-600">
                {currentExercise + 1} of {lesson.exercises.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((currentExercise + 1) / lesson.exercises.length) * 100
                  }%`,
                }}
              />
            </div>

            {/* Current Exercise */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                {currentEx.question}
              </h3>

              {currentEx.type === 'multiple-choice' && currentEx.options && (
                <div className="space-y-3">
                  {currentEx.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !showResult && handleAnswerSelect(index)}
                      disabled={showResult}
                      className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                        showResult
                          ? index === currentEx.correctAnswer
                            ? 'border-green-500 bg-green-50 text-green-800'
                            : index === selectedAnswer &&
                              index !== currentEx.correctAnswer
                            ? 'border-red-500 bg-red-50 text-red-800'
                            : 'border-gray-200 bg-gray-50 text-gray-600'
                          : 'border-gray-200 hover:border-purple-500 hover:bg-purple-50'
                      }`}
                    >
                      <span className="font-medium">{option}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Explanation */}
              {showResult && currentEx.explanation && (
                <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                  <h4 className="text-blue-800 font-medium mb-1">
                    Explanation
                  </h4>
                  <p className="text-blue-700 text-sm">
                    {currentEx.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Score: {score} / {lesson.exercises.length}
              </div>

              {showResult && (
                <button
                  onClick={isLastExercise ? onBack : handleNextExercise}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  {isLastExercise ? 'Complete Lesson' : 'Next Exercise'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
