"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const CareerMentorsComponent = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animationState, setAnimationState] = useState('stacked'); // 'stacked', 'expanding', 'complete'
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  const rafRef = useRef(null);

  // Memoized companies data
  const companies = useMemo(() => [
    { 
      name: 'Cisco', 
      mentors: 8, 
      experience: '12+',
      color: '#1e40af',
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119549/A_czofnz.avif'
    },
    { 
      name: 'Accenture', 
      mentors: 12, 
      experience: '11+',
      color: '#7c3aed',
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119549/B_ur486e.avif'
    },
    { 
      name: 'Amdocs', 
      mentors: 6, 
      experience: '13+',
      color: '#374151',
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119549/C_vsjkiy.avif'
    },
    { 
      name: 'Tech Mahindra', 
      mentors: 10, 
      experience: '10+',
      color: '#f59e0b',
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119537/D_wabstj.avif'
    },
    { 
      name: 'Meta', 
      mentors: 7, 
      experience: '9+',
      color: '#3b82f6',
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119537/E_posvv7.avif'
    },
    { 
      name: 'Netflix', 
      mentors: 5, 
      experience: '8+',
      color: '#dc2626',
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119548/F_ik0hbh.avif'
    },
    { 
      name: 'Tesla', 
      mentors: 4, 
      experience: '14+',
      color: '#991b1b',
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119538/G_ea3rjb.avif'
    },
    { 
      name: 'Spotify', 
      mentors: 6, 
      experience: '7+',
      color: '#059669',
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119538/H_ulxtbz.avif'
    },
    { 
      name: 'Adobe', 
      mentors: 8, 
      experience: '11+',
      color: '#dc2626',
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119538/I_pvoktw.avif'
    },
    { 
      name: 'Salesforce', 
      mentors: 9, 
      experience: '10+',
      color: '#0ea5e9',
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119537/J_nek9z0.avif'
    },
    { 
      name: 'Uber', 
      mentors: 5, 
      experience: '8+',
      color: '#374151',
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119537/K_vfcxtt.avif'
    },
    { 
      name: 'Airbnb', 
      mentors: 7, 
      experience: '9+',
      color: '#e11d48',
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119537/L_mq7q48.avif'
    }
  ], []);

  // Memoized background particles count
  const particleCount = useMemo(() => 
    windowSize.width < 768 ? 15 : 25, [windowSize.width]
  );

  // Optimized throttle function
  const throttle = useCallback((func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }, []);

  // Handle window resize with debouncing
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 100);
    };

    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Animation sequence with cleanup
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationState('expanding');
    }, 1000);

    const timer2 = setTimeout(() => {
      setAnimationState('complete');
    }, 2500);

    animationTimeoutRef.current = { timer1, timer2 };

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Optimized mouse move handler
  const handleMouseMove = useCallback((e) => {
    if (containerRef.current && animationState === 'complete' && windowSize.width >= 768) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      setMousePosition({
        x: (e.clientX - centerX) / (rect.width / 2),
        y: (e.clientY - centerY) / (rect.height / 2)
      });
    }
  }, [animationState, windowSize.width]);

  // Throttled mouse move with RAF optimization
  useEffect(() => {
    const throttledMouseMove = throttle((e) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => handleMouseMove(e));
    }, 16);
    
    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [throttle, handleMouseMove]);

  // Memoized position calculations
  const getLogoPosition = useCallback((index, total) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    let radius;
    
    // Optimized radius calculation
    if (windowSize.width < 375) radius = 100;
    else if (windowSize.width < 480) radius = 120;
    else if (windowSize.width < 640) radius = 140;
    else if (windowSize.width < 768) radius = 150;
    else if (windowSize.width < 1024) radius = 150;
    else if (windowSize.width < 1280) radius = 180;
    else radius = 200;
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  }, [windowSize.width]);

  // Memoized mouse influence calculation
  const getMouseInfluence = useCallback((logoX, logoY) => {
    if (animationState !== 'complete' || windowSize.width < 768) 
      return { x: 0, y: 0, scale: 1 };
    
    const mouseInfluence = 0.1;
    const distance = Math.sqrt(
      Math.pow(mousePosition.x * 200 - logoX, 2) + 
      Math.pow(mousePosition.y * 200 - logoY, 2)
    );
    
    const maxDistance = 150;
    const influence = Math.max(0, 1 - distance / maxDistance);
    
    return {
      x: mousePosition.x * mouseInfluence * influence * 30,
      y: mousePosition.y * mouseInfluence * influence * 30,
      scale: 1 + influence * 0.1
    };
  }, [animationState, windowSize.width, mousePosition]);

  // Memoized transform calculation
  const getLogoTransform = useCallback((index) => {
    const position = getLogoPosition(index, companies.length);
    const mouseInfluence = getMouseInfluence(position.x, position.y);
    
    switch (animationState) {
      case 'stacked':
        return {
          transform: `translate3d(0px, 0px, 0) scale(0.8)`,
          opacity: 0.5,
          zIndex: companies.length - index
        };
      
      case 'expanding':
        return {
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(1)`,
          opacity: 1,
          zIndex: 10,
          transition: `all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
          transitionDelay: `${index * 100}ms`
        };
      
      case 'complete':
        return {
          transform: `translate3d(${position.x + mouseInfluence.x}px, ${position.y + mouseInfluence.y}px, 0) scale(${mouseInfluence.scale})`,
          opacity: 1,
          zIndex: 10,
          transition: windowSize.width >= 768 ? 'transform 0.3s ease-out' : 'none'
        };
      
      default:
        return {};
    }
  }, [getLogoPosition, getMouseInfluence, animationState, companies.length, windowSize.width]);

  // Memoized size calculations
  const logoSize = useMemo(() => {
    if (windowSize.width < 375) return 'w-14 h-14';
    if (windowSize.width < 480) return 'w-14 h-14';
    if (windowSize.width < 640) return 'w-16 h-16';
    if (windowSize.width < 768) return 'w-20 h-20';
    if (windowSize.width < 1024) return 'w-20 h-20';
    return 'w-20 h-20 lg:w-24 lg:h-24';
  }, [windowSize.width]);

  const centralHubSize = useMemo(() => {
    if (windowSize.width < 375) return 'w-20 h-16';
    if (windowSize.width < 480) return 'w-24 h-20';
    if (windowSize.width < 640) return 'w-28 h-24';
    if (windowSize.width < 768) return 'w-32 h-26';
    return 'w-32 h-28 lg:w-40 lg:h-32';
  }, [windowSize.width]);

  // Memoized PlacementBadge component
  const PlacementBadge = useMemo(() => (
    <div className="relative group max-w-md mx-auto lg:mx-0">
      {/* Blue glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-500 to-blue-600 rounded-2xl sm:rounded-3xl blur-xl opacity-15 group-hover:opacity-25 transition-opacity duration-500 will-change-opacity"></div>

      {/* Secondary soft blue glow for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 rounded-2xl sm:rounded-3xl blur-2xl opacity-10 group-hover:opacity-15 transition-opacity duration-700 will-change-opacity"></div>

      <div className="relative bg-gradient-to-br from-blue-300 via-blue-500 to-blue-600 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 shadow-2xl border border-white/20 backdrop-blur-sm">
        {/* Inner glow layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl sm:rounded-3xl"></div>

        <div className="relative flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl p-1.5 sm:p-2 backdrop-blur-sm">
              <img
                src="https://res.cloudinary.com/drvug594q/image/upload/v1754119537/medal_lyetf6.avif"
                alt="Medal icon"
                className="w-full h-full object-contain filter brightness-110"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-white/15 rounded-xl animate-ping opacity-20"></div>
            {/* Sparkle effect */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full opacity-80 animate-pulse"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1 drop-shadow-sm">
              Assured Placement Opportunity
            </p>
            <p className="text-blue-100 text-xs sm:text-sm drop-shadow-sm">
              Career Support Program
            </p>
            <div className="mt-2 w-16 h-0.5 bg-white/30 rounded-full"></div>
          </div>
          {/* Blue sparkle badge dot */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-blue-200 rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  ), []);

  // Memoized background particles
  const backgroundParticles = useMemo(() => 
    [...Array(particleCount)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-blue-500/20 rounded-full animate-pulse will-change-transform"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }}
      />
    )), [particleCount]
  );

  // Memoized company logo components
  const companyLogos = useMemo(() => 
    companies.map((company, index) => {
      const logoStyle = getLogoTransform(index);
      
      return (
        <div
          key={`${company.name}-${index}`}
          className="absolute cursor-pointer group will-change-transform"
          style={logoStyle}
        >
          {/* Logo Container */}
          <div className="relative flex items-center justify-center">
            {/* Logo Background Circle */}
            <div 
              className={`${logoSize} rounded-full flex items-center justify-center shadow-lg transition-all duration-300 bg-blue-200 group-hover:scale-110 border-2 will-change-transform`}
              style={{
                borderColor: `${company.color}40`,
                boxShadow: `0 4px 20px ${company.color}15, 0 2px 10px rgba(0,0,0,0.1)`
              }}
            >
              {/* Logo */}
              <div className="relative w-3/4 h-3/4 flex items-center justify-center">
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 will-change-transform"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                    maxWidth: '80%',
                    maxHeight: '80%'
                  }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Glow effect */}
            <div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-xl will-change-opacity"
              style={{
                background: `radial-gradient(circle at center, ${company.color}, transparent 70%)`,
              }}
            ></div>
          </div>
        </div>
      );
    }), [companies, getLogoTransform, logoSize]
  );

  // Memoized connection lines
  const connectionLines = useMemo(() => {
    if (animationState !== 'complete') return null;

    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15" style={{ zIndex: 1 }}>
        <defs>
          <radialGradient id="connectionGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)"/>
            <stop offset="80%" stopColor="rgba(59, 130, 246, 0.1)"/>
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)"/>
          </radialGradient>
        </defs>
        {companies.map((_, index) => {
          const position = getLogoPosition(index, companies.length);
          return (
            <line
              key={`line-${index}`}
              x1="50%"
              y1="50%"
              x2={`${50 + (position.x / 4)}%`}
              y2={`${50 + (position.y / 4)}%`}
              stroke="url(#connectionGradient)"
              strokeWidth="1"
              opacity="0.4"
            />
          );
        })}
      </svg>
    );
  }, [animationState, companies, getLogoPosition]);

  return (
    <div
      className="relative bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/drvug594q/image/upload/v1754115800/image_bvmhs0.avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {backgroundParticles}
      </div>

      {/* Subtle ambient lighting */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-300/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-indigo-300/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 bg-sky-300/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 lg:py-12 min-h-[80vh] flex flex-col justify-center">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          
          {/* Main Heading - Mobile (Inline) */}
          <div className="text-center px-2 py-6">
            <div className="relative inline-block">
              <h1 className="text-xl xs:text-2xl sm:text-3xl font-black leading-tight text-gray-800">
                <span className="text-gray-800">Secure your </span>
                <span className="text-blue-600">Dream Career </span>
                <span className="text-gray-700">with Live Classes</span>
              </h1>
              
              {/* Mobile accent line */}
              <div className="absolute -left-3 sm:-left-4 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600 rounded-full">
                <div className="absolute top-0 left-0 w-full h-2 sm:h-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-4">
              From <span className="font-bold text-blue-600">Industry Experts</span>
            </p>
          </div>

          {/* Floating Logos Section - Mobile */}
          <div className="flex items-center justify-center py-4">
            <div className="relative w-full max-w-sm" style={{ height: '380px', minHeight: '300px' }} ref={containerRef}>
              
              {/* Central Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                <div 
                  className={`${centralHubSize} bg-white/80 backdrop-blur-xl border border-blue-200/30 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-1000 will-change-transform ${
                    animationState === 'stacked' ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
                  }`}
                >
                  <div className="text-center p-2">
                    <div className="text-gray-800 font-bold text-xs sm:text-sm mb-1">
                      Our Mentors
                    </div>
                    <div className="text-blue-600 font-semibold text-xs sm:text-sm">
                      Come From
                    </div>
                    <div className="mt-1 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto"></div>
                  </div>
                </div>
              </div>

              {/* Company Logos */}
              <div className="absolute inset-0 flex items-center justify-center">
                {companyLogos}
              </div>
            </div>
          </div>

          {/* Placement Badge - Mobile */}
          <div className="px-4 py-4">
            {PlacementBadge}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Content Section - Desktop */}
          <div className="space-y-8 lg:pr-12">
            
            {/* Main Heading - Desktop */}
            <div className="space-y-6">
              <div className="relative">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
                  <span className="block text-gray-800 mb-3 lg:mb-4">
                    Secure your
                  </span>
                  <span className="block text-blue-600 bg-clip-text mb-3 lg:mb-4">
                    Dream Career
                  </span>
                  <span className="block text-gray-700 text-3xl lg:text-4xl xl:text-5xl">
                    with Live Classes
                  </span>
                </h1>
                
                {/* Accent line */}
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600 rounded-full">
                  <div className="absolute top-0 left-0 w-full h-6 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                From <span className="font-bold text-blue-600">Industry Experts</span>
              </p>
            </div>

            {/* Placement Badge - Desktop */}
            {PlacementBadge}
          </div>

          {/* Right Floating Logos Section - Desktop */}
          <div className="relative flex items-center justify-center w-full" style={{ height: '550px', minHeight: '400px' }} ref={containerRef}>
            
            {/* Central Hub */}
            <div className="relative z-30">
              <div 
                className={`${centralHubSize} bg-white/80 backdrop-blur-xl border border-blue-200/30 rounded-3xl flex items-center justify-center shadow-xl transition-all duration-1000 will-change-transform ${
                  animationState === 'stacked' ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
                }`}
              >
                <div className="text-center p-4">
                  <div className="text-gray-800 font-bold text-xl mb-2">
                    Our Mentors
                  </div>
                  <div className="text-blue-600 font-semibold text-lg">
                    Come From
                  </div>
                  <div className="mt-2 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto"></div>
                </div>
              </div>
            </div>

            {/* Company Logos */}
            <div className="absolute inset-0 flex items-center justify-center">
              {companyLogos}
            </div>

            {/* Connection lines - only show when animation is complete and on larger screens */}
            {connectionLines}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerMentorsComponent;