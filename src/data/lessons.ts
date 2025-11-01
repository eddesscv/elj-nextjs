/* import { Lesson } from '../types/quiz';

export const grammarLessons: Lesson[] = [
  {
    id: 'grammar-conjugation-lesson',
    title: 'English Verb Conjugation',
    description: 'Master English verb tenses and conjugation patterns',
    category: 'grammar',
    difficulty: 'intermediate',
    content: `
      <h2>English Verb Conjugation</h2>
      <p>English verb conjugation is the process of changing verbs to show different tenses, moods, and aspects.</p>
      
      <h3>Present Tense</h3>
      <ul>
        <li><strong>Simple Present:</strong> I walk, you walk, he/she/it walks</li>
        <li><strong>Present Continuous:</strong> I am walking, you are walking, he/she/it is walking</li>
        <li><strong>Present Perfect:</strong> I have walked, you have walked, he/she/it has walked</li>
      </ul>
      
      <h3>Past Tense</h3>
      <ul>
        <li><strong>Simple Past:</strong> I walked, you walked, he/she/it walked</li>
        <li><strong>Past Continuous:</strong> I was walking, you were walking, he/she/it was walking</li>
        <li><strong>Past Perfect:</strong> I had walked, you had walked, he/she/it had walked</li>
      </ul>
      
      <h3>Future Tense</h3>
      <ul>
        <li><strong>Simple Future:</strong> I will walk, you will walk, he/she/it will walk</li>
        <li><strong>Future Continuous:</strong> I will be walking, you will be walking</li>
        <li><strong>Future Perfect:</strong> I will have walked, you will have walked</li>
      </ul>
    `,
    exercises: [
      {
        id: 'ex1',
        type: 'multiple-choice',
        question: 'What is the correct present perfect form of "go" for "she"?',
        options: ['She have gone', 'She has gone', 'She had gone', 'She will have gone'],
        correctAnswer: 1,
        explanation: 'Present perfect uses "has" with third person singular subjects.'
      },
      {
        id: 'ex2',
        type: 'multiple-choice',
        question: 'Which sentence uses the past continuous tense correctly?',
        options: ['I walked to school', 'I was walking to school', 'I have walked to school', 'I will walk to school'],
        correctAnswer: 1,
        explanation: 'Past continuous uses "was/were + verb-ing" to show ongoing past action.'
      }
    ]
  },
  {
    id: 'grammar-articles-lesson',
    title: 'Articles: A, An, The',
    description: 'Learn when and how to use English articles correctly',
    category: 'grammar',
    difficulty: 'beginner',
    content: `
      <h2>English Articles</h2>
      <p>Articles are words that define nouns as specific or unspecific.</p>
      
      <h3>Definite Article: "The"</h3>
      <p>Use "the" when referring to specific nouns that both speaker and listener know about.</p>
      <ul>
        <li>The book on the table (specific book)</li>
        <li>The sun is bright (only one sun)</li>
      </ul>
      
      <h3>Indefinite Articles: "A" and "An"</h3>
      <p>Use "a" or "an" when referring to non-specific nouns.</p>
      <ul>
        <li><strong>"A"</strong> before consonant sounds: a cat, a university</li>
        <li><strong>"An"</strong> before vowel sounds: an apple, an hour</li>
      </ul>
      
      <h3>No Article (Zero Article)</h3>
      <p>Some nouns don't need articles:</p>
      <ul>
        <li>Plural nouns in general: Dogs are loyal</li>
        <li>Uncountable nouns: Water is essential</li>
        <li>Proper nouns: London, John</li>
      </ul>
    `,
    exercises: [
      {
        id: 'ex1',
        type: 'multiple-choice',
        question: 'Choose the correct article: "I saw ___ elephant at the zoo."',
        options: ['a', 'an', 'the', 'no article'],
        correctAnswer: 1,
        explanation: 'Use "an" before words starting with vowel sounds.'
      }
    ]
  }
];

export const vocabularyLessons: Lesson[] = [
  {
    id: 'vocabulary-business-lesson',
    title: 'Business English Vocabulary',
    description: 'Essential vocabulary for professional communication',
    category: 'vocabulary',
    difficulty: 'intermediate',
    content: `
      <h2>Business English Vocabulary</h2>
      <p>Master essential business terms for professional success.</p>
      
      <h3>Meeting Vocabulary</h3>
      <ul>
        <li><strong>Agenda:</strong> A list of items to be discussed</li>
        <li><strong>Minutes:</strong> Written record of meeting discussions</li>
        <li><strong>Action items:</strong> Tasks assigned during the meeting</li>
        <li><strong>Follow up:</strong> To check progress on something</li>
      </ul>
      
      <h3>Financial Terms</h3>
      <ul>
        <li><strong>Revenue:</strong> Total income generated</li>
        <li><strong>Profit:</strong> Money left after expenses</li>
        <li><strong>Budget:</strong> Financial plan for spending</li>
        <li><strong>ROI:</strong> Return on Investment</li>
      </ul>
    `,
    exercises: [
      {
        id: 'ex1',
        type: 'multiple-choice',
        question: 'What does ROI stand for?',
        options: ['Return on Investment', 'Rate of Interest', 'Revenue of Income', 'Risk of Investment'],
        correctAnswer: 0,
        explanation: 'ROI stands for Return on Investment, measuring profitability.'
      }
    ]
  }
]; */

import { Lesson } from '../types/quiz';
import { extendedLessons } from './extendedQuizData';

// Use extended lessons with more content
export const grammarLessons: Lesson[] = [
  ...extendedLessons.grammar,
  // Keep original lessons
  {
    id: 'grammar-conjugation-lesson',
    title: 'English Verb Conjugation',
    description: 'Master English verb tenses and conjugation patterns',
    category: 'grammar',
    difficulty: 'intermediate',
    content: `
      <h2>English Verb Conjugation</h2>
      <p>English verb conjugation is the process of changing verbs to show different tenses, moods, and aspects.</p>
      
      <h3>Present Tense</h3>
      <ul>
        <li><strong>Simple Present:</strong> I walk, you walk, he/she/it walks</li>
        <li><strong>Present Continuous:</strong> I am walking, you are walking, he/she/it is walking</li>
        <li><strong>Present Perfect:</strong> I have walked, you have walked, he/she/it has walked</li>
      </ul>
      
      <h3>Past Tense</h3>
      <ul>
        <li><strong>Simple Past:</strong> I walked, you walked, he/she/it walked</li>
        <li><strong>Past Continuous:</strong> I was walking, you were walking, he/she/it was walking</li>
        <li><strong>Past Perfect:</strong> I had walked, you had walked, he/she/it had walked</li>
      </ul>
      
      <h3>Future Tense</h3>
      <ul>
        <li><strong>Simple Future:</strong> I will walk, you will walk, he/she/it will walk</li>
        <li><strong>Future Continuous:</strong> I will be walking, you will be walking</li>
        <li><strong>Future Perfect:</strong> I will have walked, you will have walked</li>
      </ul>
    `,
    exercises: [
      {
        id: 'ex1',
        type: 'multiple-choice',
        question: 'What is the correct present perfect form of "go" for "she"?',
        options: [
          'She have gone',
          'She has gone',
          'She had gone',
          'She will have gone',
        ],
        correctAnswer: 1,
        explanation:
          'Present perfect uses "has" with third person singular subjects.',
      },
      {
        id: 'ex2',
        type: 'multiple-choice',
        question: 'Which sentence uses the past continuous tense correctly?',
        options: [
          'I walked to school',
          'I was walking to school',
          'I have walked to school',
          'I will walk to school',
        ],
        correctAnswer: 1,
        explanation:
          'Past continuous uses "was/were + verb-ing" to show ongoing past action.',
      },
    ],
  },
  {
    id: 'grammar-articles-lesson',
    title: 'Articles: A, An, The',
    description: 'Learn when and how to use English articles correctly',
    category: 'grammar',
    difficulty: 'beginner',
    content: `
      <h2>English Articles</h2>
      <p>Articles are words that define nouns as specific or unspecific.</p>
      
      <h3>Definite Article: "The"</h3>
      <p>Use "the" when referring to specific nouns that both speaker and listener know about.</p>
      <ul>
        <li>The book on the table (specific book)</li>
        <li>The sun is bright (only one sun)</li>
      </ul>
      
      <h3>Indefinite Articles: "A" and "An"</h3>
      <p>Use "a" or "an" when referring to non-specific nouns.</p>
      <ul>
        <li><strong>"A"</strong> before consonant sounds: a cat, a university</li>
        <li><strong>"An"</strong> before vowel sounds: an apple, an hour</li>
      </ul>
      
      <h3>No Article (Zero Article)</h3>
      <p>Some nouns don't need articles:</p>
      <ul>
        <li>Plural nouns in general: Dogs are loyal</li>
        <li>Uncountable nouns: Water is essential</li>
        <li>Proper nouns: London, John</li>
      </ul>
    `,
    exercises: [
      {
        id: 'ex1',
        type: 'multiple-choice',
        question:
          'Choose the correct article: "I saw ___ elephant at the zoo."',
        options: ['a', 'an', 'the', 'no article'],
        correctAnswer: 1,
        explanation: 'Use "an" before words starting with vowel sounds.',
      },
    ],
  },
];

export const vocabularyLessons: Lesson[] = [
  ...extendedLessons.vocabulary,
  // Keep original lesson
  {
    id: 'vocabulary-business-lesson',
    title: 'Business English Vocabulary',
    description: 'Essential vocabulary for professional communication',
    category: 'vocabulary',
    difficulty: 'intermediate',
    content: `
      <h2>Business English Vocabulary</h2>
      <p>Master essential business terms for professional success.</p>
      
      <h3>Meeting Vocabulary</h3>
      <ul>
        <li><strong>Agenda:</strong> A list of items to be discussed</li>
        <li><strong>Minutes:</strong> Written record of meeting discussions</li>
        <li><strong>Action items:</strong> Tasks assigned during the meeting</li>
        <li><strong>Follow up:</strong> To check progress on something</li>
      </ul>
      
      <h3>Financial Terms</h3>
      <ul>
        <li><strong>Revenue:</strong> Total income generated</li>
        <li><strong>Profit:</strong> Money left after expenses</li>
        <li><strong>Budget:</strong> Financial plan for spending</li>
        <li><strong>ROI:</strong> Return on Investment</li>
      </ul>
    `,
    exercises: [
      {
        id: 'ex1',
        type: 'multiple-choice',
        question: 'What does ROI stand for?',
        options: [
          'Return on Investment',
          'Rate of Interest',
          'Revenue of Income',
          'Risk of Investment',
        ],
        correctAnswer: 0,
        explanation:
          'ROI stands for Return on Investment, measuring profitability.',
      },
    ],
  },
];

// Add business lessons
export const businessLessons: Lesson[] = extendedLessons.business;
