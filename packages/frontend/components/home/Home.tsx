import styles from './Home.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../shared/button/Button';
import { useUser } from '../../hooks/useUser';

export const Home = () => {
  const { user } = useUser();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.img}>
          <Image
            src={'/img/illustration.png'}
            alt="two bowls with vegetables and green drink with ice cubes"
            layout="responsive"
            width="100%"
            height="100%"
            priority={true}
          />
        </div>
        <div>
          <h1 className={styles.heading}>
            Be fit with <span className={styles.hl}>my calorie</span>
          </h1>
          <p className={styles.description}>
            <span className={styles.hl}>My calorie</span> is a calorie tracker
            app that allows you to control your calories and nutrients intake
            and help to follow your diet.
          </p>
        </div>
      </div>
      <div className={styles.actions}>
        {!user && (
          <>
            <div className={styles.buttonContainer}>
              <Link href="sign-in">
                <a>
                  <Button variant="contained">Sign in</Button>
                </a>
              </Link>
              <Link href="sign-up">
                <a>
                  <Button variant="outlined">Sign up</Button>
                </a>
              </Link>
            </div>
            <p>or</p>
          </>
        )}
        <Link href="search">
          <a>
            <Button variant="contained">Search food</Button>
          </a>
        </Link>
      </div>
    </>
  );
};
