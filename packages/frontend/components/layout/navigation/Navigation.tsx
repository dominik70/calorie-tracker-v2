import styles from './Navigation.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { Logo } from './logo/Logo';
import { Hamburger } from './hamburger/Hamburger';
import { Button } from '../../shared/button/Button';
import { NavLinks } from './navLinks/NavLinks';
import { useUser } from '../../../hooks/useUser';
import { LinkButton } from '../../shared/button/LinkButton';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const innerRef = useClickOutside(() => setIsOpen(false));

  const toggleNavigation = () => {
    setIsOpen((prevState) => !prevState);
  };

  const {
    user,
    signOutMutation: { mutate: signOut },
  } = useUser();

  return (
    <div className={styles.container}>
      <nav className={styles.navigation} ref={innerRef}>
        <Logo />
        <Hamburger isOpen={isOpen} onToggle={toggleNavigation} />
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
              <LinkButton href="sign-in" variant="contained" size="small">
                Sign in
              </LinkButton>
              <LinkButton href="sign-up" variant="outlined" size="small">
                Sign up
              </LinkButton>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
