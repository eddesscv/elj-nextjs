import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Newsletter } from '../Newsletter'; // Import the Newsletter component

interface NewsletterPageProps {
  onBack: () => void;
}

export const NewsletterPage: React.FC<NewsletterPageProps> = ({ onBack }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSubmit = (email: string, subscriptions: any) => {
    // Handle the subscription data (you can send it to an API here)
    console.log('Subscribed:', email, subscriptions);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-green-500 text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Successfully Subscribed!
            </h1>
            <p className="text-gray-600 mb-8">
              Thank you for subscribing to our newsletter. You'll start
              receiving updates based on your preferences.
            </p>
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-6 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back to Home
          </button>
          <Mail className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            ✉️ Newsletter Subscription
          </h1>
          <p className="text-gray-600">
            Stay updated with our latest quizzes, games, and daily challenges!
          </p>
        </div>

        {/* Newsletter component wrapped in the same styling container */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <Newsletter onSubmit={handleNewsletterSubmit} />
        </div>
      </div>
    </div>
  );
};
