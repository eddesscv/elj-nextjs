import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PanelLeftOpen, PanelRightOpen, ChevronDown, Home } from 'lucide-react';
import { primaryNavigation, NavigationItem, gamesNavigation } from '../data/navigation';
import { useTheme } from '../contexts/ThemeContext';
import { getSocialIcons } from './SocialIcons';
import logoLight from '../assets/images/logo-light.svg';
import logoDark from '../assets/images/logo-dark.svg';
import { Tooltip } from '../components/Tooltip';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resolvedTheme } = useTheme();
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  
  // Tooltip state management
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Refs for tooltip positioning
  const menuItemRefs = useRef<Record<string, HTMLElement | null>>({});
  const gameItemRefs = useRef<Record<string, HTMLElement | null>>({});
  const socialItemRefs = useRef<Record<string, HTMLElement | null>>({});

  const handleNavigation = (path: string) => navigate(path);
  
  const isActive = (path: string) => location.pathname === path;

  // Check each item's active state individually
  const isGamesActive = isActive('/games'); // Adjust if needed

  const toggleGamesDropdown = () => {
    setIsGamesOpen(!isGamesOpen);
  };

  // Social icons for sidebar (smaller size)
  const socialIcons = getSocialIcons("w-5 h-5");

  // Helper to set refs
  const setMenuItemRef = (key: string) => (el: HTMLElement | null) => {
    menuItemRefs.current[key] = el;
  };

  const setGameItemRef = (key: string) => (el: HTMLElement | null) => {
    gameItemRefs.current[key] = el;
  };

  const setSocialItemRef = (key: string) => (el: HTMLElement | null) => {
    socialItemRefs.current[key] = el;
  };

  return (
    <aside
      className={`hidden xl:block fixed left-0 top-0 h-screen bg-white dark:bg-card 
      shadow-2xl transition-[width] duration-300 ease-in-out z-40
      ${isOpen ? 'w-64' : 'w-18'}`}
    >
      <div className="flex flex-col h-full">
        {/* Header - Fixed */}
        <div className="flex items-center p-4 shadow-lg flex-shrink-0 h-14 relative">   
          <button
            onClick={onToggle}
            className="rounded-lg hover:bg-card transition-colors flex-shrink-0 absolute ml-2"
          >
            {isOpen ? <PanelRightOpen size={18} /> : <PanelLeftOpen size={18} />}
          </button>

          <button
            onClick={() => handleNavigation('/')}
            className={`transition-all duration-300 overflow-hidden mx-auto flex items-center justify-center ${
              isOpen ? 'opacity-100 w-auto ml-10' : 'opacity-0 w-0 ml-0'
            }`}
          >
            <img
              src={resolvedTheme === 'dark' ? logoDark : logoLight}
              alt="English Like Jagger"
              className="h-6 w-auto lg:h-8 transition-all duration-300"
            />
          </button>
        </div>

        {/* Scrollable Container */}
        <div 
          className="flex-1 overflow-y-auto flex flex-col"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`.overflow-y-auto::-webkit-scrollbar { display: none; }`}</style>
          
          {/* Menu Items */}
          <div className="flex-1">
            <nav className="p-3 space-y-2">
              {/* Home Link - Added at the top */}
              <button
                ref={setMenuItemRef('home')}
                onClick={() => handleNavigation('/')}
                onMouseEnter={() => setHoveredItem('home')}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full flex items-center p-3 rounded-full transition-all duration-300 group
                  ${
                    isActive('/')
                      ? 'bg-highlight text-accent'
                      : 'text-text hover:text-accent hover:bg-highlight/50'
                  }`}
              >
                <div className="flex items-center justify-center w-5">
                  <Home size={20} />
                </div>

                <span
                  className={`text-sm font-semibold whitespace-nowrap transition-all duration-300 overflow-hidden flex-1 text-left ${
                    isOpen ? 'opacity-100 w-auto ml-4' : 'opacity-0 w-0 ml-0'
                  }`}
                >
                  Home
                </span>

                {/* Portal Tooltip */}
                {!isOpen && hoveredItem === 'home' && (
                  <Tooltip 
                    text="Home" 
                    parentRef={{ current: menuItemRefs.current['home'] }}
                  />
                )}
              </button>

              {primaryNavigation.map((item: NavigationItem, index: number) => {
                const itemKey = `menu-${index}`;
                const isItemActive = isActive(item.page);
                
                if (item.name === 'Games') {
                  return (
                    <div key={index} className="relative">
                      <button
                        ref={setMenuItemRef(itemKey)}
                        onClick={toggleGamesDropdown}
                        onMouseEnter={() => setHoveredItem(itemKey)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`w-full flex items-center p-3 rounded-full transition-all duration-300 group
                          ${
                            isGamesActive
                              ? 'bg-highlight text-accent'
                              : 'text-text hover:text-accent hover:bg-highlight/50'
                          }`}
                      >
                        <div className="flex items-center justify-center w-5">
                          {item.icon}
                        </div>

                        <span
                          className={`text-sm font-semibold whitespace-nowrap transition-all duration-300 overflow-hidden flex-1 text-left ${
                            isOpen ? 'opacity-100 w-auto ml-4' : 'opacity-0 w-0 ml-0'
                          }`}
                        >
                          {item.name}
                        </span>

                        {isOpen && (
                          <div
                            className={`flex-shrink-0 ml-2 transition-transform duration-200 ${
                              isGamesOpen ? 'rotate-180' : ''
                            }`}
                          >
                            <ChevronDown size={16} />
                          </div>
                        )}
                      </button>

                      {/* Portal Tooltip */}
                      {!isOpen && hoveredItem === itemKey && (
                        <Tooltip 
                          text={item.name} 
                          parentRef={{ current: menuItemRefs.current[itemKey] }}
                        />
                      )}

                      {/* Dropdown - Updated with pointer-events */}
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isGamesOpen 
                            ? 'max-h-96 opacity-100 mt-1 pointer-events-auto' 
                            : 'max-h-0 opacity-0 pointer-events-none'
                        }`}
                      >
                        {/* <div
                          className={`space-y-1 ${
                            isOpen ? 'ml-4' : 'ml-0 flex flex-col items-center space-y-1'
                          }`}
                        > */}
                        {/* <div
                          className={`space-y-1 transition-all duration-300 ease-in-out ${
                            isOpen ? 'ml-4' : 'ml-0 flex flex-col items-center space-y-1.5'
                          }`}
                        > */}
                        <div
                          className={`flex flex-col items-center transition-all duration-300 ease-in-out ${
                            isOpen
                              ? 'ml-4 space-y-1'
                              : 'ml-0 space-y-1'
                          }`}
                        >
                          {gamesNavigation.map((game: NavigationItem, idx) => {
                            const isGameActive = isActive(`/${game.page}`);
                            const gameKey = `game-${idx}`;
                            
                            return (
                              <button
                                key={idx}
                                ref={setGameItemRef(gameKey)}
                                onClick={() => handleNavigation(`/${game.page}`)}
                                onMouseEnter={() => setHoveredItem(gameKey)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className={`w-full flex items-center px-3.5 py-3 rounded-full transition-all duration-300 text-sm group
                                  ${
                                    isGameActive
                                      ? 'bg-highlight text-accent'
                                      : 'text-text hover:text-accent hover:bg-highlight/50'
                                  }`}
                              >
                                <div className="flex items-center justify-center w-4">
                                  {game.icon}
                                </div>

                                {isOpen && (
                                  <span
                                    className={`font-semibold whitespace-nowrap transition-all duration-300 overflow-hidden ${
                                      isGameActive ? 'text-accent' : ''
                                    } ${isOpen ? 'ml-4' : ''}`}
                                  >
                                    {game.name}
                                  </span>
                                )}

                                {/* Portal Tooltip for games */}
                                {!isOpen && hoveredItem === gameKey && (
                                  <Tooltip 
                                    text={game.name} 
                                    parentRef={{ current: gameItemRefs.current[gameKey] }}
                                    className="font-medium"
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                // Regular menu items
                return (
                  <button
                    key={index}
                    ref={setMenuItemRef(itemKey)}
                    onClick={() => handleNavigation(item.page)}
                    onMouseEnter={() => setHoveredItem(itemKey)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`w-full flex items-center p-3 rounded-full transition-all duration-300 group
                      ${
                        isItemActive
                          ? 'bg-highlight text-accent'
                          : 'text-text hover:text-accent hover:bg-highlight/50'
                      }`}
                  >
                    <div className="flex items-center justify-center w-5">
                      {item.icon}
                    </div>

                    <span
                      className={`text-sm font-semibold whitespace-nowrap transition-all duration-300 overflow-hidden flex-1 text-left ${
                        isOpen ? 'opacity-100 w-auto ml-4' : 'opacity-0 w-0 ml-0'
                      }`}
                    >
                      {item.name}
                    </span>

                    {/* Portal Tooltip */}
                    {!isOpen && hoveredItem === itemKey && (
                      <Tooltip 
                        text={item.name} 
                        parentRef={{ current: menuItemRefs.current[itemKey] }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Social Networks - Fixed at bottom */}
          {isOpen && (
            <div className="p-4 border-t border-border flex-shrink-0">
              <div className="flex justify-center gap-4">
                {socialIcons.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="hover:scale-110 transition-transform text-text hover:text-accent p-2 rounded-full hover:bg-highlight/50"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          )}

          {!isOpen && (
            <div className="p-2 border-t border-border flex-shrink-0">
              <div className="flex flex-col items-center gap-3">
                {socialIcons.map((social, index) => {
                  const socialKey = `social-${index}`;
                  return (
                    <a
                      key={index}
                      ref={setSocialItemRef(socialKey)}
                      href={social.url}
                      onMouseEnter={() => setHoveredItem(socialKey)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="hover:scale-110 transition-transform text-text hover:text-accent p-2 rounded-full hover:bg-highlight/50"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      {social.icon}
                      
                      {/* Portal Tooltip for social icons */}
                      {hoveredItem === socialKey && (
                        <Tooltip 
                          text={social.label} 
                          parentRef={{ current: socialItemRefs.current[socialKey] }}
                          className="text-xs"
                        />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};