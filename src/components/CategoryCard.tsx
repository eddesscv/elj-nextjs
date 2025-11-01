import React from 'react';
import { QuizCategory } from '../types/quiz';

interface CategoryCardProps {
  category: QuizCategory;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.color} p-6 text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}
    >
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
      <div className="relative z-10">
        <div className="text-4xl mb-3">{category.icon}</div>
        <h3 className="text-xl font-bold mb-2">{category.name}</h3>
        <p className="text-sm opacity-90 mb-4 line-clamp-2">{category.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium opacity-80">
            {category.questionCount} questions
          </span>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};