import { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';
import styles from './Hamburger.module.scss';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Hamburger = ({ isOpen, setIsOpen }: Props) => {
  const handleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <button
      type="button"
      onClick={handleOpen}
      className={clsx(styles.hamburger, isOpen && styles.open)}
    >
      <span className={styles.bar} aria-hidden="true"></span>
      <span className="visually-hidden">open menu</span>
    </button>
  );
};
