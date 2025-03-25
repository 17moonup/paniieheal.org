import Navgation from "@/app/components/Navgation"; 
import ScrollingImage from "@/app/components/ScrollingImage";
import styles from '../ui/music.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Music',
};

export default function Home() {
    return (
        <div className={styles.page}>
            <div>
                <Navgation />
            </div>
            <main className={styles.main}>
                <div className={styles.scroll}>
                    <ScrollingImage imageDir="/img/music/scroll2/" direction="rtl" animationDuration={300} />
                    <ScrollingImage imageDir="/img/music/scroll1" direction="ltr" animationDuration={320} />
                    <ScrollingImage imageDir="/img/music/covers/" direction="rtl" animationDuration={300} />
                </div>
                <div className={styles.section}>
                    <figure className={styles.logo}>
                    </figure>
                    <div className={styles.fadeIn}>
                    </div>
                </div>
            </main>
        </div> 
    
    )
}