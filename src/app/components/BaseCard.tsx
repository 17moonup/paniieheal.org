'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../ui/home.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface BaseCardProps {
  imageDir: string;
  title: string;
  delay: number;
}

const BaseCard = ({ imageDir, title, delay }: BaseCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

// Fetch Cover by .json
  useEffect(() => {
    const loadImages = async () => {
      try {
        // Load imageList.json 文件
        const response = await fetch(`${imageDir}/imageList.json`);
        const imagesList = await response.json();
        setImages(imagesList);  //Update State
      } catch (error) {
        console.error('Failed to load images:', error);
      }
    };
    loadImages();
  }, [imageDir]); // 依赖 imageDir


// Change Cover
  useEffect(() => {
    if (images.length === 0) return;
  
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          setIsTransitioning(false);
      }, 500);
    }, delay);
  
    return () => clearInterval(interval);
}, [images.length, delay]);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
       
       <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >

        {images.length > 0 ? (
          <Image
            src={images[currentImageIndex]}
            alt={`${title} cover`}
            className={ `${isTransitioning ? styles.transition : ''}`}
            fill
            onError={(e) => {
              console.error('MotherFuckerFailed to load images:', e.currentTarget.src);
          }}
         />
        ) : (
          <p> Loading.. </p>
        )
        }
      
        </motion.div>
      </AnimatePresence>
    </div>
      <div className={styles.details}>
        <Link
          href={'../'+title}
        > 
        {title}
        </Link>
      </div>
  </div>
  );
};

export default BaseCard;

