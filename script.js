document.addEventListener('DOMContentLoaded', () => {
    // Burger menu functionality
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burgerMenu.classList.remove('active');
        });
    });

    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Update copyright date
    const date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('current-month').textContent = months[date.getMonth()];

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact form submission handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = {
                name: this.querySelector('input[name="name"]').value,
                email: this.querySelector('input[name="email"]').value,
                message: this.querySelector('textarea[name="message"]').value
            };

            try {
                // Désactiver le bouton pendant l'envoi
                const submitButton = this.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Envoi en cours...';

                // Envoyer la requête au serveur
                const response = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (data.success) {
                    // Réinitialiser le formulaire
                    this.reset();
                    alert('Message envoyé avec succès !');
                } else {
                    throw new Error(data.error || 'Erreur lors de l\'envoi du message');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert(error.message);
            } finally {
                // Réactiver le bouton
                const submitButton = this.querySelector('button[type="submit"]');
                submitButton.disabled = false;
                submitButton.textContent = 'Envoyer';
            }
        });
    }

    // Animated skills tags
    const skillTags = document.querySelectorAll('.skills ul li');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('animate__animated', 'animate__fadeIn');
    });

    // Animation des skills et des projets lors du scroll
    const skillsSection = document.querySelector('.skills');
    const skillItems = document.querySelectorAll('.skills li');
    const projectSection = document.querySelector('.project-grid');
    const projectCards = document.querySelectorAll('.project-card');

    const observerOptions = {
        threshold: 0.5
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills')) {
                    skillItems.forEach((item, index) => {
                        item.style.animationDelay = `${index * 0.1}s`;
                        item.style.animation = 'fadeInUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
                    });
                } else if (entry.target.classList.contains('project-grid')) {
                    projectCards.forEach((card, index) => {
                        card.style.animationDelay = `${index * 0.1}s`;
                        card.style.animation = 'fadeInUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
                    });
                }
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (skillsSection) {
        animationObserver.observe(skillsSection);
    }
    if (projectSection) {
        animationObserver.observe(projectSection);
    }

    // Intersection Observer for scroll animations
    const observerOptions2 = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, observerOptions2);

    // Observe sections for animations
    const sections = document.querySelectorAll('.about, .projects, .contact');
    sections.forEach(section => observer.observe(section));
});
