// Header.tsx

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  User,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  PanelLeftOpen, 
  PanelRightOpen,
  LayoutDashboard,
  Settings,
  LogOut,
  Trophy,
  Search,
} from 'lucide-react';
import { SearchBox } from './SearchBox';
import SearchPopup from './SearchPopup';
import { Sidebar } from './Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggleButton } from './ThemeToggleButton';
import { LoginPopup } from './LoginPopup';
import logoLight from '../assets/images/logo-light.svg';
import logoDark from '../assets/images/logo-dark.svg';
import { useTheme } from '../contexts/ThemeContext';
import {
  primaryNavigation,
  secondaryNavigation,
  categoryNavigation,
  gamesNavigation,
  NavigationItem,
} from '../data/navigation';
import { socialIcons } from './SocialIcons';

interface HeaderProps {
  onLogoClick: () => void;
  isSidebarOpen: boolean;
  onSidebarToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onLogoClick, 
  isSidebarOpen, 
  onSidebarToggle 
}) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { resolvedTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [isMobileGamesOpen, setIsMobileGamesOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  
  // Scroll state management
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  // Default avatar fallback
  const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRDhEOEQ4Ii8+CjxwYXRoIGQ9Ik0xMDAgMTEwQzExNi41NjkgMTEwIDEzMCA5Ni41Njg5IDEzMCA4MEMxMzAgNjMuNDMxMSAxMTYuNTY5IDUwIDEwMCA1MEM4My40MzExIDUwIDcwIDYzLjQzMTEgNzAgODBDNzAgOTYuNTY4OSA4My40MzExIDExMCAxMDAgMTEwWiIgZmlsbD0iIzlBOUE5QSIvPgo8cGF0aCBkPSJNNTAgMTYwQzUwIDEzcy45MDkgNjcuOTA5MSAxMjAgOTAgMTIwSDExMEwxMzIuMDkxIDEyMCAxNTAgMTM3LjkwOSAxNTAgMTYwVjE3MEg1MFYxNjBaIiBmaWxsPSIjOUE5QTlBIi8+Cjwvc3ZnPg==';

  // Scroll detection with thresholds
  useEffect(() => {
    const SCROLL_DOWN_THRESHOLD = 100;
    const SCROLL_UP_THRESHOLD = 50;
    
    let ticking = false;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollingDown = currentScrollY > lastScrollY;
          
          if (scrollingDown && currentScrollY > SCROLL_DOWN_THRESHOLD) {
            setHeaderVisible(false);
          } else if (!scrollingDown && (lastScrollY - currentScrollY) > SCROLL_UP_THRESHOLD) {
            setHeaderVisible(true);
          } else if (currentScrollY < SCROLL_DOWN_THRESHOLD) {
            setHeaderVisible(true);
          }
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  
  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const userMenuItems = [
    {
      type: 'header',
      content: (
        <div className="flex items-center gap-3 px-4 py-3">
          <img
            src={user?.avatar || defaultAvatar}
            alt={user?.name || 'User'}
            className="w-10 h-10 rounded-full border-2 border-accent"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-text">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-subtext truncate">{user?.email || ''}</p>             
          </div>
        </div>
      ),
    },
    {
      name: 'Dashboard',
      icon: <LayoutDashboard size={16} className="text-accent" />,
      page: 'account/score',
    },
    {
      name: 'Account Settings',
      icon: <Settings size={16} className="text-accent" />,
      page: 'account/settings',
    },
    { type: 'divider' },
    {
      name: 'Leaderboard',
      icon: <Trophy size={16} className="text-accent" />,
      page: 'leaderboard',
    },
    { type: 'divider' },
    {
      name: 'Logout',
      icon: <LogOut size={16} className="text-accent" />,
      action: logout,
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsMenuOpen(false);
    setIsSearchPopupOpen(false);
  };

  const handleMenuItemClick = (item: any) => {
    if (item.action) {
      item.action();
    } else if (item.page) {
      try {
        if (item.page.startsWith('account/')) {
          const tab = item.page.split('/')[1];
          navigate(`/account/${tab}`);
        } else if (item.page === 'leaderboard') {
          navigate('/leaderboard');
        } else {
          navigate(`/${item.page}`);
        }
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
    setIsUserDropdownOpen(false);
  };

  const toggleMobileGamesDropdown = () => {
    setIsMobileGamesOpen(!isMobileGamesOpen);
  };

  return (
    <>
      {/* Header - Full width */}
      <header 
        className={`bg-white dark:bg-[#172434] shadow-lg transition-transform duration-500 sticky top-0 left-0 right-0 z-50 ${
          headerVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="w-full max-w-[100vw] pl-4 md:pl-4 lg:pl-4 xl:pl-0 pr-4 md:pr-4 lg:pr-6 xl:pr-8">
          <div className="flex items-center justify-between h-14">
      
            {/* Left: Logo + Mobile Menu */}
            <div className="flex items-center gap-2 md:gap-4 xl:gap-2 flex-1 lg:flex-none">
              {/* Mobile menu button - Show on mobile and iPad (up to 1280px) */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="xl:hidden rounded-xl text-text hover:text-accent transition-colors"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
      
              {/* Sidebar Toggle - Desktop Only (≥1280px) */}
              <button
                onClick={onSidebarToggle}
                className="hidden xl:flex items-center justify-center w-8 h-8 ml-4 rounded-lg hover:bg-card transition-colors"
                aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              >
                {isSidebarOpen ? <PanelRightOpen size={18} /> : <PanelLeftOpen size={18} />}
              </button>
      
              {/* Logo */}
              <button
                onClick={onLogoClick}
                className="hover:opacity-80 transition-opacity ml-2 md:ml-0"
              >
                <img 
                  src={resolvedTheme === 'dark' ? logoDark : logoLight}   
                  alt="English Like Jagger" 
                  className="h-6 w-auto lg:h-8"
                />
              </button>
            </div>

            {/* Center: Fluid Search Box - Desktop Only (≥1024px) */}
            <nav className="hidden lg:flex items-center justify-center flex-1 px-2 lg:px-4 xl:px-8">
              {/* Search Box - Fluid width that adjusts dynamically */}
              <div className="w-full max-w-full lg:max-w-[400px] xl:max-w-[500px] 2xl:max-w-[600px]">
                <SearchBox
                  placeholder="Search quizzes, lessons..."
                  onSearch={handleSearch}
                  onInputClick={() => setIsSearchPopupOpen(true)}
                />
              </div>
            </nav>

            {/* Right: Theme + User + Search Icon (Mobile & iPad) */}
            <div className="flex items-center gap-4 justify-end flex-1 lg:flex-none">
              {/* Search Icon - Mobile & iPad Only (<1280px) */}
              <button
                onClick={() => setIsSearchPopupOpen(true)}
                className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-text hover:text-accent transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              
              {/* Theme Toggle - Show on desktop (≥1280px) */}
              <div className="hidden xl:flex items-center">
                <ThemeToggleButton />
              </div>
            
              {isAuthenticated && user ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    className="flex items-center gap-2 p-1 rounded-full text-text hover:text-accent transition-colors"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    aria-label="User menu"
                  >  
                    <img
                      src={user?.avatar || defaultAvatar}
                      alt={user?.name || 'User'}
                      className="w-8 h-8 rounded-full border-2 border-accent"
                    />
                    {/* Hide user name on mobile & iPad, show on desktop (≥1280px) */}
                    <span className="hidden xl:block text-sm font-medium">
                      {user?.name?.split(' ')[0] || 'User'}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        isUserDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
            
                  {/* User dropdown with smooth transition */}
                  <div className={`
                    absolute top-full right-0 mt-2 w-64 bg-bg rounded-lg shadow-lg border border-card py-2 z-50
                    transition-all duration-300 ease-out
                    ${isUserDropdownOpen 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform -translate-y-2 pointer-events-none'
                    }
                  `}>
                    {userMenuItems.map((item, index) => {
                      if (item.type === 'header') {
                        return (
                          <div key={index} className="border-b border-card">
                            {item.content}
                          </div>
                        );
                      }
            
                      if (item.type === 'divider') {
                        return (
                          <hr key={index} className="border-card my-2" />
                        );
                      }
            
                      return (
                        <button
                          key={index}
                          onClick={() => handleMenuItemClick(item)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-text hover:text-accent transition-colors"
                        >
                          {item.icon}
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Login Button - Icon only on mobile & iPad, text + icon on desktop */
                <button
                  className="flex items-center gap-2 p-2 rounded-lg text-text hover:text-accent transition-colors"
                  onClick={() => setIsLoginPopupOpen(true)}
                  aria-label="Login"
                >
                  <User className="w-5 h-5" />
                  {/* Hide "Login" text on mobile & iPad, show on desktop (≥1280px) */}
                  <span className="hidden xl:block text-sm font-medium">Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar - Only for ≥1280px */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={onSidebarToggle}
      />

      {/* Mobile Menu - For mobile and iPad (up to 1280px) with adjusted width */}
      <div
        ref={menuRef}
        className={`fixed xl:hidden bg-bg top-0 left-0 h-full z-50 shadow-xl transform transition-transform duration-300 ease-in-out
          w-full md:w-80 lg:w-96
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-full overflow-y-auto pb-4">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3">
            {/* Left: hamburger + logo */}
            <div className="flex items-center gap-2">
              {/* Hamburger button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="pr-2 rounded-xl text-text hover:text-accent transition-colors"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
          
              {/* Logo */}
              <button
                onClick={onLogoClick}
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src={resolvedTheme === 'dark' ? logoDark : logoLight}
                  alt="English Like Jagger"
                  className="h-6 w-auto lg:h-8"
                />
              </button>
            </div>
          
            {/* Right: theme toggle */}
            <div className="flex items-center justify-end">
              <ThemeToggleButton />
            </div>
          </div>

          <hr className="border-card" />

          {/* Primary Navigation - SAME AS SIDEBAR */}
          <div className="px-4 md:px-6 py-3">
            <div className="grid grid-cols-1 gap-1">
              {primaryNavigation.map((item: NavigationItem, index: number) => {
                if (item.name === 'Games') {
                  return (
                    <div key={index} className="relative">
                      <button
                        onClick={toggleMobileGamesDropdown}
                        className="flex items-center gap-3 p-3 text-text hover:text-secondary rounded-xl text-sm hover:bg-card transition-colors w-full text-left"
                      >
                        {item.icon} 
                        <span className="font-medium">{item.name}</span>
                        <ChevronDown 
                          size={16} 
                          className={`ml-auto transition-transform duration-200 ${
                            isMobileGamesOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Games Dropdown for Mobile */}
                      <div className={`
                        ml-6 mt-1 space-y-1 border-l border-border pl-2 overflow-hidden transition-all duration-300 ease-in-out
                        ${isMobileGamesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                      `}>
                        {gamesNavigation.map((game: NavigationItem, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              handleNavigation(`/${game.page}`);
                              setIsMenuOpen(false);
                            }}
                            className="flex items-center gap-3 p-2 text-text hover:text-secondary rounded-xl text-sm hover:bg-card transition-colors w-full text-left"
                          >
                            {game.icon}
                            <span className="font-medium">{game.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                // Regular menu items
                return (
                  <button
                    key={index}
                    onClick={() => handleNavigation(item.page)}
                    className="flex items-center gap-3 p-3 text-text hover:text-secondary rounded-xl text-sm hover:bg-card transition-colors w-full text-left"
                  >
                    {item.icon} 
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-card my-2" />

          {/* Social */}
          <div className="px-4 md:px-6 py-4">
            <div className="flex justify-center gap-5">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="hover:scale-110 transition-transform"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden transition-opacity duration-300"></div>
      )}

      {/* Search Popup */}
      <SearchPopup
        isOpen={isSearchPopupOpen}
        onClose={() => setIsSearchPopupOpen(false)}
        onSearch={handleSearch}
      />

      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
        onSuccess={(user) => {
          console.log('Login successful:', user);
          setIsLoginPopupOpen(false);
        }}
        onError={(error) => {
          console.error('Login error:', error);
        }}
      />
    </>
  );
};