import { useQuery } from '@tanstack/react-query';
import { Category } from '../types';
import { fetcher } from '../utils/fetcher';

const getCategories = async () => {
  return await fetcher('/food/categories');
};

export const useCategories = () => {
  return useQuery<Category[]>(['categories'], getCategories, {
    staleTime: Infinity,
    retry: false,
  });
};
