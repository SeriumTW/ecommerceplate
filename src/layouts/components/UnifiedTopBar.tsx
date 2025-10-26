"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { TopBarLink } from "@/types/navigation";

interface Announcement {
  icon: React.ReactNode;
  text: string;
  highlight?: string;
  badge?: string;
  badgeColor?: string;
}

interface UnifiedTopBarProps {
  links: TopBarLink[];
}

const UnifiedTopBar: React.FC<UnifiedTopBarProps> = ({ links }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const announcements: Announcement[] = [
    {
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
        </svg>
      ),
      text: "Spedizione gratuita",
      highlight: "oltre 49€",
      badge: "FREE",
      badgeColor: "bg-success",
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      text: "Offerta del giorno:",
      highlight: "-20% cibo biologico",
      badge: "HOT",
      badgeColor: "bg-error",
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      text: "Nuovi arrivi:",
      highlight: "giochi interattivi",
      badge: "NEW",
      badgeColor: "bg-primary-hover",
    },
  ];

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
      }, 8000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, announcements.length]);

  const currentAnnouncement = announcements[currentIndex];

  return (
    <div
      className="bg-gradient-to-r from-primary via-primary-hover to-primary dark:from-darkmode-primary dark:via-darkmode-primary-hover dark:to-darkmode-primary text-white shadow-sm relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.15),transparent)]" />
      </div>

      <div className="container relative z-10">
        <div className="flex items-center justify-between py-2.5 gap-4">
          {/* Left: Rotating Announcements */}
          <div className="flex-1 flex items-center justify-center lg:justify-start gap-2.5 min-h-[24px]">
            {/* Badge (mobile hidden) */}
            {currentAnnouncement.badge && (
              <span
                className={`hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-black uppercase ${currentAnnouncement.badgeColor} text-white shadow-sm`}
              >
                {currentAnnouncement.badge}
              </span>
            )}

            {/* Icon */}
            <span className="flex-shrink-0">{currentAnnouncement.icon}</span>

            {/* Text with animation */}
            <div
              key={currentIndex}
              className="text-xs md:text-sm font-medium animate-[slideIn_0.5s_ease-out]"
            >
              <span>{currentAnnouncement.text} </span>
              {currentAnnouncement.highlight && (
                <span className="font-bold">
                  {currentAnnouncement.highlight}
                </span>
              )}
            </div>

            {/* Progress dots (desktop) */}
            <div className="hidden md:flex items-center gap-1 ml-2">
              {announcements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="group"
                  aria-label={`Annuncio ${index + 1}`}
                >
                  <span
                    className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-white w-4"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Utility Links (desktop) */}
          {links?.length > 0 && (
            <div className="hidden lg:flex items-center gap-4 text-xs font-medium">
              {links.map(({ label, url }) => (
                <Link
                  key={label}
                  href={url}
                  className="hover:underline transition-all whitespace-nowrap"
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {!isPaused && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
          <div
            key={currentIndex}
            className="h-full bg-white/50 animate-[progress_8s_linear]"
          />
        </div>
      )}
    </div>
  );
};

export default UnifiedTopBar;
