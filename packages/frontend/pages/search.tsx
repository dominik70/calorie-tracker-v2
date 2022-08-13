import { GetServerSideProps } from 'next';
import { Search } from '../components/search/Search';
import { Category } from '../types';
import { fetcher } from '../utils/fetcher';

interface Props {
  categories: Category[];
}

const SearchPage = ({ categories }: Props) => {
  return <Search categories={categories} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await fetcher('/food/categories');

  return { props: { categories } };
};

export default SearchPage;
