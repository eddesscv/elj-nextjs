import axios from 'axios';
import strapiApi from '../lib/strapi';
import { QuizCategory, Quiz, PersonalityTest, FeaturedQuiz, Lesson } from '../types/quiz';

// Mock data service that simulates Strapi API responses
// In production, replace these with actual Strapi API calls

class CMSService {
  private mockData = {
    categories: [
      {
        id: 1,
        attributes: {
          name: 'General Knowledge',
          icon: '🎓',
          description: 'Test your general knowledge',
          color: 'from-blue-500 to-purple-600',
          questionCount: 750,
          hasLessons: true,
          slug: 'general-knowledge'
        }
      },
      {
        id: 2,
        attributes: {
          name: 'Grammar',
          icon: '📚',
          description: 'Master English grammar',
          color: 'from-green-500 to-blue-600',
          questionCount: 500,
          hasLessons: true,
          slug: 'grammar'
        }
      },
      {
        id: 3,
        attributes: {
          name: 'Vocabulary',
          icon: '🗣️',
          description: 'Expand your vocabulary',
          color: 'from-yellow-500 to-orange-600',
          questionCount: 450,
          hasLessons: true,
          slug: 'vocabulary'
        }
      },
      {
        id: 4,
        attributes: {
          name: 'Pronunciation',
          icon: '📖',
          description: 'Perfect pronunciation',
          color: 'from-red-500 to-pink-600',
          questionCount: 350,
          hasLessons: true,
          slug: 'pronunciation'
        }
      },
      {
        id: 5,
        attributes: {
          name: 'Reading',
          icon: '✍️',
          description: 'Improve reading skills',
          color: 'from-green-500 to-teal-600',
          questionCount: 320,
          hasLessons: true,
          slug: 'reading'
        }
      },
      {
        id: 6,
        attributes: {
          name: 'Writing',
          icon: '👂',
          description: 'Enhance writing skills',
          color: 'from-indigo-500 to-purple-600',
          questionCount: 280,
          hasLessons: true,
          slug: 'writing'
        }
      },
      {
        id: 7,
        attributes: {
          name: 'Listening',
          icon: '💬',
          description: 'Sharpen listening skills',
          color: 'from-cyan-500 to-blue-600',
          questionCount: 250,
          hasLessons: true,
          slug: 'listening'
        }
      },
      {
        id: 8,
        attributes: {
          name: 'Speaking',
          icon: '💼',
          description: 'Practice speaking',
          color: 'from-orange-500 to-red-600',
          questionCount: 200,
          hasLessons: true,
          slug: 'speaking'
        }
      },
      {
        id: 9,
        attributes: {
          name: 'Business English',
          icon: '💼',
          description: 'Professional English',
          color: 'from-blue-600 to-red-600',
          questionCount: 180,
          hasLessons: true,
          slug: 'business'
        }
      },
      {
        id: 10,
        attributes: {
          name: 'Games',
          icon: '🎮',
          description: 'Fun learning games',
          color: 'from-purple-500 to-pink-600',
          questionCount: 150,
          hasLessons: false,
          slug: 'games'
        }
      },
      {
        id: 11,
        attributes: {
          name: 'Riddles',
          icon: '🧩',
          description: 'English riddles',
          color: 'from-green-600 to-blue-600',
          questionCount: 120,
          hasLessons: false,
          slug: 'riddles'
        }
      },
      {
        id: 12,
        attributes: {
          name: 'Idioms',
          icon: '🎭',
          description: 'Common idioms',
          color: 'from-red-500 to-yellow-600',
          questionCount: 100,
          hasLessons: true,
          slug: 'idioms'
        }
      }
    ],
    
    popularQuizzes: [
      {
        id: 1,
        attributes: {
          title: 'General Knowledge',
          description: 'Test your general knowledge',
          image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
          participants: '2.1M',
          slug: 'general-knowledge'
        }
      },
      {
        id: 2,
        attributes: {
          title: 'Grammar',
          description: 'Master English grammar',
          image: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400',
          participants: '1.8M',
          slug: 'grammar'
        }
      },
      {
        id: 3,
        attributes: {
          title: 'Vocabulary',
          description: 'Expand your word power',
          image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400',
          participants: '1.5M',
          slug: 'vocabulary'
        }
      },
      {
        id: 4,
        attributes: {
          title: 'Pronunciation',
          description: 'Perfect your pronunciation',
          image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
          participants: '1.2M',
          slug: 'pronunciation'
        }
      },
      {
        id: 5,
        attributes: {
          title: 'Reading',
          description: 'Improve reading skills',
          image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
          participants: '980K',
          slug: 'reading'
        }
      },
      {
        id: 6,
        attributes: {
          title: 'Writing',
          description: 'Enhance writing abilities',
          image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
          participants: '850K',
          slug: 'writing'
        }
      },
      {
        id: 7,
        attributes: {
          title: 'Listening',
          description: 'Sharpen listening skills',
          image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
          participants: '720K',
          slug: 'listening'
        }
      },
      {
        id: 8,
        attributes: {
          title: 'Speaking',
          description: 'Practice speaking fluency',
          image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400',
          participants: '650K',
          slug: 'speaking'
        }
      }
    ],

    featuredQuizzes: [
      {
        id: 1,
        attributes: {
          title: 'Advanced Grammar Quiz',
          subtitle: 'True or False? #4',
          image: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400',
          color: 'from-red-500 to-pink-600',
          slug: 'grammar-advanced'
        }
      },
      {
        id: 2,
        attributes: {
          title: 'Business Vocabulary Quiz',
          subtitle: 'Professional Terms',
          image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
          color: 'from-blue-500 to-purple-600',
          slug: 'business-vocabulary'
        }
      },
      {
        id: 3,
        attributes: {
          title: 'American Pronunciation',
          subtitle: 'Sound Like a Native',
          image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
          color: 'from-purple-500 to-pink-600',
          slug: 'pronunciation-american'
        }
      },
      {
        id: 4,
        attributes: {
          title: 'Reading Comprehension',
          subtitle: 'Advanced Texts',
          image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
          color: 'from-orange-500 to-red-600',
          slug: 'reading-comprehension'
        }
      },
      {
        id: 5,
        attributes: {
          title: 'Writing Skills Quiz #2',
          subtitle: 'Creative Writing',
          image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
          color: 'from-blue-600 to-indigo-600',
          slug: 'writing-skills'
        }
      }
    ],

    personalityTests: [
      {
        id: 1,
        attributes: {
          title: 'What\'s Your Learning Style?',
          description: 'Discover your learning personality',
          image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400',
          color: 'from-pink-500 to-purple-600',
          slug: 'learning-style'
        }
      },
      {
        id: 2,
        attributes: {
          title: 'What\'s Your English Level?',
          description: 'Find your proficiency level',
          image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400',
          color: 'from-blue-500 to-red-600',
          slug: 'english-level'
        }
      },
      {
        id: 3,
        attributes: {
          title: 'What\'s Your Communication Style?',
          description: 'Discover how you communicate',
          image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
          color: 'from-rainbow',
          slug: 'communication-style'
        }
      },
      {
        id: 4,
        attributes: {
          title: 'What Motivates You to Learn?',
          description: 'Find your learning motivation',
          image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
          color: 'from-yellow-500 to-pink-600',
          slug: 'motivation-type'
        }
      },
      {
        id: 5,
        attributes: {
          title: 'What Are Your Study Habits?',
          description: 'Optimize your learning approach',
          image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
          color: 'from-green-500 to-teal-600',
          slug: 'study-habits'
        }
      }
    ],

    dailyQuizzes: [
      {
        id: 1,
        attributes: {
          title: 'Daily Test #4161',
          description: 'Test your daily knowledge',
          participants: '1,247 participants',
          icon: '📖',
          slug: 'day-4161'
        }
      },
      {
        id: 2,
        attributes: {
          title: 'Word of the Day #379',
          description: 'Learn a new word today',
          participants: '892 participants',
          icon: '📝',
          slug: 'word-379'
        }
      },
      {
        id: 3,
        attributes: {
          title: 'Grammar Challenge #275',
          description: 'Daily grammar practice',
          participants: '654 participants',
          icon: '📚',
          slug: 'grammar-275'
        }
      },
      {
        id: 4,
        attributes: {
          title: 'Pronunciation Practice #168',
          description: 'Perfect your pronunciation',
          participants: '543 participants',
          icon: '🗣️',
          slug: 'pronunciation-168'
        }
      },
      {
        id: 5,
        attributes: {
          title: 'English Riddle #564',
          description: 'Solve this riddle',
          participants: '432 participants',
          icon: '🧩',
          slug: 'riddle-564'
        }
      },
      {
        id: 6,
        attributes: {
          title: 'Idiom of the Day #522',
          description: 'Learn common idioms',
          participants: '321 participants',
          icon: '💭',
          slug: 'idiom-522'
        }
      }
    ],

    newQuizzes: [
      {
        id: 1,
        attributes: {
          title: 'Quiz: Advanced Grammar Structures',
          category: 'Grammar',
          date: 'August 2, 2024',
          slug: 'quiz-1'
        }
      },
      {
        id: 2,
        attributes: {
          title: 'Quiz: Business English Vocabulary',
          category: 'Vocabulary',
          date: 'August 1, 2024',
          slug: 'quiz-2'
        }
      },
      {
        id: 3,
        attributes: {
          title: 'Quiz: American vs British Pronunciation',
          category: 'Pronunciation',
          date: 'July 31, 2024',
          slug: 'quiz-3'
        }
      },
      {
        id: 4,
        attributes: {
          title: 'Quiz: Reading Comprehension #35',
          category: 'Reading',
          date: 'July 30, 2024',
          slug: 'quiz-4'
        }
      }
    ],

    lessons: [
      {
        id: 1,
        attributes: {
          title: 'English Verb Conjugation',
          description: 'Master English verb tenses and conjugation patterns',
          category: { data: { id: 2, attributes: { slug: 'grammar' } } },
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
            }
          ],
          slug: 'grammar-conjugation-lesson'
        }
      },
      {
        id: 2,
        attributes: {
          title: 'Articles: A, An, The',
          description: 'Learn when and how to use English articles correctly',
          category: { data: { id: 2, attributes: { slug: 'grammar' } } },
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
          ],
          slug: 'grammar-articles-lesson'
        }
      }
    ]
  };

  // Transform Strapi response format to our app format
  private transformStrapiData<T>(strapiData: any[]): T[] {
    return strapiData.map(item => ({
      id: item.attributes.slug || item.id.toString(),
      ...item.attributes
    }));
  }

  // Categories
  async getCategories(): Promise<QuizCategory[]> {
    try {
      // In production, replace with: 
      // const response = await axios.get(strapiApi.buildUrl('categories?populate=*'));
      // return this.transformStrapiData(response.data.data);
      
      // Mock implementation
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(this.transformStrapiData(this.mockData.categories));
        }, 500);
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async getCategoryBySlug(slug: string): Promise<QuizCategory | null> {
    try {
      // In production, replace with:
      // const response = await axios.get(strapiApi.buildUrl(`categories?filters[slug][$eq]=${slug}&populate=*`));
      // const categories = this.transformStrapiData(response.data.data);
      // return categories[0] || null;
      
      // Mock implementation
      return new Promise(resolve => {
        setTimeout(() => {
          const categories = this.transformStrapiData(this.mockData.categories);
          const category = categories.find(cat => cat.id === slug);
          resolve(category || null);
        }, 300);
      });
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  }

  // Popular Quizzes
  async getPopularQuizzes(): Promise<any[]> {
    try {
      // In production, replace with:
      // const response = await axios.get(strapiApi.buildUrl('popular-quizzes?populate=*'));
      // return this.transformStrapiData(response.data.data);
      
      // Mock implementation
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(this.transformStrapiData(this.mockData.popularQuizzes));
        }, 400);
      });
    } catch (error) {
      console.error('Error fetching popular quizzes:', error);
      throw error;
    }
  }

  // Featured Quizzes
  async getFeaturedQuizzes(): Promise<FeaturedQuiz[]> {
    try {
      // In production, replace with:
      // const response = await axios.get(strapiApi.buildUrl('featured-quizzes?populate=*'));
      // return this.transformStrapiData(response.data.data);
      
      // Mock implementation
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(this.transformStrapiData(this.mockData.featuredQuizzes));
        }, 350);
      });
    } catch (error) {
      console.error('Error fetching featured quizzes:', error);
      throw error;
    }
  }

  // Personality Tests
  async getPersonalityTests(): Promise<PersonalityTest[]> {
    try {
      // In production, replace with:
      // const response = await axios.get(strapiApi.buildUrl('personality-tests?populate=*'));
      // return this.transformStrapiData(response.data.data);
      
      // Mock implementation
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(this.transformStrapiData(this.mockData.personalityTests));
        }, 300);
      });
    } catch (error) {
      console.error('Error fetching personality tests:', error);
      throw error;
    }
  }

  // Daily Quizzes
  async getDailyQuizzes(): Promise<any[]> {
    try {
      // In production, replace with:
      // const response = await axios.get(strapiApi.buildUrl('daily-quizzes?populate=*'));
      // return this.transformStrapiData(response.data.data);
      
      // Mock implementation
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(this.transformStrapiData(this.mockData.dailyQuizzes));
        }, 250);
      });
    } catch (error) {
      console.error('Error fetching daily quizzes:', error);
      throw error;
    }
  }

  // New Quizzes
  async getNewQuizzes(): Promise<any[]> {
    try {
      // In production, replace with:
      // const response = await axios.get(strapiApi.buildUrl('new-quizzes?populate=*&sort=createdAt:desc'));
      // return this.transformStrapiData(response.data.data);
      
      // Mock implementation
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(this.transformStrapiData(this.mockData.newQuizzes));
        }, 200);
      });
    } catch (error) {
      console.error('Error fetching new quizzes:', error);
      throw error;
    }
  }

  // Lessons
  async getLessonsByCategory(categorySlug: string): Promise<Lesson[]> {
    try {
      // In production, replace with:
      // const response = await axios.get(strapiApi.buildUrl(`lessons?filters[category][slug][$eq]=${categorySlug}&populate=*`));
      // return this.transformStrapiData(response.data.data);
      
      // Mock implementation
      return new Promise(resolve => {
        setTimeout(() => {
          const lessons = this.transformStrapiData(this.mockData.lessons);
          const filteredLessons = lessons.filter(lesson => 
            lesson.category?.data?.attributes?.slug === categorySlug
          );
          resolve(filteredLessons);
        }, 400);
      });
    } catch (error) {
      console.error('Error fetching lessons:', error);
      throw error;
    }
  }

  async getLessonBySlug(slug: string): Promise<Lesson | null> {
    try {
      // In production, replace with:
      // const response = await axios.get(strapiApi.buildUrl(`lessons?filters[slug][$eq]=${slug}&populate=*`));
      // const lessons = this.transformStrapiData(response.data.data);
      // return lessons[0] || null;
      
      // Mock implementation
      return new Promise(resolve => {
        setTimeout(() => {
          const lessons = this.transformStrapiData(this.mockData.lessons);
          const lesson = lessons.find(l => l.id === slug);
          resolve(lesson || null);
        }, 300);
      });
    } catch (error) {
      console.error('Error fetching lesson:', error);
      throw error;
    }
  }
}

export const cmsService = new CMSService();
export default cmsService;