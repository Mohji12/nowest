import { useState, useRef, useEffect } from 'react';
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
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [, setLocation] = useLocation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = (item: NavItem) => {
    if (item.subItems) {
      // Toggle dropdown for items with sub-items
      setOpenDropdown(openDropdown === item.id ? null : item.id);
    } else {
      // Navigate directly for items without sub-items
      setOpenDropdown(null);
      item.onClick?.();
    }
  };

  const handleSubItemClick = (subItem: SubNavItem) => {
    setOpenDropdown(null);
    subItem.onClick?.();
  };

  // Dynamic sizing based on device type
  const getNavbarClasses = () => {
    if (isMobile) {
      return "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl bg-card/90 border border-card-border rounded-full px-4 py-3 shadow-lg max-w-[95vw]";
    } else if (isTablet) {
      return "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl bg-card/90 border border-card-border rounded-full px-6 py-2.5 shadow-lg max-w-[85vw]";
    } else {
      return "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl bg-card/90 border border-card-border rounded-full px-8 py-3 shadow-lg";
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
      className={getNavbarClasses()}
      data-testid="nav-floating"
    >
      <ul className={getGapClasses()}>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id || (item.subItems && item.subItems.some(sub => activeItem === sub.id));
          const hasDropdown = item.subItems && item.subItems.length > 0;
          const isDropdownOpen = openDropdown === item.id;

          return (
            <li key={item.id} className="relative">
              <button
                onClick={() => handleItemClick(item)}
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

              {/* Dropdown Menu */}
              {hasDropdown && isDropdownOpen && (
                <div 
                  ref={dropdownRef}
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 z-10 animate-in slide-in-from-bottom-2 duration-200 ${
                    isMobile ? 'mb-2' : isTablet ? 'mb-2.5' : 'mb-3'
                  }`}
                >
                  <div className="relative">
                    {/* Backdrop blur container */}
                    <div className={`bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden ${
                      isMobile 
                        ? 'py-2 min-w-[140px] max-w-[85vw]' 
                        : isTablet 
                        ? 'py-2.5 min-w-[160px] max-w-[80vw]' 
                        : 'py-3 min-w-[180px]'
                    }`}>
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-2xl" />
                      
                      {/* Menu items */}
                      <div className="relative">
                        {item.subItems!.map((subItem, index) => (
                          <button
                            key={subItem.id}
                            onClick={() => handleSubItemClick(subItem)}
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
                            style={{ 
                              animationDelay: `${index * 50}ms`,
                              animation: 'slideInFromLeft 0.3s ease-out forwards'
                            }}
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
                      <div className="w-3 h-3 bg-background/95 backdrop-blur-xl border-r border-b border-border/50 rotate-45 transform origin-center" />
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
