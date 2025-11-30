(function () {
  const modal = document.getElementById('galleryModal');
  if (!modal) return;

  const modalImage = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const closeBtn = modal.querySelector('.modal-close');
  const prevBtn = modal.querySelector('.modal-prev');
  const nextBtn = modal.querySelector('.modal-next');
  const thumbs = Array.from(document.querySelectorAll('.thumb'));

  let currentIndex = -1;
  let lastFocused = null;

  function openModal(index) {
    currentIndex = index;
    const el = thumbs[index];
    const imgSrc = el.dataset.full;
    const caption = el.dataset.caption || el.querySelector('img').alt || '';
    modalImage.src = imgSrc;
    modalImage.alt = caption;
    modalCaption.textContent = caption;

    // show modal by attribute/class (CSS handles centering)
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');

    lastFocused = document.activeElement;
    // focus first interactive control for keyboard users
    closeBtn.focus();

    // lock scrolling on the page
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('open');

    // clear image src to free memory (optional)
    modalImage.src = '';
    document.body.style.overflow = '';

    // restore focus
    if (lastFocused) lastFocused.focus();
  }

  function showNext(offset = 1) {
    let next = currentIndex + offset;
    if (next < 0) next = thumbs.length - 1;
    if (next >= thumbs.length) next = 0;
    openModal(next);
  }

  // click / keyboard handlers on thumbs
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => openModal(i));
    thumb.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(i);
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', () => showNext(-1));
  nextBtn.addEventListener('click', () => showNext(1));

  // keyboard
  document.addEventListener('keydown', (e) => {
    if (modal.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext(1);
      if (e.key === 'ArrowLeft') showNext(-1);

      // trap focus - simple version
      if (e.key === 'Tab') {
        const focusables = Array.from(modal.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'))
          .filter((n) => !n.disabled && n.offsetParent !== null);
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // close when clicking backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Optional: handle image load errors or show a loader if needed
  modalImage.addEventListener('error', () => {
    modalCaption.textContent = 'Unable to load image.';
  });
})();