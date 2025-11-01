import React from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

interface BlogPageProps {
  onBack: () => void;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  readTime: string;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'How to Improve Your English Grammar Skills',
      excerpt: 'Discover effective strategies and techniques to master English grammar and boost your language confidence.',
      content: 'Full article content here...',
      author: 'Sarah Johnson',
      date: '2024-12-10',
      category: 'Grammar',
      tags: ['grammar', 'learning', 'tips'],
      image: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'The Power of Daily English Practice',
      excerpt: 'Learn why consistent daily practice is the key to mastering English and how to build effective study habits.',
      content: 'Full article content here...',
      author: 'Michael Chen',
      date: '2024-12-08',
      category: 'Learning Tips',
      tags: ['practice', 'habits', 'motivation'],
      image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '7 min read'
    },
    {
      id: '3',
      title: 'Business English: Essential Phrases for Success',
      excerpt: 'Master the most important business English phrases and expressions to excel in professional environments.',
      content: 'Full article content here...',
      author: 'Emma Wilson',
      date: '2024-12-05',
      category: 'Business English',
      tags: ['business', 'professional', 'phrases'],
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '6 min read'
    },
    {
      id: '4',
      title: 'Common English Idioms and Their Meanings',
      excerpt: 'Explore popular English idioms and learn how to use them naturally in conversations.',
      content: 'Full article content here...',
      author: 'David Brown',
      date: '2024-12-03',
      category: 'Vocabulary',
      tags: ['idioms', 'expressions', 'conversation'],
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '4 min read'
    },
    {
      id: '5',
      title: 'Pronunciation Tips for Non-Native Speakers',
      excerpt: 'Improve your English pronunciation with these practical tips and exercises designed for language learners.',
      content: 'Full article content here...',
      author: 'Lisa Garcia',
      date: '2024-12-01',
      category: 'Pronunciation',
      tags: ['pronunciation', 'speaking', 'accent'],
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '8 min read'
    },
    {
      id: '6',
      title: 'The Benefits of Learning English Through Quizzes',
      excerpt: 'Discover how interactive quizzes can accelerate your English learning journey and make it more enjoyable.',
      content: 'Full article content here...',
      author: 'James Miller',
      date: '2024-11-28',
      category: 'Learning Methods',
      tags: ['quizzes', 'interactive', 'gamification'],
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '5 min read'
    }
  ];

  const categories = ['All', 'Grammar', 'Learning Tips', 'Business English', 'Vocabulary', 'Pronunciation', 'Learning Methods'];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <button
            onClick={onBack}
            className="mb-6 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📝 English Learning Blog</h1>
          <p className="text-xl text-gray-600">Tips, tricks, and insights to help you master English</p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  {blogPosts[0].category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{blogPosts[0].title}</h2>
              <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </div>
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-purple-50 text-purple-600 px-2 py-1 rounded text-xs flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2">
                  Read Article <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white text-gray-700 border-2 border-gray-300 px-8 py-3 rounded-lg font-semibold hover:border-purple-300 hover:text-purple-600 transition-colors">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
};