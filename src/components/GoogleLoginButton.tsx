import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';

interface GoogleLoginButtonProps {
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
  onBack?: () => void;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onSuccess,
  onError,
  onBack,
}) => {
  const { login } = useAuth();
  const [error, setError] = React.useState<string | null>(null);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google API
        const userInfo = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        ).then((res) => res.json());

        // Create user object
        const user = {
          id: userInfo.sub,
          email: userInfo.email,
          name: userInfo.name,
          avatar: userInfo.picture,
          ranking: Math.floor(Math.random() * 1000) + 1,
          totalScore: Math.floor(Math.random() * 10000) + 1000,
          quizzesCompleted: Math.floor(Math.random() * 100) + 10,
          joinDate: new Date().toISOString().split('T')[0],
          provider: 'google',
          accessToken: tokenResponse.access_token,
        };

        login(user);
        onSuccess?.(user);
      } catch (error) {
        console.error('Google login error:', error);
        setError('Failed to sign in with Google. Please try again.');
        onError?.(error);
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
      setError('Failed to sign in with Google. Please try again.');
      onError?.(error);
    },
    flow: 'implicit',
  });

  return (
    <div>
      <div className="w-full max-w-2xl bg-card rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-border">
        {/* Left side - Illustration/Info (visible on desktop) */}
        <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-purple-600 to-indigo-700 p-8 flex-col justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 text-white">👤</div>
            <h2 className="text-xl font-bold text-white mb-4">Welcome to Our Community!</h2>
            <p className="text-purple-100">
              Track your progress, compete with others, and unlock achievements as you learn.
            </p>
          </div>
          
          <div className="mt-8 space-y-4">
            {[
              { icon: '🏆', text: 'Track your ranking' },
              { icon: '📊', text: 'Monitor your progress' },
              { icon: '🎯', text: 'Earn achievements' },
              { icon: '👥', text: 'Compete with friends' }
            ].map((item, index) => (
              <div key={index} className="flex items-center text-purple-100">
                <span className="text-2xl mr-3">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right side - Login Form */}        
        {/* <div className="w-full md:w-3/5 p-8"> */}
        <div className="w-full md:w-3/5 p-8 flex flex-col justify-center items-center">
          <div className="text-center mb-8">
            {onBack && (
              <button
                onClick={onBack}
                className="mb-6 bg-card text-text border border-border px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                ← Back to Home
              </button>
            )}
            
            {/* Show avatar on mobile, hide on desktop since we have the illustration */}
            <div className="md:hidden text-6xl mb-4">👤</div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-text mb-2">
              Sign In / Create Account
            </h1>
            <p className="text-subtext text-sm md:text-base">
              Join our community to track your progress and compete with others!
            </p>
          </div>

          <div className="space-y-6">
            <button
              onClick={() => handleGoogleLogin()}
              className="w-full bg-card border-2 border-purple-600 text-text px-6 py-4 rounded-lg font-semibold hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
            
            {/* Divider with "or" text */}
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink mx-4 text-subtext text-sm">or</span>
              <div className="flex-grow border-t border-border"></div>
            </div>
            
            {/* Email login option (optional) */}
            <div className="text-center">
              <button className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-sm font-medium">
                Sign in with email
              </button>
            </div>
          </div>
          
          {error && (
            <div className="mt-6 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="mt-8 text-center text-xs text-subtext">
            By signing in, you agree to our{' '}
            <a href="#" className="text-purple-600 hover:underline dark:text-purple-400">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-purple-600 hover:underline dark:text-purple-400">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};