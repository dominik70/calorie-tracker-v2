import { GetStaticProps } from 'next';
import { Search } from '../components/search/Search';
import { Category } from '../types';
import { API_BASE_URL } from '../utils/constants';
import { fetcher } from '../utils/fetcher';

interface Props {
  categories: Category[];
}

const SearchPage = ({ categories }: Props) => {
  return <Search categories={categories} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const categories = await fetcher('/food/categories', {}, API_BASE_URL);

  return { props: { categories } };
};

export default SearchPage;
