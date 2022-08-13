import styles from './Search.module.scss';
import { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { DEBOUNCE_TIMEOUT } from '../../utils/constants';
import { SearchInput } from './searchInput/SearchInput';
import { SectionTitle } from '../shared/sectionTitle/SectionTitle';
import { Pagination } from '../shared/pagination/Pagination';
import { SearchResults } from './searchResults/SearchResults';
import { useSearchFood } from '../../hooks/useSearchFood';
import { Category } from '../../types';
import { Select } from '../shared/inputs/select/Select';
import { Loader } from '../shared/loader/Loader';
import { Error } from '../shared/error/Error';

interface Props {
  categories: Category[];
}

export const Search = ({ categories }: Props) => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const debouncedQuery = useDebounce(query, DEBOUNCE_TIMEOUT);
  const enabled = debouncedQuery.length >= 1 || page > 1;
  const { data, isLoading, error, refetch } = useSearchFood(
    { query: debouncedQuery, page, category },
    enabled
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1);
  };

  return (
    <>
      <SectionTitle>Search food</SectionTitle>
      <div className={styles.search}>
        <SearchInput
          query={query}
          handleQueryChange={handleQueryChange}
          refetch={refetch}
          enabled={enabled}
        />
        <Select label="category" id="category" onChange={handleCategoryChange}>
          {[{ name: 'All', id: 0 }, ...categories].map(({ name, id }) => (
            <option value={id} key={id}>
              {name}
            </option>
          ))}
        </Select>
      </div>
      {isLoading && enabled && <Loader />}
      {error && <Error message={error.message} />}
      {data && (
        <SearchResults
          data={data}
          pagination={
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={data.totalPages}
            />
          }
        />
      )}
    </>
  );
};
