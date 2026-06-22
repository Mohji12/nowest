import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Home, Grid3x3, BookOpen, Phone } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useLocation } from 'wouter';

interface SubNavItem {
  id: string;
  label: string;
  onClick?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  onClick?: () => void;
  subItems?: SubNavItem[];
}

interface FloatingNavProps {
  activeItem?: string;
  items?: NavItem[];
}

const defaultItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'portfolio', label: 'Portfolio', icon: Grid3x3 },
  { id: 'process', label: 'Process', icon: BookOpen },
  { id: 'contact', label: 'Contact', icon: Phone },
];

export default function FloatingNav({ activeItem = 'home', items = defaultItems }: FloatingNavProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const touchHandledRef = useRef<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [, setLocation] = useLocation();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!openDropdown) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      
      // Don't close if clicking on the dropdown itself
      if (dropdownRef.current && dropdownRef.current.contains(target)) {
        return;
      }
      
      // Don't close if clicking on the button that opened the dropdown
      const button = buttonRefs.current.get(openDropdown);
      if (button && button.contains(target)) {
        return;
      }
      
      // Close the dropdown if clicking outside
      setOpenDropdown(null);
    }

    // Use a delay for touch events to prevent immediate closing on mobile
    let touchTimeout: NodeJS.Timeout;
    function handleTouchStart(event: TouchEvent) {
      // Clear any existing timeout
      if (touchTimeout) clearTimeout(touchTimeout);
      
      // Add a longer delay to allow the button click to process first
      touchTimeout = setTimeout(() => {
        handleClickOutside(event);
      }, 500);
    }

    // Add both mouse and touch event listeners for better mobile support
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleTouchStart);
      if (touchTimeout) clearTimeout(touchTimeout);
    };
  }, [openDropdown]);

  // Auto-scroll functionality for mobile - continuous left to right scrolling
  useEffect(() => {
    if (!isMobile) return;
    
    let animationFrameId: number | null = null;
    let startTimeout: NodeJS.Timeout | null = null;
    let checkInterval: NodeJS.Timeout | null = null;

    const initScroll = () => {
      if (!scrollContainerRef.current || !navListRef.current) {
        return false;
      }

      const scrollContainer = scrollContainerRef.current;
      const navList = navListRef.current;
      let scrollPosition = 0;
      const scrollSpeed = 0.45; // Slower auto-scroll on mobile (pixels per frame at 60fps)
      let lastTime = performance.now();

      // Debug logging
      console.log('Scroll container initialized:', {
        containerWidth: scrollContainer.clientWidth,
        contentWidth: navList.scrollWidth,
        maxScroll: navList.scrollWidth - scrollContainer.clientWidth
      });

      const scroll = (currentTime: number) => {
        if (isPaused) {
          lastTime = currentTime;
          animationFrameId = requestAnimationFrame(scroll);
          return;
        }

        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        // Calculate max scroll based on container width
        const maxScroll = navList.scrollWidth - scrollContainer.clientWidth;
        
        if (maxScroll <= 0) {
          // No need to scroll if content fits
          animationFrameId = requestAnimationFrame(scroll);
          return;
        }

        // Adjust scroll speed based on frame time for consistency
        const adjustedSpeed = scrollSpeed * (deltaTime / 16.67); // Normalize to 60fps
        scrollPosition += adjustedSpeed;

        // Loop back to start when reaching the end (infinite scroll)
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0; // Reset to start for continuous loop
        }

        scrollContainer.scrollLeft = scrollPosition;
        animationFrameId = requestAnimationFrame(scroll);
      };

      // Start scrolling immediately
      startTimeout = setTimeout(() => {
        animationFrameId = requestAnimationFrame(scroll);
      }, 100);

      // Pause on hover/touch (shorter pause for better UX)
      const handleMouseEnter = () => setIsPaused(true);
      const handleMouseLeave = () => setIsPaused(false);
      const handleTouchStart = () => setIsPaused(true);
      const handleTouchEnd = () => {
        setTimeout(() => setIsPaused(false), 1000); // Resume after 1 second
      };

      scrollContainer.addEventListener('mouseenter', handleMouseEnter);
      scrollContainer.addEventListener('mouseleave', handleMouseLeave);
      scrollContainer.addEventListener('touchstart', handleTouchStart);
      scrollContainer.addEventListener('touchend', handleTouchEnd);

      return () => {
        if (startTimeout) clearTimeout(startTimeout);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        scrollContainer.removeEventListener('touchstart', handleTouchStart);
        scrollContainer.removeEventListener('touchend', handleTouchEnd);
      };
    };

    // Try to initialize immediately
    let cleanup = initScroll();
    
    // If refs aren't ready, check periodically
    if (!cleanup) {
      checkInterval = setInterval(() => {
        cleanup = initScroll();
        if (cleanup) {
          clearInterval(checkInterval!);
        }
      }, 100);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (cleanup) cleanup();
      if (startTimeout) clearTimeout(startTimeout);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, isPaused]);

  const handleItemClick = (item: NavItem, event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
    
    if (item.subItems && item.subItems.length > 0) {
      // Prevent default navigation for items with sub-items
      event.preventDefault();
      // Toggle dropdown for items with sub-items
      const newState = openDropdown === item.id ? null : item.id;
      setOpenDropdown(newState);
      
      // Calculate position for mobile dropdown - center it on the page
      if (newState && isMobile) {
        setDropdownPosition({
          left: window.innerWidth / 2, // Center horizontally
          top: window.innerHeight / 2, // Center vertically
        });
      } else {
        setDropdownPosition(null);
      }
    } else {
      // Navigate directly for items without sub-items (don't prevent default)
      setOpenDropdown(null);
      setDropdownPosition(null);
      item.onClick?.();
    }
  };

  const handleSubItemClick = (subItem: SubNavItem, event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenDropdown(null);
    setDropdownPosition(null);
    subItem.onClick?.();
  };

  // Render dropdown content
  const renderDropdownContent = (
    item: NavItem,
    activeItem: string,
    handleSubItemClick: (subItem: SubNavItem, event: React.MouseEvent | React.TouchEvent) => void,
    isMobile: boolean,
    isTablet: boolean
  ) => (
    <div className="relative">
      {/* Backdrop blur container */}
      <div className={`bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-2xl shadow-2xl ${
        isMobile 
          ? 'py-2 min-w-[160px] max-w-[85vw]' 
          : isTablet 
          ? 'py-2.5 min-w-[180px] max-w-[80vw]' 
          : 'py-3 min-w-[200px]'
      }`}
      style={{
        backgroundColor: 'white',
        opacity: 1,
        visibility: 'visible',
      }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-2xl" />
        
        {/* Menu items */}
        <div className="relative">
          {item.subItems!.map((subItem) => (
            <button
              key={subItem.id}
              onClick={(e) => handleSubItemClick(subItem, e)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleSubItemClick(subItem, e);
              }}
              className={`w-full text-left font-medium transition-all duration-200 group relative overflow-hidden ${
                activeItem === subItem.id 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              } ${
                isMobile 
                  ? 'px-3 py-2 text-xs' 
                  : isTablet 
                  ? 'px-4 py-2.5 text-sm' 
                  : 'px-5 py-3 text-sm'
              }`}
              data-testid={`button-nav-${subItem.id}`}
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              
              {/* Content */}
              <span className="relative z-10 flex items-center gap-3">
                {/* Icon indicator */}
                <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  activeItem === subItem.id 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 group-hover:bg-primary/60 group-hover:scale-110'
                }`} />
                {subItem.label}
              </span>
              
              {/* Active indicator line */}
              {activeItem === subItem.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Arrow pointer */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
        <div className="w-3 h-3 bg-white dark:bg-gray-800 border-r border-b border-gray-300 dark:border-gray-600 rotate-45 transform origin-center" />
      </div>
    </div>
  );

  // Dynamic sizing based on device type
  const getNavbarClasses = () => {
    // Remove overflow-hidden when dropdown is open to prevent clipping
    const overflowClass = openDropdown ? "overflow-visible" : "overflow-hidden";
    if (isMobile) {
      return `fixed bottom-2 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl bg-card/90 border border-card-border rounded-full py-3 shadow-lg max-w-[95vw] ${overflowClass}`;
    } else if (isTablet) {
      return `fixed bottom-2 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl bg-card/90 border border-card-border rounded-full px-6 py-2.5 shadow-lg max-w-[85vw] ${overflowClass}`;
    } else {
      return `fixed bottom-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl bg-card/90 border border-card-border rounded-full px-8 py-3 shadow-lg ${overflowClass}`;
    }
  };

  const getGapClasses = () => {
    if (isMobile) {
      return "flex items-center gap-2";
    } else if (isTablet) {
      return "flex items-center gap-4";
    } else {
      return "flex items-center gap-8";
    }
  };

  return (
    <nav 
      ref={navContainerRef}
      className={getNavbarClasses()}
      data-testid="nav-floating"
    >
      <div 
        ref={scrollContainerRef}
        className={isMobile ? 'overflow-x-auto scrollbar-hide' : ''}
        style={{
          ...(openDropdown ? { overflow: 'visible' } : {}),
          ...(isMobile && !openDropdown ? { 
            overflowX: 'auto',
            overflowY: 'hidden',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            width: '100%',
            maxWidth: '100%',
            paddingLeft: '20px',
            paddingRight: '20px',
          } : {}),
        }}
      >
        <ul 
          ref={navListRef}
          className={`${getGapClasses()} ${isMobile ? 'whitespace-nowrap' : ''}`}
          style={{
            ...(isMobile ? {
              display: 'inline-flex',
              width: 'max-content',
              minWidth: '300%', // Make it much wider than container to ensure scrolling
              flexShrink: 0,
              paddingRight: '50px', // Add extra padding for smooth loop
            } : {}),
            overflow: openDropdown ? 'visible' : undefined,
          }}
        >
        {/* Duplicate items multiple times for seamless infinite scroll on mobile */}
        {(isMobile ? [...items, ...items, ...items] : items).map((item, index) => {
          const uniqueKey = isMobile ? `${item.id}-${index}` : item.id;
          const Icon = item.icon;
          const isActive = activeItem === item.id || (item.subItems && item.subItems.some(sub => activeItem === sub.id));
          const hasDropdown = item.subItems && item.subItems.length > 0;
          const isDropdownOpen = openDropdown === item.id;

          return (
            <li key={uniqueKey} className="relative" style={{ overflow: 'visible', zIndex: isDropdownOpen ? 100 : 'auto' }}>
              <button
                ref={(el) => {
                  if (el && hasDropdown) {
                    buttonRefs.current.set(item.id, el);
                  } else {
                    buttonRefs.current.delete(item.id);
                  }
                }}
                onClick={(e) => {
                  // Skip onClick if we already handled it via touch (on mobile)
                  if (touchHandledRef.current && isMobile) {
                    touchHandledRef.current = false;
                    return;
                  }
                  handleItemClick(item, e);
                }}
                onTouchStart={(e) => {
                  // Prevent the click outside handler from firing immediately
                  e.stopPropagation();
                  touchHandledRef.current = false;
                }}
                onTouchEnd={(e) => {
                  if (hasDropdown) {
                    e.preventDefault();
                    e.stopPropagation();
                    touchHandledRef.current = true;
                    handleItemClick(item, e);
                  }
                }}
                className={`flex flex-col items-center transition-all hover-elevate rounded-md ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                } ${
                  isMobile 
                    ? 'gap-1 px-3 py-2' 
                    : isTablet 
                    ? 'gap-1 px-3 py-2' 
                    : 'gap-1 px-4 py-2'
                }`}
                data-testid={`button-nav-${item.id}`}
              >
                <Icon className={
                  isMobile 
                    ? 'w-5 h-5' 
                    : isTablet 
                    ? 'w-5 h-5' 
                    : 'w-5 h-5'
                } />
                <span className={`font-bold leading-tight ${
                  isMobile 
                    ? 'text-[11px]' 
                    : isTablet 
                    ? 'text-[10px]' 
                    : 'text-xs'
                }`}>{item.label}</span>
              </button>

              {/* Dropdown Menu - Use portal on mobile for better positioning */}
              {hasDropdown && isDropdownOpen && (
                <>
                  {isMobile && dropdownPosition ? (
                    createPortal(
                      <>
                        {/* Backdrop overlay */}
                        <div
                          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[99]"
                          onClick={() => {
                            setOpenDropdown(null);
                            setDropdownPosition(null);
                          }}
                          onTouchStart={(e) => {
                            e.stopPropagation();
                            setOpenDropdown(null);
                            setDropdownPosition(null);
                          }}
                        />
                        {/* Centered dropdown */}
                        <div 
                          ref={dropdownRef}
                          className="fixed z-[100]"
                          style={{
                            left: `${dropdownPosition.left}px`,
                            top: `${dropdownPosition.top}px`,
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'auto',
                            WebkitTapHighlightColor: 'transparent',
                            touchAction: 'manipulation',
                            opacity: 1,
                            visibility: 'visible',
                          }}
                          onClick={(e) => e.stopPropagation()}
                          onTouchStart={(e) => e.stopPropagation()}
                          onTouchMove={(e) => e.stopPropagation()}
                        >
                          {renderDropdownContent(item, activeItem, handleSubItemClick, isMobile, isTablet)}
                        </div>
                      </>,
                      document.body
                    )
                  ) : (
                    <div 
                      ref={dropdownRef}
                      className={`absolute left-1/2 -translate-x-1/2 z-[100] ${
                        isTablet 
                          ? 'bottom-full mb-2.5' 
                          : 'bottom-full mb-3'
                      }`}
                      onClick={(e) => e.stopPropagation()}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                      }}
                      onTouchMove={(e) => e.stopPropagation()}
                      style={{
                        pointerEvents: 'auto',
                        WebkitTapHighlightColor: 'transparent',
                        touchAction: 'manipulation',
                        opacity: 1,
                        visibility: 'visible',
                        display: 'block',
                      }}
                    >
                      {renderDropdownContent(item, activeItem, handleSubItemClick, isMobile, isTablet)}
                    </div>
                  )}
                </>
              )}
            </li>
          );
        })}
        </ul>
      </div>
    </nav>
  );
}
