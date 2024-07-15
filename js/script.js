document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    let startTime = null;
    let rhythmInputs = [];

    // Load sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let soundBuffer;

    async function loadSound() {
        try {
            const response = await fetch('assets/audio/beat000.mp3');
            const arrayBuffer = await response.arrayBuffer();
            soundBuffer = await audioContext.decodeAudioData(arrayBuffer);
            console.log('Sound loaded successfully');
        } catch (error) {
            console.error('Error loading sound:', error);
        }
    }

    function playSound() {
        try {
            const source = audioContext.createBufferSource();
            source.buffer = soundBuffer;
            source.connect(audioContext.destination);
            source.start();
            console.log('Sound played');
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    }

    function drawBeatIndicator(x, y, radius, color) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    function measureRhythm() {
        const currentTime = new Date().getTime();
        const interval = currentTime - (startTime || currentTime);
        startTime = currentTime;
        rhythmInputs.push(interval);
        console.log(`Rhythm Interval: ${interval} ms`);
        playSound();
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === ' ') {
            measureRhythm();
            drawBeatIndicator(Math.random() * canvas.width, Math.random() * canvas.height, 30, 'blue');
        }
    });

    // Load sound and draw initial beat indicator
    loadSound().then(() => {
        drawBeatIndicator(canvas.width / 2, canvas.height / 2, 30, 'red');
    });
});

