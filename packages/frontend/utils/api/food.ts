import { CreateFoodBody } from '@calorie-tracker/common';
import { fetcher } from '../fetcher';

interface GetFood {
  query: string;
  page: number;
  category?: string;
}

export const getFood = async ({ page, ...query }: GetFood) => {
  const params = new URLSearchParams({ ...query, page: page.toString() });
  return fetcher(`/food?${params.toString()}`);
};

type UserId = string | undefined;

export const addUserFood = (userId: UserId, body: CreateFoodBody) => {
  if (!userId) {
    throw new Error('You must log in to save your diet history');
  }
  return fetcher(`/users/${userId}/food`, {
    method: 'POST',
    body,
  });
};

export const deleteUserFood = (userId: UserId, foodId: string) => {
  if (!userId) {
    throw new Error('You must log in to delete element');
  }
  return fetcher(`/users/${userId}/food/${foodId}`, { method: 'DELETE' });
};

interface UpdateUserFood {
  userId: UserId;
  foodId: string;
  body: Partial<CreateFoodBody>;
}

export const updateUserFood = ({ userId, foodId, body }: UpdateUserFood) => {
  if (!userId) {
    throw new Error('You must log in to updae element');
  }
  return fetcher(`/users/${userId}/food/${foodId}`, {
    method: 'PATCH',
    body,
  });
};

interface GetUserFood {
  userId: UserId;
  from: string;
  to: string;
}

export const getUserFood = ({ userId, from, to }: GetUserFood) => {
  if (!userId) {
    throw new Error('You must log in to view your food');
  }
  return fetcher(`/users/${userId}/food?from=${from}&to=${to}`);
};
