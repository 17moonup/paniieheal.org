import styles from '../ui/film.module.css';
import { Metadata } from 'next';
import Navgation from '../components/Navgation';
export const metadata: Metadata = {
  title: 'Music',
  };
export default function Home(){
  return (
    <div>
  <Navgation />
<div className={styles.scrollContainer}>
  <div className={styles.scrollItem}>第一页</div>
  <div className={styles.scrollItem}>第二页</div>
  <div className={styles.scrollItem}>第三页</div>
</div>
</div>
  )}