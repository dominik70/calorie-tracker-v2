import styles from './Logo.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
  return (
    <Link href="/">
      <a className={styles.link}>
        <Image
          width={60}
          height={60}
          src="/img/logo192.png"
          alt="carrot illustration"
        />
        <span className={styles.appName}>my calorie</span>
      </a>
    </Link>
  );
};
