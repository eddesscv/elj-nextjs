import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = '',
}) => {
  if (items.length === 0) return null;

  return (
    <nav
      className={`flex items-center space-x-2 text-sm text-gray-600 mb-6 ${className}`}
    >
      <button
        onClick={items[0]?.onClick}
        className={`flex items-center transition-colors ${
          items[0]?.isActive
            ? 'text-purple-600 font-medium'
            : 'hover:text-purple-600'
        }`}
      >
        <Home className="h-4 w-4 mr-1" />
        <span>Home</span>
      </button>

      {items.slice(1).map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {item.isActive ? (
            <span className="text-purple-600 font-medium">{item.label}</span>
          ) : (
            <button
              onClick={item.onClick}
              className="hover:text-purple-600 transition-colors"
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
