class ContactFormView {
  constructor(templates) {
    this.templates = templates;
    this.formContainer = document.getElementById('contact-form');
    this.contactTags = [];
    this.currentContactTags = null;
  }

  render(action, contact = {}) {
    const context = {
      header: action === 'add' ? 'Create new contact' : 'Edit contact',
      id: contact.id || null,
      full_name: contact.full_name || '',
      email: contact.email || '',
      phone_number: contact.phone_number || '',
      tags: Array.isArray(contact.tags) ? contact.tags.join(',') : '',
    };

    this.formContainer.innerHTML = '';
    this.formContainer.insertAdjacentHTML(
      'beforeend',
      this.templates.form(context)
    );

    this.contactTags = context.tags ? context.tags.split(',') : [];
    this.currentContactTags = document.querySelector('#selected-tags');

    return this.formContainer.querySelector('form');
  }

  renderSelectedTags() {
    const tagDisplayContainer = document.querySelector(
      '#current-tag-container'
    );
    tagDisplayContainer.innerHTML = '';

    this.contactTags.forEach((tag) => {
      const tagElement = document.createElement('button');
      tagElement.setAttribute('id', 'tag-btn');
      tagElement.setAttribute('name', tag);
      tagElement.innerText = tag;
      tagDisplayContainer.appendChild(tagElement);
    });
  }

  bindTagDeselection(handler) {
    document.addEventListener('click', (e) => {
      if (e.target.matches('#current-tag-container button#tag-btn')) {
        const tag = e.target.name;
        handler(tag);
      }
    });
  }

  bindFormSubmit(handler) {
    this.formContainer.addEventListener('submit', (e) => {
      if (e.target.matches('form')) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
          data[key] = value.trim() === '' ? null : value;
        });

        handler(data, form);
      }
    });
  }

  addTagToContact(tag) {
    if (!this.contactTags.includes(tag)) {
      this.contactTags.push(tag);
      this.currentContactTags.setAttribute('value', this.contactTags.join(','));
      this.renderSelectedTags();
    }
  }

  removeTagFromContact(tag) {
    this.contactTags = this.contactTags.filter((t) => t !== tag);
    this.currentContactTags.setAttribute('value', this.contactTags.join(','));
    this.renderSelectedTags();
  }

  getFormData() {
    const form = this.formContainer.querySelector('form');
    if (!form) return null;

    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.trim() === '' ? null : value;
    });

    return data;
  }
}
