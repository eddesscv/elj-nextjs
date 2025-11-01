import React, { useState } from 'react';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { getTodayQuestion, getPreviousQuestions } from '../../data/dailyQuestions';
import { CommentSection } from '../CommentSection';
import { Comment } from '../../types/games';

interface EnhancedQuestionOfDayPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export const EnhancedQuestionOfDayPage: React.FC<EnhancedQuestionOfDayPageProps> = ({ 
  onBack, 
  onNavigate 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Sarah Johnson',
      content: 'Great question! I always struggle with irregular verbs.',
      timestamp: '2 hours ago',
      likes: 5,
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Mike Chen',
      content: 'This helped me understand the difference better. Thanks!',
      timestamp: '1 hour ago',
      likes: 3,
    }
  ]);

  const todayQuestion = getTodayQuestion();
  const previousQuestions = getPreviousQuestions(10);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      content,
      timestamp: 'Just now',
      likes: 0,
    };
    setComments([newComment, ...comments]);
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-700 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="text-center mb-8">
              <button
                onClick={onBack}
                className="mb-6 bg-white/20 text-white border border-white/30 px-6 py-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                ← Back to Home
              </button>
              <span className="text-yellow-300 text-6xl mb-6 block">🌟</span>
              <h1 className="text-4xl font-bold mb-4">Question of the Day</h1>
              <p className="text-xl text-blue-100 mb-2">Test your daily English knowledge</p>
              <p className="text-blue-200">{todayQuestion.date}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="mb-6">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className={`px-4 py-2 rounded-full font-semibold ${
                    todayQuestion.difficulty === 'Easy' ? 'bg-green-500 text-green-900' :
                    todayQuestion.difficulty === 'Medium' ? 'bg-yellow-500 text-yellow-900' :
                    'bg-red-500 text-red-900'
                  }`}>
                    {todayQuestion.difficulty.toUpperCase()}
                  </span>
                  <span className="text-blue-100">{todayQuestion.category}</span>
                </div>
                
                <h2 className="text-2xl font-semibold text-center mb-8">
                  {todayQuestion.question}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {todayQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !showResult && handleAnswerSelect(index)}
                      disabled={showResult}
                      className={`p-4 rounded-lg transition-all font-medium ${
                        showResult
                          ? index === todayQuestion.correctAnswer
                            ? 'bg-green-500 text-white'
                            : index === selectedAnswer && index !== todayQuestion.correctAnswer
                            ? 'bg-red-500 text-white'
                            : 'bg-white/20 text-white/70'
                          : 'bg-white/20 hover:bg-white/30 text-white'
                      }`}
                    >
                      {String.fromCharCode(65 + index)}) {option}
                    </button>
                  ))}
                </div>
              </div>

              {showResult && (
                <div className="mt-8 bg-white/20 rounded-xl p-6">
                  <div className="text-center mb-4">
                    {selectedAnswer === todayQuestion.correctAnswer ? (
                      <div className="text-green-300">
                        <div className="text-4xl mb-2">🎉</div>
                        <h3 className="text-xl font-bold">Correct!</h3>
                      </div>
                    ) : (
                      <div className="text-red-300">
                        <div className="text-4xl mb-2">❌</div>
                        <h3 className="text-xl font-bold">Incorrect</h3>
                        <p>The correct answer is: {todayQuestion.options[todayQuestion.correctAnswer]}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-blue-500/30 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold mb-2">Explanation:</h4>
                    <p className="text-blue-100">{todayQuestion.explanation}</p>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => onNavigate(todayQuestion.sourceQuizId)}
                      className="bg-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2 mx-auto"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Try the full quiz: {todayQuestion.sourceQuizTitle}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl">
              <CommentSection
                itemId={todayQuestion.id}
                itemType="quiz"
                comments={comments}
                onAddComment={handleAddComment}
                onLikeComment={handleLikeComment}
              />
            </div>

            {/* Previous Questions */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mt-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Previous Questions
              </h3>
              
              <div className="space-y-4">
                {previousQuestions.slice(1).map((question) => (
                  <div
                    key={question.id}
                    className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-200">{question.date}</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {question.category}
                      </span>
                    </div>
                    <h4 className="font-medium mb-2">{question.question}</h4>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        question.difficulty === 'Easy' ? 'bg-green-500/30 text-green-200' :
                        question.difficulty === 'Medium' ? 'bg-yellow-500/30 text-yellow-200' :
                        'bg-red-500/30 text-red-200'
                      }`}>
                        {question.difficulty}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/60" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Stats */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-8">
              <h3 className="text-xl font-bold mb-4">Daily Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">1,247</div>
                  <div className="text-sm text-blue-200">Participants Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-300">73%</div>
                  <div className="text-sm text-blue-200">Correct Answers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-300">4,161</div>
                  <div className="text-sm text-blue-200">Days Running</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sticky top-4">
              <h3 className="font-bold text-lg mb-4">All Games</h3>
              
              <div className="space-y-2">
                <div className="text-sm font-semibold text-purple-200 mb-2">Quiz</div>
                
                {[
                  'All Quizzes',
                  'Mixed Answers',
                  'Correct Order',
                  'Personality Tests',
                  'Quiz Battles',
                  'Word of the Day',
                  'Coded Word',
                  'Photo of the Day',
                  'Number Game',
                  'Riddles',
                  'The Padlock',
                  'Tic-Tac-Toe'
                ].map((game) => (
                  <button
                    key={game}
                    onClick={() => onNavigate(game.toLowerCase().replace(/\s+/g, '-'))}
                    className="w-full text-left px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md transition-colors"
                  >
                    {game}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};