import { ReactNode } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';

import styles from '../styles/components/Navbar.module.css';

import HomeIcon from '../../public/icons/home.svg';
import AwardIcon from '../../public/icons/award.svg';
import LogoIcon from '../../public/logo.svg';

export interface NavbarProps {
    children: ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  const router = useRouter();

  return (
    <>
    <div className={styles.navbarContainer}>
      <div className={styles.logo}>
        <LogoIcon />
      </div>

      <div className={styles.container}>
        <Link href="/">
          <button className={`${router.pathname === '/' ? styles.active : ''}`}>
            <HomeIcon />
          </button>
        </Link>
        <Link href="/ranking">
          <button className={`${router.pathname === '/ranking' ? styles.active : ''}`}>
            <AwardIcon />
          </button>
        </Link>
      </div>
    </div>
    
    <div className={styles.content}>
      {children}
    </div>
    </>
  )
}