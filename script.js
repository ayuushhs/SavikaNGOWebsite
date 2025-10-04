// Text switching animation for hero section
const heroHeading = document.getElementById('hero-heading');
const heroSubheading = document.getElementById('hero-subheading');
const heroTagline = document.getElementById('hero-tagline');

const hindiTexts = {
    heading: 'साविका संस्था',
    subheading: 'सेवेशी समर्पीत',
    tagline: 'साधना, विनयशीलता, कार्यतत्परता'
};

const englishTexts = {
    heading: 'Savika Sanstha',
    subheading: 'Dedicated to service',
    tagline: 'Sadhana, modesty, willingness to work'
};

let isHindi = true;

function switchText() {
    const texts = isHindi ? englishTexts : hindiTexts;
    
    // Fade out
    heroHeading.style.opacity = '0';
    heroSubheading.style.opacity = '0';
    heroTagline.style.opacity = '0';
    
    setTimeout(() => {
        // Change text
        heroHeading.textContent = texts.heading;
        heroSubheading.textContent = texts.subheading;
        heroTagline.textContent = texts.tagline;
        
        // Add or remove 'english' class for font styling
        if (isHindi) {
            // Switching to English - add Gotham Bold font
            heroHeading.classList.add('english');
            heroSubheading.classList.add('english');
            heroTagline.classList.add('english');
        } else {
            // Switching to Hindi - remove Gotham Bold font
            heroHeading.classList.remove('english');
            heroSubheading.classList.remove('english');
            heroTagline.classList.remove('english');
        }
        
        // Fade in
        heroHeading.style.opacity = '1';
        heroSubheading.style.opacity = '1';
        heroTagline.style.opacity = '1';
        
        isHindi = !isHindi;
    }, 500);
}

// Initialize font classes for hero text
heroHeading.classList.remove('english');
heroSubheading.classList.remove('english');
heroTagline.classList.remove('english');

// Switch text every 5 seconds
setInterval(switchText, 5000);

// Initialize background slideshow
handleBackgroundSlideshow();

// Background image slideshow effect
function handleBackgroundSlideshow() {
    const parallaxImages = document.querySelectorAll('.parallax-img');
    let currentIndex = 0;
    
    function showNextImage() {
        // Hide all images
        parallaxImages.forEach(img => {
            img.style.opacity = '0';
        });
        
        // Show current image
        parallaxImages[currentIndex].style.opacity = '0.3';
        
        // Move to next image
        currentIndex = (currentIndex + 1) % parallaxImages.length;
    }
    
    // Change image every 4 seconds
    setInterval(showNextImage, 4000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar background change on scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('loading');
    observer.observe(section);
});

// Gallery lightbox effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <span class="close-lightbox">&times;</span>
            </div>
        `;
        
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        lightboxContent.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
        `;
        
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.style.cssText = `
            width: 100%;
            height: auto;
            border-radius: 10px;
        `;
        
        const closeBtn = lightbox.querySelector('.close-lightbox');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
            background: none;
            border: none;
        `;
        
        document.body.appendChild(lightbox);
        
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
        
        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    });
});

// Donate button functionality
document.querySelectorAll('.donate-btn, .donate-button').forEach(button => {
    button.addEventListener('click', () => {
        // You can add donation form or redirect to payment gateway here
        alert('Thank you for your interest in donating! Please contact us at admin@savika.org for donation details.');
    });
});

// Add CSS for lightbox
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        width: 100%;
        height: auto;
        border-radius: 10px;
    }
    
    .close-lightbox {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
        background: none;
        border: none;
    }
    
    .gallery-item {
        cursor: pointer;
    }
`;
document.head.appendChild(lightboxStyles);

// Event listeners
window.addEventListener('scroll', () => {
    handleNavbarScroll();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation to elements
    const animatedElements = document.querySelectorAll('.service-card, .team-member, .work-item, .gallery-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Initialize background slideshow
    handleBackgroundSlideshow();
    handleNavbarScroll();
});

// Add smooth reveal animation for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealSections);

// Add CSS for reveal animation
const revealStyles = document.createElement('style');
revealStyles.textContent = `
    section {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero {
        opacity: 1 !important;
        transform: none !important;
    }
`;
document.head.appendChild(revealStyles); 