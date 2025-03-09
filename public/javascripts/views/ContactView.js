class ContactView {
  constructor(templates) {
    this.templates = templates;
  }

  render(contact) {
    return this.templates.contact(contact.toJSON());
  }

  bindEdit(handler) {
    document
      .querySelector('.contacts-container')
      .addEventListener('click', (e) => {
        if (e.target.matches('.edit-contact')) {
          e.preventDefault();
          const contactElement = e.target.closest('div.contact');
          const id = parseInt(
            contactElement.querySelector('input[type=hidden]').value
          );
          handler(id);
        }
      });
  }

  bindDelete(handler) {
    document
      .querySelector('.contacts-container')
      .addEventListener('click', (e) => {
        if (e.target.matches('.delete-contact')) {
          e.preventDefault();
          if (confirm('Do you want to delete this contact?')) {
            const contactElement = e.target.closest('div.contact');
            const id = parseInt(
              contactElement.querySelector('input[type=hidden]').value
            );
            handler(id, contactElement);
          }
        }
      });
  }
}
