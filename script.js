// -----------------------------
// Smooth Scroll for Navbar Links
// -----------------------------
document.querySelectorAll('.nav-list a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    window.scrollTo({
      top: targetElement.offsetTop - 70,
      behavior: 'smooth'
    });
  });
});

// -----------------------------
// Auto-Switching Testimonials
// -----------------------------
let testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function switchTestimonial() {
  testimonials[currentTestimonial].classList.remove('active');
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  testimonials[currentTestimonial].classList.add('active');
}

setInterval(switchTestimonial, 5000);

// -----------------------------
// Delivery Area Checker
// -----------------------------
document.getElementById('checkDelivery').addEventListener('click', function () {
  let zipCode = document.getElementById('zipInput').value;
  let deliveryZones = ['110001', '110002', '110003']; // Add your delivery zip codes

  if (deliveryZones.includes(zipCode)) {
    alert('✅ Good news! We deliver to your area.');
  } else {
    alert('❌ Sorry, we do not deliver to this location yet.');
  }
});

// -----------------------------
// Subscription Plan Selection
// -----------------------------
document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('click', function () {
    document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
    this.classList.add('selected');
  });
});

// -----------------------------
// Floating WhatsApp Button
// -----------------------------
document.querySelector('.floating-whatsapp').addEventListener('click', function () {
  window.open('https://wa.me/1234567890', '_blank'); // Change number
});

// -----------------------------
// Initialize AOS (Animate on Scroll)
// -----------------------------
AOS.init();
