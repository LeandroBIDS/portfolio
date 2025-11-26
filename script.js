// ===================================
// Smooth Scroll Behavior
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .tag, .profile-content p');
    animatedElements.forEach(el => observer.observe(el));
});

// ===================================
// Header Scroll Effect
// ===================================

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===================================
// Project Card Interactions & Modal
// ===================================

const modal = document.getElementById('mediaModal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function () {
        const mediaElement = this.querySelector('.project-image img, .project-image video');
        const projectTitle = this.querySelector('.project-title').textContent;
        const projectType = this.querySelector('.project-type').textContent;
        const projectCategory = this.querySelector('.project-category').textContent;

        if (mediaElement) {
            // Clear previous content
            modalContent.innerHTML = '';

            // Create media container
            const mediaContainer = document.createElement('div');
            mediaContainer.className = 'modal-media';

            // Clone the media element
            const clone = mediaElement.cloneNode(true);

            // If it's a video, ensure it has controls in the modal
            if (clone.tagName === 'VIDEO') {
                clone.controls = true;
                clone.autoplay = true;
            }

            mediaContainer.appendChild(clone);

            // Create info container
            const infoContainer = document.createElement('div');
            infoContainer.className = 'modal-info';

            // Add project information
            infoContainer.innerHTML = `
                <div>
                    <p class="project-type">${projectType}</p>
                    <h2>${projectTitle}</h2>
                    <span class="project-category">${projectCategory}</span>
                </div>
                <p class="project-description">
                    Este projeto demonstra a excelência em design gráfico e motion graphics, 
                    combinando criatividade visual com técnicas avançadas de produção. 
                    Cada detalhe foi cuidadosamente elaborado para criar uma experiência 
                    visual impactante e memorável.
                </p>
            `;

            // Append both containers to modal
            modalContent.appendChild(mediaContainer);
            modalContent.appendChild(infoContainer);

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Stop any playing videos
    const video = modalContent.querySelector('video');
    if (video) {
        video.pause();
    }
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});
