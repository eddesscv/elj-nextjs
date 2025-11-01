import { DailyQuestion } from '../types/games';

export const dailyQuestions: DailyQuestion[] = [
  {
    id: 'daily-2024-12-15',
    date: '2024-12-15',
    question: 'Which word is the correct past tense of "go"?',
    options: ['Goed', 'Went', 'Gone', 'Going'],
    correctAnswer: 1,
    explanation: 'The past tense of "go" is "went". This is an irregular verb form that doesn\'t follow the typical -ed pattern.',
    category: 'Grammar',
    difficulty: 'Medium',
    sourceQuizId: 'grammar-basics',
    sourceQuizTitle: 'Grammar Basics Quiz'
  },
  {
    id: 'daily-2024-12-14',
    date: '2024-12-14',
    question: 'What does the idiom "break the ice" mean?',
    options: ['To literally break ice', 'To start a conversation', 'To be very cold', 'To make someone angry'],
    correctAnswer: 1,
    explanation: '"Break the ice" means to initiate conversation or social interaction, especially in an awkward or tense situation.',
    category: 'Vocabulary',
    difficulty: 'Easy',
    sourceQuizId: 'idioms-quiz',
    sourceQuizTitle: 'Common Idioms Quiz'
  },
  {
    id: 'daily-2024-12-13',
    date: '2024-12-13',
    question: 'Which sentence uses the present perfect tense correctly?',
    options: [
      'I have went to the store',
      'I have gone to the store',
      'I have go to the store',
      'I have going to the store'
    ],
    correctAnswer: 1,
    explanation: 'Present perfect tense uses "have/has" + past participle. The past participle of "go" is "gone".',
    category: 'Grammar',
    difficulty: 'Medium',
    sourceQuizId: 'grammar-advanced',
    sourceQuizTitle: 'Advanced Grammar Quiz'
  },
  {
    id: 'daily-2024-12-12',
    date: '2024-12-12',
    question: 'What is a synonym for "enormous"?',
    options: ['Tiny', 'Huge', 'Medium', 'Small'],
    correctAnswer: 1,
    explanation: '"Enormous" means extremely large, so "huge" is the correct synonym.',
    category: 'Vocabulary',
    difficulty: 'Easy',
    sourceQuizId: 'vocabulary-synonyms',
    sourceQuizTitle: 'Synonyms and Antonyms Quiz'
  },
  {
    id: 'daily-2024-12-11',
    date: '2024-12-11',
    question: 'In business English, what does "ROI" stand for?',
    options: ['Return on Investment', 'Rate of Interest', 'Revenue of Income', 'Risk of Investment'],
    correctAnswer: 0,
    explanation: 'ROI stands for Return on Investment, which measures the profitability of an investment.',
    category: 'Business English',
    difficulty: 'Medium',
    sourceQuizId: 'business-english',
    sourceQuizTitle: 'Business English Essentials'
  },
  {
    id: 'daily-2024-12-10',
    date: '2024-12-10',
    question: 'Which word is pronounced with a silent "b"?',
    options: ['Rabbit', 'Lamb', 'Bubble', 'Cabin'],
    correctAnswer: 1,
    explanation: 'In "lamb", the "b" at the end is silent. It\'s pronounced like "lam".',
    category: 'Pronunciation',
    difficulty: 'Medium',
    sourceQuizId: 'pronunciation-basics',
    sourceQuizTitle: 'English Pronunciation Quiz'
  },
  {
    id: 'daily-2024-12-09',
    date: '2024-12-09',
    question: 'What is the plural form of "child"?',
    options: ['Childs', 'Children', 'Childes', 'Child'],
    correctAnswer: 1,
    explanation: '"Child" is an irregular noun. Its plural form is "children", not "childs".',
    category: 'Grammar',
    difficulty: 'Easy',
    sourceQuizId: 'grammar-basics',
    sourceQuizTitle: 'Grammar Basics Quiz'
  },
  {
    id: 'daily-2024-12-08',
    date: '2024-12-08',
    question: 'Which phrase is most appropriate for a formal email opening?',
    options: ['Hey there!', 'Dear Sir/Madam', 'What\'s up?', 'Hi buddy!'],
    correctAnswer: 1,
    explanation: '"Dear Sir/Madam" is the most formal and appropriate way to open a business email when you don\'t know the recipient\'s name.',
    category: 'Business English',
    difficulty: 'Easy',
    sourceQuizId: 'business-communication',
    sourceQuizTitle: 'Business Communication Quiz'
  },
  {
    id: 'daily-2024-12-07',
    date: '2024-12-07',
    question: 'What does "procrastinate" mean?',
    options: ['To work quickly', 'To delay or postpone', 'To organize well', 'To finish early'],
    correctAnswer: 1,
    explanation: '"Procrastinate" means to delay or postpone action, especially something that should be done.',
    category: 'Vocabulary',
    difficulty: 'Medium',
    sourceQuizId: 'advanced-vocabulary',
    sourceQuizTitle: 'Advanced Vocabulary Quiz'
  },
  {
    id: 'daily-2024-12-06',
    date: '2024-12-06',
    question: 'Which sentence is grammatically correct?',
    options: [
      'She don\'t like coffee',
      'She doesn\'t like coffee',
      'She not like coffee',
      'She no like coffee'
    ],
    correctAnswer: 1,
    explanation: 'With third person singular (she/he/it), we use "doesn\'t" (does not), not "don\'t" (do not).',
    category: 'Grammar',
    difficulty: 'Easy',
    sourceQuizId: 'grammar-basics',
    sourceQuizTitle: 'Grammar Basics Quiz'
  }
];

export const getTodayQuestion = (): DailyQuestion => {
  const today = new Date().toISOString().split('T')[0];
  return dailyQuestions.find(q => q.date === today) || dailyQuestions[0];
};

export const getPreviousQuestions = (limit: number = 10): DailyQuestion[] => {
  return dailyQuestions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};