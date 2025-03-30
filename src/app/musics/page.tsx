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
            <Navgation />
        <main className={styles.main}>
            <section className={styles.section}>
                <div className={styles.scroll}>
        <ScrollingImage imageDir="/img/music/scroll2/" direction="rtl" animationDuration={300} />
        <ScrollingImage imageDir="/img/music/scroll1" direction="ltr" animationDuration={320} />
        <ScrollingImage imageDir="/img/music/covers/" direction="rtl" animationDuration={300} />
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.content}>
                    <h1>The love of music.</h1>
                    <h1>The music of love.</h1>
                    <h1><i>&#9839;</i> The Life with Music & Love <i>&#9839;</i></h1>
                </div>
            </section>
        </main>
        <div className={styles.bottom}></div>
    </div>
);
}