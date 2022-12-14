import styles from './Button.module.scss';
import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import { Size, Variant } from './types';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: Variant;
  size?: Size;
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
