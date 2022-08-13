import styles from './SearchResults.module.scss';
import { Food } from '../../../types';
import { SearchCard } from '../../shared/cards/SearchCard';
import { ReactNode } from 'react';

type Props = {
  data: { food: Food[]; totalPages: number } | undefined;
  pagination: ReactNode;
};

export const SearchResults = ({ data, pagination }: Props) => {
  if (!data || data.food.length === 0) {
    return <p>No food found</p>;
  }

  return (
    <>
      {pagination}
      <ul className={styles.cardList}>
        {data.food.map((food) => (
          <SearchCard food={food} key={food.id} />
        ))}
      </ul>
      {pagination}
    </>
  );
};
