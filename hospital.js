// Mobile menu toggle
const bar = document.getElementById('bar');
const navMenu = document.querySelector('nav ul');

bar.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        }
    });
});

// Show more button functionality
const showMoreBtn = document.querySelector('.mainText button');
showMoreBtn.addEventListener('click', () => {
    const detail = document.querySelector('.detail');
    const content = document.querySelector('.content');
    
    // Enhanced content with better formatting
    content.innerHTML = `
        <h2>Welcome to Brahmananda HealthCare</h2>
        <p>Our hospital is committed to providing the highest quality healthcare with compassion and respect for all patients. With a team of skilled professionals and cutting-edge technology, we aim to deliver exceptional medical services.</p>
        
        <h3>Our Facilities Include:</h3>
        <ul>
            <li>State-of-the-art diagnostic equipment</li>
            <li>Modern patient rooms for comfort and recovery</li>
            <li>Advanced surgical suites with latest technology</li>
            <li>24/7 emergency care with rapid response teams</li>
            <li>Specialized treatment centers for various conditions</li>
            <li>Rehabilitation services with experienced therapists</li>
        </ul>
        
        <h3>Why Choose Us?</h3>
        <p>Our team of highly qualified medical professionals is dedicated to improving the health and wellbeing of our community. We prioritize patient care and ensure that each individual receives personalized attention.</p>
        
        <h3>Our Commitment</h3>
        <p>We are committed to:</p>
        <ul>
            <li>Providing affordable healthcare services</li>
            <li>Maintaining the highest standards of medical practice</li>
            <li>Ensuring patient privacy and dignity</li>
            <li>Continuous improvement through research and education</li>
        </ul>
        
        <h3>Contact Information</h3>
        <p>
            <strong>Address:</strong> 123 Healthcare Avenue, Near MG Road<br>
            <strong>Phone:</strong> +91 333-09093<br>
            <strong>Email:</strong> info@brahmanandahealthcare.com<br>
            <strong>Working Hours:</strong> 24/7 Emergency Services
        </p>
    `;
    
    // Show the detail popup with animation
    detail.style.display = 'flex';
    setTimeout(() => {
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 100);
});

// Close button for detail popup
const closeBtn = document.getElementById('closeBtn');
closeBtn.addEventListener('click', () => {
    const content = document.querySelector('.content');
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.querySelector('.detail').style.display = 'none';
    }, 300);
});

// Close detail popup when clicking outside the content
document.querySelector('.detail').addEventListener('click', function(e) {
    if (e.target === this) {
        const content = document.querySelector('.content');
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            this.style.display = 'none';
        }, 300);
    }
});

// Contact form validation and submission
const contactForm = document.getElementById('contactForm');
const connectBtn = document.getElementById('connectBtn');

connectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('subject').value.trim();
    
    if (!name || !email || !subject) {
        showAlert('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }
    
    // Success message
    showAlert('Thank you for your message! We will get back to you soon.', 'success');
    
    // Clear the form
    contactForm.reset();
});

// Appointment form validation and submission
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const date = document.getElementById('date').value;
        const department = document.getElementById('department').value;
        const doctor = document.getElementById('doctor').value;
        
        if (!name || !phone || !email || !date || !department || !doctor) {
            showAlert('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
            showAlert('Please enter a valid phone number', 'error');
            return;
        }
        
        // Success message
        showAlert('Your appointment has been booked successfully! We will confirm shortly.', 'success');
        
        // Clear the form
        appointmentForm.reset();
    });
}

// Alert function for messages
function showAlert(message, type) {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.alert-message');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alertEl = document.createElement('div');
    alertEl.className = `alert-message ${type}`;
    alertEl.innerText = message;
    
    // Append to body
    document.body.appendChild(alertEl);
    
    // Position it
    alertEl.style.position = 'fixed';
    alertEl.style.top = '20px';
    alertEl.style.left = '50%';
    alertEl.style.transform = 'translateX(-50%)';
    alertEl.style.padding = '15px 25px';
    alertEl.style.borderRadius = '5px';
    alertEl.style.zIndex = '1000';
    alertEl.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    alertEl.style.fontWeight = '500';
    
    // Style based on type
    if (type === 'success') {
        alertEl.style.backgroundColor = '#2c974b';
        alertEl.style.color = 'white';
    } else {
        alertEl.style.backgroundColor = '#dc3545';
        alertEl.style.color = 'white';
    }
    
    // Remove after 3 seconds
    setTimeout(() => {
        alertEl.style.opacity = '0';
        alertEl.style.transition = 'opacity 0.5s';
        setTimeout(() => alertEl.remove(), 500);
    }, 3000);
}

// Background parallax effect
const handleParallax = () => {
    const scrollPosition = window.scrollY;
    const bgSlide = document.querySelector('.bg-slide');
    
    // Adjust the background position based on scroll for additional effect
    if (bgSlide) {
        const yPos = scrollPosition * 0.05;
        bgSlide.style.backgroundPosition = `0 ${yPos}px`;
    }
};

// Add animation to elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, .spCard, .patientReview, .contact, .feature-card, .appointment');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
    
    // Apply parallax effect
    handleParallax();
};

// Doctor image enhancement
const enhanceDoctorCards = () => {
    document.querySelectorAll('.card').forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.filter = 'brightness(1.3) contrast(1.2) saturate(1.2)';
                img.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.filter = 'brightness(1.1) contrast(1.1) saturate(1.1)';
                img.style.transform = '';
            }
        });
    });
};

// Feature cards enhancement
const enhanceFeatureCards = () => {
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        // Staggered animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
};

// Department and Doctor selection linkage
const setupDepartmentDoctorLink = () => {
    const departmentSelect = document.getElementById('department');
    const doctorSelect = document.getElementById('doctor');
    
    if (departmentSelect && doctorSelect) {
        departmentSelect.addEventListener('change', function() {
            // Reset doctor selection
            doctorSelect.value = '';
            
            // If orthopedic is selected, highlight the doctors
            if (this.value === 'orthopedic') {
                // Add visual highlight to orthopedic doctors
                document.querySelectorAll('#doctor .card').forEach(card => {
                    card.style.transform = 'translateY(-15px)';
                    setTimeout(() => {
                        card.style.transform = '';
                    }, 1000);
                });
            }
        });
    }
};

// Run animation check on scroll
window.addEventListener('scroll', animateOnScroll);

// Initial setup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial animations
    animateOnScroll();
    
    // Setup doctor card enhancements
    enhanceDoctorCards();
    
    // Setup feature card enhancements
    enhanceFeatureCards();
    
    // Setup appointment form linkage
    setupDepartmentDoctorLink();
    
    // Add animation class to content in popup
    const content = document.querySelector('.content');
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    content.style.transition = 'all 0.3s ease-out';
    
    // Update copyright year
    const currentYear = new Date().getFullYear();
    document.querySelector('.copyright').innerHTML = document.querySelector('.copyright').innerHTML.replace('2023', currentYear);
    
    // Staggered animation for cards
    const cards = document.querySelectorAll('.card, .spCard');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, 100 + (index * 150));
    });
    
    // Add date picker min date (today)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});
