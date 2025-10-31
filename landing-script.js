// Particles.js configuration
particlesJS('particles-bg', {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#00ffff', '#ff00ff', '#00ff41']
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00ffff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
});

// Launch app function with smooth transition
function launchApp() {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.5s ease;
    `;
    
    // Create loading content
    const loadingContent = document.createElement('div');
    loadingContent.style.cssText = `
        text-align: center;
        color: #00ffff;
        font-family: 'Orbitron', sans-serif;
    `;
    loadingContent.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 2rem; animation: pulse 2s infinite;">
            INITIALIZING QUANTUM SYSTEMS
        </div>
        <div style="width: 300px; height: 4px; background: rgba(0,255,255,0.2); border-radius: 2px; overflow: hidden;">
            <div id="progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #00ffff, #ff00ff); transition: width 0.3s ease;"></div>
        </div>
    `;
    
    overlay.appendChild(loadingContent);
    document.body.appendChild(overlay);
    
    // Add keyframes for pulse animation
    if (!document.getElementById('pulse-keyframes')) {
        const style = document.createElement('style');
        style.id = 'pulse-keyframes';
        style.innerHTML = `
            @keyframes pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Fade in overlay
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
    
    // Animate progress bar
    const progressBar = document.getElementById('progress-bar');
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            // Navigate to main app
            setTimeout(() => {
                window.location.href = 'enhanced-index.html';
            }, 500);
        }
        progressBar.style.width = progress + '%';
    }, 200);
}

// Add hover effect to info cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.info-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Random glitch effect on title
setInterval(() => {
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText && Math.random() > 0.95) {
        glitchText.style.textShadow = `
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #ff00ff,
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00ffff
        `;
        setTimeout(() => {
            glitchText.style.textShadow = `
                0 0 10px #00ffff,
                0 0 20px #00ffff,
                0 0 30px #00ffff
            `;
        }, 100);
    }
}, 100);
