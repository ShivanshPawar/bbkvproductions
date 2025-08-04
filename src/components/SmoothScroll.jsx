// src/components/SmoothScroll.jsx
import { useEffect } from 'react'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Check if we're on a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // Only use Lenis on desktop devices
    if (!isMobile) {
      import('@studio-freight/lenis').then(({ default: Lenis }) => {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          direction: 'vertical',
          gestureDirection: 'vertical',
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
          wheelMultiplier: 1,
          lerp: 0.1,
        })

        function raf(time) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Handle resize events
        const handleResize = () => {
          const newIsMobile = window.innerWidth <= 768;
          if (newIsMobile) {
            lenis.destroy();
          }
        };

        window.addEventListener('resize', handleResize);

        return () => {
          lenis.destroy()
          window.removeEventListener('resize', handleResize);
        }
      }).catch(err => {
        console.warn('Lenis not available, using native scrolling');
      });
    }
  }, [])

  return children
}
