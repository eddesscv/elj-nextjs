import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryNavigation, NavigationItem } from '../data/navigation';

export const HorizontalCategories: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => navigate(path);

  return (
    // <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">
        {categoryNavigation.map((item: NavigationItem, index: number) => (
          <button
            key={index}
            onClick={() => handleNavigation(`/category/${item.page}`)}
            className={`flex items-center gap-2 px-3 py-1 rounded-xs bg-card hover:bg-bg border border-border hover:opacity-90 transition-opacity text-sm text-subtext hover:text-secondary transition-colors flex-shrink-0`}
          >
          {/* <button
            key={index}
            onClick={() => handleNavigation(`/category/${item.page}`)}
            className={`flex items-center gap-2 px-3 py-1 rounded-xl ${item.bgColor} hover:opacity-90 transition-opacity text-sm hover:text-accent transition-colors flex-shrink-0`}
          > */}
            <span className="text-lg">{item.emoji}</span>
            <span className="font-bold uppercase">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};