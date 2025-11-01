import React, { useState } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
  Link,
} from 'react-router-dom';
import { GoogleLoginButton } from './components/GoogleLoginButton';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PopularQuizzes } from './components/PopularQuizzes';
import { DailyQuiz } from './components/DailyQuiz';
import { QuizCategories } from './components/QuizCategories';
import { FeaturedQuizzes } from './components/FeaturedQuizzes';
import { TodayTopQuizzes } from './components/TodayTopQuizzes';
import { PersonalityTests } from './components/PersonalityTests';
import { HorizontalCategories } from './components/HorizontalCategories';
import { InfoSection } from './components/InfoSection';
import { Footer } from './components/Footer';
import { CategoriesPage } from './components/pages/CategoriesPage';
import { CategoryPage } from './components/pages/CategoryPage';
import { LessonsPage } from './components/pages/LessonsPage';
import { LessonPage } from './components/pages/LessonPage';
import { QuestionOfDayPage } from './components/pages/QuestionOfDayPage';
import { RiddlesPage } from './components/pages/RiddlesPage';
import { AccountPage } from './components/pages/AccountPage';
import { NewsletterPage } from './components/pages/NewsletterPage';
import { BlogPage } from './components/pages/BlogPage';
import { AllGamesPage } from './components/pages/AllGamesPage';
import { EnhancedQuestionOfDayPage } from './components/pages/EnhancedQuestionOfDayPage';
import { TicTacToeGame } from './components/games/TicTacToeGame';
import { WordOfDayGame } from './components/games/WordOfDayGame';
import { QuizzesPage } from './components/pages/QuizzesPage';

// --- Page Wrappers ---
const HomePage: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <>
      <PopularQuizzes isSidebarOpen={isSidebarOpen} />
      <Hero onStartQuiz={handleStartQuiz} isSidebarOpen={isSidebarOpen} />
      <HorizontalCategories isSidebarOpen={isSidebarOpen} />
      <DailyQuiz isSidebarOpen={isSidebarOpen} />
      <div id="categories">
        <QuizCategories onCategorySelect={handleCategorySelect} isSidebarOpen={isSidebarOpen} />
      </div>
      <FeaturedQuizzes isSidebarOpen={isSidebarOpen} />
      <TodayTopQuizzes isSidebarOpen={isSidebarOpen} />
      <PersonalityTests isSidebarOpen={isSidebarOpen} />
      <InfoSection isSidebarOpen={isSidebarOpen} />
    </>
  );
};

const CategoryPageWrapper: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  if (!categoryId) {
    navigate('/');
    return null;
  }

  return (
    <CategoryPage
      categoryId={categoryId}
      onBack={() => navigate('/')}
      onStartQuiz={() => console.log('Start quiz for', categoryId)}
      onViewLessons={() => navigate(`/category/${categoryId}/lessons`)}
      isSidebarOpen={isSidebarOpen}
    />
  );
};

const LessonsPageWrapper: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  if (!categoryId) {
    navigate('/');
    return null;
  }

  return (
    <LessonsPage
      categoryId={categoryId}
      onBack={() => navigate(`/category/${categoryId}`)}
      onLessonSelect={(lessonId) =>
        navigate(`/category/${categoryId}/lesson/${lessonId}`)
      }
      isSidebarOpen={isSidebarOpen}
    />
  );
};

const LessonPageWrapper: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const { categoryId, lessonId } = useParams<{
    categoryId: string;
    lessonId: string;
  }>();
  const navigate = useNavigate();

  if (!categoryId || !lessonId) {
    navigate('/');
    return null;
  }

  return (
    <LessonPage
      lessonId={lessonId}
      onBack={() => navigate(`/category/${categoryId}/lessons`)}
      isSidebarOpen={isSidebarOpen}
    />
  );
};

const EnhancedQuestionOfDayWrapper: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  return (
    <EnhancedQuestionOfDayPage
      onBack={() => navigate('/')}
      onNavigate={(page) => navigate(page)}
      isSidebarOpen={isSidebarOpen}
    />
  );
};

const CategoriesPageWrapper: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  return (
    <CategoriesPage
      onCategorySelect={(categoryId) => navigate(`/category/${categoryId}`)}
      onBack={() => navigate('/')}
      isSidebarOpen={isSidebarOpen}
    />
  );
};

const QuizzesPageWrapper: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  return (
    <QuizzesPage
      onBack={() => navigate('/')}
      onNavigate={(page) => navigate(page)}
      isSidebarOpen={isSidebarOpen}
    />
  );
};

const AllGamesPageWrapper: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  return (
    <AllGamesPage
      onBack={() => navigate('/')}
      onNavigate={(page) => navigate(page)}
      isSidebarOpen={isSidebarOpen}
    />
  );
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Redirect to home since we now use popup
  React.useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
};

const NotFoundPage: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen flex items-center justify-center ${isSidebarOpen ? 'xl:ml-64' : 'xl:ml-16'}`}>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

// --- Main App ---
function App() {
  return (
    // <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
    <GoogleOAuthProvider clientId="27759015449-07gkq6n6bh76k8bf050isrfsc6glf9iq.apps.googleusercontent.com">
      <AuthProvider>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Pass sidebar state and toggle function to Header */}
      <Header 
        onLogoClick={() => navigate('/')} 
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={handleSidebarToggle}
      />

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Add overflow-visible to main content to allow tooltips to show */}
        <main className={`flex-1 w-full transition-all duration-300 overflow-visible ${
          isSidebarOpen ? 'xl:ml-64' : 'xl:ml-16'
        }`}>
          <Routes>
            {/* Home */}
            <Route path="/" element={<HomePage isSidebarOpen={isSidebarOpen} />} />

            {/* Categories */}
            <Route path="/categories" element={<CategoriesPageWrapper isSidebarOpen={isSidebarOpen} />} />
            <Route path="/quizzes" element={<QuizzesPageWrapper isSidebarOpen={isSidebarOpen} />} />
            <Route
              path="/category/:categoryId"
              element={<CategoryPageWrapper isSidebarOpen={isSidebarOpen} />}
            />
            <Route
              path="/category/:categoryId/lessons"
              element={<LessonsPageWrapper isSidebarOpen={isSidebarOpen} />}
            />
            <Route
              path="/category/:categoryId/lesson/:lessonId"
              element={<LessonPageWrapper isSidebarOpen={isSidebarOpen} />}
            />

            {/* Question of the Day */}
            <Route path="/question-of-day" element={<QuestionOfDayPage isSidebarOpen={isSidebarOpen} />} />
            <Route
              path="/enhanced-question-of-day"
              element={<EnhancedQuestionOfDayWrapper isSidebarOpen={isSidebarOpen} />}
            />

            {/* Games */}
            <Route path="/all-games" element={<AllGamesPageWrapper isSidebarOpen={isSidebarOpen} />} />
            <Route path="/tic-tac-toe" element={<TicTacToeGame isSidebarOpen={isSidebarOpen} />} />
            <Route path="/tictactoe" element={<TicTacToeGame isSidebarOpen={isSidebarOpen} />} />
            <Route path="/word-of-day" element={<WordOfDayGame isSidebarOpen={isSidebarOpen} />} />
            <Route path="/word-day" element={<WordOfDayGame isSidebarOpen={isSidebarOpen} />} />

            {/* Other pages */}
            <Route path="/riddles" element={<RiddlesPage isSidebarOpen={isSidebarOpen} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/leaderboard"
              element={<div className={`overflow-visible ${isSidebarOpen ? 'xl:ml-64' : 'xl:ml-16'}`}>Leaderboard - Coming Soon</div>}
            />
            
            <Route
              path="/general-knowledge"
              element={<div className={`overflow-visible ${isSidebarOpen ? 'xl:ml-64' : 'xl:ml-16'}`}>General Knowledge Quizzes - Coming Soon</div>}
            />

            <Route path="/account/:tab" element={<AccountPage onBack={() => navigate('/')} isSidebarOpen={isSidebarOpen} />} />
            <Route path="/newsletter" element={<NewsletterPage isSidebarOpen={isSidebarOpen} />} />
            <Route path="/blog" element={<BlogPage isSidebarOpen={isSidebarOpen} />} />

            {/* Placeholder routes */}
            <Route
              path="/mixed-answers"
              element={<div className={`overflow-visible ${isSidebarOpen ? 'xl:ml-64' : 'xl:ml-16'}`}>Mixed Answers Game - Coming Soon</div>}
            />
            <Route
              path="/correct-order"
              element={<div className={`overflow-visible ${isSidebarOpen ? 'xl:ml-64' : 'xl:ml-16'}`}>Correct Order Game - Coming Soon</div>}
            />

            {/* Catch all */}
            <Route path="*" element={<NotFoundPage isSidebarOpen={isSidebarOpen} />} />
          </Routes>
        </main>
      </div>
      <Footer isSidebarOpen={isSidebarOpen} />
    </div>
  );
}

export default App;