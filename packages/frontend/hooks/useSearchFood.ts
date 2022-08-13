import { useQuery } from '@tanstack/react-query';
import { ErrorType, Food } from '../types';
import { getFood } from '../utils/api/food';

export const useSearchFood = (
  { query, page, category }: { query: string; page: number; category?: string },
  enabled: boolean
) => {
  return useQuery<{ food: Food[]; totalPages: number }, ErrorType>(
    ['food_search', query, page, category],
    () => getFood({ query, page, category }),
    { enabled, refetchOnWindowFocus: false }
  );
};
