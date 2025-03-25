'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from "../ui/scroll.module.css";

interface ScrollingImageProps {
  imageDir: string;
  direction: 'ltr' | 'rtl'; // 'ltr' for left-to-right, 'rtl' for right-to-left
  animationDuration?: number; // Optional: duration of animation in seconds
  imageWidth?: number; // Optional: Width of the image
  gap?: number; // Optional: gap between images
}

interface CustomCSSProperties extends React.CSSProperties {
  '--gap'?: string;
  '--image-width'?: string;
}

const ScrollingImage = ({
  imageDir,
  direction,
  animationDuration, // Default animation duration
  imageWidth = 220, // Default image width
  gap = 16, // Default gap size
}: ScrollingImageProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);

  // 加载图片列表
  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch(`${imageDir}/imageList.json`);
        if (!response.ok) {
          throw new Error('Failed to load image list');
        }
        const imagesList = await response.json() as string[];
        // 确保有足够多的图片来填充容器，三倍数量更有助于无缝循环
        const duplicatedImages = [...imagesList, ...imagesList, ...imagesList]; 
        setImages(duplicatedImages);
      } catch (error) {
        console.error('Failed to load images:', error);
      }
    };

    loadImages();
  }, [imageDir]);
  
  // 当足够多的图片加载完成时触发动画
  useEffect(() => {
    if (images.length > 0 && loadedCount >= Math.min(images.length, 5)) {
      // 至少加载5张图片或全部图片后允许动画
      setImagesLoaded(true);
    }
  }, [loadedCount, images.length]);
  
  // 处理图片加载完成事件
  const handleImageLoaded = () => {
    setLoadedCount(prev => prev + 1);
  };

  // 动画名称
  const animationName = direction === 'ltr' ? 'scrollRight' : 'scrollLeft';

  return (
    <div className={styles.scrollingContainer}>
      <div
        ref={containerRef}
        className={`${styles.scrollingInner} ${imagesLoaded ? styles.animationActive : ''}`}
        style={{
          animationName: animationName,
          animationDuration: `${animationDuration}s`,
          '--gap': `${gap}px`,
          '--image-width': `${imageWidth}px`,
        } as CustomCSSProperties}
      >
        {images.map((image, index) => (
          <div 
            key={`${image}-${index}`} 
            className={styles.imageContainer}
          >
            <Image
              src={image}
              alt={`Scrolling image ${index + 1}`}
              width={imageWidth}
              height={imageWidth}
              className={styles.img}
              priority={index < 5} // 前5张图片优先加载
              onLoad={handleImageLoaded}
              sizes={`${imageWidth}px`}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/1h8ZAAAAABJRU5ErkJggg=="
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingImage;