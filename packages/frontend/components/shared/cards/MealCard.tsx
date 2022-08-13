import styles from './Cards.module.scss';
import { Input } from '../inputs/Input';
import { Button } from '../button/Button';
import { Loader } from '../loader/Loader';
import { CreateFoodBody, updateFoodBody, MEALS } from '@calorie-tracker/common';
import { formatErrors, round } from '../../../utils/helpers';
import { useUserFood } from '../../../hooks/useUserFood';
import { Select } from '../inputs/select/Select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Error } from '../error/Error';
import { Nutrients } from '../nutrients/Nutrients';
import { UserFood } from '../../../types';

interface Props {
  userFood: UserFood;
}

export const MealCard = ({ userFood: { id, meal, quantity, food } }: Props) => {
  const {
    updateFoodMutation: { mutate: updateFood, isLoading: isUpdating },
    deleteFoodMutation: { mutate: deleteFood, isLoading: isDeleting },
  } = useUserFood();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<CreateFoodBody>>({
    resolver: zodResolver(updateFoodBody),
    defaultValues: { quantity, meal },
  });

  const handleUpdate = (data: Partial<CreateFoodBody>) => {
    if (data.quantity !== quantity || data.meal !== meal) {
      updateFood({
        foodId: id,
        body: data,
      });
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.name}>{food.name}</h3>
      <p>Category: {food.category.name}</p>
      <Nutrients
        nutrients={food.nutrients.map((nutrient) => ({
          ...nutrient,
          amount: round((nutrient.amount * quantity) / 100, 1),
        }))}
      />
      <div className={styles.actions}>
        <Input
          label="quantity (g)"
          type="number"
          id={id}
          defaultValue={quantity}
          {...register('quantity')}
        />
        <Select label="meal" id={`${food.id}-meal`} {...register('meal')}>
          {MEALS.map((meal) => (
            <option value={meal} key={meal}>
              {meal}
            </option>
          ))}
        </Select>
        <Button
          type="button"
          variant="contained"
          size="small"
          onClick={handleSubmit(handleUpdate)}
          disabled={isUpdating}
        >
          {!isUpdating ? 'Update' : <Loader size={25} />}
        </Button>
        <Button
          type="button"
          variant="outlined"
          size="small"
          onClick={() => deleteFood(id)}
          disabled={isDeleting}
        >
          {!isDeleting ? 'Delete' : <Loader size={25} />}
        </Button>
        {Object.entries(errors).length > 0 && (
          <Error message={formatErrors(errors)} />
        )}
      </div>
    </div>
  );
};
