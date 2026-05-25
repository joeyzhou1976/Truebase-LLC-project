(function () {
  var root = document.querySelector('.tb-home');
  var toggle = document.querySelector('.tb-menu-toggle');
  var opening = document.querySelector('.tb-opening-film');
  var soundButton = document.querySelector('.tb-opening-film__sound');
  var audio = document.querySelector('.tb-opening-film__audio');

  if (!root || !toggle) {
    return;
  }

  toggle.addEventListener('click', function () {
    var isOpen = root.classList.toggle('is-menu-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  if (!opening || !soundButton || !audio) {
    return;
  }

  soundButton.addEventListener('click', function () {
    if (audio.paused) {
      audio.currentTime = 0;
      audio.volume = 0.42;
      audio.play().then(function () {
        opening.classList.add('is-sound-on');
        soundButton.setAttribute('aria-pressed', 'true');
      }).catch(function () {
        opening.classList.remove('is-sound-on');
        soundButton.setAttribute('aria-pressed', 'false');
      });
      return;
    }

    audio.pause();
    opening.classList.remove('is-sound-on');
    soundButton.setAttribute('aria-pressed', 'false');
  });

  audio.addEventListener('ended', function () {
    opening.classList.remove('is-sound-on');
    soundButton.setAttribute('aria-pressed', 'false');
  });
})();
