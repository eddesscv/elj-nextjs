import React from 'react';
import { newQuizzes } from '../data/quizData';

export const NewQuizzes: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🆕</span>
            <h2 className="text-2xl font-bold text-gray-800">Nouveaux Quiz</h2>
          </div>

          <div className="space-y-4">
            {newQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {quiz.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      {quiz.category}
                    </span>
                    <span className="text-sm text-gray-500">{quiz.date}</span>
                  </div>
                </div>
                <div className="text-purple-600 group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
              Voir tous les Quiz
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
