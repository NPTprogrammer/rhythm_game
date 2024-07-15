document.addEventListener("DOMContentLoaded", () => {
  let isPlaying = false;

  function playMusic() {
    if (!isPlaying) {
      let audio = new Audio("assets/audio/beat000.mp3");
      isPlaying = true;
      audio.play();
      // Briefly reset the flag to allow rapid reactivation
      setTimeout(() => {
        isPlaying = false;
      }, 100);
    }
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
      playMusic();
    }
  });

  let playButton = document.getElementById("play");
  playButton.addEventListener("click", playMusic);
});
