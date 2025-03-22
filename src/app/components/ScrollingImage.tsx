'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from "../ui/scroll.module.css";

interface ScrollingImageProps {
  imageDir: string;
  direction: 'ltr' | 'rtl';
  animationDuration?: number;
  imageWidth?: number;
  gap?: number;
}

interface CustomCSSProperties extends React.CSSProperties {
  '--gap'?: string;
  '--image-width'?: string;
  '--animation-play-state'?: string;
}

const ScrollingImage = ({
  imageDir,
  direction,
  animationDuration = 50,
  imageWidth = 220,
  gap = 16,
}: ScrollingImageProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const [loadedCount, setLoadedCount] = useState(0);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch(`${imageDir}/imageList.json`);
        if (!response.ok) {
          throw new Error('Failed to load image list');
        }
        const imagesList = await response.json() as string[];
        // 确保有足够多的图片来填充容器
        const duplicatedImages = [...imagesList, ...imagesList, ...imagesList]; 
        setImages(duplicatedImages);
      } catch (error) {
        console.error('Failed to load images:', error);
      }
    };

    loadImages();
  }, [imageDir]);
  
  // 使用 IntersectionObserver 检测元素是否在视口中
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 } // 只要有10%的元素可见就触发
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (images.length > 0 && loadedCount >= Math.min(images.length, 5)) {
  
      setImagesLoaded(true);
    }
  }, [loadedCount, images.length]);
  

  const handleImageLoaded = () => {
    setLoadedCount(prev => prev + 1);
  };

  const animationName = direction === 'ltr' ? 'scrollRight' : 'scrollLeft';
  const animationPlayState = isVisible && imagesLoaded ? 'running' : 'paused';

  return (
    <div className={styles.scrollingContainer}>
      <div
        ref={containerRef}
        className={styles.scrollingInner}
        style={{
          animationName,
          animationDuration: `${animationDuration}s`,
          '--gap': `${gap}px`,
          '--image-width': `${imageWidth}px`,
          '--animation-play-state': animationPlayState,
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
      {!imagesLoaded && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}
    </div>
  );
};

export default ScrollingImage;