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

// ===================================
// 3D Model Viewer
// ===================================

// Wait for DOM and THREE.js to be ready
document.addEventListener('DOMContentLoaded', function () {
    // Check if THREE is loaded
    if (typeof THREE === 'undefined') {
        console.error('THREE.js not loaded');
        return;
    }

    const canvas = document.getElementById('canvas3d');

    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
        45, // Field of view
        canvas.clientWidth / canvas.clientHeight, // Aspect ratio
        0.1, // Near clipping plane
        1000 // Far clipping plane
    );
    camera.position.set(0, 1, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true, // Transparent background
        antialias: true // Smooth edges
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-5, 3, -5);
    scene.add(directionalLight2);

    // OrbitControls for user interaction
    const controls = new THREE.OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;

    // Load 3D model
    const loader = new THREE.GLTFLoader();
    let model = null;

    loader.load(
        'imagens/modelo3D/model.glb',
        function (gltf) {
            model = gltf.scene;

            // Center and scale the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim;
            model.scale.multiplyScalar(scale);

            model.position.x = -center.x * scale;
            model.position.y = -center.y * scale;
            model.position.z = -center.z * scale;

            scene.add(model);
            console.log('3D model loaded successfully');
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('Error loading 3D model:', error);
        }
    );

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Update controls
        controls.update();

        // Render scene
        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    function onWindowResize() {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }

    window.addEventListener('resize', onWindowResize);
});
