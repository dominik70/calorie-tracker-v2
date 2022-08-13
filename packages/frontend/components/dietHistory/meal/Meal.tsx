import styles from './Meal.module.scss';
import Link from 'next/link';
import { MealCard } from '../../shared/cards/MealCard';
import { Nutrients } from '../../shared/nutrients/Nutrients';
import { UserFood } from '../../../types';
import { sumNutrients } from '../../../utils/helpers';

interface Props {
  meal: string;
  foodList: UserFood[];
}

export const Meal = ({ meal, foodList }: Props) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{meal}</h2>
      {foodList.length === 0 ? (
        <p>
          You haven&apos;t added any food yet.{' '}
          <Link href="/search">
            <a>Search</a>
          </Link>{' '}
          and add it.
        </p>
      ) : (
        <>
          <Nutrients nutrients={sumNutrients(foodList)} />
          <ul className={styles.cardList}>
            {foodList.map((food) => (
              <MealCard key={food.id} userFood={food} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
