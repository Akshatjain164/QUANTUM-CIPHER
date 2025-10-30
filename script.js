// ============================================
// LOADING ANIMATION SEQUENCE
// ============================================

window.addEventListener('DOMContentLoaded', () => {
    // Phase 1: Decrypt Intro (3.5s)
    setTimeout(() => {
        document.getElementById('decrypt-intro').style.display = 'none';
        startCyberpunkTransition();
    }, 3500);
});

function startCyberpunkTransition() {
    // Phase 2: Cyberpunk Transition (3.5s)
    document.getElementById('cyberpunk-transition').style.display = 'block';
    setTimeout(() => {
        document.getElementById('cyberpunk-transition').style.display = 'none';
        revealWebsite();
    }, 3500);
}

function revealWebsite() {
    // Phase 3: Website Reveal (2s)
    document.getElementById('website-reveal').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        
        // Initialize Particles.js
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#00ff41' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00ff41',
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
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }, 2000);
}

// ============================================
// ENCRYPTION/DECRYPTION FUNCTIONS
// ============================================

function deriveKey(password, length) {
    let hash = btoa(password);
    while (hash.length < length) hash += hash;
    return hash.substr(0, length);
}

function encryptMessage() {
    const msg = document.getElementById('plaintext').value;
    const password = document.getElementById('password').value;
    
    if (!msg || !password) {
        alert("⚠️ ACCESS DENIED: Enter both message and quantum key!");
        return;
    }
    
    const key = deriveKey(password, msg.length);
    let cipher = '';
    for (let i = 0; i < msg.length; i++) {
        cipher += String.fromCharCode(msg.charCodeAt(i) ^ key.charCodeAt(i));
    }
    const code = btoa(cipher);
    
    document.getElementById('cipherDisplay').textContent = code;
    document.getElementById('result-section').style.display = 'block';
}

function copyCode() {
    const code = document.getElementById('cipherDisplay').textContent;
    navigator.clipboard.writeText(code);
    document.getElementById('copyText').textContent = "✓ COPIED";
    setTimeout(() => {
        document.getElementById('copyText').textContent = "COPY CODE";
    }, 2000);
}

function decryptMessage() {
    const code = document.getElementById('decryptCode').value;
    const password = document.getElementById('decryptPassword').value;
    
    if (!code || !password) {
        alert("⚠️ ACCESS DENIED: Enter both code and quantum key!");
        return;
    }
    
    let cipher;
    try {
        cipher = atob(code);
    } catch (e) {
        alert("⚠️ DECRYPTION FAILED: Invalid code format!");
        return;
    }
    
    const key = deriveKey(password, cipher.length);
    let msg = '';
    for (let i = 0; i < cipher.length; i++) {
        msg += String.fromCharCode(cipher.charCodeAt(i) ^ key.charCodeAt(i));
    }
    
    document.getElementById('decryptedDisplay').textContent = msg;
    document.getElementById('decrypt-result-section').style.display = 'block';
}
