
const video = document.getElementById('video');
const playPauseButton = document.getElementById('play-pause');
const muteButton = document.getElementById('mute');
const seekBar = document.getElementById('seek-bar');
const fullscreenButton = document.getElementById('fullscreen');


playPauseButton.addEventListener('click', () => {
      if (video.paused) {
            video.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
            video.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
      }
});


muteButton.addEventListener('click', () => {
      video.muted = !video.muted;
      muteButton.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
});


seekBar.addEventListener('input', () => {
      const time = video.duration * (seekBar.value / 100);
      video.currentTime = time;
});


video.addEventListener('timeupdate', () => {
      const value = (100 / video.duration) * video.currentTime;
      seekBar.value = value;
});


fullscreenButton.addEventListener('click', () => {
      if (video.requestFullscreen) {
            video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
      }
});
