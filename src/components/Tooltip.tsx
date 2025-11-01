import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  text: string;
  parentRef: React.RefObject<HTMLElement>;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, parentRef, className = "" }) => {
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    const updatePosition = () => {
      const rect = parent.getBoundingClientRect();
      setCoords({
        top: rect.top + rect.height / 2,
        left: rect.right + 8, // 8px margin from the right edge
      });
    };

    updatePosition();

    // Update on scroll/resize
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [parentRef.current]);

  if (!coords) return null;

  return createPortal(
    <div
      className={`px-5 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded whitespace-nowrap pointer-events-none z-[9999] ${className}`}
      style={{
        position: "fixed",
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        transform: "translateY(-50%)",
      }}
    >
      {text}
      {/* Tooltip arrow */}
      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-700" />
    </div>,
    document.body
  );
};