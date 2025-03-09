class ModalView {
  constructor() {
    this.modal = document.getElementById('modal');
    this.modalLayer = document.getElementById('modal-layer');

    window.addEventListener('resize', () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      this.modal.style.width = `${Math.min(windowWidth * 0.8, 600)}px`;
      this.modal.style.height = `${Math.min(windowHeight * 0.9, 600)}px`;
    });

    document.addEventListener('click', (e) => {
      if (
        e.target.matches('#contact-form input.cancel') ||
        e.target.matches('#modal-layer')
      ) {
        this.close();
      }
    });
  }

  show() {
    this.modalLayer.classList.replace('hide', 'show');
    this.modal.classList.replace('hide', 'show');
  }

  hide() {
    this.modalLayer.classList.replace('show', 'hide');
    this.modal.classList.replace('show', 'hide');
  }

  reset() {
    const formContainer = document.getElementById('contact-form');
    const tagContainer = formContainer.querySelector('.tag-container');
    if (tagContainer) tagContainer.innerHTML = '';

    const form = formContainer.querySelector('form');
    if (form) form.remove();
  }

  close() {
    this.reset();
    this.hide();
  }
}
