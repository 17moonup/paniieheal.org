'use client'
import React, { useState, useEffect, useRef } from 'react';

interface FadeInOnScrollProps {
  children: React.ReactNode;
  threshold?: number; // 触发淡入的滚动比例阈值 (0-1)
}

const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({ children, threshold = 0.2 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use the threshold to determine when to set isVisible to true.
            if (entry.intersectionRatio >= threshold) {
              setIsVisible(true);
              observer.unobserve(entry.target); // Stop observing after it's visible
            }
          }
        });
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: [threshold], // Observe at the specified threshold
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={elementRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      {children}
    </div>
  );
};

export default FadeInOnScroll;