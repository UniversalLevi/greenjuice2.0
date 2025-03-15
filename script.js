// Delivery Radius Checker
document.getElementById('check-radius').addEventListener('click', function() {
    let userZip = document.getElementById('zip-code').value;
    let serviceableZips = ['12345', '67890', '11223']; // Change these to actual service areas

    if (serviceableZips.includes(userZip)) {
        alert('Yes! We deliver to your area.');
    } else {
        alert('Sorry, we do not deliver to this area yet.');
    }
});

// Simple Testimonials Slider
let testimonials = document.querySelectorAll('.testimonial');
let currentIndex = 0;

function showNextTestimonial() {
    testimonials[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % testimonials.length;
    testimonials[currentIndex].classList.add('active');
}

setInterval(showNextTestimonial, 3000); // Change testimonial every 3 seconds
