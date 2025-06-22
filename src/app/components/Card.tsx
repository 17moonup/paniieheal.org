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
          fill
        />
        <h3>
            <Link
              href={'../'+ title}>
                {title}
            </Link>
        </h3>
      </div>
    </div>
  );
};

export default Card;
