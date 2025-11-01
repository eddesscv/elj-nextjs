import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { User, Trophy, Calendar, Target, LogOut, Edit } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleLoginButton } from '../../components/GoogleLoginButton';
import { Newsletter } from '../Newsletter';

interface AccountPageProps {
  onBack: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onBack }) => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<
    'score' | 'quizzes' | 'newsletters' | 'settings'
  >('score');
  const [username, setUsername] = useState(user?.username || '');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Detect tab from URL parameters
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['score', 'quizzes', 'newsletters', 'settings'].includes(tab)) {
      setActiveTab(tab as any);
    }
  }, [searchParams]);

  // Function to change tab and update URL
  const changeTab = (tab: 'score' | 'quizzes' | 'newsletters' | 'settings') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleGoogleSuccess = (userData: any) => {
    setIsLoading(false);
    setError(null);
    // The GoogleLoginButton already handles the login, so we don't need to do anything here
  };

  const handleGoogleError = (error: any) => {
    setIsLoading(false);
    setError('Failed to sign in with Google. Please try again.');
    console.error('Google login error:', error);
  };

  const handleLogout = () => {
    logout();
  };

  const handleUsernameUpdate = () => {
    if (username.trim() && username !== user?.username) {
      // Here you would typically update the user via your auth context
      console.log('Username updated to:', username.trim());
    }
    setIsEditingUsername(false);
  };

  const handleNewsletterSubmit = (email: string, subscriptions: any) => {
    console.log('Subscribed:', email, subscriptions);
    setIsSubmitted(true);
  };

  // Use demo data if no authenticated user
  const displayUser = user || {
    name: 'John Doe',
    email: 'john@example.com',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    ranking: 42,
    totalScore: 12500,
    quizzesCompleted: 28,
    joinDate: 'Jan 2023',
  };

  // If user is NOT authenticated, show login page
  if (!isAuthenticated) {
    return (
      <GoogleLoginButton
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
    );
  }

  // If user IS authenticated, show account page with tabs
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
          <div className="hidden md:block flex-shrink-0">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-20 h-20 rounded-full border-4 border-purple-200"
            />
          </div>

          {/* Welcome text on the right */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome, {user?.name}!
            </h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="mb-2">
          {/* Shared container */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="flex gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar pb-4">
              {[
                {
                  icon: <Trophy className="w-6 h-6 text-yellow-500" />,
                  value: `#${user?.ranking}`,
                  label: 'Global Ranking',
                },
                {
                  icon: <Target className="w-6 h-6 text-green-500" />,
                  value: user?.totalScore?.toLocaleString(),
                  label: 'Total Score',
                },
                {
                  icon: <User className="w-6 h-6 text-blue-500" />,
                  value: user?.quizzesCompleted,
                  label: 'Quizzes Completed',
                },
                {
                  icon: <Calendar className="w-6 h-6 text-purple-500" />,
                  value: user?.joinDate,
                  label: 'Member Since',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex-1 min-w-[140px] bg-white rounded-2xl shadow-lg p-4 text-center flex-shrink-0 snap-start flex flex-col items-center justify-center aspect-square"
                >
                  {item.icon}
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-1">
                    {item.value}
                  </div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Combined Tabs Navigation and Content Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tabs Navigation - Now always in row with horizontal scroll */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="flex overflow-x-auto hide-scrollbar">
              <div className="flex flex-nowrap gap-2 p-4 pb-0 min-w-max w-full justify-center">
                <button
                  onClick={() => setActiveTab('score')}
                  className={`px-4 py-2 rounded-t-lg font-semibold transition-colors flex-shrink-0 ${
                    activeTab === 'score'
                      ? 'bg-purple-600 text-white border-b-2 border-purple-600'
                      : 'bg-gray-100 text-gray-700 border border-b-0 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <span className="whitespace-nowrap text-sm sm:text-base md:text-base lg:text-base">
                    My Score
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('quizzes')}
                  className={`px-4 py-3 rounded-t-lg font-semibold transition-colors flex-shrink-0 ${
                    activeTab === 'quizzes'
                      ? 'bg-purple-600 text-white border-b-2 border-purple-600'
                      : 'bg-gray-100 text-gray-700 border border-b-0 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <span className="whitespace-nowrap text-sm sm:text-base md:text-base lg:text-base">
                    Quizzes
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('newsletters')}
                  className={`px-4 py-3 rounded-t-lg font-semibold transition-colors flex-shrink-0 ${
                    activeTab === 'newsletters'
                      ? 'bg-purple-600 text-white border-b-2 border-purple-600'
                      : 'bg-gray-100 text-gray-700 border border-b-0 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <span className="whitespace-nowrap text-sm sm:text-base md:text-base lg:text-base">
                    Newsletters
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-3 rounded-t-lg font-semibold transition-colors flex-shrink-0 ${
                    activeTab === 'settings'
                      ? 'bg-purple-600 text-white border-b-2 border-purple-600'
                      : 'bg-gray-100 text-gray-700 border border-b-0 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <span className="whitespace-nowrap text-sm sm:text-base md:text-base lg:text-base">
                    Settings
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* My Score Tab */}
            {activeTab === 'score' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  📊 My Score
                </h2>
                <div className="mb-6">
                  <p className="text-lg text-gray-700 mb-4">
                    <strong>My total score:</strong>{' '}
                    {user?.totalScore?.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    🚨 Scores update is effective since October 2023.{' '}
                    <a href="#" className="text-purple-600 hover:underline">
                      Learn more
                    </a>
                  </p>
                  <p className="text-gray-700 mb-6">
                    Here's a summary of your points earned on
                    EnglishLikeJagger.com:
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-2 text-left">
                          Date
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left">
                          Quiz
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left">
                          Score
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left">
                          Total Score
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          colSpan={4}
                          className="border border-gray-200 px-4 py-8 text-center text-gray-500"
                        >
                          No records to display.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6">
                  <a
                    href="#"
                    className="text-purple-600 hover:underline text-sm"
                  >
                    Learn more about point counting.
                  </a>
                </div>
              </div>
            )}

            {/* To do Quizzes Tab */}
            {activeTab === 'quizzes' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  📝 Quizzes to Complete
                </h2>

                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2">
                    This list contains all the quizzes and games for which you
                    haven't earned points yet.
                  </p>
                  <p className="text-xs text-gray-500 ">
                    Updated every hour. Quizzes sorted from newest to oldest.
                  </p>
                </div>

                <div className="max-h-96 overflow-y-auto pb-4 space-y-2">
                  {/* Quiz list */}
                  <div className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                        Summer Fruits and Vegetables Special Quiz
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-4 whitespace-nowrap hidden sm:block">
                      Test your knowledge of seasonal produce
                    </p>
                  </div>

                  <div className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                        The Addams Family Special Quiz
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-4 whitespace-nowrap hidden sm:block">
                      How well do you know this spooky family?
                    </p>
                  </div>

                  <div className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                        Difficult General Knowledge Quiz #35
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-4 whitespace-nowrap hidden sm:block">
                      Challenge your trivia knowledge
                    </p>
                  </div>

                  <div className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                        Hawaii Special Quiz
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-4 whitespace-nowrap hidden sm:block">
                      Explore the wonders of the Aloha State
                    </p>
                  </div>

                  <div className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                        World Animals Quiz #8
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-4 whitespace-nowrap hidden sm:block">
                      Test your knowledge of global wildlife
                    </p>
                  </div>

                  <div className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                        Complete the Proverbs Special Quiz
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-4 whitespace-nowrap hidden sm:block">
                      Finish these famous sayings
                    </p>
                  </div>

                  <div className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                        Marion Cotillard Special Quiz
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-4 whitespace-nowrap hidden sm:block">
                      About the famous French actress
                    </p>
                  </div>

                  <div className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                        European Capitals Quiz
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-4 whitespace-nowrap hidden sm:block">
                      Test your geography knowledge
                    </p>
                  </div>

                  <div className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                        Movie Quotes Challenge #12
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-4 whitespace-nowrap hidden sm:block">
                      Identify these famous film lines
                    </p>
                  </div>

                  <div className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                        Historical Events Timeline
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-4 whitespace-nowrap hidden sm:block">
                      Put these events in chronological order
                    </p>
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                    Load More Quizzes
                  </button>
                </div>
              </div>
            )}
            {/* Newsletters Tab - Use imported component */}
            {activeTab === 'newsletters' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  ✉️ Newsletter Subscriptions
                </h2>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="text-green-500 text-6xl mb-4">✅</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Successfully Subscribed!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for subscribing to our newsletter. You'll start
                      receiving updates based on your preferences.
                    </p>
                  </div>
                ) : (
                  <Newsletter onSubmit={handleNewsletterSubmit} />
                )}
              </div>
            )}

            {/* Account Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  ⚙️ Account Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username (visible to other users)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={handleUsernameUpdate}
                        disabled={!isEditingUsername}
                        className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-50 disabled:bg-gray-100"
                      />
                      <button
                        onClick={() =>
                          isEditingUsername
                            ? handleUsernameUpdate()
                            : setIsEditingUsername(true)
                        }
                        className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={user?.name}
                      readOnly
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email}
                      readOnly
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};