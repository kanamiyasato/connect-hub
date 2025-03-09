class ContactsController {
  constructor(
    contactCollection,
    contactView,
    contactListView,
    contactFormView,
    modalView,
    tagsController
  ) {
    this.contactCollection = contactCollection;
    this.contactView = contactView;
    this.contactListView = contactListView;
    this.contactFormView = contactFormView;
    this.modalView = modalView;
    this.tagsController = tagsController;
    this.currentAction = null;

    this.init();
  }

  async init() {
    await this.loadContacts();

    this.contactListView.bindAddButton(() => this.addContact());
    this.contactListView.bindSearchInput(() => this.filterContacts());
    this.contactListView.bindTagFilter(() => this.filterContacts());

    this.contactView.bindEdit((id) => this.editContact(id));
    this.contactView.bindDelete((id, element) =>
      this.deleteContact(id, element)
    );

    this.contactFormView.bindFormSubmit((data, form) =>
      this.submitForm(data, form)
    );
    this.contactFormView.bindTagDeselection((tag) => this.deselectTag(tag));
  }

  async loadContacts() {
    await this.contactCollection.fetchAll();
    this.contactListView.render(this.contactCollection.contacts);
  }

  addContact() {
    this.currentAction = 'add';
    this.modalView.show();
    this.contactFormView.render('add');
    this.contactFormView.renderSelectedTags();
    
    if (this.tagsController) {
      this.tagsController.refreshTagsForForm();
    }
  }

  async editContact(id) {
    this.currentAction = 'edit';
    const contact = await this.contactCollection.get(id);
    this.modalView.show();
    this.contactFormView.render('edit', contact);
    this.contactFormView.renderSelectedTags();

    if (this.tagsController) {
      this.tagsController.refreshTagsForForm();
    }
  }

  async deleteContact(id, element) {
    const success = await this.contactCollection.delete(id);
    if (success) {
      element.remove();
      if (this.contactCollection.contacts.length < 1) {
        this.contactListView.render([]);
      }
    }
  }

  async submitForm(data, form) {
    const contact = new Contact(data);

    if (contact.isValid()) {
      this.modalView.close();

      if (this.currentAction === 'add') {
        await this.contactCollection.create(contact);
        form.reset();
      } else if (this.currentAction === 'edit') {
        await this.contactCollection.update(contact);
        await this.loadContacts();
      }
      this.contactListView.render(this.contactCollection.contacts);
    } else {
      alert('Please provide a valid name and email.');
    }
  }

  deselectTag(tag) {
    this.contactFormView.removeTagFromContact(tag);
  }

  filterContacts() {
    const searchTerm = document.getElementById('search-input').value;
    const selectedTags = this.contactListView.getActiveTagFilters();
    const filteredContacts = this.contactCollection.filter(
      searchTerm,
      selectedTags
    );
    this.contactListView.render(filteredContacts);
  }
}
