import styles from './Auth.module.scss';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { loginSchema, Login } from '@calorie-tracker/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from '../shared/loader/Loader';
import { SectionTitle } from '../shared/sectionTitle/SectionTitle';
import { Input } from '../shared/inputs/Input';
import { Button } from '../shared/button/Button';
import { useUser } from '../../hooks/useUser';
import { Error } from '../shared/error/Error';
import { LinkButton } from '../shared/button/LinkButton';

export const SignIn = () => {
  const {
    user,
    signInMutation: { mutate: signIn, error, isLoading },
  } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: Login) => {
    signIn(data);
  };

  if (user) {
    router.replace((router.query.from as string) || '/');
  }

  return (
    <div className={styles.container}>
      <SectionTitle>Sign in</SectionTitle>
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
            <div className={styles.buttonContainer}>
              <Button type="submit" variant="contained" disabled={isLoading}>
                Sign in
              </Button>
            </div>
            {error && <Error message={error.message} />}
          </>
        ) : (
          <Loader />
        )}
      </form>
      <div className={styles.info}>
        <span>Need an account?</span>
        <LinkButton href="sign-up" variant="outlined" size="small">
          Sign up
        </LinkButton>
      </div>
    </div>
  );
};
