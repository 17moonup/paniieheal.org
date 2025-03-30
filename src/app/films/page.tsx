import styles from '../ui/film.module.css';

export default function Home(){
  return (

<div className={styles.scrollContainer}>
  <div className={styles.scrollItem}>第一页</div>
  <div className={styles.scrollItem}>第二页</div>
  <div className={styles.scrollItem}>第三页</div>
</div>
  )}