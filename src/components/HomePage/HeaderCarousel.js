"use client";

import { useEffect, useState, useCallback, memo, useRef } from "react";
import { Carousel, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import dynamic from "next/dynamic";
import Btnform from "./Btnform";
import Image from "next/image";
import Link from "next/link";
import CareerMentorsComponent from "./CarouselLogo";
import QuizCompo from "./Carouselquiz";

// Dynamically import TechStackCarousel with no SSR
const TechStackCarousel = dynamic(
  () => import('./Carouselcareer'),
  { ssr: false, loading: () => <div>Loading tech stack...</div> }
);

// Dynamic import for LogoSphere - Only for desktop
const LogoSphere = dynamic(() => import("./LogoSphere"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "340px",
        height: "340px",
        minHeight: "340px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src="/Navbar/arrow.avif"
        alt="Loading Logo"
        width={80}
        height={80}
        style={{ width: "80px", height: "80px", opacity: 0.5 }}
      />
    </div>
  ),
});

// Constants moved outside component to avoid re-creation on render
const TEXTS = [
  "Connect Your Dots with SAP Expertise",
  "Connect Your Dots with Data Science",
  "Connect Your Dots in IT Excellence",
  "Connect Your Dots in Digital Marketing",
];

const IMAGES = [
  "/Headercarousel/SAP module1.avif",
  "/Headercarousel/DSh.avif",
  "/Headercarousel/IT.avif",
  "/Headercarousel/DGM.avif",
];

// Memoized company logo component - OPTIMIZED FOR LCP
const CompanyLogos = memo(() => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    width: '100%'
  }}>
    <Image
      src="/Headercarousel/logo strip.avif"
      alt="Partner companies logos including IBM, TCS, and other corporate partners"
      width={800}
      height={130}
      priority={true} // LCP element gets priority
      sizes="(max-width: 768px) 100vw, 800px"
      style={{
        width: "auto",
        height: "auto",
        maxWidth: "100%",
      }}
    />
  </div>
));

CompanyLogos.displayName = "CompanyLogos";

// CareerSlide with proper background and mobile responsiveness
const CareerSlide = memo(({ onButtonClick }) => (
  <div 
    className="career-slide" 
    style={{
      minHeight: '600px',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: '40px',
      gap: '40px',
      backgroundImage: 'url(https://res.cloudinary.com/decptkmx7/image/upload/v1752908067/wmremove-transformed_5_lae7mr.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }}
  >
    {/* Content container */}
    <div className="career-content" style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      gap: '40px',
      zIndex: 1
    }}>
      {/* Left content */}
      <div className="career-text" style={{
        flex: '1',
        maxWidth: '55%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        color: '#333'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 'bold',
          lineHeight: '1.2',
          margin: '0',
          color: '#333',
          textShadow: '2px 2px 4px rgba(255,255,255,0.8)'
        }}>
          Unlock your <span style={{ color: '#007bff' }}>Career</span> potential
        </h1>
        
        <h2 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: '600',
          margin: '0',
          lineHeight: '1.3',
          color: '#333',
          textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
        }}>
          <span style={{ color: '#007bff' }}>No.1 Training &</span> Placement Center
        </h2>
        
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          lineHeight: '1.6',
          color: '#555',
          margin: '0',
          maxWidth: '95%',
          textShadow: '1px 1px 2px rgba(255,255,255,0.6)'
        }}>
          For more than 10 years, we've been passionate about providing engaging,
          instructor-led training that helps professionals around the world grow
          and succeed.
        </p>
        
        <p style={{
          fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)',
          color: '#555',
          margin: '0',
          fontWeight: '500',
          textShadow: '1px 1px 2px rgba(255,255,255,0.6)'
        }}>
          Est. 2013 Trusted by <span style={{ color: '#007bff', fontWeight: 'bold' }}>5000+</span>{" "}
          Students
        </p>
        
        <Button
          className="free-consultation-btn"
          style={{
            background: 'linear-gradient(135deg, #007bff, #0056b3)',
            border: 'none',
            borderRadius: '30px',
            padding: 'clamp(12px, 2.5vw, 15px) clamp(25px, 5vw, 35px)',
            fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
            fontWeight: '600',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 6px 20px rgba(0, 123, 255, 0.4)',
            alignSelf: 'flex-start',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.4)';
          }}
          onClick={onButtonClick}
        >
          Free Consultation
        </Button>
        
        {/* Company logos - hidden on mobile */}
        <div className="company-logos-desktop" style={{
          display: 'block'
        }}>
          <CompanyLogos />
        </div>
      </div>

      {/* Right content - LogoSphere (hidden on mobile) */}
      <div className="career-image-desktop" style={{
        flex: '1',
        maxWidth: '45%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Updated container with responsive sizing */}
        <div style={{
          position: 'relative',
          width: 'clamp(250px, 35vw, 400px)',
          height: 'clamp(250px, 35vw, 400px)',
          aspectRatio: '1'
        }}>
          {/* Primary shadow */}
          <div
            style={{
              position: 'absolute',
              bottom: "-25px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "90%",
              height: "50px",
              background:
                "radial-gradient(ellipse, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.15) 30%, rgba(0, 0, 0, 0.08) 60%, transparent 80%)",
              filter: "blur(25px)",
              zIndex: 0,
            }}
          />

          {/* Secondary shadow */}
          <div
            style={{
              position: 'absolute',
              bottom: "-15px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "65%",
              height: "30px",
              background:
                "radial-gradient(ellipse, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.15) 50%, transparent 70%)",
              filter: "blur(12px)",
              zIndex: 0,
            }}
          />

          <Image
            src="/Navbar/3d-logo.avif"
            alt="3D Logo Animation"
            fill
            style={{
              objectFit: 'contain',
              zIndex: 1,
            }}
            loading="lazy"
            sizes="(max-width: 768px) 0px, (max-width: 1024px) 35vw, 400px"
          />
        </div>
      </div>
    </div>
  </div>
));

CareerSlide.displayName = "CareerSlide";

// AI Slide with proper carousel control props
const AISlide = memo(({ isActive, carouselIndex, onSlideChange }) => (
  <div 
    style={{ 
      position: 'relative',
      width: '100%',
      minHeight: '600px',
      height: 'auto',
      background: 'transparent',
      backgroundColor: 'transparent',
    }}
  >
    <TechStackCarousel 
      isParentActive={isActive}
      parentCarouselIndex={carouselIndex}
      onParentSlideChange={onSlideChange}
    />
  </div>
));

AISlide.displayName = "AISlide";

// Experts Slide
const ExpertsSlide = memo(() => (
  <div 
    style={{ 
      position: 'relative',
      width: '100%',
      minHeight: '600px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background: 'transparent',
      backgroundColor: 'transparent',
    }}
  >
    <CareerMentorsComponent />
  </div>
));

ExpertsSlide.displayName = "ExpertsSlide";

// Quiz Slide
const QuizSlide = memo(() => (
  <div 
    style={{ 
      minHeight: '600px', 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background: 'transparent', 
      backgroundColor: 'transparent',
      width: '100%'
    }}
  >
    <QuizCompo />
  </div>
));

QuizSlide.displayName = "QuizSlide";

const HeaderCarousel = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [index, setIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef(null);
  
  // Track if the tech stack slide is active
  const isTechStackActive = carouselIndex === 1;

  // Optimized resize handler with debouncing
  useEffect(() => {
    const checkMobileView = () => setIsMobileView(window.innerWidth <= 768);

    // Initial check
    checkMobileView();

    // Debounced resize handler for better performance
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobileView, 100);
    };

    window.addEventListener("resize", debouncedResize, { passive: true });

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Text rotation effect with optimized interval management
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextVisible(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % TEXTS.length);
        setTextVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  // Memoize handlers to prevent rerenders
  const scrollToPopCourses = useCallback(() => {
    const element = document.getElementById("popCourses");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleButtonClick = useCallback(() => setShowForm(true), []);
  const handleCloseForm = useCallback(() => setShowForm(false), []);
  
  // Controlled carousel handlers with debounce
  const handleCarouselSelect = useCallback((selectedIndex) => {
    // Only update if the index actually changes
    if (selectedIndex !== carouselIndex) {
      setCarouselIndex(selectedIndex);
    }
  }, [carouselIndex]);
  
  // Handle keyboard navigation for accessibility - always active
  const handleKeyDown = useCallback((e) => {
    const totalSlides = 4; // Always 4 slides now
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (carouselIndex - 1 + totalSlides) % totalSlides;
      setCarouselIndex(prevIndex);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (carouselIndex + 1) % totalSlides;
      setCarouselIndex(nextIndex);
    }
  }, [carouselIndex]);
  
  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [handleKeyDown]);

  // Handle manual slide change
  const handleManualSlideChange = useCallback((direction) => {
    if (direction === 'next') {
      carouselRef.current.next();
    } else {
      carouselRef.current.prev();
    }
  }, []);

  return (
    <section
      aria-label="Featured Programs and Training Information"
      style={{
        width: '100%',
        minHeight: '600px',
        position: 'relative'
      }}
    >
      {/* Inline styles for responsive design */}
      <style jsx>{`
        /* Global carousel styles */
        :global(.carousel-control-prev),
        :global(.carousel-control-next),
        :global(.carousel-indicators) {
          z-index: 9999 !important;
          pointer-events: auto !important;
        }
        :global(.carousel-control-prev-icon),
        :global(.carousel-control-next-icon) {
          pointer-events: auto !important;
        }
        :global(.carousel-indicators li) {
          pointer-events: auto !important;
        }
        :global(.carousel-item) {
          min-height: 600px !important;
          height: auto !important;
          background: transparent !important;
          background-color: transparent !important;
          transition: none !important;
        }
        :global(.carousel-item.active) {
          background: transparent !important;
          background-color: transparent !important;
        }
        :global(.carousel-item-next),
        :global(.carousel-item-prev),
        :global(.carousel-item-left),
        :global(.carousel-item-right) {
          background: transparent !important;
          background-color: transparent !important;
        }
        :global(.carousel-inner) {
          background: transparent !important;
          background-color: transparent !important;
          min-height: 600px !important;
          overflow: visible !important;
        }
        :global(.carousel) {
          background: transparent !important;
          background-color: transparent !important;
          min-height: 600px !important;
        }
        :global(.carousel-fade .carousel-item) {
          opacity: 1 !important;
        }

        /* Mobile responsive styles */
        @media (max-width: 768px) {
          .career-slide {
            padding: 20px 15px !important;
            gap: 20px !important;
            min-height: 500px !important;
          }
          
          .career-content {
            flex-direction: column !important;
            text-align: center !important;
            gap: 25px !important;
          }
          
          .career-text {
            max-width: 100% !important;
            order: 1;
            align-items: center !important;
            text-align: center !important;
          }
          
          .career-image-desktop {
            display: none !important;
          }
          
          .company-logos-desktop {
            display: none !important;
          }
          
          .free-consultation-btn {
            align-self: center !important;
            margin-top: 10px !important;
          }
        }
        
        /* Tablet responsive styles */
        @media (min-width: 769px) and (max-width: 1024px) {
          .career-slide {
            padding: 30px 20px !important;
            gap: 30px !important;
          }
          
          .career-text {
            max-width: 60% !important;
          }
          
          .career-image-desktop {
            max-width: 40% !important;
          }
        }
        
        /* Small mobile screens */
        @media (max-width: 480px) {
          .career-slide {
            padding: 15px 10px !important;
            gap: 15px !important;
            min-height: 450px !important;
          }
          
          .career-content {
            gap: 20px !important;
          }
        }
        
        /* Landscape mobile */
        @media (max-width: 768px) and (orientation: landscape) {
          .career-slide {
            min-height: 400px !important;
            padding: 15px !important;
          }
          
          .career-content {
            gap: 15px !important;
          }
        }
      `}</style>

      <Carousel 
        ref={carouselRef}
        indicators={true} 
        controls={true}
        activeIndex={carouselIndex}
        onSelect={handleCarouselSelect}
        touch={true}
        keyboard={false} // Disable built-in keyboard to use our custom handler
        pause='hover'
        interval={5000}
        fade={false} // Disable fade to prevent opacity issues
        style={{ 
          position: 'relative',
          zIndex: 10,
          background: 'transparent',
          backgroundColor: 'transparent',
          minHeight: '600px'
        }}
      >
        {/* First Slide - Career Potential */}
        <Carousel.Item 
          className="flex items-center justify-center h-[600px]" 
          style={{ 
            background: 'transparent',
            backgroundColor: 'transparent'
          }}
        >
          <CareerSlide onButtonClick={handleButtonClick} />
        </Carousel.Item>

        {/* Second Slide - Tech Stack */}
        <Carousel.Item style={{ 
          background: 'transparent', 
          backgroundColor: 'transparent',
          minHeight: '600px',
          height: 'auto'
        }}>
          <AISlide 
            isActive={isTechStackActive}
            carouselIndex={carouselIndex}
            onSlideChange={handleCarouselSelect}
          />
        </Carousel.Item>

        {/* Third Slide - Industry Experts */}
        <Carousel.Item style={{ 
          background: 'transparent', 
          backgroundColor: 'transparent',
          minHeight: '600px',
          height: 'auto'
        }}>
          <ExpertsSlide />
        </Carousel.Item>

        {/* Fourth Slide - Quiz */}
        <Carousel.Item style={{ 
          background: 'transparent', 
          backgroundColor: 'transparent',
          minHeight: '600px',
          height: 'auto'
        }}>
          <QuizSlide />
        </Carousel.Item>
      </Carousel>

      {showForm && <Btnform onClose={handleCloseForm} />}
    </section>
  );
};

export default HeaderCarousel;