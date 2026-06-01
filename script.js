const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');

// Play / Pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update Play/Pause Button
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Update Progress Bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

// Seek Video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Volume & Playback Speed
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Skip Forward / Backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

ranges.forEach(range =>
  range.addEventListener('input', handleRangeUpdate)
);

skipButtons.forEach(button =>
  button.addEventListener('click', skip)
);

// Progress Bar Click
let mouseDown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
progress.addEventListener('mousemove', (e) => {
  if (mouseDown) scrub(e);
});