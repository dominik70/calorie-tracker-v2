import { startOfDay, endOfDay } from 'date-fns';
import { CreateFoodBody } from '@calorie-tracker/common';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDate } from '../contexts/DateContext';
import { ErrorType, Meal, UserFood } from '../types';
import { useUser } from './useUser';
import {
  addUserFood,
  deleteUserFood,
  getUserFood,
  updateUserFood,
} from '../utils/api/food';
import { toast } from 'react-toastify';

const FOOD_KEY = 'user_food';

export const useUserFood = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { date } = useDate();

  const { data: food, ...rest } = useQuery<UserFood[], ErrorType>(
    [FOOD_KEY, date],
    () =>
      getUserFood({
        userId: userId,
        from: startOfDay(date).toISOString(),
        to: endOfDay(date).toISOString(),
      }),
    {
      staleTime: Infinity,
      retry: false,
      enabled: !!user,
    }
  );

  const userId = user?.id;

  const onError = (error: ErrorType) => {
    toast.error(error.message);
  };

  const addFoodMutation = useMutation<UserFood, ErrorType, CreateFoodBody>(
    (body) => addUserFood(userId, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([FOOD_KEY, date]);
        toast.success('Successfully added food');
      },
      onError,
    }
  );

  const updateFoodMutation = useMutation<
    UserFood,
    ErrorType,
    { foodId: string; body: Partial<{ meal: Meal; quantity: number }> }
  >(({ foodId, body }) => updateUserFood({ foodId, userId, body }), {
    onSuccess: () => {
      queryClient.invalidateQueries([FOOD_KEY, date]);
      toast.success('Successfully updated food');
    },
    onError,
  });

  const deleteFoodMutation = useMutation<UserFood, ErrorType, string>(
    (foodId: string) => deleteUserFood(userId, foodId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([FOOD_KEY, date]);
        toast.success('Successfully deleted food');
      },
      onError,
    }
  );

  return {
    food,
    addFoodMutation,
    updateFoodMutation,
    deleteFoodMutation,
    ...rest,
  };
};
