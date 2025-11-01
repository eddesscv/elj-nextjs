import React from 'react';
import { useCategory, useLessonsByCategory } from '../../hooks/useCMS';
import { Breadcrumbs } from '../Breadcrumbs'; // Import the Breadcrumbs component
import { LoadingSpinner, ErrorMessage } from '../LoadingSpinner';

interface LessonsPageProps {
  categoryId: string;
  onBack: () => void;
  onLessonSelect: (lessonId: string) => void;
}

export const LessonsPage: React.FC<LessonsPageProps> = ({
  categoryId,
  onBack,
  onLessonSelect,
}) => {
  const { data: category, loading: categoryLoading, error: categoryError } = useCategory(categoryId);
  const { data: lessons, loading: lessonsLoading, error: lessonsError } = useLessonsByCategory(categoryId);

  const loading = categoryLoading || lessonsLoading;
  const error = categoryError || lessonsError;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorMessage message={error} onRetry={onBack} />
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Category Not Found
          </h1>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', onClick: onBack },
            { label: category.name, onClick: onBack },
            { label: 'Lessons', isActive: true },
          ]}
          className="mb-6"
        />

        <div className="text-center mb-8">
          <div className="text-5xl mb-4">{category.icon}</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {category.name} Lessons
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Learn {category.name.toLowerCase()} with our interactive lessons
          </p>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            ← Back to {category.name}
          </button>
        </div>

        {/* Rest of the component remains the same */}
        {lessons && lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => onLessonSelect(lesson.id)}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 group"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      lesson.difficulty === 'beginner'
                        ? 'text-green-600 bg-green-100'
                        : lesson.difficulty === 'intermediate'
                        ? 'text-yellow-600 bg-yellow-100'
                        : 'text-red-600 bg-red-100'
                    }`}>
                      {lesson.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">
                      {lesson.exercises?.length || 0} exercises
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Lessons Available</h3>
            <p className="text-gray-600 mb-8">
              Lessons for {category.name} are coming soon! Check back later.
            </p>
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              Back to {category.name}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
