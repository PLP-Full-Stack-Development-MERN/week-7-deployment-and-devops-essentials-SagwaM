import { useState, useEffect } from 'react';

// Animation entries for staggered animations
export function useStaggeredAnimation(itemCount, delay = 50) {
  return Array.from({ length: itemCount }).map((_, i) => ({
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        delay: i * delay * 0.001
      }
    }
  }));
}

// Custom hook for intersection animations
export function useIntersectionAnimation(threshold = 0.1) {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.disconnect();
    };
  }, [ref, threshold]);

  return [setRef, isVisible];
}

// Scroll-based animation
export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

// Animation presets
export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
  }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
  }
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
  }
};
