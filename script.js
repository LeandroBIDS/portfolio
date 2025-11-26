// ==========================================
// LOADING SCREEN
// ==========================================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const video = loader.querySelector("video");

    if (video) {
        // Function to hide loader
        const hideLoader = () => {
            loader.classList.add("hide");
            setTimeout(() => {
                loader.remove();
            }, 800);
        };

        // When video ends, hide loader
        video.addEventListener("ended", hideLoader);

        // Fallback: if video doesn't play or is too long, force hide after 5s
        setTimeout(() => {
            if (!loader.classList.contains("hide")) {
                hideLoader();
            }
        }, 5000);

        // Ensure video plays
        video.play().catch(e => console.log("Autoplay prevented:", e));
    } else {
        // Fallback if no video found
        setTimeout(() => {
            loader.classList.add("hide");
            setTimeout(() => {
                loader.remove();
            }, 800);
        }, 1500);
    }
});

// ==========================================
// SMOOTH SCROLL NAVIGATION
// ==========================================
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute("href");

        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// ==========================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Animate skill bars when skills section becomes visible
            if (entry.target.classList.contains("skills-content")) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe all fade-in sections
document.querySelectorAll(".fade-in-section").forEach(section => {
    observer.observe(section);
});

// ==========================================
// SKILL BARS ANIMATION
// ==========================================
let skillBarsAnimated = false;

function animateSkillBars() {
    if (skillBarsAnimated) return;

    const skillBars = document.querySelectorAll(".skill-progress");
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = "0%";
            setTimeout(() => {
                bar.style.width = width;
            }, 50);
        }, index * 100);
    });

    skillBarsAnimated = true;
}

// ==========================================
// PROJECT MODAL
// ==========================================
const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const modalOverlay = document.getElementById("modalOverlay");

// Project data (you can customize this with your actual projects)
const projectsData = {
    1: {
        title: "Branding 3D",
        category: "Design 3D",
        description: "Criação de identidade visual 3D completa para marca moderna. Incluindo modelagem de logo, renderizações fotorrealistas e aplicações em diversos materiais. Utilizando Blender e Cinema 4D para criar assets únicos e impactantes.",
        images: ["assets/img/project1-detail1.jpg", "assets/img/project1-detail2.jpg"]
    },
    2: {
        title: "Website Moderno",
        category: "Web Design",
        description: "Design e desenvolvimento de website responsivo com foco em UX/UI. Interface clean e moderna, com animações suaves e navegação intuitiva. Desenvolvido com HTML5, CSS3 e JavaScript vanilla para máxima performance.",
        images: ["assets/img/project2-detail1.jpg", "assets/img/project2-detail2.jpg"]
    },
    3: {
        title: "Motion Reel",
        category: "Motion Graphics",
        description: "Compilação de trabalhos de motion graphics e animação. Incluindo animações de logo, transições dinâmicas e efeitos visuais. Criado com After Effects e Premiere Pro.",
        images: ["assets/img/project3-detail1.jpg", "assets/img/project3-detail2.jpg"]
    },
    4: {
        title: "Product Visualization",
        category: "Design 3D",
        description: "Visualização 3D de produto para campanha de marketing. Renderizações fotorrealistas com iluminação profissional e composição cuidadosa. Modelagem detalhada e texturização realista.",
        images: ["assets/img/project4-detail1.jpg", "assets/img/project4-detail2.jpg"]
    },
    5: {
        title: "UI/UX Design",
        category: "Web Design",
        description: "Design de interface para aplicação mobile. Foco em usabilidade e experiência do usuário. Protótipo interativo criado no Figma com sistema de design completo.",
        images: ["assets/img/project5-detail1.jpg", "assets/img/project5-detail2.jpg"]
    },
    6: {
        title: "Abstract Art",
        category: "Visuals",
        description: "Arte abstrata digital criada com técnicas de design generativo. Exploração de formas, cores e composições únicas. Criado com Blender e processamento procedural.",
        images: ["assets/img/project6-detail1.jpg", "assets/img/project6-detail2.jpg"]
    }
};

// Open modal when project card is clicked
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        const projectId = card.getAttribute("data-project");
        const project = projectsData[projectId];

        if (project) {
            // Build modal content
            let imagesHTML = "";
            project.images.forEach(img => {
                imagesHTML += `<img src="${img}" alt="${project.title}" onerror="this.style.display='none'">`;
            });

            modalBody.innerHTML = `
                <h2>${project.title}</h2>
                <p class="project-category" style="color: var(--color-accent); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1.5rem;">${project.category}</p>
                <p>${project.description}</p>
                ${imagesHTML}
            `;

            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    });
});

// Close modal
function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

// Close modal with ESC key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
});

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
let lastScroll = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.5)";
    } else {
        header.style.boxShadow = "none";
    }

    lastScroll = currentScroll;
});

// ==========================================
// PARALLAX EFFECT ON HERO
// ==========================================
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector(".hero-background");

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==========================================
// PREVENT FLASH OF UNSTYLED CONTENT
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.visibility = "visible";
});
