import styles from './Auth.module.scss';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { registerSchema, Register } from '@calorie-tracker/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from '../shared/loader/Loader';
import { SectionTitle } from '../shared/sectionTitle/SectionTitle';
import { Input } from '../shared/inputs/Input';
import { Button } from '../shared/button/Button';
import { useUser } from '../../hooks/useUser';
import { Error } from '../shared/error/Error';
import { LinkButton } from '../shared/button/LinkButton';

export const SignUp = () => {
  const {
    user,
    signUpMutation: { mutate: signUp, error, isLoading },
  } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: Register) => {
    signUp(data);
  };

  if (user) {
    router.replace('/');
  }

  return (
    <div className={styles.container}>
      <SectionTitle>Sign up</SectionTitle>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {!isLoading ? (
          <>
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="Your email..."
              autoComplete="email"
              inputSize="large"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="Your password..."
              autoComplete="current-password"
              inputSize="large"
              error={errors.password?.message}
              {...register('password')}
            />
            <Input
              label="Confirm password"
              id="confirm-password"
              type="password"
              placeholder="Confirm password..."
              autoComplete="new-password"
              inputSize="large"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
            <div className={styles.buttonContainer}>
              <Button type="submit" variant="contained" disabled={isLoading}>
                Sign up
              </Button>
            </div>
            {error && <Error message={error.message} />}
          </>
        ) : (
          <Loader />
        )}
      </form>
      <div className={styles.info}>
        <span>Have an account?</span>
        <LinkButton href="sign-in" variant="outlined" size="small">
          Sign in
        </LinkButton>
      </div>
    </div>
  );
};
