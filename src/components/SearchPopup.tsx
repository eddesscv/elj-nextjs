// SearchPopup.tsx

import React, { useState, useEffect, useRef } from 'react';
import { X, TrendingUp, Clock, Star, Zap, Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchSuggestion {
  id: string;
  title: string;
  category: string;
  type: 'quiz' | 'lesson' | 'category';
}

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

// Default suggestions for the popup
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

// Custom SearchBox for the popup with full functionality
const PopupSearchBox: React.FC<{
  onSearch: (query: string) => void;
  onQueryChange: (query: string) => void;
  autoFocus: boolean;
}> = ({ onSearch, onQueryChange, autoFocus }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      // Small delay to ensure the popup is fully rendered
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          const length = inputRef.current.value.length;
          inputRef.current.setSelectionRange(length, length);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = defaultSuggestions
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
    
    // Notify parent of query changes
    onQueryChange(query);
  }, [query, onQueryChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) {
      if (e.key === 'Enter' && query.trim()) {
        handleSearch(query.trim());
      }
      return;
    }

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
          handleSearch(query.trim());
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
    onSearch(suggestion.title);
  };

  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query.trim();
    if (finalQuery) {
      onSearch(finalQuery);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onQueryChange('');
    if (inputRef.current) {
      inputRef.current.focus();
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

  return (
    <div className="relative">
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search quizzes, lessons, categories..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && setShowSuggestions(true)}
          className="w-full pl-12 pr-10 py-2 
          border border-border rounded-full 
          bg-card shadow-lg
          focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent 
          transition-all duration-200 ease-in-out 
          text-text placeholder-subtext"
          style={{
            height: '35px',
          }}
        />
        <div className="absolute left-0 top-0 h-full flex items-center justify-center w-10 bg-tertiary rounded-l-full">
          <Search className="w-4 h-4 text-white" />
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
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
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

// Topic Section Component
const TopicSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  items: Array<{ title: string; category?: string; popularity?: string; new?: boolean }>;
  viewMorePath: string;
  onItemClick: (title: string) => void;
  onViewMore: () => void; // Add this prop
}> = ({ title, icon, items, viewMorePath, onItemClick, onViewMore }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(viewMorePath);
    onViewMore(); // Close the popup
  };

  return (
    <div className="space-y-3">
      {/* Header with View More */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-lg font-semibold text-text">{title}</h3>
        </div>
        <button
          onClick={handleViewMore}
          className="flex items-center gap-1 text-sm text-accent hover:text-accent/80 transition-colors"
        >
          View more
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {items.slice(0, 6).map((item, index) => (
          <button
            key={index}
            onClick={() => onItemClick(item.title)}
            className="text-left p-3 bg-card hover:bg-accent/10 rounded-lg transition-colors border border-border group"
          >
            <div className="space-y-1">
              <div className="flex justify-between items-start">
                <span className="font-medium text-text text-sm group-hover:text-accent transition-colors line-clamp-2">
                  {item.title}
                </span>
                {item.new && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded-full flex-shrink-0 ml-1">
                    New
                  </span>
                )}
              </div>
              {item.category && (
                <span className="text-xs text-subtext block">{item.category}</span>
              )}
              {item.popularity && (
                <span className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded-full">
                  {item.popularity}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Popular Searches Component (Different layout)
const PopularSearchesSection: React.FC<{
  searches: string[];
  onSearch: (query: string) => void;
}> = ({ searches, onSearch }) => {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold text-text">Popular Searches</h3>
      </div>

      {/* Search Tags */}
      <div className="flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <button
            key={index}
            onClick={() => onSearch(search)}
            className="px-3 py-2 bg-card hover:bg-accent/10 rounded-full text-sm text-text transition-colors border border-border hover:border-accent/30"
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
};

// Main SearchPopup Component
const SearchPopup: React.FC<SearchPopupProps> = ({
  isOpen,
  onClose,
  onSearch,
}) => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shouldRender, setShouldRender] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    } else {
      // Wait for the close animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
        setSearchQuery('');
      }, 300); // Match the duration of the transition (300ms)
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  // Check if user is typing (has search query)
  const isTyping = searchQuery.length > 0;

  if (!mounted || !shouldRender) return null;

  const popularSearches = [
    'Grammar Basics',
    'Business English',
    'Vocabulary Test',
    'Pronunciation Guide',
    'Reading Comprehension',
    'Writing Skills'
  ];

  const trendingQuizzes = [
    { title: 'Advanced Grammar Challenge', category: 'Grammar', popularity: '95%' },
    { title: 'Business Vocabulary Pro', category: 'Business', popularity: '88%' },
    { title: 'English Pronunciation Master', category: 'Pronunciation', popularity: '92%' },
    { title: 'TOEFL Preparation Test', category: 'Exam', popularity: '85%' },
    { title: 'Idioms and Phrases', category: 'Vocabulary', popularity: '90%' },
    { title: 'Business Communication', category: 'Business', popularity: '87%' },
  ];

  const newQuizzes = [
    { title: 'Idioms and Expressions', category: 'Vocabulary', new: true },
    { title: 'British vs American English', category: 'Culture', new: true },
    { title: 'Academic Writing Guide', category: 'Writing', new: true },
    { title: 'Advanced Listening', category: 'Listening', new: true },
    { title: 'Travel English', category: 'Travel', new: true },
    { title: 'Job Interview Prep', category: 'Business', new: true },
  ];

  const popularCategories = [
    { title: 'Grammar', category: '125 quizzes' },
    { title: 'Vocabulary', category: '98 quizzes' },
    { title: 'Business', category: '76 quizzes' },
    { title: 'Pronunciation', category: '64 quizzes' },
    { title: 'Writing', category: '89 quizzes' },
    { title: 'Reading', category: '72 quizzes' },
  ];

  const handleSearch = (query: string) => {
    onSearch(query);
    onClose();
    setSearchQuery(''); // Reset query after search
  };

  // Handle search query change to track typing
  const handleQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Popup - Fixed closing animation */}
      <div
        className={`fixed top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-[70] bg-bg shadow-2xl transition-all duration-300 
          w-[calc(100%-2rem)] 
          md:w-[calc(100%-4rem)] 
          lg:w-full 
          max-w-2xl 
          md:max-w-3xl 
          lg:max-w-4xl 
          xl:max-w-5xl 
          rounded-xl ${
          isOpen 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text">Search</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-card transition-colors"
              aria-label="Close search"
            >
              <X className="w-6 h-6 text-text" />
            </button>
          </div>

          {/* Custom Search Box */}
          <div className="mb-8" ref={searchBoxRef}>
            <PopupSearchBox
              onSearch={handleSearch}
              onQueryChange={handleQueryChange}
              autoFocus={isOpen}
            />
          </div>

          {/* Show suggestion sections only when NOT typing */}
          {!isTyping ? (
            <div className="space-y-8 max-h-[60vh] overflow-y-auto">
              {/* Popular Searches */}
              <PopularSearchesSection
                searches={popularSearches}
                onSearch={handleSearch}
              />

              {/* Trending Quizzes */}
              <TopicSection
                title="Trending Quizzes"
                icon={<Zap className="w-5 h-5 text-orange-500" />}
                items={trendingQuizzes}
                viewMorePath="/trending-quizzes"
                onItemClick={handleSearch}
                onViewMore={onClose} // Pass the close function
              />

              {/* New Quizzes */}
              <TopicSection
                title="New Quizzes"
                icon={<Clock className="w-5 h-5 text-blue-500" />}
                items={newQuizzes}
                viewMorePath="/new-quizzes"
                onItemClick={handleSearch}
                onViewMore={onClose} // Pass the close function
              />

              {/* Popular Categories */}
              <TopicSection
                title="Popular Categories"
                icon={<Star className="w-5 h-5 text-yellow-500" />}
                items={popularCategories}
                viewMorePath="/categories"
                onItemClick={handleSearch}
                onViewMore={onClose} // Pass the close function
              />
            </div>
          ) : (
            // Show typing indicator when user is typing
            <div className="text-center py-4">
              <p className="text-subtext">Continue typing to see search results...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Export as default
export default SearchPopup;