import React from 'react';
import { useCategories } from '../../hooks/useCMS';
import { LoadingSpinner, ErrorMessage } from '../LoadingSpinner';
import { GamesGrid } from '../SidebarGamesGrid';

interface CategoriesPageProps {
  onCategorySelect: (categoryId: string) => void;
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

// Define category sections based on the PDF structure but in English
const categorySections = [
  {
    title: "Culture & Sciences",
    categories: [
      { name: "Geography", icon: "🗺️", questions: 211, hasLessons: true },
      { name: "General Knowledge", icon: "🧠", questions: 209, hasLessons: true },
      { name: "Miscellaneous", icon: "📦", questions: 89, hasLessons: false },
      { name: "History", icon: "📜", questions: 87, hasLessons: true },
      { name: "France", icon: "🇫🇷", questions: 87, hasLessons: true },
      { name: "Science", icon: "🔬", questions: 41, hasLessons: true },
      { name: "Politics", icon: "🏛️", questions: 32, hasLessons: false },
      { name: "Current Affairs", icon: "📰", questions: 33, hasLessons: true },
      { name: "Brands & Logos", icon: "🏢", questions: 18, hasLessons: false },
      { name: "Health", icon: "💊", questions: 16, hasLessons: true },
      { name: "Mathematics", icon: "🧮", questions: 14, hasLessons: true }
    ]
  },
  {
    title: "Entertainment",
    categories: [
      { name: "Cinema", icon: "🎬", questions: 157, hasLessons: false },
      { name: "Personalities", icon: "🌟", questions: 99, hasLessons: false },
      { name: "Music", icon: "🎵", questions: 67, hasLessons: true },
      { name: "Animated Films", icon: "🐭", questions: 37, hasLessons: false },
      { name: "Literature", icon: "📚", questions: 37, hasLessons: true },
      { name: "TV Series", icon: "📺", questions: 28, hasLessons: false },
      { name: "Television", icon: "📡", questions: 25, hasLessons: false },
      { name: "Arts", icon: "🎨", questions: 15, hasLessons: true },
      { name: "Comics", icon: "💥", questions: 12, hasLessons: false },
      { name: "Video Games", icon: "🎮", questions: 6, hasLessons: false }
    ]
  },
  {
    title: "Sports",
    categories: [
      { name: "Football", icon: "⚽", questions: 37, hasLessons: false },
      { name: "Athletes", icon: "🏃", questions: 22, hasLessons: false },
      { name: "Tennis", icon: "🎾", questions: 10, hasLessons: false },
      { name: "Other Sports", icon: "🏅", questions: 7, hasLessons: false },
      { name: "Olympic Games", icon: "🥇", questions: 4, hasLessons: false },
      { name: "Cycling", icon: "🚴", questions: 4, hasLessons: false },
      { name: "Rugby", icon: "🏉", questions: 3, hasLessons: false },
      { name: "Basketball", icon: "🏀", questions: 2, hasLessons: false },
      { name: "Formula 1", icon: "🏎️", questions: 1, hasLessons: false }
    ]
  },
  {
    title: "Nature",
    categories: [
      { name: "Animals", icon: "🐾", questions: 84, hasLessons: true },
      { name: "Plants & Vegetation", icon: "🌿", questions: 24, hasLessons: true },
      { name: "Our Planet", icon: "🌎", questions: 10, hasLessons: true },
      { name: "Ecology", icon: "♻️", questions: 3, hasLessons: true }
    ]
  },
  {
    title: "Languages",
    categories: [
      { name: "French Language", icon: "🇫🇷", questions: 62, hasLessons: true },
      { name: "English", icon: "🇬🇧", questions: 12, hasLessons: true }
    ]
  },
  {
    title: "Daily Life",
    categories: [
      { name: "Food & Nutrition", icon: "🍎", questions: 70, hasLessons: true },
      { name: "Leisure", icon: "🎳", questions: 34, hasLessons: false },
      { name: "Highway Code", icon: "🚦", questions: 15, hasLessons: true },
      { name: "Religions", icon: "🛐", questions: 6, hasLessons: true },
      { name: "Automotive", icon: "🚗", questions: 2, hasLessons: false }
    ]
  },
  {
    title: "Keywords",
    categories: [
      { name: "Cities", icon: "🏙️", questions: 36, hasLessons: false },
      { name: "Countries of the World", icon: "🌍", questions: 35, hasLessons: true },
      { name: "True or False", icon: "✅", questions: 35, hasLessons: false },
      { name: "Disney", icon: "🐭", questions: 27, hasLessons: false },
      { name: "Retrospective", icon: "📻", questions: 22, hasLessons: false },
      { name: "Blind Test", icon: "🎧", questions: 19, hasLessons: false },
      { name: "Decades Special", icon: "📅", questions: 19, hasLessons: false },
      { name: "Identify Personalities", icon: "👤", questions: 16, hasLessons: false },
      { name: "Fruits & Vegetables", icon: "🍓", questions: 15, hasLessons: true },
      { name: "Flags", icon: "🏳️", questions: 15, hasLessons: true },
      { name: "World Capitals", icon: "💎", questions: 14, hasLessons: true },
      { name: "Historical Figures", icon: "👑", questions: 14, hasLessons: true },
      { name: "Medicine - Human Body", icon: "🫀", questions: 12, hasLessons: true },
      { name: "Harry Potter", icon: "⚡", questions: 12, hasLessons: false },
      { name: "World Cuisines", icon: "🍜", questions: 10, hasLessons: true },
      { name: "First Names", icon: "📛", questions: 8, hasLessons: false },
      { name: "Halloween", icon: "🎃", questions: 9, hasLessons: false },
      { name: "Astronomy", icon: "🔭", questions: 8, hasLessons: true },
      { name: "Presidential 2022", icon: "🗳️", questions: 8, hasLessons: false },
      { name: "Colors", icon: "🎨", questions: 7, hasLessons: false },
      { name: "Marvel", icon: "🦸", questions: 7, hasLessons: false },
      { name: "Football Clubs", icon: "⚽", questions: 7, hasLessons: false },
      { name: "Christmas", icon: "🎄", questions: 7, hasLessons: false },
      { name: "Departments", icon: "🗂️", questions: 6, hasLessons: true }
    ]
  }
];

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ 
  onCategorySelect, 
  onBack,
  onNavigate 
}) => {
  const { data: categories, loading, error } = useCategories();

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-text mb-4">All Categories</h1>
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all dark:from-purple-700 dark:to-blue-700 dark:hover:from-purple-800 dark:hover:to-blue-800"
            >
              ← Back to Home
            </button>
          </div>
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-text mb-4">All Categories</h1>
          </div>
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="min-h-screen bg-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-text mb-4">All Categories</h1>
          <p className="text-subtext mb-8">No categories available at the moment.</p>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all dark:from-purple-700 dark:to-blue-700 dark:hover:from-purple-800 dark:hover:to-blue-800"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Helper function to find a category by name
  const findCategoryByName = (name: string) => {
    return categories.find(cat => 
      cat.name.toLowerCase().includes(name.toLowerCase()) || 
      name.toLowerCase().includes(cat.name.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text mb-4">All Categories</h1>
          <p className="text-xl text-subtext mb-8">
            Choose a category to start learning
          </p>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all dark:from-purple-700 dark:to-blue-700 dark:hover:from-purple-800 dark:hover:to-blue-800"
          >
            ← Back to Home
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories list (72% width) */}
          <div className="w-full lg:w-[72%]">
            {categorySections.map((section, index) => (
              <div key={index} className="mb-10">
                <h2 className="text-2xl font-bold text-text mb-4 border-b border-border pb-2">
                  {section.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {section.categories.map((categoryData, catIndex) => {
                    const category = findCategoryByName(categoryData.name);
                    return (
                      <div
                        key={catIndex}
                        onClick={() => category && onCategorySelect(category.id)}
                        className={`bg-card rounded-lg p-4 shadow-md transition-all duration-200 cursor-pointer border border-border ${
                          category ? "hover:shadow-lg hover:border-purple-400" : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{categoryData.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-medium text-text mb-1">
                              {categoryData.name}
                            </h3>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-subtext">
                                {categoryData.questions} questions
                              </span>
                              {categoryData.hasLessons && (
                                <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                                  Lessons
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* GamesGrid sidebar (28% width) */}
          <div className="w-full lg:w-[28%]">
            <div className="sticky top-4">
              <GamesGrid 
                onNavigate={onNavigate}
                compact
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};