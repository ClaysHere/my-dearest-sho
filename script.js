// ============================================
// MY DEAREST SHO - INTERACTIVE FEATURES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeFloatingElements();
    initializeScrollAnimations();
    initializeAudioPlayer();
    initializeNavigation();
    initializeGalleryFilters();
    initializeTimelineAnimation();
    updateCountdownTimer();
});

// FLOATING ELEMENTS BACKGROUND
function initializeFloatingElements() {
    const container = document.getElementById('floatingElements');
    const emojis = ['♡', '🍓', '🌻', '🎹', '💕', '✨'];
    
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'floating-item';
        element.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 5 + 's';
        element.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        container.appendChild(element);
    }
}

// SCROLL ANIMATIONS
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in-scroll').forEach(el => observer.observe(el));
}

// AUDIO PLAYER
function initializeAudioPlayer() {
    const audio = document.getElementById('bgMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    
    let isPlaying = false;
    audio.volume = 0.5;
    
    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = '▶';
        } else {
            audio.play().catch(error => {
                console.log('Audio autoplay prevented:', error);
            });
            playPauseBtn.textContent = '⏸';
        }
        isPlaying = !isPlaying;
    });
    
    volumeSlider.addEventListener('input', function() {
        audio.volume = this.value / 100;
    });
}

// NAVIGATION
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 40px';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.padding = '15px 40px';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
}

// PHOTO UPLOAD - Memory Shelf
function uploadPhoto(element) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                element.innerHTML = '';
                const img = document.createElement('img');
                img.src = event.target.result;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '10px';
                img.onclick = function() { openLightbox(this); };
                element.appendChild(img);
                element.style.border = 'none';
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// PHOTO UPLOAD - Gallery
function uploadGalleryPhoto(element) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                element.outerHTML = '<img src="' + event.target.result + '" alt="Memory" onclick="openLightbox(this)">';
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// GALLERY FILTERS
function initializeGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });
}

// LIGHTBOX
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    lightboxImg.src = img.src;
    const captionEl = img.nextElementSibling;
    if (captionEl && captionEl.classList.contains('gallery-overlay')) {
        lightboxCaption.textContent = captionEl.querySelector('.gallery-caption').textContent;
    } else {
        lightboxCaption.textContent = '';
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
}

document.addEventListener('click', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
});

// LETTER OPENING
function openLetter() {
    const envelope = document.getElementById('letterEnvelope');
    const letterContent = document.getElementById('letterContent');
    envelope.style.display = 'none';
    letterContent.classList.add('open');
    createHeartsBurst(envelope);
}

// SURPRISE BOX
function revealSurprise() {
    const surpriseBox = document.getElementById('surpriseBox');
    const surpriseContent = document.getElementById('surpriseContent');
    surpriseBox.classList.add('opened');
    
    setTimeout(() => {
        surpriseBox.style.display = 'none';
        surpriseContent.classList.add('show');
        createHeartsExplosion();
    }, 600);
}

// HEARTS ANIMATIONS
function createHeartsBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createHeart(centerX, centerY), i * 50);
    }
}

function createHeartsExplosion() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => createHeart(centerX, centerY, true), i * 30);
    }
}

function createHeart(x, y, isExplosion = false) {
    const heart = document.createElement('div');
    heart.textContent = '♡';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.color = '#FF69B4';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '3000';
    heart.style.transition = 'all 1.5s ease-out';
    
    document.body.appendChild(heart);
    
    const angle = Math.random() * Math.PI * 2;
    const distance = isExplosion ? Math.random() * 200 + 100 : Math.random() * 100 + 50;
    const endX = x + Math.cos(angle) * distance;
    const endY = y + Math.sin(angle) * distance - 100;
    
    setTimeout(() => {
        heart.style.left = endX + 'px';
        heart.style.top = endY + 'px';
        heart.style.opacity = '0';
        heart.style.transform = 'scale(' + (Math.random() * 0.5 + 0.5) + ') rotate(' + (Math.random() * 360) + 'deg)';
    }, 50);
    
    setTimeout(() => heart.remove(), 1500);
}

// TIMELINE ANIMATION
function initializeTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = item.classList.contains('left') ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// COUNTDOWN TIMER
function updateCountdownTimer() {
    // ⚠️ GANTI TANGGAL INI DENGAN TANGGAL ANNIVERSARY KALIAN!
    // Format: new Date(TAHUN, BULAN-1, TANGGAL)
    // Contoh: 18 Juni 2026 = new Date(2026, 5, 18)
    const startDate = new Date(2026, 5, 18);
    const now = new Date();
    
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    const months = 5;
    const days = diffDays % 30;
    const hours = diffHours;
    
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
}

setInterval(updateCountdownTimer, 3600000);

// CURSOR TRAIL EFFECT
document.addEventListener('mousemove', function(e) {
    const trail = document.createElement('div');
    trail.textContent = '♡';
    trail.style.position = 'fixed';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.fontSize = '12px';
    trail.style.color = '#FFB6C1';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '9999';
    trail.style.transition = 'all 0.5s ease-out';
    trail.style.opacity = '0.7';
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0.5) translateY(-20px)';
    }, 50);
    
    setTimeout(() => trail.remove(), 500);
});

// EASTER EGG: Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) konamiCode.shift();
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    alert('🎉 Secret unlocked! 🎉\n\nRiet loves Sho more than words can say! ♡');
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createHeart(x, y, true);
        }, i * 20);
    }
}

// CONSOLE MESSAGE
console.log('%c♡ My Dearest Sho ♡', 'font-size: 24px; color: #FF69B4; font-weight: bold;');
console.log('%cMade with love by Riet', 'font-size: 14px; color: #FFB6C1;');
console.log('%cHappy 5 Months Anniversary!', 'font-size: 16px; color: #FF69B4;');