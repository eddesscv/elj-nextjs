import React from 'react';

interface FooterBottomProps {
  currentYear: number;
  policyItems: Array<{ name: string; href: string }>;
}

export const FooterBottom: React.FC<FooterBottomProps> = ({ currentYear, policyItems }) => {
  return (
    <div className="bg-card border-t border-border py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Left - Copyright */}
          <p className="text-subtext text-sm text-center lg:text-left">
            © {currentYear} EnglishLikeJagger.com - All rights reserved
          </p>

          {/* Right - Links */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-4 text-sm">
            {policyItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-subtext hover:text-secondary transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};