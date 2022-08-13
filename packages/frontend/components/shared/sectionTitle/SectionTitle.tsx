import styles from './SectionTitle.module.scss';

type Props = {
  children: React.ReactNode;
};

export const SectionTitle = ({ children }: Props) => {
  return <h1 className={styles.title}>{children}</h1>;
};
