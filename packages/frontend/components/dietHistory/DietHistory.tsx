import { SectionTitle } from '../shared/sectionTitle/SectionTitle';
import { CurrentDate } from './currentDate/CurrentDate';
import { Meal } from './meal/Meal';
import { Loader } from '../shared/loader/Loader';
import { useUserFood } from '../../hooks/useUserFood';
import { Error } from '../shared/error/Error';
import { sumNutrients } from '../../utils/helpers';
import { MEALS } from '@calorie-tracker/common';
import { Nutrients } from '../shared/nutrients/Nutrients';

export const DietHistory = () => {
  const { food, isLoading } = useUserFood();

  if (isLoading) {
    return <Loader />;
  }

  if (!food) {
    return <Error message="Failed to fetch data" />;
  }

  return (
    <>
      <SectionTitle>Your diet history</SectionTitle>
      <CurrentDate />
      <h3>Total calories and nutrients intake today:</h3>
      <Nutrients nutrients={sumNutrients(food)} />
      {MEALS.map((meal) => food.filter((food) => food.meal === meal)).map(
        (foodList, i) => (
          <Meal key={MEALS[i]} meal={MEALS[i]} foodList={foodList} />
        )
      )}
    </>
  );
};
