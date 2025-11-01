import { Question, QuizCategory } from '../types/quiz';

export const categories: QuizCategory[] = [
  {
    id: 'history',
    name: 'History',
    icon: '🏛️',
    description: 'Test your knowledge of world history',
    color: 'from-amber-500 to-orange-600',
    questionCount: 25
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: '🌍',
    description: 'Explore countries, capitals, and landmarks',
    color: 'from-emerald-500 to-teal-600',
    questionCount: 30
  },
  {
    id: 'arts',
    name: 'Arts & Culture',
    icon: '🎨',
    description: 'Art, music, literature, and cultural heritage',
    color: 'from-purple-500 to-pink-600',
    questionCount: 20
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    description: 'Scientific discoveries and innovations',
    color: 'from-blue-500 to-indigo-600',
    questionCount: 22
  },
  {
    id: 'literature',
    name: 'Literature',
    icon: '📚',
    description: 'Classic and contemporary literature',
    color: 'from-rose-500 to-red-600',
    questionCount: 18
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '⚽',
    description: 'Sports history and achievements',
    color: 'from-green-500 to-lime-600',
    questionCount: 15
  }
];

export const questions: Question[] = [
  // History Questions
  {
    id: 1,
    category: 'history',
    difficulty: 'easy',
    question: 'In which year did World War II end?',
    options: ['1944', '1945', '1946', '1947'],
    correctAnswer: 1,
    explanation: 'World War II ended in 1945 with the surrender of Japan in September.'
  },
  {
    id: 2,
    category: 'history',
    difficulty: 'medium',
    question: 'Who was the first person to walk on the moon?',
    options: ['Buzz Aldrin', 'Neil Armstrong', 'John Glenn', 'Alan Shepard'],
    correctAnswer: 1,
    explanation: 'Neil Armstrong was the first human to step onto the moon on July 20, 1969.'
  },
  {
    id: 3,
    category: 'history',
    difficulty: 'hard',
    question: 'The Treaty of Westphalia, signed in 1648, ended which major conflict?',
    options: ['Hundred Years War', 'Thirty Years War', 'Seven Years War', 'War of Spanish Succession'],
    correctAnswer: 1,
    explanation: 'The Treaty of Westphalia ended the Thirty Years War and established the principle of state sovereignty.'
  },
  
  // Geography Questions
  {
    id: 4,
    category: 'geography',
    difficulty: 'easy',
    question: 'What is the capital of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
    correctAnswer: 2,
    explanation: 'Canberra is the capital city of Australia, not Sydney which is the largest city.'
  },
  {
    id: 5,
    category: 'geography',
    difficulty: 'medium',
    question: 'Which river is the longest in the world?',
    options: ['Amazon River', 'Nile River', 'Mississippi River', 'Yangtze River'],
    correctAnswer: 1,
    explanation: 'The Nile River is traditionally considered the longest river in the world at about 6,650 km.'
  },
  {
    id: 6,
    category: 'geography',
    difficulty: 'hard',
    question: 'What is the smallest country in the world by land area?',
    options: ['Monaco', 'Nauru', 'Vatican City', 'San Marino'],
    correctAnswer: 2,
    explanation: 'Vatican City is the smallest sovereign state in the world with an area of just 0.17 square miles.'
  },

  // Arts Questions
  {
    id: 7,
    category: 'arts',
    difficulty: 'easy',
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
    correctAnswer: 1,
    explanation: 'Leonardo da Vinci painted the Mona Lisa between 1503 and 1519.'
  },
  {
    id: 8,
    category: 'arts',
    difficulty: 'medium',
    question: 'Which composer wrote "The Four Seasons"?',
    options: ['Johann Sebastian Bach', 'Wolfgang Amadeus Mozart', 'Antonio Vivaldi', 'Ludwig van Beethoven'],
    correctAnswer: 2,
    explanation: 'Antonio Vivaldi composed "The Four Seasons" around 1720.'
  },
  {
    id: 9,
    category: 'arts',
    difficulty: 'hard',
    question: 'In which museum is Guernica by Pablo Picasso housed?',
    options: ['Louvre Museum', 'Museum of Modern Art', 'Museo Reina Sofía', 'Guggenheim Museum'],
    correctAnswer: 2,
    explanation: 'Guernica is housed in the Museo Reina Sofía in Madrid, Spain.'
  },

  // Science Questions
  {
    id: 10,
    category: 'science',
    difficulty: 'easy',
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correctAnswer: 2,
    explanation: 'Au is the chemical symbol for gold, derived from the Latin word "aurum".'
  },
  {
    id: 11,
    category: 'science',
    difficulty: 'medium',
    question: 'Who developed the theory of relativity?',
    options: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Stephen Hawking'],
    correctAnswer: 1,
    explanation: 'Albert Einstein developed both the special and general theories of relativity.'
  },
  {
    id: 12,
    category: 'science',
    difficulty: 'hard',
    question: 'What is the name of the theoretical boundary around a black hole?',
    options: ['Photon sphere', 'Event horizon', 'Schwarzschild radius', 'Singularity'],
    correctAnswer: 1,
    explanation: 'The event horizon is the boundary beyond which nothing can escape a black hole.'
  },

  // Literature Questions
  {
    id: 13,
    category: 'literature',
    difficulty: 'easy',
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
    correctAnswer: 1,
    explanation: 'William Shakespeare wrote "Romeo and Juliet" around 1595.'
  },
  {
    id: 14,
    category: 'literature',
    difficulty: 'medium',
    question: 'Which novel begins with "Call me Ishmael"?',
    options: ['The Great Gatsby', 'Moby Dick', 'To Kill a Mockingbird', '1984'],
    correctAnswer: 1,
    explanation: '"Call me Ishmael" is the famous opening line of Herman Melville\'s "Moby Dick".'
  },
  {
    id: 15,
    category: 'literature',
    difficulty: 'hard',
    question: 'Who wrote "One Hundred Years of Solitude"?',
    options: ['Jorge Luis Borges', 'Gabriel García Márquez', 'Mario Vargas Llosa', 'Pablo Neruda'],
    correctAnswer: 1,
    explanation: 'Gabriel García Márquez wrote "One Hundred Years of Solitude" in 1967.'
  },

  // Sports Questions
  {
    id: 16,
    category: 'sports',
    difficulty: 'easy',
    question: 'How many players are on a basketball team on the court at one time?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 1,
    explanation: 'Each basketball team has 5 players on the court at any given time.'
  },
  {
    id: 17,
    category: 'sports',
    difficulty: 'medium',
    question: 'In which year were the first modern Olympic Games held?',
    options: ['1892', '1896', '1900', '1904'],
    correctAnswer: 1,
    explanation: 'The first modern Olympic Games were held in Athens, Greece in 1896.'
  },
  {
    id: 18,
    category: 'sports',
    difficulty: 'hard',
    question: 'Who holds the record for most Grand Slam tennis titles (combined singles)?',
    options: ['Roger Federer', 'Rafael Nadal', 'Novak Djokovic', 'Margaret Court'],
    correctAnswer: 3,
    explanation: 'Margaret Court holds the record with 24 Grand Slam singles titles.'
  }
];