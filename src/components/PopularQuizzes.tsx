import React, { useRef } from 'react';
import { usePopularQuizzes } from '../hooks/useCMS';
import { LoadingSpinner } from './LoadingSpinner';
import mostPopularIcon from '../assets/images/most-popular1.png';

export const PopularQuizzes: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data: popularQuizzes, loading, error } = usePopularQuizzes();

  if (loading) {
    return (
      <section className="bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !popularQuizzes) {
    return null; // Hide section if there's an error
  }

  // Ensure we have exactly 9 quizzes
  const displayQuizzes =
    popularQuizzes.length >= 9
      ? popularQuizzes.slice(0, 9)
      : [
          ...popularQuizzes,
          ...Array(9 - popularQuizzes.length).fill({
            id: `placeholder-${Math.random()}`,
            title: 'Coming Soon',
            description: 'New quiz coming',
            participants: '0',
            image: '/placeholder-quiz.png',
          }),
        ];

  return (
    <section className="bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative min-[1024px]:flex min-[1024px]:justify-center">
          <div
            ref={scrollContainerRef}
            className="flex gap-3 lg:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory -mx-4 pl-4 py-4 min-[1025px]:overflow-x-visible min-[1025px]:-mx-0 min-[1025px]:px-0"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollPaddingLeft: '1rem',
              scrollPaddingRight: '1rem',
            }}
          >
            {/* Hide scrollbar for Webkit browsers */}
            <style jsx>{`
              .flex::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Title Circle - Always first on large screens */}
            <div className="flex-shrink-0 w-[90px] hidden min-[1024px]:block snap-start">
              <div 
                className="w-[84px] h-[84px] rounded-full backdrop-blur-sm flex flex-col items-center justify-center shadow-lg p-2 border-2 border-white/30"
                style={{
                  background: 'var(--color-primary)',
                }}
              >
                <span className="text-lg mb-1 text-white">🔥</span>
                <h2 className="text-white font-bold font-saira text-center">
                  Trending Now
                </h2>
              </div>
            </div>            

            {/* Quiz Items */}
            {displayQuizzes.map((quiz) => (
              <div key={quiz.id} className="flex-shrink-0 w-[88px] snap-start">
                <div className="group cursor-pointer transform hover:scale-105 transition-all duration-200 overflow-visible">
                  <div
                    className="relative p-0.5 rounded-full"
                    style={{
                      background: 'linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)',
                    }}
                  >
                    <div 
                      className="w-[84px] h-[84px] rounded-full overflow-hidden border-2"
                      style={{
                        borderColor: 'var(--color-card)',
                        backgroundColor: 'var(--color-card)',
                      }}
                    >
                      <img
                        src={quiz.image || '/placeholder-quiz.png'}
                        alt={quiz.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                        loading="lazy"
                      />
                    </div>
                    <div 
                      className="absolute -bottom-1.5 -right-1.5 text-white text-[9px] px-1.5 py-0.5 rounded-full font-semibold shadow-sm border"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        borderColor: 'var(--color-card)',
                      }}
                    >
                      {quiz.participants}
                    </div>
                  </div>
                  <div className="text-center mt-1.5 px-0.5">
                    <h3 
                      className="text-[11px] font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1"
                      style={{
                        color: 'var(--color-text)',
                      }}
                    >
                      {quiz.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}

            {/* Right padding for mobile scrolling */}
            <div className="min-[1024px]:hidden flex-shrink-0 w-4 snap-start"></div>
          </div>
        </div>
      </div>
    </section>
  );
};