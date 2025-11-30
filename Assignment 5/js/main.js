// Main UI behaviours: nav toggling, year injection, basic contact form validation
document.addEventListener('DOMContentLoaded', function () {
  // year in footer
  const yearEls = document.querySelectorAll('#year');
  const y = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = y);

  // nav toggle (responsive)
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      const hidden = primaryNav.getAttribute('aria-hidden') === 'true';
      primaryNav.setAttribute('aria-hidden', String(!hidden));
      primaryNav.style.display = hidden ? 'block' : 'none';
    });

    // close nav on resize large screens
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        primaryNav.style.display = '';
        primaryNav.removeAttribute('aria-hidden');
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        primaryNav.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Contact form validation
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const status = document.getElementById('formStatus');
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Please fill required fields (name, email, message).';
        status.style.color = 'var(--red)';
        return;
      }
      // basic email regex
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
        status.textContent = 'Please enter a valid email address.';
        status.style.color = 'var(--red)';
        return;
      }

      // Simulate send
      status.textContent = 'Sending…';
      status.style.color = 'var(--muted)';
      setTimeout(() => {
        status.textContent = 'Thanks — your message has been received.';
        status.style.color = 'green';
        form.reset();
      }, 800);
    });
  }


});