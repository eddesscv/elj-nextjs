import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useCMS';
import { LoadingSection, ErrorMessage } from './LoadingSpinner';

interface QuizCategoriesProps {
  onCategorySelect: (categoryId: string) => void;
}

export const QuizCategories: React.FC<QuizCategoriesProps> = ({
  onCategorySelect,
}) => {
  const navigate = useNavigate();
  const { data: categories, loading, error } = useCategories();

  if (loading) {
    return <LoadingSection title="Quizzes by Categories" count={6} />;
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

  if (!categories || categories.length === 0) {
    return (
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <p className="text-subtext">
              No categories available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with horizontal line */}
        <div className="flex items-center gap-3 mb-4 lg:mb-6">
          {/* <h2 className="text-2xl lg:text-3xl font-bold text-text">
            📚 Quizzes by Categories
          </h2> */}
          <h2 className="text-xl lg:text-2xl font-black text-text uppercase">
            📚 Quizzes by Categories
          </h2>
          {/* <h2 className="text-xl lg:text-2xl uppercase underline decoration-tertiary decoration-2 underline-offset-4 font-bold text-text">
            Quizzes by Categories
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

        {/* Responsive Container */}
        <div className="relative">
          {/* Grid Layout (≥1024px) - 2 rows of 6 with gap */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {categories.slice(0, 12).map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onSelect={onCategorySelect}
                  className="aspect-square"
                />
              ))}
            </div>
          </div>

          {/* Horizontal Scroll (<1024px) */}
          <div className="lg:hidden">
            <div
              className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2 lg:pb-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style jsx>{`.flex::-webkit-scrollbar { display: none; }`}</style>
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onSelect={onCategorySelect}
                  className="w-36 h-36 flex-shrink-0" // className="w-32 h-32 flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    icon: string;
    questionCount: number;
    color: string;
  };
  onSelect: (id: string) => void;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onSelect,
  className,
}) => {
  return (
    <div
      onClick={() => onSelect(category.id)}
      className={`
        ${className || ''}
        cursor-pointer rounded-xl p-3 shadow-md hover:shadow-lg
        border border-border 
        bg-card group flex flex-col
        items-center justify-center relative overflow-hidden
        transition-all duration-300
      `}
    >
      {/* Gradient Background Layer */}
      <div
        className={`
          absolute inset-0 bg-gradient-to-br ${category.color}
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300 z-0
        `}
      />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <div
          className={`
            text-3xl mb-2
            ${category.color.replace(
              /from-[^\s]+ to-[^\s]+/,
              'text-accent'
            )}
            group-hover:text-white transition-colors duration-300
            transform group-hover:scale-125 transition-transform duration-300
            flex justify-center w-full
          `}
        >
          {category.icon}
        </div>
        <h3 className="font-semibold text-text group-hover:text-white transition-colors duration-300 text-center text-sm w-full">
          {category.name}
        </h3>
        <p className="text-xs text-subtext group-hover:text-white/80 transition-colors duration-300 mt-1 text-center w-full">
          {category.questionCount} Qs
        </p>
      </div>
    </div>
  );
};