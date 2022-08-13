import styles from './Button.module.scss';
import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: 'contained' | 'outlined';
  size?: 'small' | 'large';
}

export const Button = ({
  children,
  size = 'large',
  variant = 'contained',
  ...restProps
}: Props) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], styles[size])}
      {...restProps}
    >
      {children}
    </button>
  );
};
