import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDailyQuizzes } from '../hooks/useCMS';
import { LoadingSpinner, ErrorMessage } from './LoadingSpinner';

export const DailyQuiz: React.FC = () => {
  const navigate = useNavigate();
  const { data: dailyQuizzes, loading, error } = useDailyQuizzes();

  if (loading) {
    return (
      <section className="pb-4 bg-card text-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pb-4 bg-card text-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorMessage message={error} />
        </div>
      </section>
    );
  }

  if (!dailyQuizzes || dailyQuizzes.length === 0) {
    return null; // Hide section if no data
  }

  return (
    <section className="pb-4 bg-bg text-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-t-2xl py-2 lg:py-4 mb-0">
          <div className="flex items-center gap-3">
            {/* <h2 className="text-2xl lg:text-3xl font-bold text-text">
              📅 Our Games
            </h2> */}
            <h2 className="text-xl lg:text-2xl font-black text-text">
              📅 Our Games
            </h2>
            {/* <h2 className="text-xl lg:text-2xl uppercase underline decoration-tertiary decoration-2 underline-offset-4 font-bold text-text">
              Our Games
            </h2> */}
            <div className="flex-1 flex items-center">
              <hr className="w-full border-t border-border" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8 py-2">
          {/* Games List - Left Side (40%) */}
          <div className="lg:col-span-2">
            <div className="space-y-2">
              {dailyQuizzes.slice(0, 6).map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-t border-b border-border"
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                >
                  <div
                    className={`w-8 h-8 ${
                      quiz.id.includes('word')
                        ? 'bg-blue-500'
                        : quiz.id.includes('grammar')
                        ? 'bg-green-500'
                        : quiz.id.includes('pronunciation')
                        ? 'bg-purple-500'
                        : quiz.id.includes('riddle')
                        ? 'bg-yellow-500'
                        : quiz.id.includes('idiom')
                        ? 'bg-red-500'
                        : quiz.id.includes('speed')
                        ? 'bg-orange-500'
                        : 'bg-indigo-500'
                    } rounded flex items-center justify-center text-white font-bold`}
                  >
                    {quiz.id.includes('word')
                      ? '📝'
                      : quiz.id.includes('grammar')
                      ? '📚'
                      : quiz.id.includes('pronunciation')
                      ? '🗣️'
                      : quiz.id.includes('riddle')
                      ? '🧩'
                      : quiz.id.includes('idiom')
                      ? '💭'
                      : quiz.id.includes('speed')
                      ? '⚡'
                      : '📖'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-text">
                      {quiz.title}
                    </h3>
                    <p className="text-xs text-subtext">{quiz.description}</p>
                  </div>
                  <span className="text-xs text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full ml-auto">
                    {quiz.participants}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Question of the Day - Right Side (60%) */}
          <div className="lg:col-span-3 relative mt-6 sm:mt-6 lg:mt-0">
            {/* Styled Question of the Day Heading */}
            <h3
              className="absolute -top-5 left-1/2 transform -translate-x-1/2 
                          py-2 px-6 rounded-full bg-card 
                          border-2 border-[#43319d]
                          text-xl font-bold text-text
                          whitespace-nowrap"
            >
              Question of the Day
            </h3>

            <div className="bg-gradient-to-br from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 rounded-xl p-10 text-white h-full min-h-[400px] flex flex-col justify-center pt-16">
              <div className="text-center space-y-6 max-w-2xl mx-auto">
                <div className="bg-orange-500/90 dark:bg-orange-600/90 text-sm font-bold px-4 py-2 rounded-full inline-block shadow-md">
                  TODAY'S TRIVIA CHALLENGE
                </div>

                <p className="text-2xl font-medium leading-relaxed">
                  When was slavery officially abolished in the United States?
                </p>

                <div className="pt-4">
                  <button
                    className="bg-white text-purple-700 hover:bg-gray-50 font-bold px-10 py-4 rounded-xl 
                  text-lg shadow-lg hover:shadow-xl transition-all duration-300
                  hover:-translate-y-1 transform"
                    onClick={() => navigate('/question-day')}
                  >
                    ✨ Answer Now ✨
                  </button>
                </div>

                <p className="text-sm text-white/80 mt-6">
                  Join 1145 learners who solved this today
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};