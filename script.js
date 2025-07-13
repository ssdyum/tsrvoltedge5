// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', function() {
feather.replace();

// Initialize all functionality  
initMobileMenu();  
initContactForm();  
initSmoothScrolling();  
initMessagePopup();  
  
// Add scroll effect to header  
initHeaderScroll();

});

// Mobile Menu Toggle
function initMobileMenu() {
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {  
    mobileMenuToggle.addEventListener('click', function() {  
        navLinks.classList.toggle('active');  
          
        // Toggle menu icon  
        const icon = this.querySelector('i');  
        if (icon) {  
            if (navLinks.classList.contains('active')) {  
                icon.setAttribute('data-feather', 'x');  
            } else {  
                icon.setAttribute('data-feather', 'menu');  
            }  
            feather.replace();  
        }  
    });  
      
    // Close menu when clicking on a link  
    navLinks.addEventListener('click', function(e) {  
        if (e.target.classList.contains('nav-link')) {  
            navLinks.classList.remove('active');  
            const icon = mobileMenuToggle.querySelector('i');  
            if (icon) {  
                icon.setAttribute('data-feather', 'menu');  
                feather.replace();  
            }  
        }  
    });  
}

}

// Contact Form Handling
function initContactForm() {
const contactForm = document.getElementById('contactForm');

if (contactForm) {  
    contactForm.addEventListener('submit', function(e) {  
        e.preventDefault();  
          
        // Get form data  
        const formData = new FormData(this);  
        const data = Object.fromEntries(formData);  
          
        // Validate form  
        if (validateForm(data)) {  
            // Simulate form submission  
            submitForm(data);  
        }  
    });  
}

}

// Form Validation
function validateForm(data) {
const errors = [];

// Required field validation  
if (!data.name || data.name.trim().length < 2) {  
    errors.push('Please enter a valid name (at least 2 characters)');  
}  
  
if (!data.email || !isValidEmail(data.email)) {  
    errors.push('Please enter a valid email address');  
}  
  
if (!data.phone || data.phone.trim().length < 10) {  
    errors.push('Please enter a valid phone number');  
}  
  
if (!data.service) {  
    errors.push('Please select a service');  
}  
  
if (!data.message || data.message.trim().length < 10) {  
    errors.push('Please provide a detailed description (at least 10 characters)');  
}  
  
if (errors.length > 0) {  
    showMessage(errors.join('<br>'), 'error');  
    return false;  
}  
  
return true;

}

// Email validation
function isValidEmail(email) {
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
return emailRegex.test(email);
}

// Form Submission
async function submitForm(data) {
// Show loading state
const submitButton = document.querySelector('#contactForm button[type="submit"]');
const originalText = submitButton.innerHTML;

submitButton.innerHTML = '<i data-feather="loader"></i> Sending...';  
submitButton.disabled = true;  
feather.replace();  
  
try {  
    // Submit to database  
    const response = await fetch('/api/contact', {  
        method: 'POST',  
        headers: {  
            'Content-Type': 'application/json',  
        },  
        body: JSON.stringify(data)  
    });  
      
    const result = await response.json();  
      
    if (result.success) {  
        // Reset form  
        document.getElementById('contactForm').reset();  
          
        // Show success message  
        showMessage(result.message, 'success');  
          
        // Also create email backup  
        const emailSubject = `Service Request: ${data.service}`;  
        const emailBody = `

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.service}

Message:
${data.message}
`.trim();

// Create mailto link for backup  
        const mailtoLink = `mailto:info@tsrvoltedge.co.za?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;  
          
        // Show option to also send email  
        setTimeout(() => {  
            if (confirm('Would you also like to send an email copy?')) {  
                window.location.href = mailtoLink;  
            }  
        }, 2000);  
          
    } else {  
        showMessage(result.message || 'There was an error submitting your request. Please try again.', 'error');  
    }  
      
} catch (error) {  
    console.error('Submission error:', error);  
    showMessage('There was an error submitting your request. Please check your internet connection and try again.', 'error');  
      
    // Fallback to email  
    const emailSubject = `Service Request: ${data.service}`;  
    const emailBody = `

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.service}

Message:
${data.message}
`.trim();

const mailtoLink = `mailto:info@tsrvoltedge.co.za?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;  
    window.location.href = mailtoLink;  
} finally {  
    // Reset button  
    submitButton.innerHTML = originalText;  
    submitButton.disabled = false;  
    feather.replace();  
}

}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {  
    link.addEventListener('click', function(e) {  
        e.preventDefault();  
          
        const targetId = this.getAttribute('href');  
        const targetSection = document.querySelector(targetId);  
          
        if (targetSection) {  
            const headerHeight = document.querySelector('.header').offsetHeight;  
            const targetPosition = targetSection.offsetTop - headerHeight - 20;  
              
            window.scrollTo({  
                top: targetPosition,  
                behavior: 'smooth'  
            });  
        }  
    });  
});

}

// Header Scroll Effect
function initHeaderScroll() {
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {  
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;  
      
    // Add/remove scrolled class for styling  
    if (scrollTop > 100) {  
        header.classList.add('scrolled');  
    } else {  
        header.classList.remove('scrolled');  
    }  
      
    // Hide/show header on scroll (optional)  
    if (scrollTop > lastScrollTop && scrollTop > 200) {  
        header.style.transform = 'translateY(-100%)';  
    } else {  
        header.style.transform = 'translateY(0)';  
    }  
      
    lastScrollTop = scrollTop;  
}, { passive: true });

}

// Message Popup System
function initMessagePopup() {
const messagePopup = document.getElementById('message-popup');
const messageClose = document.querySelector('.message-close');

if (messageClose) {  
    messageClose.addEventListener('click', function() {  
        hideMessage();  
    });  
}  
  
// Auto-hide messages after 8 seconds  
let messageTimeout;  
  
window.showMessage = function(message, type = 'success') {  
    const messagePopup = document.getElementById('message-popup');  
    const messageText = document.querySelector('.message-text');  
    const messageContent = document.querySelector('.message-content');  
      
    if (messagePopup && messageText && messageContent) {  
        // Clear existing timeout  
        if (messageTimeout) {  
            clearTimeout(messageTimeout);  
        }  
          
        // Set message content  
        messageText.innerHTML = message;  
          
        // Set message type  
        messageContent.classList.remove('error', 'success');  
        messageContent.classList.add(type);  
          
        // Show message  
        messagePopup.classList.add('show');  
          
        // Auto-hide after 8 seconds  
        messageTimeout = setTimeout(hideMessage, 8000);  
          
        // Replace feather icons  
        feather.replace();  
    }  
};  
  
window.hideMessage = function() {  
    const messagePopup = document.getElementById('message-popup');  
    if (messagePopup) {  
        messagePopup.classList.remove('show');  
    }  
    if (messageTimeout) {  
        clearTimeout(messageTimeout);  
    }  
};

}

// Service Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {  
    card.addEventListener('mouseenter', function() {  
        this.style.transform = 'translateY(-5px) scale(1.02)';  
    });  
      
    card.addEventListener('mouseleave', function() {  
        this.style.transform = 'translateY(0) scale(1)';  
    });  
});

});

// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', function() {
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {  
    entries.forEach(entry => {  
        if (entry.isIntersecting) {  
            entry.target.classList.add('animate-in');  
        }  
    });  
}, observerOptions);  
  
// Observe service cards and other elements  
const elementsToAnimate = document.querySelectorAll('.service-card, .feature, .contact-form');  
elementsToAnimate.forEach(el => observer.observe(el));

});

// WhatsApp Button Click Tracking
document.addEventListener('DOMContentLoaded', function() {
const whatsappBtn = document.querySelector('.whatsapp-btn');

if (whatsappBtn) {  
    whatsappBtn.addEventListener('click', function() {  
        // Add click animation  
        this.style.transform = 'scale(0.95)';  
        setTimeout(() => {  
            this.style.transform = 'scale(1)';  
        }, 150);  
          
        // Analytics tracking could go here  
        console.log('WhatsApp button clicked');  
    });  
}

});

// Form Input Enhancements
document.addEventListener('DOMContentLoaded', function() {
const formInputs = document.querySelectorAll('input, select, textarea');

formInputs.forEach(input => {  
    // Add floating label effect  
    input.addEventListener('focus', function() {  
        this.parentElement.classList.add('focused');  
    });  
      
    input.addEventListener('blur', function() {  
        if (!this.value.trim()) {  
            this.parentElement.classList.remove('focused');  
        }  
    });  
      
    // Phone number formatting  
    if (input.type === 'tel') {  
        input.addEventListener('input', function() {  
            let value = this.value.replace(/\D/g, '');  
            if (value.length > 0) {  
                if (value.startsWith('27')) {  
                    // South African number format  
                    value = value.replace(/(\d{2})(\d{2})(\d{3})(\d{4})/, '+$1 $2 $3 $4');  
                } else if (value.length === 10) {  
                    // Local format  
                    value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');  
                }  
            }  
            this.value = value;  
        });  
    }  
});

});

// Error Handling
window.addEventListener('error', function(e) {
console.error('JavaScript Error:', e.error);
// Could implement error reporting here
});

// Performance Monitoring
document.addEventListener('DOMContentLoaded', function() {
// Measure page load performance
setTimeout(() => {
const perfData = performance.getEntriesByType('navigation')[0];
if (perfData) {
console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
}
}, 0);
});

// Add CSS for animations
const animationStyles = `
.service-card,
.feature,
.contact-form {
opacity: 0;
transform: translateY(20px);
transition: all 0.6s ease;
}

.service-card.animate-in,  
.feature.animate-in,  
.contact-form.animate-in {  
    opacity: 1;  
    transform: translateY(0);  
}  
  
.form-group.focused label {  
    color: var(--accent-color);  
    transform: translateY(-2px);  
    font-size: 0.9rem;  
}  
  
@media (max-width: 768px) {  
    .nav-links.active {  
        display: flex;  
        position: absolute;  
        top: 100%;  
        left: 0;  
        right: 0;  
        background-color: var(--primary-color);  
        flex-direction: column;  
        padding: 1rem;  
        box-shadow: var(--shadow);  
        gap: 1rem;  
    }  
}  
  
.header.scrolled {  
    background-color: rgba(0, 39, 77, 0.95);  
    backdrop-filter: blur(10px);  
}  
  
.header {  
    transition: all 0.3s ease;  
}

`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// script.js
document.addEventListener("DOMContentLoaded", function () {
feather.replace();

const animatedElements = document.querySelectorAll('.animate');

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('show');
observer.unobserve(entry.target);
}
});
}, { threshold: 0.1 });

animatedElements.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", function () {
feather.replace();

// Animate on scroll
const animatedElements = document.querySelectorAll('.animate');
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('show');
observer.unobserve(entry.target);
}
});
}, { threshold: 0.1 });

animatedElements.forEach(el => observer.observe(el));

// Prefill service on contact form
const serviceLinks = document.querySelectorAll('.service-link');
serviceLinks.forEach(link => {
link.addEventListener('click', function () {
const selectedService = this.getAttribute('data-service');
localStorage.setItem('selectedService', selectedService);
});
});

const serviceSelect = document.getElementById('service');
const storedService = localStorage.getItem('selectedService');

if (storedService && serviceSelect) {
for (let option of serviceSelect.options) {
if (option.value === storedService) {
option.selected = true;
break;
}
}
localStorage.removeItem('selectedService'); // Clear after use
}
});

