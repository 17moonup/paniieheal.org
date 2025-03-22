'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../ui/nav.module.css';
import Image  from 'next/image';
import { notFound } from 'next/navigation';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Posts', href: '/posts' },
  { name: 'Books', href: '/books' },
  { name: 'Films', href: '/films' },
  { name: 'Musics', href: '/music' },
  { name: 'P_Portfolio', href: '/portfolio' },
];

export default function Navgation() {
  const pathname = usePathname();
  return (
    <div className={styles.nav}>
      <div className={styles.title}>
        <Image
        src="/icon.png" 
        alt="logo"
        height={20}
        width={20} 
        className={styles.logo}
        />
        <a href="#"
          className={styles.b}>
          Paniieheal {pathname} </a>
      </div>
      <div className={styles.links}>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
          <Link
            key={link.name}
            href={link.href}
            className={`${styles.link} ${isActive ? styles.active : ''}`}
          >
            {link.name}
          </Link>
          );
        })}
      </div>
    </div>
  );
}