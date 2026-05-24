(function () {
  var root = document.querySelector('.tb-home');
  var toggle = document.querySelector('.tb-menu-toggle');

  if (!root || !toggle) {
    return;
  }

  toggle.addEventListener('click', function () {
    var isOpen = root.classList.toggle('is-menu-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
})();
