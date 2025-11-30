import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { trackPageView } from '@/services/api';

export function usePageViewTracking() {
  const [location] = useLocation();

  useEffect(() => {
    // Only track in browser environment
    if (typeof window === 'undefined' || typeof navigator === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Add a small delay to ensure the page is fully loaded
    const trackPage = async () => {
      try {
        // Wait a bit for the page to be fully loaded
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const result = await trackPageView({
          page: location,
          userAgent: navigator.userAgent,
          referrer: document.referrer || null,
        });
        
        // Only log success in development
        if (process.env.NODE_ENV === 'development' && result) {
          console.log('Page view tracked successfully');
        }
      } catch (error) {
        // Silently fail - don't disrupt user experience
        console.warn('Page view tracking failed:', error);
      }
    };

    trackPage();
  }, [location]);
}