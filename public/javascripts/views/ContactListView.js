class ContactListView {
  constructor(templates) {
    this.templates = templates;
    this.container = document.querySelector('.contacts-container');
  }

  render(contacts) {
    if (contacts.length < 1) {
      this.container.innerHTML = '<h1>There are no contacts</h1>';
    } else {
      this.container.innerHTML = this.templates.contacts({
        contacts: contacts.map((contact) => contact.toJSON()),
      });
    }
  }

  bindAddButton(handler) {
    document.getElementById('add-contact').addEventListener('click', () => {
      handler();
    });
  }

  bindSearchInput(handler) {
    document.getElementById('search-input').addEventListener('input', (e) => {
      const searchTerm = e.target.value;
      handler(searchTerm);
    });
  }

  bindTagFilter(handler) {
    document.getElementById('tags-filter').addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('tag-filter')) {
        e.target.classList.toggle('active');
        handler();
      }
    });
  }

  getActiveTagFilters() {
    return Array.from(document.querySelectorAll('.tag-filter.active')).map(
      (tag) => tag.dataset.tag
    );
  }
}
