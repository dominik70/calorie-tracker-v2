import { MEALS } from '@calorie-tracker/common';

export interface ErrorType {
  message: string;
}

export interface Nutrient {
  amount: number;
  nutrient: {
    name: string;
    symbol: string;
    unit: { name: string };
  };
}

export interface User {
  id: string;
  email: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Food {
  id: number;
  name: string;
  category: {
    name: string;
  };
  nutrients: {
    amount: number;
    nutrient: {
      symbol: string;
      name: string;
      unit: {
        name: string;
      };
    };
  }[];
}

export interface UserFood {
  id: string;
  quantity: number;
  meal: Meal;
  food: Food;
}

export type Meal = typeof MEALS[number];
