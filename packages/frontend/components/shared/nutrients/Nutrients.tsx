import styles from './Nutrients.module.scss';
import { Nutrient } from '../../types';

interface Props {
  nutrients: Nutrient[];
}

export const Nutrients = ({ nutrients }: Props) => {
  return (
    <div className={styles.container}>
      {nutrients.map(({ amount, nutrient: { symbol, unit } }) => (
        <p className={styles.nutrient} key={symbol}>
          <span className={styles.name}>{symbol}:</span>
          <span className={styles.amount}>
            {amount}
            {unit.name.toLowerCase()}
          </span>
        </p>
      ))}
    </div>
  );
};
