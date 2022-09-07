import styles from './CurrentDate.module.scss';
import { useRef } from 'react';
import { useDate } from '../../../contexts/DateContext';
import { formatDate, getInputDateFormat } from '../../../utils/helpers';
import { Button } from '../../shared/button/Button';
import { Input } from '../../shared/inputs/Input';
import { addDays, startOfToday, startOfDay } from 'date-fns';
import { PageButton } from '../../shared/pageButton/PageButton';

export const CurrentDate = () => {
  const dateRef = useRef<HTMLInputElement>(null);
  const { date, setDate } = useDate();

  const handlePrevDay = () => {
    setDate(addDays(date, -1));
  };

  const handleNextDay = () => {
    setDate(addDays(date, 1));
  };

  const handleLastDay = () => {
    setDate(startOfToday());
  };

  const handleShowDate = () => {
    const newDate = dateRef.current?.value as string;

    if (newDate) {
      setDate(startOfDay(new Date(newDate)));
    }
  };

  return (
    <div className={styles.container}>
      <PageButton page="previous" onClick={handlePrevDay} />
      <p className={styles.date}>{formatDate(date)}</p>
      {startOfDay(date) < startOfToday() && (
        <>
          <PageButton page="next" onClick={handleNextDay} />
          <PageButton page="last" onClick={handleLastDay} />
        </>
      )}
      <div className={styles.subcontainer}>
        <Input
          label="choose from input"
          type="date"
          id={'date-input'}
          max={getInputDateFormat()}
          defaultValue={getInputDateFormat()}
          ref={dateRef}
          placeholder="dd-mm-yyyy"
        />
        <Button variant="contained" onClick={handleShowDate} size="small">
          show
        </Button>
      </div>
    </div>
  );
};
