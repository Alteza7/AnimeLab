"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Helper component for decorative ellipses
const Ellipse = ({ className = "" }) => (
  <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-[rgba(255,94,95,0.2)] rounded-full ${className}`} />
);

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [hoverTimer, setHoverTimer] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showHints) {
      const handleGlobalMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener('mousemove', handleGlobalMouseMove);
      return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
    }
  }, [showHints]);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setIsFadingOut(true); // Start with opacity 0 for fade in
    const timer = setTimeout(() => {
      setShowHints(true);
      // Trigger fade in
      setTimeout(() => {
        setIsFadingOut(false);
      }, 10);
    }, 400);
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
    // Fade out animation
    setIsFadingOut(true);
    setTimeout(() => {
      setShowHints(false);
      setIsFadingOut(false);
    }, 300); // Match transition duration
  };

  // Calculate shadow spread based on scroll position
  const shadowSpread = Math.min(50, scrollY * 0.1);

  return (
    <div className="relative bg-white overflow-x-hidden font-[var(--font-open-sans)]">
      {/* Hints Box - Fixed position following cursor */}
      {showHints && (
        <div 
          className={`fixed z-[9999] pointer-events-none transition-all duration-300 ease-in-out ${
            isFadingOut ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
          style={{
            left: typeof window !== 'undefined' 
              ? `${Math.min(Math.max(mousePosition.x, 100), window.innerWidth - 100)}px`
              : `${mousePosition.x}px`,
            top: typeof window !== 'undefined'
              ? `${Math.min(mousePosition.y + 50, window.innerHeight - 100)}px`
              : `${mousePosition.y + 50}px`,
            transform: isFadingOut ? 'translateX(-50%) translateY(10px)' : 'translateX(-50%) translateY(0)',
          }}
        >
          {/* Main Hints Box - Liquid Glass Effect */}
          <div 
            className="relative px-4 py-3 w-[240px] sm:w-[260px]"
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(40px) saturate(200%)',
              WebkitBackdropFilter: 'blur(40px) saturate(200%)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: `
                0 8px 32px 0 rgba(0, 0, 0, 0.12),
                0 2px 8px 0 rgba(0, 0, 0, 0.08),
                inset 0 1px 0 0 rgba(255, 255, 255, 0.6),
                inset 0 -1px 0 0 rgba(0, 0, 0, 0.05)
              `,
            }}
          >
            {/* Outer glow layer */}
            <div 
              className="absolute -inset-[1px] rounded-[20px] -z-10"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            />
            
            {/* Glass reflection effect - multiple layers */}
            <div 
              className="absolute inset-0 rounded-[20px] opacity-30"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
            
            <div 
              className="absolute top-0 left-0 right-0 h-1/2 rounded-t-[20px] opacity-20"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
            
            {/* Content with icon and text */}
            <div className="relative z-10 flex items-start gap-3">
              {/* Lightbulb Icon */}
              <div className="flex-shrink-0 mt-0.5">
                <svg 
                  className="w-5 h-5 text-black opacity-80" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                  />
                </svg>
              </div>
              
              {/* Text content */}
              <p 
                className="text-sm sm:text-base font-[var(--font-open-sans)] text-black leading-relaxed text-left flex-1"
                style={{
                  textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
                }}
              >
                AI akan milihin anime yang pas untuk kamu liat saat ini
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Hero Section - White Background */}
      <div className="relative min-h-screen bg-white">
        {/* Navbar */}
        <nav className="relative z-50 w-full px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between relative">
            {/* AnimeLab Logo */}
            <h1 
              className="relative z-10 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-[var(--font-open-sans)] font-bold leading-tight tracking-[0.045em] [text-shadow:0px_0px_30px_rgba(255,112,166,0.2)]"
            >
              <span className="text-black">Anime</span>
              <span className="text-[#FF5E5F]">Lab</span>
            </h1>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 relative z-10">
              <a 
                href="#" 
                className="text-sm xl:text-[15px] font-[var(--font-open-sans)] font-normal leading-5 tracking-[0.045em] text-black hover:opacity-80 transition-opacity [text-shadow:0px_0px_10px_rgba(255,112,166,0.2)]"
              >
                Anime List
              </a>
              
              <a 
                href="#" 
                className="text-sm xl:text-[15px] font-[var(--font-open-sans)] font-normal leading-5 tracking-[0.045em] text-black hover:opacity-80 transition-opacity [text-shadow:0px_0px_10px_rgba(255,112,166,0.2)]"
              >
                Gacha Anime
              </a>
              
              <a 
                href="#" 
                className="text-sm xl:text-[15px] font-[var(--font-open-sans)] font-normal leading-5 tracking-[0.045em] text-black hover:opacity-80 transition-opacity [text-shadow:0px_0px_10px_rgba(255,112,166,0.2)]"
              >
                My Kisah Generator
              </a>

              {/* Search Icon */}
              <button className="w-4 h-4 xl:w-[18px] xl:h-[18px] hover:opacity-80 transition-opacity">
                <svg width="100%" height="100%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" 
                    fill="#1E1E1E"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden w-6 h-6 flex flex-col justify-center gap-1.5 relative z-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-full h-0.5 bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col gap-4 pt-4">
                <a 
                  href="#" 
                  className="text-base font-[var(--font-open-sans)] font-normal tracking-[0.045em] text-black hover:opacity-80 transition-opacity [text-shadow:0px_0px_10px_rgba(255,112,166,0.2)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Anime List
                </a>
                
                <a 
                  href="#" 
                  className="text-base font-[var(--font-open-sans)] font-normal tracking-[0.045em] text-black hover:opacity-80 transition-opacity [text-shadow:0px_0px_10px_rgba(255,112,166,0.2)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gacha Anime
                </a>
                
                <a 
                  href="#" 
                  className="text-base font-[var(--font-open-sans)] font-normal tracking-[0.045em] text-black hover:opacity-80 transition-opacity [text-shadow:0px_0px_10px_rgba(255,112,166,0.2)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Kisah Generator
                </a>

                <button className="w-5 h-5 self-start hover:opacity-80 transition-opacity">
                  <svg width="100%" height="100%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" 
                      fill="#1E1E1E"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-12 lg:pb-20 mt-8 sm:mt-12 lg:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="order-2 lg:order-1 space-y-6 sm:space-y-8 relative">
              {/* Main Heading */}
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-[var(--font-open-sans)] font-bold leading-tight sm:leading-[1.3] lg:leading-[49px] tracking-[0.045em] relative z-10"
              >
                <span className="text-black">Mau liat anime apa hari ini? yuk tekan tombol </span>
                <span className="text-[#FF5E5F]">mulai...</span>
              </h2>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 relative">
                {/* Dots di belakang tombol MULAI */}
                <div className="hidden md:block absolute -left-8 sm:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-0">
                  <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-7 gap-2 sm:gap-2.5 lg:gap-3">
                    {Array.from({ length: 35 }).map((_, i) => (
                      <Ellipse key={`buttonDots-${i}`} />
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <button 
                    className="relative z-10 w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-[10px] bg-[#FF5E5F] rounded-[2px] hover:opacity-90 transition-opacity cursor-pointer [box-shadow:0px_0px_10px_rgba(255,112,166,0.2)]"
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span 
                      className="font-[var(--font-open-sans)] font-bold text-base leading-[22px] text-center tracking-[0.045em] text-white block [text-shadow:0px_0px_10px_rgba(0,0,0,0.25)]"
                    >
                      MULAI
                    </span>
                  </button>
                </div>

                {/* Aja Sendiri! Text */}
                <a 
                  href="#"
                  className="relative z-10 font-[var(--font-open-sans)] font-bold text-base leading-[22px] tracking-[0.045em] text-[#FF5E5F] hover:opacity-80 transition-opacity cursor-pointer"
                >
                  Cari Aja Sendiri!
                </a>
              </div>
            </div>

            {/* Right Column - Character Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
              {/* Dots di belakang foto Ichika */}
              <div className="hidden md:block absolute -right-8 sm:-right-12 lg:-right-16 top-1/2 -translate-y-1/2 z-0">
                <div className="grid grid-cols-6 sm:grid-cols-7 lg:grid-cols-8 gap-2 sm:gap-2.5 lg:gap-3">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <Ellipse key={`imageDots-${i}`} />
                  ))}
                </div>
              </div>

              <div className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[364px] aspect-[364/468]">
                <Image
                  src="/assets/images/ichika.png"
                  alt="Ichika"
                  fill
                  className="object-contain"
                  priority
                  unoptimized
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 364px"
                  onError={(e) => {
                    console.error('Error loading image:', e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Updated Section - Visually Balanced & Comfortable */}
      <div 
        className="relative w-full text-gray-800 z-40 -mt-8 lg:-mt-12"
        style={{
          background: '#FFDFDF',
          boxShadow: `0 -${10 + shadowSpread}px ${20 + shadowSpread * 2}px rgba(255, 140, 140, 0.15)`
        }}
      >
        {/* Soft overlay to tone down the pink */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            mixBlendMode: 'multiply'
          }}
        />

        <div className="relative z-10 w-full">
          {/* Anime Sections */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16 space-y-16 lg:space-y-20">
            {/* Favorit Admin Section */}
            <section>
              <div className="relative">
                <h2 
                  className="text-2xl sm:text-3xl lg:text-4xl font-[var(--font-open-sans)] font-bold mb-6 lg:mb-8 text-white relative z-20 px-4 py-1.5 inline-block rounded-md bg-[#FF5E5F] shadow-sm"
                  style={{
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  Favorit Admin
                </h2>
              </div>
              <div className="relative mt-4">
                <div className="relative overflow-x-auto scrollbar-hide pb-4 pt-2">
                  <div className="flex gap-6 w-max min-w-full">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={`favorit-${i}`} className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] cursor-pointer group">
                        <div className="relative aspect-[2/3] bg-white rounded-lg overflow-hidden mb-3 hover:scale-[1.02] transition-transform duration-300 shadow-sm hover:shadow-md">
                          <div className="absolute inset-4 bg-[#F2C9C9] rounded-md z-0" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                            <h3 className="font-[var(--font-open-sans)] font-bold text-white text-lg sm:text-xl mb-2 line-clamp-2">
                              Anime Title {i + 1}
                            </h3>
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="font-[var(--font-open-sans)] text-white font-semibold text-sm sm:text-base">4.{i % 10}</span>
                            </div>
                          </div>
                          <div className="relative z-10 w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">Image {i + 1}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Fade effect */}
                <div 
                  className="absolute right-0 top-0 bottom-4 w-32 pointer-events-none z-10"
                  style={{
                    background: 'linear-gradient(to left, rgba(255, 223, 223, 0.95), transparent)',
                  }}
                />
              </div>
            </section>

            {/* Highlight Section */}
            <section>
              <div className="relative">
                <h2 
                  className="text-2xl sm:text-3xl lg:text-4xl font-[var(--font-open-sans)] font-bold mb-6 lg:mb-8 text-white relative z-20 px-4 py-1.5 inline-block rounded-md bg-[#FF5E5F] shadow-sm"
                  style={{
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  Highlight
                </h2>
              </div>
              <div className="relative mt-4">
                <div className="relative overflow-x-auto scrollbar-hide pb-4 pt-2">
                  <div className="flex gap-6 w-max min-w-full">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={`highlight-${i}`} className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] cursor-pointer group">
                        <div className="relative aspect-[2/3] bg-white rounded-lg overflow-hidden mb-3 hover:scale-[1.02] transition-transform duration-300 shadow-sm hover:shadow-md">
                          <div className="absolute inset-4 bg-[#F2C9C9] rounded-md z-0" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                            <h3 className="font-[var(--font-open-sans)] font-bold text-white text-lg sm:text-xl mb-2 line-clamp-2">
                              Anime Title {i + 1}
                            </h3>
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="font-[var(--font-open-sans)] text-white font-semibold text-sm sm:text-base">4.{i % 10}</span>
                            </div>
                          </div>
                          <div className="relative z-10 w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">Image {i + 1}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div 
                  className="absolute right-0 top-0 bottom-4 w-32 pointer-events-none z-10"
                  style={{
                    background: 'linear-gradient(to left, rgba(255, 223, 223, 0.95), transparent)',
                  }}
                />
              </div>
            </section>

            {/* Newest Section */}
            <section>
              <div className="relative">
                <h2 
                  className="text-2xl sm:text-3xl lg:text-4xl font-[var(--font-open-sans)] font-bold mb-6 lg:mb-8 text-white relative z-20 px-4 py-1.5 inline-block rounded-md bg-[#FF5E5F] shadow-sm"
                  style={{
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  Newest
                </h2>
              </div>
              <div className="relative mt-4">
                <div className="relative overflow-x-auto scrollbar-hide pb-4 pt-2">
                  <div className="flex gap-6 w-max min-w-full">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={`newest-${i}`} className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] cursor-pointer group">
                        <div className="relative aspect-[2/3] bg-white rounded-lg overflow-hidden mb-3 hover:scale-[1.02] transition-transform duration-300 shadow-sm hover:shadow-md">
                          <div className="absolute inset-4 bg-[#F2C9C9] rounded-md z-0" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                            <h3 className="font-[var(--font-open-sans)] font-bold text-white text-lg sm:text-xl mb-2 line-clamp-2">
                              Anime Title {i + 1}
                            </h3>
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="font-[var(--font-open-sans)] text-white font-semibold text-sm sm:text-base">4.{i % 10}</span>
                            </div>
                          </div>
                          <div className="relative z-10 w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">Image {i + 1}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div 
                  className="absolute right-0 top-0 bottom-4 w-32 pointer-events-none z-10"
                  style={{
                    background: 'linear-gradient(to left, rgba(255, 223, 223, 0.95), transparent)',
                  }}
                />
              </div>
            </section>
          </div>

          {/* Credit Text */}
          <div 
            className="w-full border-t py-6 lg:py-8"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.3)', // Putih transparan halus
              borderTopWidth: '1px'
            }}
          >
            <p 
              className="text-center text-sm sm:text-base font-[var(--font-open-sans)] text-gray-700 leading-tight"
              style={{
                textShadow: '0 1px 1px rgba(255, 255, 255, 0.8)' // Agar lebih mudah dibaca
              }}
            >
              © 2024 AnimeLab. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}