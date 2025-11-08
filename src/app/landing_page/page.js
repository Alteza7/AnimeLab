"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"

// Particle Background Component
const Particles = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none"></div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-[#FF5E5F] rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float 6s ease-in-out ${i * 0.4}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

// Floating Anime Card Component
const AnimeCard = ({ index, title, category, image }) => (
  <div
    className="group relative aspect-[3/4] bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-100"
    style={{
      animation: `float 4s ease-in-out ${index * 0.2}s infinite`,
    }}>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

    {/* Image Placeholder */}
    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
      <div className="text-gray-500 text-sm text-center">
        <div className="w-16 h-16 bg-[#FF5E5F] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">
          {index + 1}
        </div>
        {title}
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 z-20">
      <div className="flex justify-between items-start">
        <h3 className="text-white font-bold text-sm truncate flex-1">
          {title}
        </h3>
        <span className="bg-[#FF5E5F] text-white text-xs px-2 py-1 rounded-full font-bold ml-2">
          {category}
        </span>
      </div>
      <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        <span className="text-gray-300 text-xs">Now Streaming</span>
      </div>
    </div>

    {/* Hover shine effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
  </div>
)

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay }) => (
  <div
    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
    style={{
      animation: `slideIn 0.6s ease-out ${delay}s both`,
    }}>
    <div className="w-12 h-12 bg-gradient-to-br from-[#FF5E5F] to-[#ff8e8f] rounded-xl flex items-center justify-center text-white text-xl mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="font-bold text-lg mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
)

export default function CreativeLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Enhanced shadow effect
  const shadowSpread = Math.min(80, scrollY * 0.15)

  // Mouse parallax effect
  const mouseParallax = {
    transform: `translate(${mousePosition.x * 0.01}px, ${
      mousePosition.y * 0.01
    }px)`,
  }

  return (
    <div className="relative bg-white overflow-x-hidden font-sans">
      {/* Enhanced CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(255, 94, 95, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 94, 95, 0.6);
          }
        }

        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .animate-slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .text-glow {
          text-shadow: 0 0 30px rgba(255, 94, 95, 0.5);
        }

        .typewriter {
          overflow: hidden;
          border-right: 2px solid #ff5e5f;
          white-space: nowrap;
          animation: typewriter 3s steps(40) 1s both;
        }
      `}</style>

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-pink-50 overflow-hidden">
        <Particles />

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div
            className="absolute w-96 h-96 bg-[#FF5E5F] rounded-full blur-3xl opacity-5"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transition: "all 0.3s ease-out",
            }}
          />
        </div>

        {/* Navigation */}
        <nav className="relative z-50 w-full px-6 lg:px-12 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF5E5F] to-[#ff8e8f] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <h1 className="text-2xl font-bold">
                <span className="text-gray-900">Anime</span>
                <span className="text-[#FF5E5F]">Lab</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {["Home", "Anime List", "Genres", "Schedule"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-[#FF5E5F] font-medium transition-colors duration-300 relative group">
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF5E5F] group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              <button className="bg-gradient-to-r from-[#FF5E5F] to-[#ff8e8f] text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Sign In
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-6 h-6 flex flex-col justify-center gap-1 relative z-10 group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span
                className={`block w-full h-0.5 bg-gray-800 transition-all duration-300 group-hover:bg-[#FF5E5F] ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}></span>
              <span
                className={`block w-full h-0.5 bg-gray-800 transition-all duration-300 group-hover:bg-[#FF5E5F] ${
                  isMenuOpen ? "opacity-0" : ""
                }`}></span>
              <span
                className={`block w-full h-0.5 bg-gray-800 transition-all duration-300 group-hover:bg-[#FF5E5F] ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}></span>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden transition-all duration-500 overflow-hidden ${
              isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}>
            <div className="flex flex-col space-y-4 py-4">
              {["Home", "Anime List", "Genres", "Schedule"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-[#FF5E5F] font-medium transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}>
                  {item}
                </a>
              ))}
              <button className="bg-gradient-to-r from-[#FF5E5F] to-[#ff8e8f] text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 w-full">
                Sign In
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-12 lg:pt-20 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-100">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Streaming Now - 1000+ Anime
                  </span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="text-gray-900">Discover Your </span>
                  <span className="bg-gradient-to-r from-[#FF5E5F] to-[#ff8e8f] bg-clip-text text-transparent">
                    Next Favorite
                  </span>
                  <span className="text-gray-900"> Anime</span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed">
                  Dive into the world of anime with curated recommendations,
                  exclusive content, and a community of passionate fans.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group relative bg-gradient-to-r from-[#FF5E5F] to-[#ff8e8f] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <span className="relative z-10">Start Watching Free</span>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF5E5F] to-[#ff8e8f] opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10"></div>
                </button>

                <button className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:border-[#FF5E5F] hover:text-[#FF5E5F] transition-all duration-300 transform hover:scale-105">
                  <span>Explore Library</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {[
                  { number: "10K+", label: "Anime Titles" },
                  { number: "5M+", label: "Community" },
                  { number: "24/7", label: "Streaming" },
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Transparent 3D Ichika Visual */}
            <div className="relative">
              {/* 3D Container */}
              <div
                className="relative w-full max-w-lg mx-auto aspect-364/468 transform-style-preserve-3d perspective-1000"
                style={mouseParallax}>
                {/* Main 3D Image Container */}
                <div className="relative w-full h-full transform transition-all duration-700 hover:rotate-y-12 hover:rotate-x-6 group">
                  {/* Ichika Image with Enhanced 3D Effects */}
                  <div className="relative w-full h-full transform transition-all duration-500 group-hover:scale-110 group-hover:translate-z-20">
                    <Image
                      src="/assets/images/ichika.png"
                      alt="Ichika Nakano"
                      fill
                      className="object-contain drop-shadow-2xl"
                      priority
                      sizes="(max-width: 768px) 280px, 364px"
                    />

                    {/* Enhanced Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </div>

                {/* Enhanced Floating 3D Elements */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl flex items-center justify-center text-[#FF5E5F] text-lg transform rotate-12 translate-z-30 group-hover:rotate-45 group-hover:scale-110 group-hover:translate-y-2 transition-all duration-500 z-10">
                  ✨
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF5E5F] to-[#ff8e8f] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                </div>

                <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl flex items-center justify-center text-[#FF5E5F] text-lg transform -rotate-12 translate-z-25 group-hover:-rotate-45 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 z-10">
                  ⭐
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF5E5F] to-[#ff8e8f] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                </div>

                {/* Additional Floating Element */}
                <div className="absolute top-1/2 -right-8 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center text-[#FF5E5F] transform translate-y-4 translate-z-20 group-hover:translate-y-2 group-hover:scale-120 group-hover:rotate-12 transition-all duration-500 z-5">
                  ❤️
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-[#FF5E5F]">AnimeLab</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience anime like never before with our premium features and
              exclusive content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="🎬"
              title="HD Streaming"
              description="Watch your favorite anime in crystal clear HD quality with no buffering"
              delay={0.1}
            />
            <FeatureCard
              icon="📱"
              title="Multi-Device"
              description="Stream on any device - phone, tablet, computer, or smart TV"
              delay={0.2}
            />
            <FeatureCard
              icon="🚀"
              title="No Ads"
              description="Enjoy uninterrupted anime streaming with our premium ad-free experience"
              delay={0.3}
            />
            <FeatureCard
              icon="🎯"
              title="Smart Recommendations"
              description="Get personalized anime suggestions based on your watching history"
              delay={0.4}
            />
            <FeatureCard
              icon="📅"
              title="New Episodes"
              description="Latest episodes available immediately after Japanese broadcast"
              delay={0.5}
            />
            <FeatureCard
              icon="👥"
              title="Community"
              description="Join discussions with millions of anime fans worldwide"
              delay={0.6}
            />
          </div>
        </div>
      </div>

      {/* Anime Showcase Sections */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20">
          {/* Trending Now Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  🔥 Trending Now
                </h2>
                <p className="text-gray-600">Most watched anime this week</p>
              </div>
              <button className="hidden lg:flex items-center space-x-2 text-[#FF5E5F] font-semibold hover:underline">
                <span>View All</span>
                <span>→</span>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <AnimeCard
                  key={`trending-${i}`}
                  index={i}
                  title={`Trending ${i + 1}`}
                  category="Action"
                />
              ))}
            </div>
          </section>

          {/* New Releases Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  🆕 New Releases
                </h2>
                <p className="text-gray-600">Fresh episodes just dropped</p>
              </div>
              <button className="hidden lg:flex items-center space-x-2 text-[#FF5E5F] font-semibold hover:underline">
                <span>View All</span>
                <span>→</span>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <AnimeCard
                  key={`new-${i}`}
                  index={i}
                  title={`New ${i + 1}`}
                  category="Romance"
                />
              ))}
            </div>
          </section>

          {/* Popular Genres Section */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Explore <span className="text-[#FF5E5F]">Genres</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover anime across various genres and find your next favorite
                series
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  name: "Action",
                  emoji: "⚡",
                  color: "from-red-500 to-pink-500",
                },
                {
                  name: "Romance",
                  emoji: "💖",
                  color: "from-pink-500 to-rose-500",
                },
                {
                  name: "Comedy",
                  emoji: "😂",
                  color: "from-yellow-500 to-orange-500",
                },
                {
                  name: "Fantasy",
                  emoji: "✨",
                  color: "from-purple-500 to-indigo-500",
                },
                {
                  name: "Sci-Fi",
                  emoji: "🚀",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  name: "Slice of Life",
                  emoji: "🌸",
                  color: "from-green-500 to-emerald-500",
                },
              ].map((genre, index) => (
                <div
                  key={genre.name}
                  className="group bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 cursor-pointer">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${genre.color} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {genre.emoji}
                  </div>
                  <h3 className="font-bold text-gray-800">{genre.name}</h3>
                  <div className="text-xs text-gray-500 mt-2">Explore →</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-[#FF5E5F] to-[#ff8e8f] py-20 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 lg:px-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Anime Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join millions of anime fans and discover your next favorite series
            today. No credit card required to start your free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#FF5E5F] px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
          <p className="text-white/70 text-sm mt-6">
            7-day free trial • Cancel anytime
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#FF5E5F] to-[#ff8e8f] rounded-lg flex items-center justify-center text-white font-bold">
                  A
                </div>
                <h3 className="text-xl font-bold">
                  <span className="text-gray-900">Anime</span>
                  <span className="text-[#FF5E5F]">Lab</span>
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Your ultimate destination for anime streaming, community, and
                discovery.
              </p>
              <div className="flex space-x-4">
                {["twitter", "facebook", "instagram", "discord"].map(
                  (social) => (
                    <div
                      key={social}
                      className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-[#FF5E5F] hover:text-white transition-all duration-300 cursor-pointer">
                      {social === "twitter"
                        ? "🐦"
                        : social === "facebook"
                        ? "📘"
                        : social === "instagram"
                        ? "📷"
                        : "🎮"}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Explore",
                links: ["Browse Anime", "Genres", "Schedule", "Movies"],
              },
              {
                title: "Account",
                links: [
                  "Sign In",
                  "Create Account",
                  "Subscription",
                  "Help Center",
                ],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Contact", "Privacy Policy"],
              },
            ].map((section, index) => (
              <div key={section.title} className="space-y-4">
                <h4 className="font-bold text-gray-900">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-[#FF5E5F] transition-colors duration-300 text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              © 2024 AnimeLab. All rights reserved. Made with ❤️ for anime
              lovers.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-600 hover:text-[#FF5E5F] text-sm transition-colors duration-300">
                Terms
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[#FF5E5F] text-sm transition-colors duration-300">
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[#FF5E5F] text-sm transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
