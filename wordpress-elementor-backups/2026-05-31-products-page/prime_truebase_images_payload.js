Array.from(document.images).forEach(img => {
  img.loading = 'eager';
  if (img.dataset && img.dataset.src && !img.src) img.src = img.dataset.src;
});
window.scrollTo(0, document.documentElement.scrollHeight);
'primed';
