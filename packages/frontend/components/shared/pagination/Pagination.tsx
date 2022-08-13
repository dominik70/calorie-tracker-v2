import styles from './Pagination.module.scss';
import { PageButton } from '../pageButton/PageButton';

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export const Pagination = ({ page, setPage, totalPages }: Props) => {
  const handlePrevPage = () => {
    setPage((prevState) => prevState - 1);
  };

  const handleNextPage = () => {
    setPage((prevState) => prevState + 1);
  };

  const handleFirstPage = () => {
    setPage(1);
  };

  const handleLastPage = () => {
    setPage(totalPages);
  };

  return (
    <div className={styles.container}>
      <PageButton
        page="first"
        onClick={handleFirstPage}
        disabled={page === 1}
      />
      <PageButton
        page="previous"
        onClick={handlePrevPage}
        disabled={page === 1}
      />
      <span className={styles.pageNumber}>
        {page} / {totalPages}
      </span>
      <PageButton
        page="next"
        onClick={handleNextPage}
        disabled={page === totalPages}
      />
      <PageButton
        page="last"
        onClick={handleLastPage}
        disabled={page === totalPages}
      />
    </div>
  );
};
