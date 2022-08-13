import styles from './Error.module.scss';

interface Props {
  message: string;
  id?: string;
}

export const Error = ({ message, id }: Props) => {
  return (
    <p id={id} role="alert" className={styles.error}>
      {message}
    </p>
  );
};
