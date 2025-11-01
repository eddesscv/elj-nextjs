import React from 'react';
import { dailyQuizzes } from '../data/quizData';

export const DailyQuizzes: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            📅 Nos Jeux
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dailyQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-600 transition-colors mb-2">
                    {quiz.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{quiz.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      {quiz.participants}
                    </span>
                  </div>
                </div>
                <div className="text-2xl ml-4">
                  {quiz.id.includes('photo') ? '📸' : 
                   quiz.id.includes('campus') ? '🎓' : 
                   quiz.id.includes('croise') ? '🔤' : 
                   quiz.id.includes('enigme') ? '🧩' : 
                   quiz.id.includes('caldeira') ? '🌋' : 
                   quiz.id.includes('marathon') ? '🏃' : '📝'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};