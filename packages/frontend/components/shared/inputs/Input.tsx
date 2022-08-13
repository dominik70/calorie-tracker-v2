import styles from './Input.module.scss';
import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';
import { Error } from '../error/Error';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  inputSize?: 'small' | 'large';
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, label, error, inputSize = 'small', ...props }: Props, ref) => {
    return (
      <label className={clsx(styles.label, styles[inputSize])} htmlFor={id}>
        {label}:
        <input
          id={id}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={`${id}-error`}
          className={clsx(styles.input, styles[inputSize])}
          {...props}
        />
        {error && error.length > 0 && (
          <Error id={`${id}-error`} message={error} />
        )}
      </label>
    );
  }
);

Input.displayName = 'Input';
