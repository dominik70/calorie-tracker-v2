import { INITIAL_NUTRIENTS } from './constants';
import { format, startOfToday } from 'date-fns';
import { FieldErrorsImpl } from 'react-hook-form';
import { UserFood } from '../types';

export const getInputDateFormat = (date?: Date) => {
  return format(date ? date : startOfToday(), 'yyyy-MM-dd');
};

export const round = (number: number, precision = 2) => {
  return Number(
    Math.round(Number(number + 'e+' + precision)) + 'e-' + precision
  );
};

export const sumNutrients = (foodList: UserFood[]) => {
  return foodList.reduce((acc, cur) => {
    return cur.food.nutrients.map((nutrient) => {
      const found = acc.find(
        ({ nutrient: { symbol } }) => symbol === nutrient.nutrient.symbol
      );

      return {
        ...nutrient,
        amount: round(
          (nutrient.amount * cur.quantity) / 100 + (found?.amount || 0),
          1
        ),
      };
    });
  }, INITIAL_NUTRIENTS);
};

export const formatDate = (date: Date) => {
  return format(date, 'dd-MM-yyyy');
};

export const formatErrors = (errors: FieldErrorsImpl) => {
  return Object.entries(errors)
    .map(([key, value]) => `${key}: ${value?.message}`)
    .join(', ');
};
