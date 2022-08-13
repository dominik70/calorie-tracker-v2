import { ButtonHTMLAttributes } from 'react';
import { Button } from '../button/Button';
import { Icon } from '../icon/Icon';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  page: 'previous' | 'first' | 'next' | 'last';
  onClick: React.MouseEventHandler;
}

export const ARROWS = {
  previous: 'left-arrow',
  first: 'double-left-arrow',
  next: 'right-arrow',
  last: 'double-right-arrow',
};

export const PageButton = ({ page, ...buttonProps }: Props) => {
  return (
    <Button variant="contained" size="small" {...buttonProps}>
      <Icon
        name={ARROWS[page]}
        size={20}
        srText={`${page} page`}
        color="white"
      />
    </Button>
  );
};
