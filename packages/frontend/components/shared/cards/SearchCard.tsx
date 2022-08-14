import styles from './Cards.module.scss';
import { createFoodBody, CreateFoodBody, MEALS } from '@calorie-tracker/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '../inputs/Input';
import { Select } from '../inputs/select/Select';
import { DEFAULT_QUANTITY } from '../../../utils/constants';
import { Button } from '../button/Button';
import { Loader } from '../loader/Loader';
import { formatErrors, getInputDateFormat } from '../../../utils/helpers';
import { Error } from '../error/Error';
import { useUserFood } from '../../../hooks/useUserFood';
import { Nutrients } from '../nutrients/Nutrients';
import { Food } from '../../../types';

interface Props {
  food: Food;
}

export const SearchCard = ({ food }: Props) => {
  const {
    addFoodMutation: { mutate: addFood, isLoading },
  } = useUserFood();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFoodBody>({
    resolver: zodResolver(createFoodBody),
    defaultValues: {
      foodId: food.id,
      quantity: DEFAULT_QUANTITY,
      date: getInputDateFormat(),
    },
  });

  const onSubmit = (data: CreateFoodBody) => {
    addFood(data);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.name}>{food.name}</h3>
      <p>Category: {food.category.name}</p>
      <Nutrients nutrients={food.nutrients} />
      <span>per 100g</span>
      <div className={styles.actions}>
        <Input
          label="quantity (g)"
          type="number"
          id={`${food.id}-quantity`}
          {...register('quantity')}
        />
        <Select label="meal" id={`${food.id}-meal`} {...register('meal')}>
          {MEALS.map((meal) => (
            <option value={meal} key={meal}>
              {meal}
            </option>
          ))}
        </Select>
        <Input
          label="date"
          type="date"
          id={`${food.id}-date`}
          {...register('date')}
          max={getInputDateFormat()}
        />
        <Button
          type="button"
          variant="contained"
          size="small"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {!isLoading ? 'Add' : <Loader size={20} />}
        </Button>
        {Object.entries(errors).length > 0 && (
          <Error message={formatErrors(errors)} />
        )}
      </div>
    </div>
  );
};
