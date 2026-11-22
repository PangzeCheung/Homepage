let activePaperVideo;

document.querySelectorAll('.paper-preview-video').forEach((video) => {
  const preview = video.closest('.paper-preview');
  const paper = preview.closest('.paper');
  const button = preview.querySelector('.paper-preview-trigger');

  function showPlaying(playing) {
    preview.classList.toggle('is-playing', playing);
    button.setAttribute('aria-pressed', String(playing));
  }

  function playPreview() {
    if (activePaperVideo && activePaperVideo !== video) {
      activePaperVideo.pause();
    }
    activePaperVideo = video;

    if (!video.hasAttribute('src') || video.error) {
      video.src = video.dataset.src;
    }
    video.play().catch(() => {
      if (video.paused || video.error) showPlaying(false);
    });
  }

  video.addEventListener('playing', () => showPlaying(!video.paused));
  video.addEventListener('pause', () => showPlaying(false));
  video.addEventListener('error', () => showPlaying(false));

  paper.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') playPreview();
  });
  paper.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse') video.pause();
  });
  button.addEventListener('click', () => {
    if (video.paused) playPreview();
    else video.pause();
  });
  button.hidden = false;
});
