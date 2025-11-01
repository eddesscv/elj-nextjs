import { QuizCategory, Quiz, PersonalityTest, FeaturedQuiz, Lesson } from '../types/quiz';
import { Question } from '../types/quiz';

// Extended categories with more content
export const extendedCategories: QuizCategory[] = [
  {
    id: 'general-knowledge',
    name: 'General Knowledge',
    icon: '🎓',
    description: 'Test your general knowledge',
    color: 'from-blue-500 to-purple-600',
    questionCount: 750,
    hasLessons: true
  },
  {
    id: 'grammar',
    name: 'Grammar',
    icon: '📚',
    description: 'Master English grammar',
    color: 'from-green-500 to-blue-600',
    questionCount: 500,
    hasLessons: true
  },
  {
    id: 'vocabulary',
    name: 'Vocabulary',
    icon: '🗣️',
    description: 'Expand your vocabulary',
    color: 'from-yellow-500 to-orange-600',
    questionCount: 450,
    hasLessons: true
  },
  {
    id: 'pronunciation',
    name: 'Pronunciation',
    icon: '📖',
    description: 'Perfect pronunciation',
    color: 'from-red-500 to-pink-600',
    questionCount: 350,
    hasLessons: true
  },
  {
    id: 'reading',
    name: 'Reading',
    icon: '✍️',
    description: 'Improve reading skills',
    color: 'from-green-500 to-teal-600',
    questionCount: 320,
    hasLessons: true
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: '👂',
    description: 'Enhance writing skills',
    color: 'from-indigo-500 to-purple-600',
    questionCount: 280,
    hasLessons: true
  },
  {
    id: 'listening',
    name: 'Listening',
    icon: '💬',
    description: 'Sharpen listening skills',
    color: 'from-cyan-500 to-blue-600',
    questionCount: 250,
    hasLessons: true
  },
  {
    id: 'speaking',
    name: 'Speaking',
    icon: '💼',
    description: 'Practice speaking',
    color: 'from-orange-500 to-red-600',
    questionCount: 200,
    hasLessons: true
  },
  {
    id: 'business',
    name: 'Business English',
    icon: '💼',
    description: 'Professional English',
    color: 'from-blue-600 to-red-600',
    questionCount: 180,
    hasLessons: true
  },
  {
    id: 'games',
    name: 'Games',
    icon: '🎮',
    description: 'Fun learning games',
    color: 'from-purple-500 to-pink-600',
    questionCount: 150,
    hasLessons: false
  },
  {
    id: 'riddles',
    name: 'Riddles',
    icon: '🧩',
    description: 'English riddles',
    color: 'from-green-600 to-blue-600',
    questionCount: 120,
    hasLessons: false
  },
  {
    id: 'idioms',
    name: 'Idioms',
    icon: '🎭',
    description: 'Common idioms',
    color: 'from-red-500 to-yellow-600',
    questionCount: 100,
    hasLessons: true
  }
];

// Extended daily games
export const extendedDailyGames = [
  {
    id: 'day-4161',
    title: 'Daily Test #4161',
    description: 'Test your daily knowledge',
    participants: '1,247 participants',
    icon: '📖'
  },
  {
    id: 'word-379',
    title: 'Word of the Day #379',
    description: 'Learn a new word today',
    participants: '892 participants',
    icon: '📝'
  },
  {
    id: 'grammar-275',
    title: 'Grammar Challenge #275',
    description: 'Daily grammar practice',
    participants: '654 participants',
    icon: '📚'
  },
  {
    id: 'pronunciation-168',
    title: 'Pronunciation Practice #168',
    description: 'Perfect your pronunciation',
    participants: '543 participants',
    icon: '🗣️'
  },
  {
    id: 'riddle-564',
    title: 'English Riddle #564',
    description: 'Solve this riddle',
    participants: '432 participants',
    icon: '🧩'
  },
  {
    id: 'idiom-522',
    title: 'Idiom of the Day #522',
    description: 'Learn common idioms',
    participants: '321 participants',
    icon: '💭'
  },
  {
    id: 'speed-challenge',
    title: 'Speed Challenge',
    description: 'Quick English quiz',
    participants: '765 participants',
    icon: '⚡'
  },
  {
    id: 'listening-daily',
    title: 'Daily Listening #89',
    description: 'Improve listening skills',
    participants: '456 participants',
    icon: '👂'
  },
  {
    id: 'writing-prompt',
    title: 'Writing Prompt #156',
    description: 'Creative writing exercise',
    participants: '234 participants',
    icon: '✍️'
  },
  {
    id: 'business-term',
    title: 'Business Term #78',
    description: 'Learn business vocabulary',
    participants: '345 participants',
    icon: '💼'
  }
];

// Extended quizzes with 15 questions each
export const extendedQuizzes = {
  'grammar-basics': {
    id: 'grammar-basics',
    title: 'Grammar Basics Quiz',
    description: 'Test your fundamental English grammar knowledge',
    category: 'Grammar',
    difficulty: 'Easy',
    questions: [
      {
        id: 1,
        question: 'Which sentence is grammatically correct?',
        options: ['She don\'t like coffee', 'She doesn\'t like coffee', 'She not like coffee', 'She no like coffee'],
        correctAnswer: 1,
        explanation: 'With third person singular (she/he/it), we use "doesn\'t" (does not), not "don\'t" (do not).'
      },
      {
        id: 2,
        question: 'What is the plural form of "child"?',
        options: ['Childs', 'Children', 'Childes', 'Child'],
        correctAnswer: 1,
        explanation: '"Child" is an irregular noun. Its plural form is "children", not "childs".'
      },
      {
        id: 3,
        question: 'Which word is the correct past tense of "go"?',
        options: ['Goed', 'Went', 'Gone', 'Going'],
        correctAnswer: 1,
        explanation: 'The past tense of "go" is "went". This is an irregular verb form.'
      },
      {
        id: 4,
        question: 'Choose the correct article: "I saw ___ elephant at the zoo."',
        options: ['a', 'an', 'the', 'no article'],
        correctAnswer: 1,
        explanation: 'Use "an" before words starting with vowel sounds.'
      },
      {
        id: 5,
        question: 'Which sentence uses the present continuous tense?',
        options: ['I walk to school', 'I am walking to school', 'I walked to school', 'I will walk to school'],
        correctAnswer: 1,
        explanation: 'Present continuous uses "am/is/are + verb-ing" to show ongoing action.'
      },
      {
        id: 6,
        question: 'What is the correct possessive form of "students"?',
        options: ['student\'s', 'students\'', 'students\'s', 'student'],
        correctAnswer: 1,
        explanation: 'For plural nouns ending in "s", add only an apostrophe after the "s".'
      },
      {
        id: 7,
        question: 'Which word is an adverb?',
        options: ['Quick', 'Quickly', 'Quickness', 'Quicker'],
        correctAnswer: 1,
        explanation: 'Adverbs often end in "-ly" and describe how an action is performed.'
      },
      {
        id: 8,
        question: 'Choose the correct comparative form: "This book is ___ than that one."',
        options: ['more good', 'gooder', 'better', 'best'],
        correctAnswer: 2,
        explanation: '"Good" has an irregular comparative form: "better".'
      },
      {
        id: 9,
        question: 'Which sentence is in passive voice?',
        options: ['John wrote the letter', 'The letter was written by John', 'John is writing the letter', 'John will write the letter'],
        correctAnswer: 1,
        explanation: 'Passive voice uses "be + past participle" and focuses on the action rather than the doer.'
      },
      {
        id: 10,
        question: 'What type of word is "beautiful"?',
        options: ['Noun', 'Verb', 'Adjective', 'Adverb'],
        correctAnswer: 2,
        explanation: '"Beautiful" is an adjective that describes nouns.'
      },
      {
        id: 11,
        question: 'Which sentence uses "there", "their", or "they\'re" correctly?',
        options: ['There going to the store', 'Their going to the store', 'They\'re going to the store', 'All are correct'],
        correctAnswer: 2,
        explanation: '"They\'re" is the contraction for "they are".'
      },
      {
        id: 12,
        question: 'Choose the correct form: "If I ___ you, I would study harder."',
        options: ['am', 'was', 'were', 'will be'],
        correctAnswer: 2,
        explanation: 'In conditional sentences, use "were" for all persons after "if".'
      },
      {
        id: 13,
        question: 'Which sentence has correct subject-verb agreement?',
        options: ['The dogs runs fast', 'The dog run fast', 'The dogs run fast', 'The dog are running fast'],
        correctAnswer: 2,
        explanation: 'Plural subjects take plural verbs: "dogs run".'
      },
      {
        id: 14,
        question: 'What is the superlative form of "bad"?',
        options: ['Badder', 'Baddest', 'Worse', 'Worst'],
        correctAnswer: 3,
        explanation: '"Bad" has irregular forms: bad → worse → worst.'
      },
      {
        id: 15,
        question: 'Which sentence uses a gerund?',
        options: ['I like to swim', 'I am swimming', 'I like swimming', 'I will swim'],
        correctAnswer: 2,
        explanation: 'A gerund is a verb form ending in "-ing" used as a noun: "swimming".'
      }
    ]
  },
  'vocabulary-advanced': {
    id: 'vocabulary-advanced',
    title: 'Advanced Vocabulary Quiz',
    description: 'Challenge yourself with sophisticated English vocabulary',
    category: 'Vocabulary',
    difficulty: 'Hard',
    questions: [
      {
        id: 1,
        question: 'What does "ubiquitous" mean?',
        options: ['Rare and valuable', 'Present everywhere', 'Extremely large', 'Very old'],
        correctAnswer: 1,
        explanation: '"Ubiquitous" means present, appearing, or found everywhere.'
      },
      {
        id: 2,
        question: 'What does "ephemeral" mean?',
        options: ['Lasting forever', 'Very expensive', 'Lasting for a short time', 'Extremely beautiful'],
        correctAnswer: 2,
        explanation: '"Ephemeral" means lasting for a very short time.'
      },
      {
        id: 3,
        question: 'What does "serendipity" mean?',
        options: ['Bad luck', 'A pleasant surprise', 'Deep sadness', 'Extreme anger'],
        correctAnswer: 1,
        explanation: '"Serendipity" means a pleasant surprise or fortunate accident.'
      },
      {
        id: 4,
        question: 'What does "procrastinate" mean?',
        options: ['To work quickly', 'To delay or postpone', 'To organize well', 'To finish early'],
        correctAnswer: 1,
        explanation: '"Procrastinate" means to delay or postpone action.'
      },
      {
        id: 5,
        question: 'What is a synonym for "meticulous"?',
        options: ['Careless', 'Detailed', 'Quick', 'Lazy'],
        correctAnswer: 1,
        explanation: '"Meticulous" means showing great attention to detail; very careful.'
      },
      {
        id: 6,
        question: 'What does "ambiguous" mean?',
        options: ['Very clear', 'Having multiple meanings', 'Extremely loud', 'Very small'],
        correctAnswer: 1,
        explanation: '"Ambiguous" means open to more than one interpretation; unclear.'
      },
      {
        id: 7,
        question: 'What does "eloquent" mean?',
        options: ['Unable to speak', 'Speaking fluently and persuasively', 'Very quiet', 'Extremely rude'],
        correctAnswer: 1,
        explanation: '"Eloquent" means fluent or persuasive in speaking or writing.'
      },
      {
        id: 8,
        question: 'What is an antonym for "benevolent"?',
        options: ['Kind', 'Generous', 'Malevolent', 'Helpful'],
        correctAnswer: 2,
        explanation: '"Benevolent" means kind and generous; "malevolent" means having evil intentions.'
      },
      {
        id: 9,
        question: 'What does "pragmatic" mean?',
        options: ['Idealistic', 'Practical and realistic', 'Very emotional', 'Extremely creative'],
        correctAnswer: 1,
        explanation: '"Pragmatic" means dealing with things sensibly and realistically.'
      },
      {
        id: 10,
        question: 'What does "ostentatious" mean?',
        options: ['Very simple', 'Showing off wealth or knowledge', 'Extremely quiet', 'Very humble'],
        correctAnswer: 1,
        explanation: '"Ostentatious" means characterized by vulgar or pretentious display.'
      },
      {
        id: 11,
        question: 'What does "vindicate" mean?',
        options: ['To blame someone', 'To clear someone of blame', 'To punish someone', 'To ignore someone'],
        correctAnswer: 1,
        explanation: '"Vindicate" means to clear someone of blame or suspicion.'
      },
      {
        id: 12,
        question: 'What does "superfluous" mean?',
        options: ['Very necessary', 'Extremely important', 'Unnecessary or excessive', 'Very beautiful'],
        correctAnswer: 2,
        explanation: '"Superfluous" means unnecessary, especially through being more than enough.'
      },
      {
        id: 13,
        question: 'What does "tenacious" mean?',
        options: ['Giving up easily', 'Holding firmly to something', 'Very weak', 'Extremely lazy'],
        correctAnswer: 1,
        explanation: '"Tenacious" means tending to keep a firm hold; persistent.'
      },
      {
        id: 14,
        question: 'What does "lucid" mean?',
        options: ['Very confusing', 'Clear and easy to understand', 'Extremely dark', 'Very loud'],
        correctAnswer: 1,
        explanation: '"Lucid" means expressed clearly; easy to understand.'
      },
      {
        id: 15,
        question: 'What does "pensive" mean?',
        options: ['Very happy', 'Engaged in deep thought', 'Extremely angry', 'Very tired'],
        correctAnswer: 1,
        explanation: '"Pensive" means engaged in, involving, or reflecting deep or serious thought.'
      }
    ]
  }
};

// Extended lessons for different categories
export const extendedLessons = {
  grammar: [
    {
      id: 'grammar-tenses-basic',
      title: 'Basic English Tenses',
      description: 'Learn present, past, and future tenses',
      category: 'grammar',
      difficulty: 'beginner' as const,
      content: `
        <h2>Basic English Tenses</h2>
        <p>English has three main time periods: present, past, and future. Each has different forms.</p>
        
        <h3>Present Tense</h3>
        <ul>
          <li><strong>Simple Present:</strong> I work, you work, he/she works</li>
          <li><strong>Present Continuous:</strong> I am working, you are working</li>
        </ul>
        
        <h3>Past Tense</h3>
        <ul>
          <li><strong>Simple Past:</strong> I worked, you worked, he/she worked</li>
          <li><strong>Past Continuous:</strong> I was working, you were working</li>
        </ul>
        
        <h3>Future Tense</h3>
        <ul>
          <li><strong>Simple Future:</strong> I will work, you will work</li>
          <li><strong>Future Continuous:</strong> I will be working</li>
        </ul>
      `,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice' as const,
          question: 'What is the correct present tense form of "go" for "she"?',
          options: ['She go', 'She goes', 'She going', 'She gone'],
          correctAnswer: 1,
          explanation: 'Third person singular (he/she/it) adds -s or -es to the base verb.'
        }
      ]
    },
    {
      id: 'grammar-conditionals',
      title: 'Conditional Sentences',
      description: 'Master if-clauses and conditional structures',
      category: 'grammar',
      difficulty: 'intermediate' as const,
      content: `
        <h2>Conditional Sentences</h2>
        <p>Conditionals express hypothetical situations and their consequences.</p>
        
        <h3>Zero Conditional</h3>
        <p>If + present simple, present simple (general truths)</p>
        <p>Example: If you heat water to 100°C, it boils.</p>
        
        <h3>First Conditional</h3>
        <p>If + present simple, will + base verb (real future possibilities)</p>
        <p>Example: If it rains tomorrow, I will stay home.</p>
        
        <h3>Second Conditional</h3>
        <p>If + past simple, would + base verb (unreal present/future)</p>
        <p>Example: If I won the lottery, I would travel the world.</p>
      `,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice' as const,
          question: 'Complete: "If I _____ rich, I would buy a mansion."',
          options: ['am', 'was', 'were', 'will be'],
          correctAnswer: 2,
          explanation: 'Second conditional uses "were" for all persons in formal English.'
        }
      ]
    }
  ],
  vocabulary: [
    {
      id: 'vocabulary-emotions',
      title: 'Emotions and Feelings',
      description: 'Express emotions accurately in English',
      category: 'vocabulary',
      difficulty: 'beginner' as const,
      content: `
        <h2>Emotions and Feelings</h2>
        <p>Learn to express your emotions clearly and accurately.</p>
        
        <h3>Basic Emotions</h3>
        <ul>
          <li><strong>Happy:</strong> joyful, cheerful, delighted, ecstatic</li>
          <li><strong>Sad:</strong> upset, depressed, miserable, heartbroken</li>
          <li><strong>Angry:</strong> furious, irritated, annoyed, livid</li>
          <li><strong>Scared:</strong> frightened, terrified, anxious, worried</li>
        </ul>
        
        <h3>Expressing Intensity</h3>
        <p>Use adverbs to show how strong the emotion is:</p>
        <ul>
          <li>Slightly, a bit, somewhat (weak)</li>
          <li>Very, really, quite (medium)</li>
          <li>Extremely, incredibly, absolutely (strong)</li>
        </ul>
      `,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice' as const,
          question: 'Which word means "extremely happy"?',
          options: ['Content', 'Pleased', 'Ecstatic', 'Satisfied'],
          correctAnswer: 2,
          explanation: 'Ecstatic means extremely happy or excited.'
        }
      ]
    }
  ],
  business: [
    {
      id: 'business-meetings',
      title: 'Meeting English',
      description: 'Essential phrases for business meetings',
      category: 'business',
      difficulty: 'intermediate' as const,
      content: `
        <h2>Meeting English</h2>
        <p>Master the language of professional meetings.</p>
        
        <h3>Starting a Meeting</h3>
        <ul>
          <li>"Let's get started."</li>
          <li>"Thank you all for coming."</li>
          <li>"The purpose of today's meeting is..."</li>
        </ul>
        
        <h3>Expressing Opinions</h3>
        <ul>
          <li>"In my opinion..."</li>
          <li>"I believe that..."</li>
          <li>"From my perspective..."</li>
        </ul>
        
        <h3>Agreeing and Disagreeing</h3>
        <ul>
          <li>"I completely agree."</li>
          <li>"I see your point, but..."</li>
          <li>"I'm afraid I disagree."</li>
        </ul>
      `,
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice' as const,
          question: 'What\'s a polite way to disagree in a meeting?',
          options: ['You\'re wrong', 'That\'s stupid', 'I see your point, but...', 'No way'],
          correctAnswer: 2,
          explanation: 'This phrase acknowledges the other person\'s view before disagreeing.'
        }
      ]
    }
  ]
};

// Extended featured quizzes
export const extendedFeaturedQuizzes: FeaturedQuiz[] = [
  {
    id: 'grammar-advanced',
    title: 'Advanced Grammar Quiz',
    subtitle: 'True or False? #4',
    image: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 'business-vocabulary',
    title: 'Business Vocabulary Quiz',
    subtitle: 'Professional Terms',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'pronunciation-american',
    title: 'American Pronunciation',
    subtitle: 'Sound Like a Native',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'reading-comprehension',
    title: 'Reading Comprehension',
    subtitle: 'Advanced Texts',
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'writing-skills',
    title: 'Writing Skills Quiz #2',
    subtitle: 'Creative Writing',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'idioms-common',
    title: 'Common Idioms Quiz',
    subtitle: 'Speak Like a Native',
    image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-green-500 to-blue-600'
  },
  {
    id: 'listening-skills',
    title: 'Listening Skills Test',
    subtitle: 'Audio Comprehension',
    image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-cyan-500 to-blue-600'
  }
];

// Extended personality tests
export const extendedPersonalityTests: PersonalityTest[] = [
  {
    id: 'learning-style',
    title: 'What\'s Your Learning Style?',
    description: 'Discover your learning personality',
    image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-pink-500 to-purple-600'
  },
  {
    id: 'english-level',
    title: 'What\'s Your English Level?',
    description: 'Find your proficiency level',
    image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-blue-500 to-red-600'
  },
  {
    id: 'communication-style',
    title: 'What\'s Your Communication Style?',
    description: 'Discover how you communicate',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-rainbow'
  },
  {
    id: 'motivation-type',
    title: 'What Motivates You to Learn?',
    description: 'Find your learning motivation',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-yellow-500 to-pink-600'
  },
  {
    id: 'study-habits',
    title: 'What Are Your Study Habits?',
    description: 'Optimize your learning approach',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-green-500 to-teal-600'
  },
  {
    id: 'career-english',
    title: 'What\'s Your Career English Type?',
    description: 'Find your professional English style',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-indigo-500 to-purple-600'
  }
];