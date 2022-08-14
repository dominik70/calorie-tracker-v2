import { CreateFoodBody } from '@calorie-tracker/common';
import { fetcher } from '../fetcher';

interface Query {
  query: string;
  page: number;
  category?: string;
}

export const getFood = async ({ page, ...query }: Query) => {
  const params = new URLSearchParams({ ...query, page: page.toString() });
  return fetcher(`/food?${params.toString()}`);
};

export const addUserFood = (userId: string, body: CreateFoodBody) => {
  return fetcher(`/users/${userId}/food`, {
    method: 'POST',
    body,
  });
};

export const deleteUserFood = (userId: string, foodId: string) => {
  return fetcher(`/users/${userId}/food/${foodId}`, { method: 'DELETE' });
};

interface UpdateUserFood {
  userId: string;
  foodId: string;
  body: Partial<CreateFoodBody>;
}

export const updateUserFood = ({ userId, foodId, body }: UpdateUserFood) => {
  return fetcher(`/users/${userId}/food/${foodId}`, {
    method: 'PATCH',
    body,
  });
};

interface GetUserFood {
  userId: string;
  from: string;
  to: string;
}

export const getUserFood = ({ userId, from, to }: GetUserFood) => {
  return fetcher(`/users/${userId}/food?from=${from}&to=${to}`);
};
