import styles from './NavLinks.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { NAV_PATHS } from '../../../../utils/constants';
import { useRouter } from 'next/router';

export const NavLinks = () => {
  const { pathname } = useRouter();

  return (
    <ul className={styles.list}>
      {NAV_PATHS.map(({ path, name }) => (
        <li className={styles.listItem} key={name}>
          <Link href={path}>
            <a
              className={clsx(styles.link, path === pathname && styles.active)}
            >
              {name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
