import { Icon } from '../../shared/icon/Icon';
import styles from './SearchInput.module.scss';

interface Props {
  query: string;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  refetch: () => void;
}

export const SearchInput = ({ query, handleQueryChange, refetch }: Props) => {
  return (
    <>
      <div className={styles.inputContainer}>
        <input
          className={styles.SearchInput}
          aria-labelledby="search"
          type="search"
          placeholder="e.g. cheese"
          onChange={handleQueryChange}
          value={query}
        />
        <button type="button" onClick={refetch} className={styles.searchButton}>
          <Icon name="search" size={30} srText="search food" color="gray" />
        </button>
      </div>
    </>
  );
};
