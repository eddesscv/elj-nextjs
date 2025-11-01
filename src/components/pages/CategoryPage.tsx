import React from 'react';
import { useCategory } from '../../hooks/useCMS';
import { LoadingSpinner, ErrorMessage } from '../LoadingSpinner';

interface CategoryPageProps {
  categoryId: string;
  onBack: () => void;
  onStartQuiz: () => void;
  onViewLessons: () => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ 
  categoryId, 
  onBack, 
  onStartQuiz, 
  onViewLessons 
}) => {
  const { data: category, loading, error } = useCategory(categoryId);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg py-12">
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
      <div className="min-h-screen bg-bg py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorMessage message={error} onRetry={onBack} />
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-bg py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-text mb-4">Category Not Found</h1>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 dark:from-purple-700 dark:to-blue-700 dark:hover:from-purple-800 dark:hover:to-blue-800"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{category.icon}</div>
          <h1 className="text-4xl font-bold text-text mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-subtext mb-8">
            {category.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onStartQuiz}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 dark:from-purple-700 dark:to-blue-700 dark:hover:from-purple-800 dark:hover:to-blue-800"
            >
              Start Quiz ({category.questionCount} questions)
            </button>
            
            {category.hasLessons && (
              <button
                onClick={onViewLessons}
                className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-teal-700 transition-all transform hover:scale-105 dark:from-green-600 dark:to-teal-700 dark:hover:from-green-700 dark:hover:to-teal-800"
              >
                View Lessons
              </button>
            )}
            
            <button
              onClick={onBack}
              className="bg-card text-text border-2 border-border px-8 py-3 rounded-lg font-semibold hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* Sample Quizzes */}
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          <h2 className="text-2xl font-bold text-text mb-6">Sample Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer bg-card">
              <h3 className="font-semibold text-lg text-text mb-2">
                {category.name} Basics
              </h3>
              <p className="text-subtext text-sm mb-4">
                Test your fundamental knowledge of {category.name.toLowerCase()}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                  Easy
                </span>
                <span className="text-sm text-subtext">10 questions</span>
              </div>
            </div>
            
            <div className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer bg-card">
              <h3 className="font-semibold text-lg text-text mb-2">
                Advanced {category.name}
              </h3>
              <p className="text-subtext text-sm mb-4">
                Challenge yourself with advanced {category.name.toLowerCase()} concepts
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full">
                  Hard
                </span>
                <span className="text-sm text-subtext">15 questions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};