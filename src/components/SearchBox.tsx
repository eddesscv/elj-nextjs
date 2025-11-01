// Searchbox.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchSuggestion {
  id: string;
  title: string;
  category: string;
  type: 'quiz' | 'lesson' | 'category';
}

interface SearchBoxProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  suggestions?: SearchSuggestion[];
  variant?: 'default' | 'icon-only';
  onIconClick?: () => void;
  onInputClick?: () => void;
  autoFocus?: boolean;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Search for quizzes, lessons...',
  onSearch,
  className = '',
  suggestions: customSuggestions,
  variant = 'default',
  onIconClick,
  onInputClick,
  autoFocus = false,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Default suggestions if none provided
  const defaultSuggestions: SearchSuggestion[] = [
    {
      id: 'grammar-basics',
      title: 'Grammar Basics Quiz',
      category: 'Grammar',
      type: 'quiz',
    },
    {
      id: 'vocabulary-advanced',
      title: 'Advanced Vocabulary',
      category: 'Vocabulary',
      type: 'quiz',
    },
    {
      id: 'pronunciation-guide',
      title: 'Pronunciation Guide',
      category: 'Pronunciation',
      type: 'lesson',
    },
    {
      id: 'business-english',
      title: 'Business English',
      category: 'Business',
      type: 'category',
    },
    {
      id: 'reading-comprehension',
      title: 'Reading Comprehension',
      category: 'Reading',
      type: 'quiz',
    },
    {
      id: 'writing-skills',
      title: 'Writing Skills',
      category: 'Writing',
      type: 'lesson',
    },
  ];

  const allSuggestions = customSuggestions || defaultSuggestions;

  useEffect(() => {
    if (query.length > 0) {
      const filtered = allSuggestions
        .filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, allSuggestions]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleInputClick = () => {
    if (onInputClick) {
      onInputClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else if (query.trim()) {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.title);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(suggestion.title);
    }
  };

  const handleSearch = () => {
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleIconClick = () => {
    if (variant === 'icon-only' && onIconClick) {
      onIconClick();
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return '📝';
      case 'lesson':
        return '📚';
      case 'category':
        return '📁';
      default:
        return '🔍';
    }
  };

  // Icon-only variant for header
  if (variant === 'icon-only') {
    return (
      <button
        onClick={handleIconClick}
        className={`p-2 rounded-full text-text hover:text-accent transition-colors ${className}`}
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>
    );
  }

  // Default search box variant
  return (
    <div className={`relative ${className}`}>
      <div className="relative w-full">
        {/* <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && setShowSuggestions(true)}
          onClick={handleInputClick}
          autoFocus={autoFocus}
          className="w-full pl-12 pr-10 py-2 
          border border-border rounded-full 
          bg-card shadow-lg
          focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent 
          transition-all duration-200 ease-in-out 
          text-text placeholder-subtext cursor-pointer"
          style={{
            height: '35px',
          }}
        /> */}
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && setShowSuggestions(true)}
          onClick={handleInputClick}
          autoFocus={autoFocus}
          className="w-full pl-12 pr-10 py-2 
          rounded-full 
          bg-gray-200 dark:bg-gray-700
          border border-transparent
          hover:border-subtext
          focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent
          text-text placeholder-subtext cursor-text"
          style={{
            height: '35px',
          }}
        />
        {/* <div className="absolute left-0 top-0 h-full flex items-center justify-center w-10 bg-tertiary rounded-l-full"> */}
        <div className="absolute left-0 top-0 h-full flex items-center justify-center w-10 rounded-l-full">
          {/* <Search className="w-4 h-4 text-white" /> */}
          <Search className="w-4 h-4 text-text" />
        </div>
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="w-full h-full" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg z-50 max-h-64 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`px-4 py-3 cursor-pointer border-b border-border last:border-b-0 hover:bg-bg ${
                index === selectedIndex ? 'bg-accent/10 border-accent/20' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{getTypeIcon(suggestion.type)}</span>
                <div className="flex-1">
                  <div className="font-medium text-text">
                    {suggestion.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {suggestion.category}
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    suggestion.type === 'quiz'
                      ? 'bg-blue-100 text-blue-800'
                      : suggestion.type === 'lesson'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {suggestion.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};