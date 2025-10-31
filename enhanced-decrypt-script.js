// Initialize particles on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    setupDecryptTypeSwitching();
    setupDecryptFileUploads();
});

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

// DECRYPTION TYPE SWITCHING
function setupDecryptTypeSwitching() {
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
}

// FILE UPLOAD SETUP
function setupDecryptFileUploads() {
    setupDecryptFileUpload('imageDecryptUploadArea', 'imageDecryptFile');
    setupDecryptFileUpload('videoDecryptUploadArea', 'videoDecryptFile');
}

function setupDecryptFileUpload(areaId, inputId) {
    const area = document.getElementById(areaId);
    const input = document.getElementById(inputId);
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
            const placeholder = area.querySelector('.upload-placeholder p');
            placeholder.textContent = `File selected: ${file.name}`;
        }
    });
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const placeholder = area.querySelector('.upload-placeholder p');
            placeholder.textContent = `File selected: ${file.name}`;
        }
    });
}

// TEXT DECRYPTION
function deriveKey(password, length) {
    let hash = btoa(password);
    while (hash.length < length) hash += hash;
    return hash.substr(0, length);
}

function decryptMessage() {
    const code = document.getElementById('decryptCode').value;
    const password = document.getElementById('decryptPassword').value;
    if (!code || !password) {
        showAlert('⚠️ ACCESS DENIED: Enter both code and quantum key!');
        return;
    }
    let cipher;
    try {
        cipher = atob(code);
    } catch (e) {
        showAlert('⚠️ DECRYPTION FAILED: Invalid code format!');
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

// IMAGE DECRYPTION
let decryptedImageUrl = null;

function decryptImage() {
    const fileInput = document.getElementById('imageDecryptFile');
    const dataInput = document.getElementById('imageDecryptData').value;
    const password = document.getElementById('imageDecryptPassword').value;
    if (!password) {
        showAlert('⚠️ Please enter decryption key!');
        return;
    }
    if (fileInput.files[0]) {
        // Decrypt from file
        const reader = new FileReader();
        reader.onload = function(e) {
            const encryptedData = e.target.result;
            performImageDecryption(encryptedData, password);
        };
        reader.readAsText(fileInput.files[0]);
    } else if (dataInput) {
        // Decrypt from pasted data
        performImageDecryption(dataInput, password);
    } else {
        showAlert('⚠️ Please provide encrypted image data!');
    }
}

function performImageDecryption(encryptedData, password) {
    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedData, password).toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
            showAlert('⚠️ DECRYPTION FAILED: Invalid key or corrupted data!');
            return;
        }
        const imgPreview = document.getElementById('decryptedImagePreview');
        imgPreview.src = decrypted;
        decryptedImageUrl = decrypted;
        document.getElementById('image-decrypt-result-section').style.display = 'block';
    } catch (error) {
        showAlert('⚠️ DECRYPTION FAILED: ' + error.message);
    }
}

function downloadDecryptedImage() {
    if (decryptedImageUrl) {
        const a = document.createElement('a');
        a.href = decryptedImageUrl;
        a.download = 'decrypted_image.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

// VIDEO DECRYPTION
let decryptedVideoUrl = null;

function decryptVideo() {
    const fileInput = document.getElementById('videoDecryptFile');
    const password = document.getElementById('videoDecryptPassword').value;
    if (!fileInput.files[0]) {
        showAlert('⚠️ Please select encrypted video file!');
        return;
    }
    if (!password) {
        showAlert('⚠️ Please enter decryption key!');
        return;
    }
    document.getElementById('video-decrypt-progress').style.display = 'block';
    document.getElementById('videoDecryptProgressText').textContent = 'Reading encrypted file...';
    const reader = new FileReader();
    reader.onprogress = function(e) {
        if (e.lengthComputable) {
            const progress = (e.loaded / e.total) * 50;
            document.getElementById('videoDecryptProgressFill').style.width = progress + '%';
        }
    };
    reader.onload = function(e) {
        document.getElementById('videoDecryptProgressText').textContent = 'Decrypting video...';
        let progress = 50;
        const progressInterval = setInterval(() => {
            progress += 5;
            document.getElementById('videoDecryptProgressFill').style.width = progress + '%';
            if (progress >= 100) {
                clearInterval(progressInterval);
            }
        }, 100);
        try {
            const encryptedData = e.target.result;
            const decrypted = CryptoJS.AES.decrypt(encryptedData, password).toString(CryptoJS.enc.Utf8);
            if (!decrypted) {
                throw new Error('Invalid key or corrupted data');
            }
            setTimeout(() => { finishVideoDecryption(decrypted); }, 1000);
        } catch (error) {
            document.getElementById('video-decrypt-progress').style.display = 'none';
            document.getElementById('videoDecryptProgressFill').style.width = '0%';
            showAlert('⚠️ DECRYPTION FAILED: ' + error.message);
        }
    };
    reader.readAsText(fileInput.files[0]);
}

function finishVideoDecryption(decryptedData) {
    document.getElementById('video-decrypt-progress').style.display = 'none';
    document.getElementById('videoDecryptProgressFill').style.width = '0%';
    const videoPreview = document.getElementById('decryptedVideoPreview');
    videoPreview.src = decryptedData;
    decryptedVideoUrl = decryptedData;
    document.getElementById('video-decrypt-result-section').style.display = 'block';
}

function downloadDecryptedVideo() {
    if (decryptedVideoUrl) {
        const a = document.createElement('a');
        a.href = decryptedVideoUrl;
        a.download = 'decrypted_video.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

// UTILITY FUNCTIONS
function showAlert(message) { alert(message); }
