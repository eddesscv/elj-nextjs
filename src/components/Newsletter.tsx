import React, { useState } from 'react';

interface NewsletterProps {
  onSubmit?: (email: string, subscriptions: SubscriptionOptions) => void;
}

interface SubscriptionOptions {
  weekly: boolean;
  daily: boolean;
  wordOfDay: boolean;
  padlock: boolean;
  riddles: boolean;
  photoOfDay: boolean;
  questionOfDay: boolean;
}

export const Newsletter: React.FC<NewsletterProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [subscriptions, setSubscriptions] = useState<SubscriptionOptions>({
    weekly: false,
    daily: false,
    wordOfDay: false,
    padlock: false,
    riddles: false,
    photoOfDay: false,
    questionOfDay: false,
  });

  const handleSubscriptionChange = (key: keyof SubscriptionOptions) => {
    setSubscriptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && Object.values(subscriptions).some(Boolean)) {
      // Call the onSubmit prop if provided
      if (onSubmit) {
        onSubmit(email, subscriptions);
      }
    }
  };

  return (
    // <div className="bg-white rounded-2xl shadow-lg p-8">
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your email address"
          />
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-800">
            Choose your subscriptions:
          </h3>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={subscriptions.weekly}
              onChange={() => handleSubscriptionChange('weekly')}
              className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <div>
              <div className="font-medium text-gray-800">
                📅 Weekly Newsletter
              </div>
              <div className="text-sm text-gray-600">
                Receive an email every Sunday with the week's quizzes.
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={subscriptions.daily}
              onChange={() => handleSubscriptionChange('daily')}
              className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <div>
              <div className="font-medium text-gray-800">
                📧 Daily Newsletter
              </div>
              <div className="text-sm text-gray-600">
                Receive an email every morning with the new daily quiz.
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={subscriptions.wordOfDay}
              onChange={() => handleSubscriptionChange('wordOfDay')}
              className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <div>
              <div className="font-medium text-gray-800">
                📝 Word of the Day
              </div>
              <div className="text-sm text-gray-600">
                Receive an email every morning with the new "Word of the Day".
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={subscriptions.padlock}
              onChange={() => handleSubscriptionChange('padlock')}
              className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <div>
              <div className="font-medium text-gray-800">🔒 Padlock</div>
              <div className="text-sm text-gray-600">
                Receive an email when a new padlock puzzle is published.
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={subscriptions.riddles}
              onChange={() => handleSubscriptionChange('riddles')}
              className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <div>
              <div className="font-medium text-gray-800">🧩 Riddles</div>
              <div className="text-sm text-gray-600">
                Receive an email for each new riddle published in our Riddle
                Book.
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={subscriptions.photoOfDay}
              onChange={() => handleSubscriptionChange('photoOfDay')}
              className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <div>
              <div className="font-medium text-gray-800">
                📸 Photo of the Day
              </div>
              <div className="text-sm text-gray-600">
                Receive an email every morning with the "Photo of the Day".
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={subscriptions.questionOfDay}
              onChange={() => handleSubscriptionChange('questionOfDay')}
              className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <div>
              <div className="font-medium text-gray-800">
                ❓ Question of the Day
              </div>
              <div className="text-sm text-gray-600">
                Receive an email every morning with the Question of the Day.
              </div>
            </div>
          </label>
        </div>

        <button
          type="submit"
          disabled={!email || !Object.values(subscriptions).some(Boolean)}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Subscribe to Newsletter
        </button>
      </form>
    </div>
  );
};
