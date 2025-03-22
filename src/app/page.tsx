import styles from './ui/home.module.css';
import BookCard from './components/BookCard';
import MusicCard from './components/MusicCard';
import FilmCard from './components/FilmCard';
import PhotoCard from './components/PhotoCard';
import LectureCard from './components/LectureCard';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="#">
        Paniieheal Truth Store
        </a>
      </header>

      <main className={styles.main}>
        <div className={styles.cards}>
            <MusicCard delay={7000} />
            <BookCard delay={27000} />
            <FilmCard delay={15000} />
            <PhotoCard delay={10000} />
            <LectureCard src={"/bg.jpg"} />
        </div>
        <div className={styles.projects}>
          <div className={styles.item}>
            <Image 
              src="/img/projects/bot-high-resolution-logo.png"
              alt="QuickStartBot - Project"
              width={115}
              height={115}
              style={{ objectFit: 'cover', borderRadius: '16px', animationDelay: 'calc(30s / 8 * (8 - 1) * -1)' }}
            />
            <a
              href="https://github.com/17moonup/Misc.git"
              style={{ color: 'gray' }}
             >Bot</a>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>  &copy; 2023-2025 Paniieheal. All rights reserved.  </span>
         &nbsp;
        <a href="about.tsx">About</a>
        &nbsp;  |  &nbsp;  
        <a href="https://creativecommons.org/licenses/by-sa/4.0/legalcode">CC BY-SA</a>
        &nbsp;  |  &nbsp;  
        <a href="t">Site Analytics</a>
        &nbsp;  |  &nbsp;  
        <a href="c">RSS</a>
    
      </footer>
    </div>
  );
}
