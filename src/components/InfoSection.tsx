import React from 'react';

export const InfoSection: React.FC = () => {
  return (
    <section className="py-16 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Thousands of questions */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold text-text mb-4">
              Thousands of Questions
            </h3>
            <p className="text-subtext leading-relaxed">
              We offer thousands of questions in all areas of English learning: grammar, vocabulary, pronunciation, reading, writing, listening, speaking, business English, and more. All our questions are carefully selected and verified to guarantee you the best learning experience.
            </p>
          </div>

          {/* Complete and constantly updated */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold text-text mb-4">
              Complete and Constantly Updated
            </h3>
            <p className="text-subtext leading-relaxed">
              English Like Jagger offers rich and varied content with over 10,000 questions distributed across numerous categories. Our quizzes are constantly updated to follow current trends and offer you always more fresh content. Whether you're a beginner or expert, you'll find quizzes adapted to your level.
            </p>
          </div>

          {/* Different ways to play */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold text-text mb-4">
              Different Ways to Learn
            </h3>
            <p className="text-subtext leading-relaxed">
              English Like Jagger offers several ways to learn: classic quizzes, daily questions, personality tests, timed challenges, team quizzes, interactive lessons, and more. You can learn alone to test your knowledge or challenge your friends. Each learning mode offers a unique and entertaining experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};