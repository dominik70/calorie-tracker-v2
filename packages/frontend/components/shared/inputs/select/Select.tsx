import styles from './Select.module.scss';
import { forwardRef, SelectHTMLAttributes } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ id, label, children, ...props }: Props, ref) => {
    return (
      <label className={styles.label} htmlFor={id}>
        {label}:
        <select className={styles.select} id={id} {...props} ref={ref}>
          {children}
        </select>
      </label>
    );
  }
);

Select.displayName = 'Select';
