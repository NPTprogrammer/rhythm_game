document.addEventListener("DOMContentLoaded", () => {
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

    document.addEventListener('keydown', (event) => {
        if (event.key === ' ') {
            playSound();
        }
    });

    // Load the sound
    loadSound();
});

