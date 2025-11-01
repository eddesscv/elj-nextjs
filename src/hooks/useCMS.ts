import { useState, useEffect } from 'react';
import { cmsService } from '../services/cmsService';
import { QuizCategory, FeaturedQuiz, PersonalityTest, Lesson } from '../types/quiz';

// Generic hook for CMS data fetching
export function useCMSData<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFunction();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error, refetch: () => fetchFunction() };
}

// Specific hooks for different content types
export function useCategories() {
  return useCMSData(() => cmsService.getCategories());
}

export function useCategory(slug: string) {
  return useCMSData(() => cmsService.getCategoryBySlug(slug), [slug]);
}

export function usePopularQuizzes() {
  return useCMSData(() => cmsService.getPopularQuizzes());
}

export function useFeaturedQuizzes() {
  return useCMSData(() => cmsService.getFeaturedQuizzes());
}

export function usePersonalityTests() {
  return useCMSData(() => cmsService.getPersonalityTests());
}

export function useDailyQuizzes() {
  return useCMSData(() => cmsService.getDailyQuizzes());
}

export function useNewQuizzes() {
  return useCMSData(() => cmsService.getNewQuizzes());
}

export function useLessonsByCategory(categorySlug: string) {
  return useCMSData(() => cmsService.getLessonsByCategory(categorySlug), [categorySlug]);
}

export function useLesson(slug: string) {
  return useCMSData(() => cmsService.getLessonBySlug(slug), [slug]);
}