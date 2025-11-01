import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Question {
  text: string;
  options: string[];
}

interface Quiz {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  level: string;
  questions: Question[];
}

export const TodayTopQuizzes: React.FC = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hovered, setHovered] = useState(false);

  const TodayTopFeaturedQuizzes: Quiz[] = [
    {
      id: 1,
      title: 'Business English',
      subtitle: 'BUSINESS',
      image:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      level: 'Intermediate',
      questions: [
        {
          text: 'Which phrase is most appropriate for a formal email?',
          options: [
            'A: "Hey there!"',
            'B: "Dear Sir/Madam"',
            'C: "What\'s up?"',
            'D: "To whom it may concern"',
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'Advanced Grammar',
      subtitle: 'LANGUAGE',
      image:
        'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      level: 'Advanced',
      questions: [
        {
          text: 'Which sentence uses the subjunctive mood correctly?',
          options: [
            'A: "If I was you, I would go"',
            'B: "If I were you, I would go"',
            'C: "If I am you, I would go"',
            'D: "If I be you, I would go"',
          ],
        },
      ],
    },
    {
      id: 3,
      title: 'Science Trivia',
      subtitle: 'SCIENCE',
      image:
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      level: 'Intermediate',
      questions: [
        {
          text: 'What is the chemical symbol for gold?',
          options: ['A: Go', 'B: Au', 'C: Ag', 'D: Gd'],
        },
      ],
    },
    {
      id: 4,
      title: 'World History',
      subtitle: 'HISTORY',
      image:
        'https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      level: 'Advanced',
      questions: [
        {
          text: 'When did World War II end?',
          options: ['A: 1943', 'B: 1945', 'C: 1947', 'D: 1950'],
        },
      ],
    },
    {
      id: 5,
      title: 'Movie Buff',
      subtitle: 'ENTERTAINMENT',
      image:
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      level: 'Beginner',
      questions: [
        {
          text: 'Who directed "The Godfather"?',
          options: [
            'A: Steven Spielberg',
            'B: Martin Scorsese',
            'C: Francis Ford Coppola',
            'D: Quentin Tarantino',
          ],
        },
      ],
    },
    {
      id: 6,
      title: 'Art Masterpieces',
      subtitle: 'ART',
      image:
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      level: 'Intermediate',
      questions: [
        {
          text: 'Who painted "The Starry Night"?',
          options: [
            'A: Pablo Picasso',
            'B: Vincent van Gogh',
            'C: Claude Monet',
            'D: Salvador Dalí',
          ],
        },
      ],
    },
    {
      id: 7,
      title: 'Tech Innovations',
      subtitle: 'TECHNOLOGY',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      level: 'Advanced',
      questions: [
        {
          text: 'What year was the first iPhone released?',
          options: ['A: 2005', 'B: 2007', 'C: 2009', 'D: 2011'],
        },
      ],
    },
    {
      id: 8,
      title: 'Healthy Living',
      subtitle: 'HEALTH',
      image:
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      level: 'Beginner',
      questions: [
        {
          text: 'How many glasses of water should you drink daily?',
          options: ['A: 2-4', 'B: 4-6', 'C: 6-8', 'D: 8-10'],
        },
      ],
    },
    {
      id: 9,
      title: 'Space Exploration',
      subtitle: 'SCIENCE',
      image:
        'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      level: 'Advanced',
      questions: [
        {
          text: 'Which planet is known as the Red Planet?',
          options: ['A: Venus', 'B: Mars', 'C: Jupiter', 'D: Saturn'],
        },
      ],
    },
    {
      id: 10,
      title: 'Literary Classics',
      subtitle: 'LITERATURE',
      image:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      level: 'Intermediate',
      questions: [
        {
          text: 'Who wrote "Pride and Prejudice"?',
          options: [
            'A: Charles Dickens',
            'B: Jane Austen',
            'C: Emily Brontë',
            'D: Leo Tolstoy',
          ],
        },
      ],
    },
  ];

  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 300);
    }
  };

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  return (
    <section className="py-6">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .scroll-hint {
          mask-image: linear-gradient(
            to right, 
            black 0, 
            black calc(100% - 60px), 
            transparent 100%
          );
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4 lg:mb-6">
          {/* <h2 className="text-2xl lg:text-3xl font-bold text-text">
            🎯 Today's Top Quizzes
          </h2> */}
          <h2 className="text-xl lg:text-2xl font-black text-text">
            🎯 Today's Top Quizzes
          </h2>
          {/* <h2 className="text-xl lg:text-2xl uppercase underline decoration-tertiary decoration-2 underline-offset-4 font-bold text-text">
            Today's Top Quizzes
          </h2> */}
          <div className="flex-1">
            <hr className="border-t border-border" />
          </div>
          {/* View More Button - Top Right */}
          <button
            onClick={() => navigate('/categories')}
            className="text-subtext text-sm lg:text-base hover:text-text font-semibold flex items-center gap-1 transition-all duration-300 relative group"
          >
            See All →
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-tertiary transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered && (
            <>
              <button
                onClick={() => scrollByAmount(-300)}
                disabled={!canScrollLeft}
                className={`hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 
                  bg-black/50 hover:bg-black text-white p-2 rounded-full 
                  `}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => scrollByAmount(300)}
                disabled={!canScrollRight}
                className={`hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 
                  bg-black/50 hover:bg-black text-white p-2 rounded-full 
                  transition-opacity ${
                    !canScrollRight
                      ? 'opacity-40 cursor-not-allowed'
                      : 'opacity-100'
                  }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div
            ref={scrollRef}
            className="flex gap-16 overflow-x-auto scroll-smooth pb-6 -mx-4 px-4 max-lg:pr-0 no-scrollbar scroll-hint 
             max-lg:snap-x max-lg:snap-mandatory"
          >
            {TodayTopFeaturedQuizzes.map((quiz, index) => (
              <div
                key={quiz.id}
                className="relative flex-shrink-0 lg:w-[clamp(180px,20vw,240px)] lg:min-w-[clamp(180px,20vw,240px)] 
                 max-lg:snap-center"
                style={{
                  width: '240px',
                  minWidth: '240px',
                  aspectRatio: '3/4',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: index === 0 ? '55px' : '0',
                  marginRight:
                    index === TodayTopFeaturedQuizzes.length - 1
                      ? '-16px'
                      : '0',
                }}
              >
                <span
                  className="absolute text-[8rem] font-inter font-black text-black/20 dark:text-white/20 leading-none tracking-[-1.5rem]"
                  style={{
                    left: '-25%',
                    top: '0',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: 0,
                    pointerEvents: 'none',
                    width: '100%',
                  }}
                >
                  {index + 1}
                </span>

                <div
                  className="relative z-10 h-full"
                  style={{ aspectRatio: '7/10' }}
                >
                  <div className="group cursor-pointer h-full hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-border transition-all duration-300 flex flex-col bg-card">
                      <div className="relative h-full overflow-hidden">
                        <div
                          className="absolute w-full h-full"
                          style={{
                            backgroundImage: `url(${quiz.image})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center p-3 z-10">
                          <p className="text-white font-medium text-xs text-center transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            {quiz.questions[0].text}
                          </p>
                        </div>
                        <div className="absolute top-2 left-2 bg-card text-accent px-2 py-1 rounded-full text-xs font-bold z-10">
                          QUIZ
                        </div>
                      </div>
                      <div className="p-3 bg-card">
                        <div className="text-xs text-accent font-semibold mb-1">
                          {quiz.subtitle}
                        </div>
                        <h3 className="font-bold text-sm text-text mb-1 line-clamp-1">
                          {quiz.title}
                        </h3>
                        <div className="text-xs text-subtext">
                          {quiz.level}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};