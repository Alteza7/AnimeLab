"use client";

import Image from "next/image";
import { useState } from "react";

// Helper component for decorative ellipses
const Ellipse = ({ className = "" }) => (
  <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-[rgba(255,94,95,0.2)] rounded-full ${className}`} />
);

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden font-[var(--font-open-sans)]">
      {/* Navbar */}
      <nav className="relative z-50 w-full px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* Dots di belakang AnimeLab Logo - agak keluar menyamping ke kanan */}
          <div className="hidden md:block absolute -left-8 sm:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-0">
            <div className="grid grid-cols-6 sm:grid-cols-7 lg:grid-cols-8 gap-2 sm:gap-2.5 lg:gap-3">
              {Array.from({ length: 48 }).map((_, i) => (
                <Ellipse key={`logoDots-${i}`} />
              ))}
            </div>
          </div>

          {/* AnimeLab Logo */}
          <h1 
            className="relative z-10 text-2xl sm:text-3xl lg:text-[40px] font-bold leading-tight tracking-[0.045em]"
            style={{ 
              fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              textShadow: "0px 0px 30px rgba(255, 112, 166, 0.2)"
            }}
          >
            <span className="text-black">Anime</span>
            <span className="text-[#FF5E5F]">Lab</span>
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 relative z-10">
            <a 
              href="#" 
              className="text-sm xl:text-[15px] font-normal leading-5 tracking-[0.045em] text-black hover:opacity-80 transition-opacity"
              style={{ 
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                textShadow: "0px 0px 10px rgba(255, 112, 166, 0.2)"
              }}
            >
              Anime List
            </a>
            
            <a 
              href="#" 
              className="text-sm xl:text-[15px] font-normal leading-5 tracking-[0.045em] text-black hover:opacity-80 transition-opacity"
              style={{ 
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                textShadow: "0px 0px 10px rgba(255, 112, 166, 0.2)"
              }}
            >
              Gacha Anime
            </a>
            
            <a 
              href="#" 
              className="text-sm xl:text-[15px] font-normal leading-5 tracking-[0.045em] text-black hover:opacity-80 transition-opacity"
              style={{ 
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                textShadow: "0px 0px 10px rgba(255, 112, 166, 0.2)"
              }}
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
                className="text-base font-normal tracking-[0.045em] text-black hover:opacity-80 transition-opacity"
                style={{ 
                  fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                  textShadow: "0px 0px 10px rgba(255, 112, 166, 0.2)"
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Anime List
              </a>
              
              <a 
                href="#" 
                className="text-base font-normal tracking-[0.045em] text-black hover:opacity-80 transition-opacity"
                style={{ 
                  fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                  textShadow: "0px 0px 10px rgba(255, 112, 166, 0.2)"
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Gacha Anime
              </a>
              
              <a 
                href="#" 
                className="text-base font-normal tracking-[0.045em] text-black hover:opacity-80 transition-opacity"
                style={{ 
                  fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                  textShadow: "0px 0px 10px rgba(255, 112, 166, 0.2)"
                }}
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-12 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1 space-y-6 sm:space-y-8 relative">
            {/* Main Heading */}
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold leading-tight sm:leading-[1.3] lg:leading-[49px] tracking-[0.045em] relative z-10"
              style={{ fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}
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

              <button 
                className="relative z-10 w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-[10px] bg-[#FF5E5F] rounded-[2px] hover:opacity-90 transition-opacity cursor-pointer"
                style={{ boxShadow: "0px 0px 10px rgba(255, 112, 166, 0.2)" }}
              >
                <span 
                  className="font-bold text-base leading-[22px] text-center tracking-[0.045em] text-white block"
                  style={{ 
                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                    textShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)"
                  }}
                >
                  MULAI
                </span>
              </button>

              {/* Aja Sendiri! Text */}
              <span 
                className="relative z-10 font-bold text-base leading-[22px] tracking-[0.045em] text-[#FF5E5F]"
                style={{ fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}
              >
                Aja Sendiri!
              </span>
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
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 364px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
