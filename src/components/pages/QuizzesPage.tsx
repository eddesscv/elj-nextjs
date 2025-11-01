import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBox } from '../SearchBox';
import { GamesGrid } from '../SidebarGamesGrid';
import { useCategories } from '../../hooks/useCMS';
import { LoadingSpinner } from '../LoadingSpinner';
import { User, ChevronDown, Filter, Folder, Gauge } from 'lucide-react';

interface QuizzesPageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  participants: string;
  rating: number;
  image: string;
  author: string;
  date: string;
}

export const QuizzesPage: React.FC<QuizzesPageProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const { data: categories, loading: categoriesLoading } = useCategories();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [showFilters, setShowFilters] = useState(false);
  
  const itemsPerPage = 20;

  // Mock quiz data - in production, this would come from your CMS
  const allQuizzes: Quiz[] = [
    {
      id: '1',
      title: 'Quiz Culture Générale Extrême #3',
      description: 'Test your general knowledge with this challenging quiz',
      category: 'General Knowledge',
      difficulty: 'Hard',
      participants: '2.1M',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'Quiz Master',
      date: '2024-12-10'
    },
    {
      id: '2',
      title: 'Quiz spécial Années 80',
      description: 'Dive into the nostalgic world of the 80s',
      category: 'History',
      difficulty: 'Medium',
      participants: '1.8M',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'Retro Quiz',
      date: '2024-12-09'
    },
    {
      id: '3',
      title: 'Quiz spécial Années Soixante',
      description: 'Journey back to the swinging sixties',
      category: 'History',
      difficulty: 'Medium',
      participants: '1.5M',
      rating: 4.5,
      image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'History Buff',
      date: '2024-12-08'
    },
    {
      id: '4',
      title: 'Quiz - Associez les Départements aux Régions Françaises #3',
      description: 'Match French departments with their regions',
      category: 'Geography',
      difficulty: 'Hard',
      participants: '1.2M',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'Geography Pro',
      date: '2024-12-07'
    },
    {
      id: '5',
      title: 'Quiz vidéo - Culture Générale niveau Difficile #6',
      description: 'Video quiz with difficult general knowledge questions',
      category: 'General Knowledge',
      difficulty: 'Hard',
      participants: '980K',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'Video Quiz',
      date: '2024-12-06'
    },
    {
      id: '6',
      title: 'Quiz spécial Francis Cabrel',
      description: 'Everything about the French singer Francis Cabrel',
      category: 'Music',
      difficulty: 'Medium',
      participants: '850K',
      rating: 4.4,
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'Music Fan',
      date: '2024-12-05'
    },
    {
      id: '7',
      title: 'Quiz spécial Années Françaises 90',
      description: 'French culture and events from the 90s',
      category: 'History',
      difficulty: 'Medium',
      participants: '720K',
      rating: 4.3,
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: '90s Expert',
      date: '2024-12-04'
    },
    {
      id: '8',
      title: 'Quiz Culture Générale Amateur - Niveau 50 ans #5',
      description: 'General knowledge quiz for the 50+ generation',
      category: 'General Knowledge',
      difficulty: 'Easy',
      participants: '650K',
      rating: 4.2,
      image: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'Senior Quiz',
      date: '2024-12-03'
    },
    {
      id: '9',
      title: 'Quiz - Avez-vous bien suivi l\'actualité d\'août 2023 ?',
      description: 'Current events quiz for August 2023',
      category: 'Current Events',
      difficulty: 'Medium',
      participants: '580K',
      rating: 4.1,
      image: 'https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'News Quiz',
      date: '2024-12-02'
    },
    {
      id: '10',
      title: 'Quiz spécial Gulliver',
      description: 'All about Jonathan Swift\'s Gulliver\'s Travels',
      category: 'Literature',
      difficulty: 'Hard',
      participants: '520K',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'Literature Lover',
      date: '2024-12-01'
    },
    {
      id: '11',
      title: 'Quiz - Reconnaissez les Athlètes par Sport',
      description: 'Identify athletes by their sport',
      category: 'Sports',
      difficulty: 'Medium',
      participants: '480K',
      rating: 4.4,
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'Sports Fan',
      date: '2024-11-30'
    },
    {
      id: '12',
      title: 'Quiz vidéo - 100% Gastronomie - Plats et créations populaires',
      description: 'Video quiz about popular dishes and culinary creations',
      category: 'Food',
      difficulty: 'Medium',
      participants: '450K',
      rating: 4.5,
      image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'Food Expert',
      date: '2024-11-29'
    },
    {
      id: '13',
      title: 'Quiz spécial Alain Chabat',
      description: 'Everything about French actor and director Alain Chabat',
      category: 'Cinema',
      difficulty: 'Medium',
      participants: '420K',
      rating: 4.3,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'Cinema Buff',
      date: '2024-11-28'
    },
    {
      id: '14',
      title: 'Quiz spécial dans pendant les Jeux Olympiques',
      description: 'Special quiz about the Olympic Games',
      category: 'Sports',
      difficulty: 'Medium',
      participants: '390K',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'Olympic Expert',
      date: '2024-11-27'
    },
    {
      id: '15',
      title: 'Quiz spécial Littérature de Science Fiction',
      description: 'Science fiction literature quiz',
      category: 'Literature',
      difficulty: 'Hard',
      participants: '360K',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'Sci-Fi Reader',
      date: '2024-11-26'
    },
    {
      id: '16',
      title: 'Géographie et Flore d\'Amérique en Lande rouge',
      description: 'Geography and flora of America\'s red lands',
      category: 'Geography',
      difficulty: 'Hard',
      participants: '330K',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'Nature Expert',
      date: '2024-11-25'
    },
    {
      id: '17',
      title: 'Quiz vidéo - Devinez les Stars dans les Photomontages #1',
      description: 'Video quiz: Guess the stars in photo montages',
      category: 'Entertainment',
      difficulty: 'Medium',
      participants: '300K',
      rating: 4.2,
      image: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'Celebrity Quiz',
      date: '2024-11-24'
    },
    {
      id: '18',
      title: 'Quiz Gastronomie française et Traditions des Jeux de cartes',
      description: 'French gastronomy and card game traditions',
      category: 'Culture',
      difficulty: 'Medium',
      participants: '280K',
      rating: 4.4,
      image: 'https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'Culture Expert',
      date: '2024-11-23'
    },
    {
      id: '19',
      title: 'Quiz spécial sur la Légende d\'Icare',
      description: 'Special quiz about the legend of Icarus',
      category: 'Mythology',
      difficulty: 'Hard',
      participants: '250K',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'Mythology Scholar',
      date: '2024-11-22'
    },
    {
      id: '20',
      title: 'Quiz spécial sur la Famille d\'Aubrac',
      description: 'Special quiz about the Aubrac family',
      category: 'History',
      difficulty: 'Medium',
      participants: '220K',
      rating: 4.3,
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=100',
      author: 'History Teacher',
      date: '2024-11-21'
    }
  ];

  // Filter quizzes based on search query and filters
  const filteredQuizzes = allQuizzes.filter(quiz =>
    (quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory === 'all' || quiz.category === selectedCategory) &&
    (selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty)
  );

  // Sort quizzes
  const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'popularity') {
      const aParticipants = parseFloat(a.participants.replace('K', '000').replace('M', '000000'));
      const bParticipants = parseFloat(b.participants.replace('K', '000').replace('M', '000000'));
      return bParticipants - aParticipants;
    }
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedQuizzes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentQuizzes = sortedQuizzes.slice(startIndex, endIndex);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Hard': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  // Get unique categories from quizzes
  const uniqueCategories = ['all', ...new Set(allQuizzes.map(quiz => quiz.category))];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];
  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'date', label: 'Newest First' }
  ];

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSortBy('popularity');
    setCurrentPage(1);
  };

  const CategoryCard = ({ category, className }: { category: any; className?: string }) => {
    return (
      <div
        onClick={() => navigate(`/category/${category.id}`)}
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

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-6 bg-card text-text border border-border px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl font-bold text-text mb-4">📚 All Quizzes</h1>
          <p className="text-xl text-subtext">Discover thousands of quizzes on various topics</p>
        </div>

        {/* Search Box */}
        <div className="mb-8 max-w-2xl mx-auto">
          <SearchBox
            placeholder="Search for quizzes..."
            onSearch={handleSearch}
            className="w-full"
          />
        </div>

        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-[72%]">
            {/* Categories Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-text">📚 Quizzes by Categories</h2>
                <div className="flex-1">
                  <hr className="border-t border-border ml-4" />
                </div>
              </div>

              {categoriesLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="lg" />
                </div>
              ) : (
                <>
                  {/* Responsive Categories Container */}
                  <div className="relative">
                    {/* Grid Layout for desktop (≥1024px) - 2 rows of 6 with gap */}
                    <div className="hidden lg:block">
                      <div className="grid grid-cols-3 pb-6 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {categories?.slice(0, 12).map((category) => (
                          <CategoryCard
                            key={category.id}
                            category={category}
                            className="aspect-square"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Horizontal Scroll for mobile (<1024px) */}
                    <div className="lg:hidden">
                      <div
                        className="flex gap-3 pb-6 overflow-x-auto -mx-4 px-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                      >
                        <style jsx>{`.flex::-webkit-scrollbar { display: none; }`}</style>
                        {categories?.map((category) => (
                          <CategoryCard
                            key={category.id}
                            category={category}
                            className="w-32 h-32 flex-shrink-0"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* View All Categories Button */}
                  <div className="text-center">
                    <button
                      onClick={() => navigate('/categories')}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 dark:from-purple-700 dark:to-blue-700 dark:hover:from-purple-800 dark:hover:to-blue-800"
                    >
                      View All Categories
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Quiz List */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text">All Quizzes</h2>
                <span className="text-subtext">
                  {sortedQuizzes.length} quiz{sortedQuizzes.length !== 1 ? 'es' : ''} found
                </span>
              </div>
            
              {/* Filters Section */}
              <div className="mb-8 bg-card p-4 rounded-lg border border-border">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-subtext" />
                    <h3 className="font-semibold text-text">Filters</h3>
                    <button 
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden ml-2 text-accent text-sm font-medium"
                    >
                      {showFilters ? 'Hide' : 'Show'} Filters
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <button 
                      onClick={resetFilters}
                      className="text-accent hover:underline"
                    >
                      Reset filters
                    </button>
                  </div>
                </div>
            
                {/* Filter Controls - All in one row */}
                <div className={`flex flex-col lg:flex-row gap-4 ${showFilters ? 'flex' : 'hidden lg:flex'}`}>
                  {/* Category Filter */}
                  <div className="flex-1 min-w-0">
                    {/* <label className="block text-sm font-medium text-text mb-2">Category</label> */}
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full bg-bg border border-border rounded-lg py-2 pl-3 pr-10 text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent appearance-none"
                      >
                        {uniqueCategories.map(category => (
                          <option key={category} value={category}>
                            {category === 'all' ? 'All Categories' : category}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-subtext pointer-events-none" />
                    </div>
                  </div>
            
                  {/* Difficulty Filter */}
                  <div className="flex-1 min-w-0">
                    {/* <label className="block text-sm font-medium text-text mb-2">Difficulty</label> */}
                    <div className="relative">
                      <select
                        value={selectedDifficulty}
                        onChange={(e) => {
                          setSelectedDifficulty(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full bg-bg border border-border rounded-lg py-2 pl-3 pr-10 text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent appearance-none"
                      >
                        {difficulties.map(difficulty => (
                          <option key={difficulty} value={difficulty}>
                            {difficulty === 'all' ? 'All Difficulties' : difficulty}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-subtext pointer-events-none" />
                    </div>
                  </div>
            
                  {/* Sort Filter */}
                  <div className="flex-1 min-w-0">
                    {/* <label className="block text-sm font-medium text-text mb-2">Sort By</label> */}
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => {
                          setSortBy(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full bg-bg border border-border rounded-lg py-2 pl-3 pr-10 text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent appearance-none"
                      >
                        {sortOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-subtext pointer-events-none" />
                    </div>
                  </div>
            
                  {/* Results per page (optional) */}
                  <div className="flex-1 min-w-0">
                    {/* <label className="block text-sm font-medium text-text mb-2">Per Page</label> */}
                    <div className="relative">
                      <select
                        value={itemsPerPage}
                        onChange={(e) => {
                          // If you want to make itemsPerPage dynamic
                          // setItemsPerPage(Number(e.target.value));
                          // setCurrentPage(1);
                        }}
                        className="w-full bg-bg border border-border rounded-lg py-2 pl-3 pr-10 text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent appearance-none"
                        disabled // Remove this if you want to make it functional
                      >
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="60">60</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-subtext pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
              
             {/* Quiz Items */}
              <div className="space-y-4">
                {currentQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="bg-card hover:bg-[#5744b7] rounded-lg shadow-md hover:shadow-lg transition-all duration-500  p-1 border border-border cursor-pointer hover:scale-[1.01] overflow-visible h-[90px] group"
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                  >
                    <div className="flex items-center h-full">
                      {/* Quiz Image - Larger and more prominent */}
                      <div className="flex-shrink-0 w-24 h-24 aspect-square -ml-4 -mt-0.5 transform scale-[1.02]">
                        <div className="w-full h-full rounded-xl overflow-hidden border-4 border-white/90 dark:border-gray-700 shadow-xl">
                          <img
                            src={quiz.image}
                            alt={quiz.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                                      
                      {/* Quiz Info - Centered vertically */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center pl-2 pr-2">
                        <h3 className="font-bold text-base px-2 py-1 text-text group-hover:text-white mb-1 line-clamp-2 leading-tight transition-colors duration-500 ease-in-out">
                          {quiz.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-0 sm:gap-2">
                          <span className="text-subtext group-hover:text-white/80 px-2 py-1 rounded-full transition-colors duration-300 flex items-center text-xs uppercase">
                            <Folder className="w-3 h-3 mr-1" /> 
                            {quiz.category}
                          </span>
                          <span className="text-subtext group-hover:text-white/80 px-2 py-1 rounded-full transition-colors duration-300 flex items-center text-xs uppercase">
                            <Gauge className="w-3 h-3 mr-1" />
                            {quiz.difficulty}
                          </span>
                          <span className="text-subtext group-hover:text-white/80 px-2 py-1 rounded-full transition-colors duration-300 flex items-center text-xs uppercase font-medium">
                            <User className="h-3 w-3 mr-1" />
                            {quiz.participants}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg bg-card border border-border text-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    ←
                  </button>
            
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
            
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-accent text-white'
                            : 'bg-card border border-border text-text hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
            
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg bg-card border border-border text-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - All Games */}
          <div className="w-full lg:w-[28%]">
            {/* <div className="bg-card rounded-xl shadow-md sticky top-4 border border-border"> */}
            <div className="sticky top-4">
              <GamesGrid onNavigate={onNavigate} compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};