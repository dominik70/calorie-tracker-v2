import styles from './Navigation.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { Logo } from './logo/Logo';
import { Hamburger } from './hamburger/Hamburger';
import { Button } from '../../shared/button/Button';
import { NavLinks } from './navLinks/NavLinks';
import { useUser } from '../../../hooks/useUser';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const innerRef = useClickOutside(() => setIsOpen(false));

  const {
    user,
    signOutMutation: { mutate: signOut },
  } = useUser();

  return (
    <div className={styles.container}>
      <nav className={styles.navigation} ref={innerRef}>
        <Logo />
        <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className={clsx(styles.menu, isOpen && styles.open)}>
          <NavLinks />
          {user ? (
            <div className={styles.subcontainer}>
              <p className={styles.loggedUser}>{user.email}</p>
              <Button
                type="button"
                variant="outlined"
                onClick={() => signOut()}
                size="small"
              >
                Sign out
              </Button>
            </div>
          ) : (
            <div className={styles.subcontainer}>
              <Link href="sign-in">
                <a>
                  <Button type="button" variant="contained" size="small">
                    Sign in
                  </Button>
                </a>
              </Link>
              <Link href="sign-up">
                <a>
                  <Button type="button" variant="outlined" size="small">
                    Sign up
                  </Button>
                </a>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
