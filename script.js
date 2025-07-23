// Variables globales
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');

// Navigation mobile
function initMobileNavigation() {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Empêcher le scroll du body quand le menu mobile est ouvert
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Fermer le menu mobile quand on clique sur un lien
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Fermer le menu mobile en cliquant en dehors
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Navbar au scroll
function initScrollNavbar() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling pour les liens d'ancrage
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajustement pour la navbar fixe
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation au scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const elementsToAnimate = document.querySelectorAll('.service-card, .project-card, .skill-item, .contact-info, .contact-form');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Gestion du formulaire de contact
function initContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validation simple
        if (!validateForm(data)) {
            return;
        }

        // Simulation de l'envoi (à remplacer par votre logique d'envoi)
        handleFormSubmission(data);
    });
}

// Validation du formulaire
function validateForm(data) {
    const errors = [];
    
    // Validation du nom
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Le nom doit contenir au moins 2 caractères');
    }
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Veuillez entrer une adresse email valide');
    }
    
    // Validation du sujet
    if (!data.subject || data.subject.trim().length < 3) {
        errors.push('Le sujet doit contenir au moins 3 caractères');
    }
    
    // Validation du message
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Le message doit contenir au moins 10 caractères');
    }
    
    if (errors.length > 0) {
        showNotification('Erreur de validation', errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

// Simulation de l'envoi du formulaire
function handleFormSubmission(data) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Indication de chargement
    submitButton.textContent = 'Envoi en cours...';
    submitButton.disabled = true;
    
    // Simulation d'une requête AJAX (remplacez par votre logique réelle)
    setTimeout(() => {
        // Réinitialiser le bouton
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Afficher la notification de succès
        showNotification(
            'Message envoyé !', 
            'Merci pour votre message. Je vous répondrai dans les plus brefs délais.', 
            'success'
        );
        
        // Réinitialiser le formulaire
        contactForm.reset();
        
        console.log('Données du formulaire:', data);
        
    }, 2000); // Simulation de 2 secondes de traitement
}

// Système de notifications
function showNotification(title, message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Ajouter les styles de notification
    addNotificationStyles();
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Gérer la fermeture
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-fermeture après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

// Ajouter les styles de notification
function addNotificationStyles() {
    if (document.getElementById('notification-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'notification-styles';
    styles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            min-width: 300px;
            max-width: 500px;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            background: #10b981;
            color: white;
        }
        
        .notification-error {
            background: #ef4444;
            color: white;
        }
        
        .notification-info {
            background: #3b82f6;
            color: white;
        }
        
        .notification-content {
            display: flex;
            flex-direction: column;
            position: relative;
        }
        
        .notification h4 {
            margin: 0 0 0.5rem 0;
            font-size: 1rem;
            font-weight: 600;
        }
        
        .notification p {
            margin: 0;
            font-size: 0.875rem;
            line-height: 1.5;
            white-space: pre-line;
        }
        
        .notification-close {
            position: absolute;
            top: -5px;
            right: -5px;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            opacity: 0.8;
            transition: opacity 0.3s ease;
        }
        
        .notification-close:hover {
            opacity: 1;
            background: rgba(255, 255, 255, 0.2);
        }
        
        @media (max-width: 480px) {
            .notification {
                left: 20px;
                right: 20px;
                min-width: auto;
            }
        }
    `;
    
    document.head.appendChild(styles);
}

// Typing animation pour le titre
function initTypingAnimation() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;
    
    const originalText = titleElement.innerHTML;
    const textToType = "Développeur Web & Comptable";
    
    // Seulement sur desktop pour éviter les problèmes de performance mobile
    if (window.innerWidth > 768) {
        titleElement.innerHTML = 'Développeur Web & <span class="highlight typing-cursor">|</span>';
        
        let index = 0;
        const typingSpeed = 100;
        
        function typeText() {
            if (index < textToType.length) {
                if (textToType[index] === '&') {
                    titleElement.innerHTML = `${textToType.substring(0, index + 1)} <span class="highlight">${textToType.substring(index + 1, textToType.length)}</span><span class="typing-cursor">|</span>`;
                } else {
                    titleElement.innerHTML = `${textToType.substring(0, index + 1)}<span class="typing-cursor">|</span>`;
                }
                index++;
                setTimeout(typeText, typingSpeed);
            } else {
                // Remettre le HTML original après l'animation
                setTimeout(() => {
                    titleElement.innerHTML = originalText;
                }, 1000);
            }
        }
        
        // Démarrer l'animation après un petit délai
        setTimeout(typeText, 1000);
    }
}

// Compteur de statistiques (optionnel)
function initStatsCounter() {
    const stats = [
        { element: '.projects-count', target: 50, suffix: '+' },
        { element: '.clients-count', target: 25, suffix: '+' },
        { element: '.experience-years', target: 5, suffix: ' ans' }
    ];
    
    stats.forEach(stat => {
        const element = document.querySelector(stat.element);
        if (element) {
            animateCounter(element, stat.target, stat.suffix);
        }
    });
}

function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 20);
}

// Effet parallax léger pour le hero
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Lazy loading pour les images (si vous en ajoutez)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Gestion des thèmes (optionnel - mode sombre/clair)
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Récupérer le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Sauvegarder le thème
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark-theme');
        } else {
            localStorage.removeItem('theme');
        }
    });
}

// Gestion de la progression de lecture
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Fonction pour améliorer les performances
function optimizePerformance() {
    // Debounce pour les événements de scroll
    let ticking = false;
    
    function updateOnScroll() {
        // Logique de scroll optimisée
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    // Preload des ressources critiques
    const criticalResources = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    initMobileNavigation();
    initScrollNavbar();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initTypingAnimation();
    initStatsCounter();
    initParallaxEffect();
    initLazyLoading();
    initThemeToggle();
    initReadingProgress();
    optimizePerformance();
    
    // Afficher une notification de bienvenue (optionnel)
    setTimeout(() => {
        showNotification(
            'Bienvenue !', 
            'Merci de visiter mon portfolio. N\'hésitez pas à me contacter pour discuter de vos projets.',
            'info'
        );
    }, 2000);
});

// Gestion des erreurs JavaScript
window.addEventListener('error', (e) => {
    console.error('Erreur JavaScript:', e.error);
    // En production, vous pourriez envoyer l'erreur à un service de monitoring
});

// Fonctions utilitaires
const utils = {
    // Débouncer une fonction
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle une fonction
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Vérifier si un élément est visible
    isElementInViewport: (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Générer un ID unique
    generateId: () => {
        return Math.random().toString(36).substr(2, 9);
    }
};

// Export des utilitaires pour usage global
window.portfolioUtils = utils;