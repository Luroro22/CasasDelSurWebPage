// Selecciona todos los enlaces de la barra de navegación
const navLinks = document.querySelectorAll('.navbar-link');

// Obtiene la URL actual (solo la parte del archivo)
const currentPage = window.location.pathname.split('/').pop();

navLinks.forEach(link => {
    // Verifica si el `href` del enlace coincide con la página actual
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});
// Seleccionar el botón hamburguesa y el menú
const menuToggle = document.querySelector('.navbar-toggler');
const navbar = document.querySelector('#navbarNav');

// Alternar menú al hacer clic en el botón hamburguesa
menuToggle.addEventListener('click', () => {
    if (navbar.classList.contains('show')) {
        navbar.classList.remove('show'); // Cierra el menú si está abierto
    } else {
        navbar.classList.add('show'); // Abre el menú si está cerrado
    }
});

// Cerrar menú al hacer clic en un enlace
const navbarLinks = document.querySelectorAll('.nav-link');

navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('show'); // Cierra el menú al seleccionar un enlace
    });
});

let currentImageIndex = 0;
let images = [];

// Open the lightbox
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxHeaderTitle = document.getElementById('lightbox-header-title');
    const thumbnailsContainer = document.querySelector('.thumbnails');

    // Load images and title
    images = JSON.parse(element.getAttribute('data-images'));
    const title = element.getAttribute('data-title'); // Get the title from data-title

    // Set initial image and header title
    currentImageIndex = 0;
    lightboxImage.src = images[currentImageIndex];
    lightboxHeaderTitle.textContent = title; // Set the header title

    // Populate thumbnails
    thumbnailsContainer.innerHTML = '';
    images.forEach((img, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = img;
        thumbnail.className = index === 0 ? 'active' : '';
        thumbnail.onclick = () => showImage(index);
        thumbnailsContainer.appendChild(thumbnail);
    });

    // Display lightbox
    lightbox.style.display = 'flex';
}

// Show specific image
function showImage(index) {
    currentImageIndex = index;
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxHeaderTitle = document.getElementById('lightbox-header-title');

    // Update image and header title
    lightboxImage.src = images[currentImageIndex];
    lightboxHeaderTitle.textContent = document.querySelector(`[data-images*="${images[currentImageIndex]}"]`).getAttribute('data-title');

    // Update thumbnail active class
    document.querySelectorAll('.thumbnails img').forEach((thumbnail, idx) => {
        thumbnail.classList.toggle('active', idx === index);
    });
}

// Navigate between images
function navigate(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = images.length - 1;
    if (currentImageIndex >= images.length) currentImageIndex = 0;

    showImage(currentImageIndex);
}

// Close the lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}





