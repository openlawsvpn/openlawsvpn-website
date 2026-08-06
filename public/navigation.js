(() => {
  const toggle = document.getElementById('navToggle');
  const sidebar = document.getElementById('sidebar');

  if (!toggle || !sidebar) return;

  toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  document.addEventListener('click', (event) => {
    if (sidebar.classList.contains('open') && !sidebar.contains(event.target) && event.target !== toggle) {
      sidebar.classList.remove('open');
    }
  });
})();
