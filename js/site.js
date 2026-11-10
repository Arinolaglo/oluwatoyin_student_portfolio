document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.menu');
  const nav = document.getElementById('nav');
  if (button && nav) button.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('current');
  });
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    const code = document.getElementById(button.dataset.copy);
    try { await navigator.clipboard.writeText(code.innerText); button.textContent = 'Copied!'; }
    catch { button.textContent = 'Select code to copy'; }
    setTimeout(() => button.textContent = 'Copy code', 1600);
  }));
});