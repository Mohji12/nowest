import { useState, useEffect } from 'react';
import { X, Phone, Mail, MessageCircle } from 'lucide-react';
import { useLocation } from 'wouter';

export default function ScrollContactCard() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [, setLocation] = useLocation();

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('contactCardDismissed', 'true');
  };

  useEffect(() => {
    // Check if user has dismissed the card in this session
    // For testing: uncomment the line below to reset the dismissed state
    // sessionStorage.removeItem('contactCardDismissed');
    
    const dismissed = sessionStorage.getItem('contactCardDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }
    
    console.log('ScrollContactCard: Component mounted, waiting for scroll...');

    let autoDismissTimer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      
      // Show card after scrolling down 200px (only once) - reduced for easier testing
      if (scrollY > 200 && !isDismissed && !hasShown) {
        console.log('ScrollContactCard: Showing card at scroll position:', scrollY);
        setIsVisible(true);
        setHasShown(true);
        
        // Auto-dismiss after 3 seconds
        if (autoDismissTimer) {
          clearTimeout(autoDismissTimer);
        }
        autoDismissTimer = setTimeout(() => {
          console.log('ScrollContactCard: Auto-dismissing after 3 seconds');
          handleDismiss();
        }, 3000);
      } else if (scrollY <= 300 && !hasShown) {
        setIsVisible(false);
        if (autoDismissTimer) {
          clearTimeout(autoDismissTimer);
        }
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (autoDismissTimer) {
        clearTimeout(autoDismissTimer);
      }
    };
  }, [isDismissed, hasShown]);

  const handleContact = () => {
    setLocation('/contact');
    handleDismiss();
  };

  if (isDismissed || !isVisible) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleDismiss}
      />
      
      {/* Contact Card */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-500 ease-out ${
          isVisible
            ? 'opacity-100 translate-y-[-50%] scale-100'
            : 'opacity-0 translate-y-[-40%] scale-95 pointer-events-none'
        }`}
        style={{
          animation: isVisible ? 'slideInUp 0.5s ease-out' : 'none',
        }}
      >
      <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-4 sm:p-5 max-w-[280px] sm:max-w-[320px]">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-golden-orange/5 via-transparent to-golden-orange/10 rounded-2xl pointer-events-none" />
        
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 z-10"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-golden-orange/20 to-golden-orange/10 mb-3 mx-auto">
            <MessageCircle className="w-6 h-6 text-golden-orange" />
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 text-center mb-2">
            Need More Details?
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">
            For more information about our luxury blinds and curtains, contact us today.
          </p>

          {/* Contact Button */}
          <button
            onClick={handleContact}
            className="w-full bg-golden-orange hover:bg-golden-orange/90 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2 group"
          >
            <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Contact Us</span>
          </button>

          {/* Additional contact options */}
          <div className="mt-3 pt-3 border-t border-gray-200/50">
            <p className="text-xs text-gray-500 text-center mb-2">Or reach us via:</p>
            <div className="flex items-center justify-center gap-3">
              <a
                href="mailto:info@nowestinterior.com"
                className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-golden-orange transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
              <span className="text-gray-300">•</span>
              <a
                href="tel:+441234567890"
                className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-golden-orange transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
            </div>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-golden-orange/20 rounded-full blur-sm" />
        <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-golden-orange/10 rounded-full blur-sm" />
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
      </div>
    </>
  );
}

