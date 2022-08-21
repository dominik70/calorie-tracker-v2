import styles from './Button.module.scss';
import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { Size, Variant } from './types';

interface Props extends LinkProps {
  children: React.ReactNode;
  variant: Variant;
  size?: Size;
}

export const LinkButton = ({
  children,
  href,
  size = 'large',
  variant = 'contained',
  ...restProps
}: Props) => {
  return (
    <Link href={href} {...restProps}>
      <a className={clsx(styles.button, styles[variant], styles[size])}>
        {children}
      </a>
    </Link>
  );
};
