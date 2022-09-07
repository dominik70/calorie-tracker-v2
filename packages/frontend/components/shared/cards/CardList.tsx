import styles from './Cards.module.scss';

type Props = { children: React.ReactNode };

export const CardList = ({ children }: Props) => {
  return <ul className={styles.cardList}>{children}</ul>;
};
