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
  
  // Testimonial Navigation
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.querySelector('.prev-testimonial');
  const nextButton = document.querySelector('.next-testimonial');
  let currentTestimonial = 0;
  
  function showTestimonial(index) {
    // First hide all testimonials
    testimonials.forEach(test => {
      test.classList.remove('active');
      test.style.transform = 'translateX(50px)';
      test.style.opacity = '0';
      test.style.visibility = 'hidden';
    });
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Calculate the correct index (for wrapping)
    const totalTestimonials = testimonials.length;
    if (index < 0) index = totalTestimonials - 1;
    if (index >= totalTestimonials) index = 0;
    
    // Show the targeted testimonial
    testimonials[index].classList.add('active');
    testimonials[index].style.transform = 'translateX(0)';
    testimonials[index].style.opacity = '1';
    testimonials[index].style.visibility = 'visible';
    dots[index].classList.add('active');
    
    // Update current index
    currentTestimonial = index;
  }
  
  // Event listeners for navigation
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      showTestimonial(currentTestimonial - 1);
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      showTestimonial(currentTestimonial + 1);
    });
  }
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showTestimonial(index);
    });
  });
  
  // Auto-rotate testimonials (optional - can keep or remove)
  let testimonialInterval = setInterval(() => {
    showTestimonial(currentTestimonial + 1);
  }, 7000);
  
  // Stop auto-rotation when user interacts
  document.querySelector('.testimonial-wrapper').addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
  });
  
  // Resume auto-rotation when user leaves
  document.querySelector('.testimonial-wrapper').addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
      showTestimonial(currentTestimonial + 1);
    }, 7000);
  });
  
  // Initialize
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
  
  // Animate ingredients scatter
  const ingredientsContainer = document.querySelector('.ingredients-scatter');
  const ingredients = document.querySelectorAll('.ingredient');
  
  if (ingredients.length > 0) {
      // Position ingredients randomly around the bottle
      ingredients.forEach((ingredient, index) => {
          // Calculate delay based on index for staggered animation
          const delay = index * 0.5;
          
          // Create unique animations for each ingredient
          const randomX = (Math.random() - 0.5) * 150; // Range: -75px to 75px
          const randomY = (Math.random() - 0.5) * 150; // Range: -75px to 75px
          const rotation = Math.random() * 360;
          const scale = 0.7 + Math.random() * 0.6; // Scale between 0.7 and 1.3
          
          // Set initial position (centered)
          ingredient.style.left = 'calc(50% - 40px)';
          ingredient.style.top = 'calc(50% - 40px)';
          
          // Apply unique animation with GSAP if available
          if (typeof gsap !== 'undefined') {
              gsap.to(ingredient, {
                  x: randomX,
                  y: randomY,
                  rotation: rotation,
                  scale: scale,
                  opacity: 0.9,
                  duration: 1.5,
                  delay: delay,
                  ease: "power2.out"
              });
              
              // Create floating animation
              gsap.to(ingredient, {
                  y: `+=${Math.random() * 20 - 10}`,
                  rotation: `+=${Math.random() * 15 - 7.5}`,
                  duration: 3 + Math.random() * 2,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                  delay: delay
              });
          } else {
              // Fallback without GSAP
              ingredient.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${rotation}deg) scale(${scale})`;
              ingredient.style.opacity = '0.9';
              ingredient.style.transition = 'all 1.5s ease';
              ingredient.style.transitionDelay = `${delay}s`;
          }
      });
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
          'images/man.jpg',
          'images/woman.jpg'
      ];
      
      imageSources.forEach(src => {
          const img = new Image();
          img.src = src;
      });
  }
  
  preloadImages();
  
  // Add hover effects for product cards
  const optionCards = document.querySelectorAll('.option-card');
  optionCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          if (typeof gsap !== 'undefined') {
              gsap.to(this.querySelector('img'), {
                  y: -10,
                  duration: 0.3,
                  ease: "power1.out"
              });
          }
      });
      
      card.addEventListener('mouseleave', function() {
          if (typeof gsap !== 'undefined') {
              gsap.to(this.querySelector('img'), {
                  y: 0,
                  duration: 0.3,
                  ease: "power1.out"
              });
          }
      });
  });
  
  // Enhanced Horizontal Scroll Animation
  function enhanceHorizontalScroll() {
    const scrollSection = document.querySelector('.horizontal-scroll-section');
    const scrollContainer = document.querySelector('.scroll-container');
    
    if (!scrollSection || !scrollContainer) return;
    
    // Add the animation class
    scrollContainer.classList.add('animated');
    
    // Calculate the total width of all cards
    const cards = scrollContainer.querySelectorAll('.benefit-card');
    let totalWidth = 0;
    cards.forEach(card => {
      const style = window.getComputedStyle(card);
      const width = parseInt(style.width) + 
                   parseInt(style.marginLeft) + 
                   parseInt(style.marginRight);
      totalWidth += width;
    });
    
    // Set container width to ensure proper animation
    scrollContainer.style.width = `${totalWidth}px`;
    
    // Intersection Observer to play animation when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scrollContainer.classList.add('playing');
        } else {
          scrollContainer.classList.remove('playing');
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(scrollSection);
    
    // Mouse interaction for manual control
    let isDown = false;
    let startX;
    let scrollLeft;
    
    scrollSection.addEventListener('mousedown', (e) => {
      isDown = true;
      scrollContainer.classList.remove('playing'); // Pause animation
      scrollContainer.style.animation = 'none'; // Remove animation temporarily
      startX = e.pageX - scrollSection.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
      scrollSection.style.cursor = 'grabbing';
    });
    
    scrollSection.addEventListener('mouseleave', () => {
      isDown = false;
      scrollSection.style.cursor = 'grab';
      // Resume animation after a short delay
      setTimeout(() => {
        scrollContainer.style.animation = '';
        scrollContainer.classList.add('playing');
      }, 1000);
    });
    
    scrollSection.addEventListener('mouseup', () => {
      isDown = false;
      scrollSection.style.cursor = 'grab';
      // Resume animation after a short delay
      setTimeout(() => {
        scrollContainer.style.animation = '';
        scrollContainer.classList.add('playing');
      }, 1000);
    });
    
    scrollSection.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollSection.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      
      // Apply manual scroll position
      const currentTransform = getComputedStyle(scrollContainer).transform;
      const matrix = new DOMMatrix(currentTransform);
      const newX = matrix.m41 + walk;
      
      // Limit scrolling to container width
      const maxScroll = -(totalWidth - scrollSection.offsetWidth);
      const limitedX = Math.max(maxScroll, Math.min(0, newX));
      
      scrollContainer.style.transform = `translateX(${limitedX}px)`;
      startX = x;
    });
    
    // Wheel event for scrolling with mouse wheel
    scrollSection.addEventListener('wheel', (e) => {
      e.preventDefault();
      scrollContainer.classList.remove('playing'); // Pause animation
      scrollContainer.style.animation = 'none'; // Remove animation temporarily
      
      const currentTransform = getComputedStyle(scrollContainer).transform;
      const matrix = new DOMMatrix(currentTransform);
      const newX = matrix.m41 - (e.deltaY * 2); // Adjust scroll speed
      
      // Limit scrolling to container width
      const maxScroll = -(totalWidth - scrollSection.offsetWidth);
      const limitedX = Math.max(maxScroll, Math.min(0, newX));
      
      scrollContainer.style.transform = `translateX(${limitedX}px)`;
      
      // Resume animation after user stops scrolling
      clearTimeout(scrollSection.wheelTimeout);
      scrollSection.wheelTimeout = setTimeout(() => {
        scrollContainer.style.animation = '';
        scrollContainer.classList.add('playing');
      }, 1000);
    });
    
    // Add 3D tilt effect to cards
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width - 0.5) * 20; // -10 to 10 degrees
        const yPercent = (y / rect.height - 0.5) * 10; // -5 to 5 degrees
        
        card.style.transform = `perspective(1000px) rotateY(${xPercent}deg) rotateX(${-yPercent}deg) translateY(-10px) scale(1.05)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
  
  // Call the function to enhance horizontal scroll
  enhanceHorizontalScroll();
});
