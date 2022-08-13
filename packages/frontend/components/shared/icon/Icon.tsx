interface Props {
  name: string;
  size: number;
  color?: string;
  srText?: string;
}

export const Icon = ({ name, size, color, srText }: Props) => {
  return (
    <>
      <svg
        aria-hidden="true"
        width={size}
        height={size}
        color={color}
        fill={color}
      >
        <use href={`/img/icons.svg#${name}`}></use>
      </svg>
      <span className="visually-hidden">{srText}</span>
    </>
  );
};
