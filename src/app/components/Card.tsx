import Image from 'next/image';
import styles from '../ui/home.module.css';
import Link from 'next/link';
interface CardProps {
  title: string;
  src: string;
}

const Card = ({ title, src }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={src}
          alt={`${title} cover`}
          className={`${styles.image}`}
          width={250}
          height={250}
          style={{ objectFit: 'cover', borderRadius: '16px'}}
        />
      </div>
      <div className={styles.details}>
          <Link
            href={'../'+ title}>
              {title}
          </Link>
        </div>
    </div>
  );
};

export default Card;
