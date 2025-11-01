import React from 'react';
import { FooterBottom } from './FooterBottom';
import { FacebookIcon, TikTokIcon, InstagramIcon, YouTubeIcon } from './SocialIcons';

interface FooterProps {
  isSidebarOpen: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isSidebarOpen }) => {
  const currentYear = new Date().getFullYear();
  
  // Menu items with their respective routes
  const quizzesGamesItems = [
    { name: 'All Quizzes', href: '/quizzes' },
    { name: 'New Quizzes', href: '/quizzes?filter=new' },
    { name: 'Popular Quizzes', href: '/quizzes?filter=popular' },
    { name: 'Personality Tests', href: '/personality-tests' },
    { name: 'All Games', href: '/all-games' },
    { name: 'Did You Know?', href: '/blog/did-you-know' }
  ];

  const informationItems = [
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Newsletter', href: '/newsletter' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Sign In / Create Account', href: '/login' }
  ];

  const policyItems = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookie Policy', href: '/cookie-policy' }
  ];

  const socialLinks = [
    { 
      name: 'YouTube', 
      href: 'https://youtube.com/englishlikejagger', 
      icon: (props: any) => <YouTubeIcon className="w-5 h-5" {...props} />,
    },
    { 
      name: 'Facebook', 
      href: 'https://facebook.com/englishlikejagger', 
      icon: (props: any) => <FacebookIcon className="w-5 h-5" {...props} />,
    },
    { 
      name: 'TikTok', 
      href: 'https://tiktok.com/englishlikejagger', 
      icon: (props: any) => <TikTokIcon className="w-5 h-5" {...props} />,
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/englishlikejagger', 
      icon: (props: any) => <InstagramIcon className="w-5 h-5" {...props} />,
    },
  ];

  return (
    <>
      <footer className={`bg-white dark:bg-[#172434] border-t border-border py-8 transition-all duration-300 ${
        isSidebarOpen ? 'xl:ml-64' : 'xl:ml-16'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 text-center lg:text-left">
            {/* Logo and Description */}
            <div className="col-span-1 lg:col-span-2">
              <div className="flex justify-center lg:justify-start items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-center lg:text-left text-text">
                    English<span className="text-primary">Like</span>
                    <span className="text-secondary">Jagger</span>
                  </h3>
                  <p className="text-sm text-subtext text-left">.com</p>
                </div>
              </div>

              <p className="text-subtext mb-6 leading-relaxed">
                English Like Jagger is a free online quiz site that will allow you to
                test your English knowledge in many areas. Play our grammar,
                vocabulary, pronunciation, reading, writing quizzes and much more!
              </p>

              {/* Social Media Section */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 text-text">Follow us on</h4>
                <div className="flex justify-center lg:justify-start space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="bg-white dark:bg-card p-3 border border-border rounded-md transition-all duration-300 shadow-md hover:scale-110"
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quizzes & Games */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-text">Quizzes & Games</h4>
              <ul className="space-y-2">
                {quizzesGamesItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-subtext hover:text-secondary transition-colors text-sm block py-1"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-text">Information</h4>
              <ul className="space-y-2">
                {informationItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-subtext hover:text-secondary transition-colors text-sm block py-1"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Footer Bottom Section - Also needs the same margin adjustment */}
      <div className={`transition-all duration-300 ${
        isSidebarOpen ? 'xl:ml-64' : 'xl:ml-16'
      }`}>
        <FooterBottom currentYear={currentYear} policyItems={policyItems} />
      </div>
    </>
  );
};