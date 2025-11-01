import React, { useState, useEffect } from 'react';
import { Calendar, BookOpen, Volume2, Star } from 'lucide-react';

interface WordOfDayGameProps {
  onBack: () => void;
}

interface WordData {
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  synonyms: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  etymology: string;
}

export const WordOfDayGame: React.FC<WordOfDayGameProps> = ({ onBack }) => {
  const [currentWord, setCurrentWord] = useState<WordData | null>(null);
  const [showDefinition, setShowDefinition] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const wordsOfDay: WordData[] = [
    {
      word: 'Serendipity',
      pronunciation: '/ˌserənˈdipədē/',
      partOfSpeech: 'noun',
      definition: 'The occurrence and development of events by chance in a happy or beneficial way',
      example: 'It was pure serendipity that led me to discover this amazing restaurant.',
      synonyms: ['chance', 'fortune', 'luck', 'coincidence'],
      difficulty: 'Hard',
      etymology: 'Coined by Horace Walpole in 1754, from the Persian fairy tale "The Three Princes of Serendip"'
    },
    {
      word: 'Ephemeral',
      pronunciation: '/əˈfem(ə)rəl/',
      partOfSpeech: 'adjective',
      definition: 'Lasting for a very short time',
      example: 'The beauty of cherry blossoms is ephemeral, lasting only a few weeks.',
      synonyms: ['temporary', 'brief', 'fleeting', 'transient'],
      difficulty: 'Medium',
      etymology: 'From Greek ephēmeros, meaning "lasting only a day"'
    },
    {
      word: 'Ubiquitous',
      pronunciation: '/yo͞oˈbikwədəs/',
      partOfSpeech: 'adjective',
      definition: 'Present, appearing, or found everywhere',
      example: 'Smartphones have become ubiquitous in modern society.',
      synonyms: ['omnipresent', 'pervasive', 'universal', 'widespread'],
      difficulty: 'Hard',
      etymology: 'From Latin ubique meaning "everywhere"'
    }
  ];

  useEffect(() => {
    // Simulate getting today's word
    const today = new Date().getDate();
    const wordIndex = today % wordsOfDay.length;
    setCurrentWord(wordsOfDay[wordIndex]);
  }, []);

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWord || !userGuess.trim()) return;

    const guess = userGuess.toLowerCase().trim();
    const correctAnswers = [
      currentWord.definition.toLowerCase(),
      ...currentWord.synonyms.map(s => s.toLowerCase())
    ];

    const isGuessCorrect = correctAnswers.some(answer => 
      answer.includes(guess) || guess.includes(answer.split(' ')[0])
    );

    setIsCorrect(isGuessCorrect);
    setShowDefinition(true);
  };

  const playPronunciation = () => {
    if ('speechSynthesis' in window && currentWord) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  if (!currentWord) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-700 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-6 bg-white/20 text-white border border-white/30 px-6 py-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            ← Back to Games
          </button>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Word of the Day</h1>
          </div>
          <p className="text-xl text-green-100">Expand your vocabulary with daily word challenges!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Word Card */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <h2 className="text-5xl font-bold text-yellow-300">{currentWord.word}</h2>
                  <button
                    onClick={playPronunciation}
                    className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
                    title="Play pronunciation"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>
                
                <p className="text-xl text-green-200 mb-2">{currentWord.pronunciation}</p>
                <p className="text-lg text-blue-200 italic">{currentWord.partOfSpeech}</p>
                
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentWord.difficulty === 'Easy' ? 'bg-green-500 text-green-900' :
                    currentWord.difficulty === 'Medium' ? 'bg-yellow-500 text-yellow-900' :
                    'bg-red-500 text-red-900'
                  }`}>
                    {currentWord.difficulty}
                  </span>
                </div>
              </div>

              {!showDefinition ? (
                <div className="bg-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Can you guess the meaning?</h3>
                  <form onSubmit={handleGuessSubmit} className="space-y-4">
                    <textarea
                      value={userGuess}
                      onChange={(e) => setUserGuess(e.target.value)}
                      placeholder="Type your guess for what this word means..."
                      className="w-full p-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 resize-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                      rows={3}
                    />
                    <button
                      type="submit"
                      className="w-full bg-yellow-500 text-yellow-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                    >
                      Submit Guess
                    </button>
                  </form>
                  
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setShowDefinition(true)}
                      className="text-white/80 hover:text-white underline"
                    >
                      Skip and show definition
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {isCorrect !== null && (
                    <div className={`text-center p-4 rounded-lg ${
                      isCorrect ? 'bg-green-500/30 text-green-200' : 'bg-red-500/30 text-red-200'
                    }`}>
                      {isCorrect ? '🎉 Great guess!' : '❌ Not quite, but good try!'}
                    </div>
                  )}

                  <div className="bg-white/20 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Definition
                    </h3>
                    <p className="text-lg mb-4">{currentWord.definition}</p>
                    
                    <h4 className="font-semibold mb-2">Example:</h4>
                    <p className="italic text-blue-200 mb-4">"{currentWord.example}"</p>
                    
                    <h4 className="font-semibold mb-2">Synonyms:</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {currentWord.synonyms.map((synonym, index) => (
                        <span
                          key={index}
                          className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-sm"
                        >
                          {synonym}
                        </span>
                      ))}
                    </div>
                    
                    <h4 className="font-semibold mb-2">Etymology:</h4>
                    <p className="text-sm text-green-200">{currentWord.etymology}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily Challenge */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Daily Challenge
              </h3>
              <p className="text-sm text-green-100 mb-4">
                Try to use today's word in a sentence and share it with the community!
              </p>
              <button className="w-full bg-green-500/20 text-green-200 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors">
                Share Your Sentence
              </button>
            </div>

            {/* Word History */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Previous Words</h3>
              <div className="space-y-2">
                {wordsOfDay.slice(0, 5).map((word, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-white/10 rounded-lg"
                  >
                    <span className="font-medium">{word.word}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      word.difficulty === 'Easy' ? 'bg-green-500/30 text-green-200' :
                      word.difficulty === 'Medium' ? 'bg-yellow-500/30 text-yellow-200' :
                      'bg-red-500/30 text-red-200'
                    }`}>
                      {word.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Tips */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Learning Tips</h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>• Use the word in 3 different sentences</li>
                <li>• Look for the word in articles you read</li>
                <li>• Practice pronunciation daily</li>
                <li>• Connect it to words you already know</li>
                <li>• Create mental images for better memory</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};