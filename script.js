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
        const projectTitleElement = this.querySelector('.project-title');
        const projectTitle = projectTitleElement.innerHTML;
        const projectTitleText = projectTitleElement.textContent;
        const projectTypeElement = this.querySelector('.project-type');
        const projectType = projectTypeElement ? projectTypeElement.textContent : '';
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

            // Project descriptions
            const projectDescriptions = {
                'Tyler, The Creator - "LUMBERJACK"Reimagined': `
                    <strong>Motion Graphics — "LUMBERJACK" Reimagined</strong><br><br>
                    Projeto de Motion Graphics desenvolvido através de técnicas de digital collage, combinando múltiplos elementos visuais para recriar cenas inspiradas no videoclipe "LUMBERJACK" de Tyler, The Creator, do álbum Call Me If You Get Lost.<br><br>
                    O foco foi capturar a energia estética do original, explorando composição, animação de objectos, manipulação de recortes e ritmo visual.<br><br>
                    Este projeto foi realizado no âmbito do meu percurso académico, servindo como exercício de criatividade, observação e interpretação artística.
                `,
                "Storie Teaser Sertanejinho": `
                    <strong>Storie Teaser — Apresentação de Artista</strong><br><br>
                    Criação de um Instagram Storie em formato teaser para anunciar a apresentação de um artista numa comissão de festas.<br><br>
                    O design foi inspirado numa estética retro-digital, recriando ícones e elementos visuais de interfaces antigas para destacar o artista de forma criativa e inesperada.<br><br>
                    Este projeto integrou a estratégia de comunicação da página de Instagram da comissão, contribuindo para aumentar o interesse e a antecipação do público antes do anúncio oficial.
                `,
                "Bee": `
                    <strong>Poster Experimental — "Bee"</strong><br><br>
                    Poster gráfico desenvolvido como exploração visual e tipográfica, centrado na representação detalhada de uma abelha.<br><br>
                    O projeto combina ilustração científica, minimalismo e uma paleta monocromática para criar uma composição limpa, moderna e de carácter quase editorial.<br><br>
                    Além da componente estética, o poster inclui uma definição descritiva, reforçando o tom informativo e experimental da peça.
                `,
                'Vídeo Promocional — Instalação Temática "Barbie" (Fórum Coimbra)': `
                    <strong>Vídeo Promocional — Instalação Temática "Barbie"</strong><br><br>
                    Produção de um vídeo promocional para divulgar uma peça decorativa desenvolvida para o jardim exterior do Fórum Coimbra, criada no âmbito da campanha temática do filme "Barbie".<br><br>
                    O vídeo destaca o processo manual de montagem e os materiais utilizados, reforçando a atenção ao detalhe e a identidade visual vibrante associada ao universo Barbie.<br><br>
                    Este conteúdo foi criado para comunicação da Blachere Illumination, contribuindo para promover a instalação e aumentar o impacto visual da campanha no espaço público.
                `,
                'Experiência Criativa — Video Mapping "Rio no Chão"': `
                    <strong>Experiência Criativa — Video Mapping "Rio no Chão"</strong><br><br>
                    Desenvolvimento de uma experiência visual em video mapping, criada para simular um pequeno ecossistema de rio quando projetada diretamente no chão.<br><br>
                    A composição inclui elementos ilustrados como água em movimento, folhas, rochas, relva e pequenos animais, criando uma sensação imersiva e lúdica.<br><br>
                    Este projeto explorou técnicas de animação, composição digital e ilustração com o objetivo de transformar o espaço físico e proporcionar ao público uma experiência envolvente e interativa.
                `
            };

            const description = projectDescriptions[projectTitleText] || `
                Este projeto demonstra a excelência em design gráfico e motion graphics, 
                combinando criatividade visual com técnicas avançadas de produção. 
                Cada detalhe foi cuidadosamente elaborado para criar uma experiência 
                visual impactante e memorável.
            `;

            // Add project information
            infoContainer.innerHTML = `
                <div>
                    ${projectType ? `<p class="project-type">${projectType}</p>` : ''}
                    <h2>${projectTitle}</h2>
                    <span class="project-category">${projectCategory}</span>
                </div>
                <div class="project-description">
                    ${description}
                </div>
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
