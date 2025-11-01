import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNewQuizzes } from '../hooks/useCMS';
import { LoadingCard } from './LoadingSpinner';

type QuizItem = {
  id: string;
  title: string;
  category: string;
  date: string;
};

const categoryEmojis: Record<string, string> = {
  Grammar: '📝',
  Vocabulary: '📖',
  Writing: '✍️',
  Reading: '📚',
  Speaking: '🗣️',
  Listening: '👂',
};

interface HeroProps {
  onStartQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartQuiz }) => {
  const navigate = useNavigate();
  const { data: newQuizzes, loading, error } = useNewQuizzes();

  return (
    <div className="bg-bg relative py-0 lg:py-4">
      <div className="relative z-10 mx-auto max-w-7xl px-0 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="flex gap-2 lg:gap-8 items-start mx-4 sm:mx-6 lg:mx-0">
            {/* LEFT SIDE - With Emoji Bubble, Text, and Button */}
            <div className="w-2/5">
              <div className="relative flex flex-col justify-center min-h-[400px]">
                {/* Emoji Bubble */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-0 w-48 h-48">
                  <div className="relative w-full h-full bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="text-6xl">🤔</div>
                    <div className="absolute -top-3 left-32 w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center text-lg animate-bounce shadow-md">
                      💡
                    </div>
                    <div className="absolute bottom-4 left-5 w-9 h-9 bg-green-400 rounded-full flex items-center justify-center text-base animate-pulse shadow-md">
                      ⭐
                    </div>
                  </div>
                </div>

                {/* Text Content and Button */}
                <div className="relative z-10 pl-48 text-right flex flex-col items-end">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight text-gray-900 dark:text-white">
                    Learn and Play <br />
                    <span className="text-blue-600 dark:text-blue-400">with English Quizzes!</span>
                  </h1>
                  <p className="text-base text-gray-700 dark:text-gray-300 mb-6 max-w-md">
                    Thousands of questions on grammar, vocabulary, writing, and more...
                  </p>
                  
                  {/* Browse All Quizzes Button */}
                  <button
  onClick={() => navigate('/categories')}
  className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform w-full"
>
  Browse All Quizzes
</button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Quiz Cards */}
            <div className="w-3/5 space-y-4">
              {/* Desktop Header */}
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl lg:text-2xl font-black text-text">
                  New Quizzes
                </h2>
                <div className="flex-1 flex items-center mx-4">
                  <hr className="w-full border-t border-border" />
                </div>
                <button
                  onClick={() => navigate('/categories')}
                  className="text-accent text-sm lg:text-base hover:text-accent-hover font-semibold flex items-center gap-1 transition-all duration-300 relative group"
                >
                  See All Quizzes →
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tertiary transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>

              {/* Desktop Quiz List */}
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <LoadingCard key={index} className="h-20 mb-3" />
                ))
              ) : error || !newQuizzes ? (
                <div className="text-center py-4 text-gray-600 dark:text-gray-400">
                  <p>Unable to load new quizzes</p>
                </div>
              ) : (
                (newQuizzes as QuizItem[]).slice(0, 4).map((quiz) => (
                  <div
                    key={quiz.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 hover:shadow-lg transition-all duration-300 cursor-pointer border border-border mb-3 last:mb-0 hover:scale-[1.01] group h-20"
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                  >
                    <div className="flex gap-4 items-center h-full">
                      {/* Image Container */}
                      <div className="flex-shrink-0 w-20 h-20 aspect-square -ml-3 transform scale-[1.02]">
                        <div className="w-full h-full rounded-xl overflow-hidden border-4 border-white/90 dark:border-gray-700 shadow-xl">
                          <div className="w-full h-full bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">
                              {categoryEmojis[quiz.category] || '📚'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                          {quiz.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-xs uppercase text-subtext">
                            {quiz.category}
                          </span>
                          <span className="text-xs text-secondary">
                            {quiz.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Mobile Layout - Searchbox Removed */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 gap-0 lg:gap-8 mx-4 sm:mx-6">
            <div className="relative flex flex-col justify-center min-h-[200px]">
              {/* Emoji Bubble */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-0 w-32 h-32 sm:w-40 sm:h-40">
                <div className="relative w-full h-full bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-4xl sm:text-5xl">🤔</div>
                  <div className="absolute -top-2 left-24 w-8 h-8 sm:-top-3 sm:left-28 sm:w-9 sm:h-9 bg-yellow-300 rounded-full flex items-center justify-center text-sm sm:text-base animate-bounce shadow-md">
                    💡
                  </div>
                  <div className="absolute bottom-2 left-3 w-7 h-7 sm:bottom-3 sm:left-4 sm:w-8 sm:h-8 bg-green-400 rounded-full flex items-center justify-center text-xs sm:text-sm animate-pulse shadow-md">
                    ⭐
                  </div>
                </div>
              </div>

              {/* Text Content - Searchbox Removed */}
              <div className="relative z-10 pl-32 sm:pl-36 text-right flex flex-col items-end">
                <h1 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight text-gray-900 dark:text-white">
                  Learn and Play <br />
                  <span className="text-blue-600 dark:text-blue-400">with English Quizzes!</span>
                </h1>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 max-w-md">
                  Thousands of questions on grammar, vocabulary, writing, and
                  more...
                </p>
                {/* Searchbox removed from mobile */}
              </div>
            </div>

            {/* Quiz Cards Section */}
            <div>
              {/* Mobile Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl lg:text-2xl font-black text-text">
                  New Quizzes
                </h2>
                <div className="flex-1 flex items-center mx-4">
                  <hr className="w-full border-t border-border" />
                </div>
                <button
                  onClick={() => navigate('/categories')}
                  className="text-subtext text-sm lg:text-base hover:text-text font-semibold flex items-center gap-1 transition-all duration-300 relative group"
                >
                  See All Quizzes →
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tertiary transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>

              {/* Mobile Quiz Cards Horizontal Scroll */}
              <div className="flex gap-4 overflow-x-auto -mx-4 px-4 snap-x snap-mandatory scroll-smooth">
                <style jsx>{`
                  .flex::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {loading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <LoadingCard
                      key={index}
                      className="w-64 h-80 flex-shrink-0 snap-center"
                    />
                  ))
                ) : error || !newQuizzes ? (
                  <div className="w-64 flex-shrink-0 text-center py-8 text-gray-600 dark:text-gray-400">
                    <p>Unable to load quizzes</p>
                  </div>
                ) : (
                  (newQuizzes as QuizItem[]).slice(0, 9).map((quiz) => (
                    <div
                      key={quiz.id}
                      className="group cursor-pointer h-full hover:-translate-y-1 transition-all duration-300 w-64 flex-shrink-0"
                      onClick={() => navigate(`/quiz/${quiz.id}`)}
                    >
                      <div className="relative h-full rounded-xl mb-6 overflow-hidden shadow-lg hover:shadow-xl border border-border transition-all duration-300 flex flex-col bg-white dark:bg-gray-800">
                        {/* Image Container with Overlay */}
                        <div className="relative aspect-square overflow-hidden bg-purple-100 dark:bg-purple-900">
                          {/* Emoji display */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-5xl">
                              {categoryEmojis[quiz.category] || '📚'}
                            </span>
                          </div>

                          {/* Dark Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* Hover Text */}
                          <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
                            <p
                              className="text-white font-medium text-sm md:text-base text-center 
                                       transform translate-y-4 group-hover:translate-y-0 
                                       opacity-0 group-hover:opacity-100 transition-all duration-300
                                       drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                            >
                              Test your {quiz.category.toLowerCase()} skills
                              with this quiz!
                            </p>
                          </div>

                          <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 text-pink-500 dark:text-pink-400 px-2 py-1 rounded-full text-xs font-bold z-10">
                            QUIZ
                          </div>
                        </div>

                        {/* Bottom Info Section */}
                        <div className="p-4 flex-grow-0 bg-white dark:bg-gray-800">
                          <div className="text-xs text-pink-500 dark:text-pink-400 font-semibold mb-1">
                            {quiz.category}
                          </div>
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1">
                            {quiz.title}
                          </h3>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {quiz.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};