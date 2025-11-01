import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePersonalityTests } from '../hooks/useCMS';
import { LoadingSection, ErrorMessage } from './LoadingSpinner';

export const PersonalityTests: React.FC = () => {
  const navigate = useNavigate();
  const { data: personalityTests, loading, error } = usePersonalityTests();

  if (loading) {
    return <LoadingSection title="Personality Tests" count={5} />;
  }

  if (error) {
    return (
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorMessage message={error} />
        </div>
      </section>
    );
  }

  if (!personalityTests || personalityTests.length === 0) {
    return null; // Hide section if no data
  }

  return (
    <section
      className="py-6 bg-bg"
      style={{
        backgroundImage: `
          radial-gradient(rgba(236,72,153,0.2) 2px, transparent 2px)
        `,
        backgroundSize: "30px 30px",
        backgroundColor: "var(--color-bg)"
      }}
    >
      <style jsx>{`
        .dark & {
          background-image: linear-gradient(#374151 1px, transparent 1px), linear-gradient(to right, #374151 1px, #1f2937 1px);
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4 px-0 sm:px-0">
          {/* <h2 className="text-2xl lg:text-3xl font-bold text-text">
            🧠 Personality Tests
          </h2> */}
          <h2 className="text-xl lg:text-2xl font-black old text-text">
            🧠 Personality Tests
          </h2>
          {/* <h2 className="text-xl lg:text-2xl uppercase underline decoration-tertiary decoration-2 underline-offset-4 font-bold text-text">
            Personality Tests
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

        <p className="text-subtext mb-6 px-0 sm:px-0 text-left">
          Take fun personality tests that will tell you more about yourself than
          you think! Our personality tests are designed to entertain you while
          revealing hidden aspects of your personality.
        </p>

        <div className="relative">
          {/* Desktop Grid - 5 columns */}
          <div className="hidden lg:grid grid-cols-5 gap-6">
            {personalityTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>

          {/* Mobile remains horizontal scroll */}
          <div className="lg:hidden">
            <div className="flex gap-3 overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory scroll-smooth">
              <style jsx>{`
                .flex::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {personalityTests.map((test) => (
                <TestCard
                  key={test.id}
                  test={test}
                  className="w-64 flex-shrink-0 snap-center"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestCard = ({ test, className }: { test: any; className?: string }) => {
  return (
    <div
      className={`${className} group cursor-pointer h-full hover:-translate-y-1 transition-all duration-300`}
    >
      <div className="relative h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-border hover:border-secondary transition-all duration-300 flex flex-col">
        {/* Image Container with Overlay */}
        <div className="relative aspect-square overflow-hidden">
          {/* Image - Showing top-right quadrant */}
          <div className="absolute inset-0">
            <div
              className="absolute w-full h-full"
              style={{
                backgroundImage: `url(${test.image})`,
                backgroundPosition: 'right top',
                backgroundSize: '150%',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>

          {/* Dark Gradient Overlay (appears on hover) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Question Text (slides down on hover) */}
          <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
            <p
              className="text-white font-medium text-sm md:text-base text-center 
                         transform translate-y-4 group-hover:translate-y-0 
                         opacity-0 group-hover:opacity-100 transition-all duration-300
                         drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              Discover more about yourself with this personality test!
            </p>
          </div>

          <div className="absolute top-2 left-2 bg-card text-pink-500 dark:text-pink-400 px-2 py-1 rounded-full text-xs font-bold z-10">
            TEST
          </div>
        </div>

        {/* Bottom Info Section (Always visible) */}
        <div className="p-4 flex-grow-0 bg-card">
          <div className="text-xs text-pink-500 dark:text-pink-400 font-semibold mb-1">
            PERSONALITY
          </div>
          <h3 className="font-bold text-lg text-text mb-1 line-clamp-1">
            {test.title}
          </h3>
          <div className="text-xs text-subtext">{test.description}</div>
        </div>
      </div>
    </div>
  );
};