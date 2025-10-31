// ============================================
// ENHANCED LOADING ANIMATION SEQUENCE
// ============================================
window.addEventListener('DOMContentLoaded', () => {
    // Phase 1: Quantum Initialization (3s)
    setTimeout(() => {
        document.getElementById('quantum-init').style.display = 'none';
        startCyberpunkCity();
    }, 3000);
});

function startCyberpunkCity() {
    // Phase 2: Cyberpunk City (2.5s)
    document.getElementById('cyberpunk-city').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('cyberpunk-city').style.display = 'none';
        startMatrixReveal();
    }, 2500);
}

function startMatrixReveal() {
    // Phase 3: Matrix Reveal (2s)
    document.getElementById('matrix-reveal').style.display = 'flex';
    // Initialize Matrix Canvas
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = 'QUANTUMCRYPT0123456789ABCDEF';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    const matrixInterval = setInterval(drawMatrix, 33);
    setTimeout(() => {
        clearInterval(matrixInterval);
        revealWebsite();
    }, 2000);
}

function revealWebsite() {
    document.getElementById('loading-screen').style.opacity = '0';
    document.getElementById('loading-screen').style.transition = 'opacity 0.5s';
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('main-content').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('main-content').style.transition = 'opacity 0.5s';
            document.getElementById('main-content').style.opacity = '1';
        }, 50);
        // Initialize Particles.js
        initializeParticles();
    }, 500);
}

function initializeParticles() {
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
}

// ENCRYPTION TYPE SWITCHING
document.addEventListener('DOMContentLoaded', () => {
    const typeButtons = document.querySelectorAll('.type-btn');
    const forms = document.querySelectorAll('.encryption-form');
    typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            typeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            forms.forEach(f => f.classList.remove('active'));
            document.getElementById(`${type}-form`).classList.add('active');
        });
    });
    // Setup file upload areas
    setupFileUpload('imageUploadArea', 'imageFile', 'imagePreview', 'image');
    setupFileUpload('videoUploadArea', 'videoFile', 'videoPreview', 'video');
});

function setupFileUpload(areaId, inputId, previewId, type) {
    const area = document.getElementById(areaId);
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    area.addEventListener('click', () => input.click());
    area.addEventListener('dragover', (e) => {
        e.preventDefault();
        area.style.borderColor = '#00ffff';
        area.style.background = 'rgba(0, 255, 255, 0.1)';
    });
    area.addEventListener('dragleave', () => {
        area.style.borderColor = 'rgba(0, 255, 255, 0.3)';
        area.style.background = 'rgba(0, 0, 0, 0.3)';
    });
    area.addEventListener('drop', (e) => {
        e.preventDefault();
        area.style.borderColor = 'rgba(0, 255, 255, 0.3)';
        area.style.background = 'rgba(0, 0, 0, 0.3)';
        const file = e.dataTransfer.files[0];
        if (file) {
            input.files = e.dataTransfer.files;
            handleFilePreview(file, preview, type);
        }
    });
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFilePreview(file, preview, type);
        }
    });
}

function handleFilePreview(file, previewElement, type) {
    const reader = new FileReader();
    reader.onload = (e) => {
        previewElement.src = e.target.result;
        previewElement.style.display = 'block';
        previewElement.parentElement.querySelector('.upload-placeholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

// TEXT ENCRYPTION/DECRYPTION
function deriveKey(password, length) {
    let hash = btoa(password);
    while (hash.length < length) hash += hash;
    return hash.substr(0, length);
}

function encryptMessage() {
    const msg = document.getElementById('plaintext').value;
    const password = document.getElementById('password').value;
    if (!msg || !password) {
        showAlert('⚠️ ACCESS DENIED: Enter both message and quantum key!');
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
    document.getElementById('copyText').textContent = '✓ COPIED';
    setTimeout(() => {
        document.getElementById('copyText').textContent = 'COPY CODE';
    }, 2000);
}

// IMAGE ENCRYPTION
let encryptedImageData = null;

function encryptImage() {
    const fileInput = document.getElementById('imageFile');
    const password = document.getElementById('imagePassword').value;
    if (!fileInput.files[0]) {
        showAlert('⚠️ Please select an image file!');
        return;
    }
    if (!password) {
        showAlert('⚠️ Please enter encryption key!');
        return;
    }
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        const encrypted = CryptoJS.AES.encrypt(imageData, password).toString();
        encryptedImageData = {
            data: encrypted,
            filename: file.name,
            type: file.type
        };
        const preview = encrypted.substring(0, 200) + '...';
        document.getElementById('imageEncryptedData').textContent = preview;
        document.getElementById('image-result-section').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function copyImageCode() {
    if (encryptedImageData) {
        navigator.clipboard.writeText(encryptedImageData.data);
        document.getElementById('copyImageText').textContent = '✓ COPIED';
        setTimeout(() => {
            document.getElementById('copyImageText').textContent = 'COPY DATA';
        }, 2000);
    }
}

function downloadEncryptedImage() {
    if (encryptedImageData) {
        const blob = new Blob([encryptedImageData.data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'encrypted_' + encryptedImageData.filename + '.enc';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// VIDEO ENCRYPTION
let encryptedVideoData = null;

function encryptVideo() {
    const fileInput = document.getElementById('videoFile');
    const password = document.getElementById('videoPassword').value;
    if (!fileInput.files[0]) {
        showAlert('⚠️ Please select a video file!');
        return;
    }
    if (!password) {
        showAlert('⚠️ Please enter encryption key!');
        return;
    }
    const file = fileInput.files[0];
    document.getElementById('video-progress').style.display = 'block';
    document.getElementById('videoProgressText').textContent = 'Reading video file...';
    const reader = new FileReader();
    reader.onprogress = function(e) {
        if (e.lengthComputable) {
            const progress = (e.loaded / e.total) * 50; // First 50% for reading
            document.getElementById('videoProgressFill').style.width = progress + '%';
        }
    };
    reader.onload = function(e) {
        document.getElementById('videoProgressText').textContent = 'Encrypting video...';
        let progress = 50;
        const progressInterval = setInterval(() => {
            progress += 5;
            document.getElementById('videoProgressFill').style.width = progress + '%';
            if (progress >= 100) {
                clearInterval(progressInterval);
                finishVideoEncryption();
            }
        }, 100);
        const videoData = e.target.result;
        const encrypted = CryptoJS.AES.encrypt(videoData, password).toString();
        encryptedVideoData = {
            data: encrypted,
            filename: file.name,
            type: file.type
        };
    };
    function finishVideoEncryption() {
        document.getElementById('video-progress').style.display = 'none';
        document.getElementById('videoProgressFill').style.width = '0%';
        const preview = encryptedVideoData.data.substring(0, 200) + '...';
        document.getElementById('videoEncryptedData').textContent = preview;
        document.getElementById('video-result-section').style.display = 'block';
    }
    reader.readAsDataURL(file);
}

function downloadEncryptedVideo() {
    if (encryptedVideoData) {
        const blob = new Blob([encryptedVideoData.data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'encrypted_' + encryptedVideoData.filename + '.enc';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// UTILITY FUNCTIONS
function showAlert(message) { alert(message); }
