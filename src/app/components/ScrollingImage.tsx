'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from "../ui/scroll.module.css"

interface ScrollingImageProps {
  imageDir: string;
  direction: 'ltr' | 'rtl'; // 'ltr' for left-to-right, 'rtl' for right-to-left
  animationDuration?: number; // Optional: duration of animation in seconds
  imageWidth?: number; //Optional: Width of the image
  gap?: number; //Optional: gap between images
}

const ScrollingImage = ({
  imageDir,
  direction,
  animationDuration = 50, // Default animation duration
  imageWidth = 220, //Default image width
  gap = 16, //Default gap size
}: ScrollingImageProps) => {
  const [images, setImages] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch(`${imageDir}/imageList.json`);
        if (!response.ok) {
          throw new Error('Failed to load image list');
        }
        const imagesList = await response.json() as string[];
        const duplicatedImages = [...imagesList, ...imagesList]; // Duplicate for seamless looping
        setImages(duplicatedImages);
      } catch (error) {
        console.error('Failed to load images:', error);
      }
    };

    loadImages();
  }, [imageDir]);

  // Animation direction styles
  const animationName = direction === 'ltr' ? 'scrollRight' : 'scrollLeft'; // Determine animation name

  return (
    <div
      className={styles.scrollingContainer}
    >
      <div
        ref={containerRef}
        className={styles.scrollingInner}
        style={{
          animationName: animationName,
          animationDuration: `${animationDuration}s`,
          '--gap': `${gap}px`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.imageContainer}
          >
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              width={imageWidth}
              height={imageWidth}
              className={styles.img}
              priority={index === 1}
            //  placeholder= 'blur'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingImage;