import styles from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return <main className={styles.layout}>{children}</main>;
};
