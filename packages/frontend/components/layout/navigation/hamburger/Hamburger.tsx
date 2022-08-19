import clsx from 'clsx';
import styles from './Hamburger.module.scss';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export const Hamburger = ({ isOpen, onToggle }: Props) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={clsx(styles.hamburger, isOpen && styles.open)}
    >
      <span className={styles.bar} aria-hidden="true"></span>
      <span className="visually-hidden">open menu</span>
    </button>
  );
};
