import { Food } from '../../../types';
import { SearchCard } from '../../shared/cards/SearchCard';
import { ReactNode } from 'react';
import { CardList } from '../../shared/cards/CardList';

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
      <CardList>
        {data.food.map((food) => (
          <SearchCard food={food} key={food.id} />
        ))}
      </CardList>
      {pagination}
    </>
  );
};
