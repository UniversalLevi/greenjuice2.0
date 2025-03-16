document.addEventListener('DOMContentLoaded', function() {
  // Initialize ScrollReveal for animations
  const sr = ScrollReveal({
      origin: 'bottom',
      distance: '60px',
      duration: 1000,
      delay: 200,
      easing: 'cubic-bezier(0.5, 0, 0, 1)'
  });

  sr.reveal('.benefit-card', { interval: 200 });
  sr.reveal('.section-title', { origin: 'top' });
  sr.reveal('.option-card', { interval: 150 });
  
  // Mobile Navigation Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.classList.toggle('open');
      
      // Toggle hamburger icon animation
      const hamburgerSpans = this.querySelectorAll('.hamburger span');
      if (this.classList.contains('open')) {
          hamburgerSpans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          hamburgerSpans[1].style.opacity = '0';
          hamburgerSpans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
          hamburgerSpans[0].style.transform = 'none';
          hamburgerSpans[1].style.opacity = '1';
          hamburgerSpans[2].style.transform = 'none';
      }
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          !mobileMenuToggle.contains(e.target)) {
          navMenu.classList.remove('active');
          mobileMenuToggle.classList.remove('open');
          
          // Reset hamburger icon
          const hamburgerSpans = mobileMenuToggle.querySelectorAll('.hamburger span');
          hamburgerSpans[0].style.transform = 'none';
          hamburgerSpans[1].style.opacity = '1';
          hamburgerSpans[2].style.transform = 'none';
      }
  });
  
  // Dropdown Menu Toggle for mobile
  const dropdownParents = document.querySelectorAll('.dropdown-parent');
  
  dropdownParents.forEach(parent => {
      parent.addEventListener('click', function(e) {
          // For mobile view, toggle the dropdown
          if (window.innerWidth <= 992) {
              if (e.target.tagName === 'A' && e.target.nextElementSibling) {
                  e.preventDefault();
                  this.classList.toggle('active');
              }
          }
      });
  });
  
  // Updated Testimonial Navigation with buttons
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.querySelector('.prev-testimonial');
  const nextButton = document.querySelector('.next-testimonial');
  let currentTestimonial = 0;
  
  function showTestimonial(index) {
      // Handle cycling (wrap around)
      const totalTestimonials = testimonials.length;
      if (index < 0) index = totalTestimonials - 1;
      if (index >= totalTestimonials) index = 0;
      
      // First, start fading out the current testimonial
      const currentActive = document.querySelector('.testimonial.active');
      if (currentActive) {
          currentActive.style.opacity = '0';
          currentActive.style.transform = 'translateX(-50px)';
          
          // Wait for fade out to complete before changing active status
          setTimeout(() => {
              // Hide all testimonials
              testimonials.forEach(testimonial => {
                  testimonial.classList.remove('active');
                  testimonial.style.visibility = 'hidden';
              });
              
              // Update dots
              dots.forEach(dot => dot.classList.remove('active'));
              dots[index].classList.add('active');
              
              // Set up the new testimonial for entrance
              testimonials[index].style.transform = 'translateX(50px)';
              testimonials[index].style.opacity = '0';
              testimonials[index].style.visibility = 'visible';
              testimonials[index].classList.add('active');
              
              // Short delay before starting entrance animation
              setTimeout(() => {
                  testimonials[index].style.opacity = '1';
                  testimonials[index].style.transform = 'translateX(0)';
                  
                  // Update current index
                  currentTestimonial = index;
              }, 50);
          }, 600); // Increased delay for smoother transition between slides
      } else {
          // First load - no fade out needed
          testimonials[index].classList.add('active');
          testimonials[index].style.opacity = '1';
          testimonials[index].style.visibility = 'visible';
          testimonials[index].style.transform = 'translateX(0)';
          dots[index].classList.add('active');
          currentTestimonial = index;
      }
  }
  
  // Add event listeners for navigation buttons
  if (prevButton) {
      prevButton.addEventListener('click', function() {
          showTestimonial(currentTestimonial - 1);
      });
  }
  
  if (nextButton) {
      nextButton.addEventListener('click', function() {
          showTestimonial(currentTestimonial + 1);
      });
  }
  
  // Dot navigation
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          showTestimonial(index);
      });
  });
  
  // Auto-rotate testimonials
  let testimonialInterval = setInterval(() => {
      showTestimonial(currentTestimonial + 1);
  }, 12000);
  
  // Pause auto-rotation when hovering over testimonials
  const testimonialWrapper = document.querySelector('.testimonial-wrapper');
  if (testimonialWrapper) {
      testimonialWrapper.addEventListener('mouseenter', () => {
          clearInterval(testimonialInterval);
      });
      
      testimonialWrapper.addEventListener('mouseleave', () => {
          testimonialInterval = setInterval(() => {
              showTestimonial(currentTestimonial + 1);
          }, 12000);
      });
  }
  
  // Initialize first testimonial
  showTestimonial(0);
  
  // Create animated bubbles in the hero section
  const bubbleContainer = document.querySelector('.juice-bubbles');
  
  if (bubbleContainer) {
      // Clear existing bubbles first (if any)
      while (bubbleContainer.firstChild) {
          bubbleContainer.removeChild(bubbleContainer.firstChild);
      }
      
      // Create new bubbles
      for (let i = 0; i < 15; i++) {
          const bubble = document.createElement('div');
          bubble.classList.add('bubble');
          
          // Vary bubble sizes based on your specific content
          const size = Math.random() * 20 + 5;
          const posX = Math.random() * 100;
          const posY = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = Math.random() * 10 + 10;
          
          bubble.style.width = `${size}px`;
          bubble.style.height = `${size}px`;
          bubble.style.left = `${posX}%`;
          bubble.style.top = `${posY}%`;
          bubble.style.animationDelay = `${delay}s`;
          bubble.style.animationDuration = `${duration}s`;
          bubble.style.opacity = `${Math.random() * 0.3 + 0.1}`;
          
          // Add a bit of color variation to match your juice theme
          const greenHue = Math.floor(Math.random() * 30) + 120; // Green hues
          bubble.style.backgroundColor = `hsla(${greenHue}, 80%, 60%, 0.3)`;
          
          bubbleContainer.appendChild(bubble);
      }
  }
  
  // Remove the old ingredient animation functions and use this simpler approach
  function resetIngredientsAnimation() {
    const ingredients = document.querySelectorAll('.ingredient');
    
    if (ingredients.length > 0) {
      // Reset animations to their original state
      ingredients.forEach(ingredient => {
        // Remove any inline styles from GSAP
        ingredient.style = "";
        
        // Force a repaint to restart CSS animations
        void ingredient.offsetWidth;
      });
    }
  }
  
  // Add window resize handler to fix responsive issues
  function handleResponsiveLayout() {
    // Reset animations on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resetIngredientsAnimation();
        
        // Fix for benefit cards
        const scrollContainer = document.querySelector('.scroll-container');
        if (scrollContainer) {
          // Reset animation
          scrollContainer.style.animation = 'none';
          void scrollContainer.offsetWidth; // Force reflow
          scrollContainer.style.animation = 'scrollLeftToRight 30s linear infinite';
        }
        
        // Make sure mobile menu is closed on resize to desktop
        if (window.innerWidth > 992) {
          const navMenu = document.querySelector('.nav-menu');
          if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
          }
        }
      }, 250);
    });
  }
  
  // Handle duplicate benefit cards for infinite scroll
  function setupInfiniteScroll() {
    const scrollContainer = document.querySelector('.scroll-container');
    if (!scrollContainer) return;
    
    // Calculate the total width of original items for proper animation
    const originalCards = Array.from(scrollContainer.querySelectorAll('.benefit-card')).slice(0, 5);
    const cardWidth = originalCards[0].offsetWidth + 
                     parseInt(getComputedStyle(originalCards[0]).marginLeft) + 
                     parseInt(getComputedStyle(originalCards[0]).marginRight);
    
    const totalWidth = cardWidth * originalCards.length;
    
    // Update animation duration based on content width
    const animationDuration = Math.max(30, totalWidth / 20); // Adjust speed based on width
    scrollContainer.style.animation = `scrollLeftToRight ${animationDuration}s linear infinite`;
    
    // Pause animation on hover
    scrollContainer.addEventListener('mouseenter', () => {
      scrollContainer.style.animationPlayState = 'paused';
    });
    
    scrollContainer.addEventListener('mouseleave', () => {
      scrollContainer.style.animationPlayState = 'running';
    });
  }
  
  // Reset any remaining GSAP animations for ingredients
  resetIngredientsAnimation();
  
  // Setup responsive handling
  handleResponsiveLayout();
  
  // Setup infinite scrolling for benefit cards
  setupInfiniteScroll();
  
  // Disable any previous horizontal scroll functions
  // This is to prevent conflicts with the CSS animation
  const scrollSection = document.querySelector('.horizontal-scroll-section');
  if (scrollSection) {
    scrollSection.style.overflow = 'hidden';
    
    // Remove wheel event if it exists
    scrollSection.removeEventListener('wheel', function(){});
  }
  
  // GSAP Animations for enhanced effects
  if (typeof gsap !== 'undefined') {
      // Floating animation for bottle
      gsap.to('.floating-bottle', {
          y: 20,
          rotation: 3,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
      });
      
      // Animate hero text lines
      gsap.from('.reveal-text .line', {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out"
      });
      
      // Parallax effect for background elements
      gsap.to('.liquid-animation', {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: true
          }
      });
  }
  
  // Smooth parallax scrolling effect
  window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      
      // Use requestAnimationFrame for performance
      window.requestAnimationFrame(function() {
          // Parallax elements
          const heroContent = document.querySelector('.hero-content');
          const liquidAnimation = document.querySelector('.liquid-animation');
          
          if (heroContent) {
              const translateY = Math.min(scrollPosition * 0.2, 100); // Limit maximum translation
              heroContent.style.transform = `translateY(${translateY}px)`;
          }
          
          if (liquidAnimation) {
              const translateY = Math.min(scrollPosition * 0.1, 50); // Limit maximum translation
              liquidAnimation.style.transform = `translateY(${translateY}px)`;
          }
      });
  });
  
  // Add click effect to the CTA button
  const ctaButton = document.querySelector('.pulse-btn');
  
  if (ctaButton) {
      ctaButton.addEventListener('click', function(e) {
          const x = e.clientX - e.target.getBoundingClientRect().left;
          const y = e.clientY - e.target.getBoundingClientRect().top;
          
          const ripple = document.createElement('span');
          ripple.classList.add('ripple');
          ripple.style.left = `${x}px`;
          ripple.style.top = `${y}px`;
          
          this.appendChild(ripple);
          
          setTimeout(() => {
              ripple.remove();
          }, 600);
      });
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              e.preventDefault();
              
              window.scrollTo({
                  top: targetElement.offsetTop - 80, // Adjusted for navbar height
                  behavior: 'smooth'
              });
              
              // Close mobile nav if open
              if (navMenu.classList.contains('active')) {
                  navMenu.classList.remove('active');
                  mobileMenuToggle.classList.remove('open');
                  
                  // Reset hamburger icon
                  const hamburgerSpans = mobileMenuToggle.querySelectorAll('.hamburger span');
                  hamburgerSpans[0].style.transform = 'none';
                  hamburgerSpans[1].style.opacity = '1';
                  hamburgerSpans[2].style.transform = 'none';
              }
          }
      });
  });
  
  // Navbar color change on scroll
  window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
          if (window.scrollY > 100) {
              navbar.style.background = 'rgba(16, 42, 26, 0.95)';
              navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
          } else {
              navbar.style.background = 'rgba(16, 42, 26, 0.9)';
              navbar.style.boxShadow = 'none';
          }
      }
  });
  
  // Intersection Observer for revealing elements when they come into view
  const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);
  
  document.querySelectorAll('.benefit-card, .testimonial-wrapper, .subscription-selector, .option-card').forEach(el => {
      observer.observe(el);
  });
  
  // Preload images for smoother animations
  function preloadImages() {
      const imageSources = [
          'images/bottle.png',
          'images/beetroot.png',
          'images/carrot.png',
          'images/mint.png',
          'images/anaar.png',
          'images/apple.png',
          'images/orange.png',
          'images/man.jpg',
          'images/woman.jpg'
      ];
      
      imageSources.forEach(src => {
          const img = new Image();
          img.src = src;
      });
  }
  
  preloadImages();
  
  // Add hover effects for plan cards
  const planCards = document.querySelectorAll('.plan-card');
  planCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          if (typeof gsap !== 'undefined') {
              gsap.to(this.querySelector('.plan-image'), {
                  y: -10,
                  duration: 0.3,
                  ease: "power1.out"
              });
          }
      });
      
      card.addEventListener('mouseleave', function() {
          if (typeof gsap !== 'undefined') {
              gsap.to(this.querySelector('.plan-image'), {
                  y: 0,
                  duration: 0.3,
                  ease: "power1.out"
              });
          }
      });
  });
  
  // Enhanced infinite scroll with hover delay
  function setupEnhancedInfiniteScroll() {
    const scrollContainer = document.querySelector('.scroll-container');
    const section = document.querySelector('.horizontal-scroll-section');
    if (!scrollContainer || !section) return;
    
    // Calculate the total width of original items for proper animation
    const originalCards = Array.from(scrollContainer.querySelectorAll('.benefit-card')).slice(0, 5);
    const cardWidth = originalCards[0].offsetWidth + 
                     parseInt(getComputedStyle(originalCards[0]).marginLeft) + 
                     parseInt(getComputedStyle(originalCards[0]).marginRight);
    
    const totalWidth = cardWidth * originalCards.length;
    
    // Set animation duration based on content width
    const animationDuration = Math.max(30, totalWidth / 20);
    scrollContainer.style.animation = `scrollLeftToRight ${animationDuration}s linear infinite`;
    
    // Implement hover delay
    let hoverTimer = null;
    const hoverDelay = 1000; // 1000ms delay before pausing
    
    // Add event listeners to each card
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
      // On mouse enter, start timer
      card.addEventListener('mouseenter', () => {
        hoverTimer = setTimeout(() => {
          scrollContainer.style.animationPlayState = 'paused';
        }, hoverDelay);
      });
      
      // On mouse leave, clear timer and resume animation
      card.addEventListener('mouseleave', () => {
        if (hoverTimer) {
          clearTimeout(hoverTimer);
          hoverTimer = null;
        }
        scrollContainer.style.animationPlayState = 'running';
      });
    });
    
    // Make sure wheel events don't affect the animation
    section.addEventListener('wheel', (e) => {
      // Don't stop scrolling animation on mouse wheel
      // But still allow page to scroll
    });
    
    // Ensure animation continues even when section is not in viewport
    function checkVisibility() {
      // Always keep animation running regardless of viewport position
      scrollContainer.style.animationPlayState = 'running';
    }
    
    // Initial check
    checkVisibility();
    
    // Update on scroll but don't affect the animation
    window.addEventListener('scroll', () => {
      // Just check visibility but don't pause the animation
      checkVisibility();
    });
    
    // Make sure the animation restarts properly after window resize
    window.addEventListener('resize', () => {
      scrollContainer.style.animation = 'none';
      void scrollContainer.offsetWidth; // Force reflow
      scrollContainer.style.animation = `scrollLeftToRight ${animationDuration}s linear infinite`;
    });
  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function() {
    // Setup enhanced infinite scroll with hover delay
    setupEnhancedInfiniteScroll();
    
    // Enhance subscription plans
    enhanceSubscriptionPlans();
  });

  // Enhanced bottle animations and scroll fixes
  function enhanceSubscriptionPlans() {
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach(card => {
      const bottles = card.querySelectorAll('.plan-bottle');
      
      // Add slight sway effect to bottles
      bottles.forEach((bottle, index) => {
        // Add secondary animation for rotation
        bottle.style.animation = `${bottle.style.animation}, bottleSway ${3 + index * 0.5}s ease-in-out infinite alternate`;
        
        // On hover, make bottles bounce slightly
        card.addEventListener('mouseenter', () => {
          bottles.forEach((b, i) => {
            b.style.animation = `bottleBounce 0.8s ease-in-out infinite alternate ${i * 0.1}s, bottleSway ${2 + i * 0.3}s ease-in-out infinite alternate`;
          });
        });
        
        // Return to normal animation on mouse leave
        card.addEventListener('mouseleave', () => {
          bottles.forEach((b, i) => {
            b.style.animation = `floatBottle 4s ease-in-out infinite ${i * 0.3}s, bottleSway ${3 + i * 0.5}s ease-in-out infinite alternate`;
          });
        });
      });
    });
  }

  // Fix horizontal scroll alignment
  function fixHorizontalScroll() {
    const scrollContainer = document.querySelector('.scroll-container');
    if (!scrollContainer) return;
    
    // Ensure all benefit cards are at the same height
    const benefitCards = scrollContainer.querySelectorAll('.benefit-card');
    
    benefitCards.forEach(card => {
      card.style.margin = '0 20px';
      card.style.flexShrink = '0';
    });
    
    // Add keyframes for bottle animations
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = `
      @keyframes bottleSway {
        0% { transform: rotate(-2deg); }
        100% { transform: rotate(2deg); }
      }
      
      @keyframes bottleBounce {
        0% { transform: translateY(0) scale(1); }
        100% { transform: translateY(-12px) scale(1.05); }
      }
    `;
    document.head.appendChild(styleSheet);
  }

  // Fix scroll progress indicator
  function setupScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-indicator');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      
      progressBar.style.width = scrollPercentage + '%';
      
      // Add glow effect when scrolling
      progressBar.style.boxShadow = '0 0 10px rgba(var(--neon-green-rgb), 0.8)';
      
      // Reset glow after scrolling stops
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        progressBar.style.boxShadow = '0 0 8px rgba(var(--neon-green-rgb), 0.5)';
      }, 200);
    });
  }

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function() {
    // Setup enhanced bottle animations
    enhanceSubscriptionPlans();
    
    // Fix horizontal scroll alignment
    fixHorizontalScroll();
    
    // Setup scroll progress indicator
    setupScrollProgress();
    
    // Add CSS variable for neon green RGB
    document.documentElement.style.setProperty('--neon-green-rgb', '120, 220, 120');
  });
}); 