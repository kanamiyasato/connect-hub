class ContactCollection {
  constructor() {
    this.contacts = [];
  }

  async fetchAll() {
    const response = await fetch('/api/contacts');
    const data = await response.json();
    this.contacts = data.map((contactData) => new Contact(contactData));
    return this.contacts;
  }

  async get(id) {
    const response = await fetch(`/api/contacts/${id}`);
    const data = await response.json();
    return new Contact(data);
  }

  async create(contact) {
    const response = await fetch('/api/contacts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact.toJSON()),
    });
    const data = await response.json();
    const newContact = new Contact(data);
    this.contacts.push(newContact);
    return newContact;
  }

  async update(contact) {
    console.log('update method called from ContactCollection')
    const response = await fetch(`/api/contacts/${contact.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact.toJSON()),
    });

    const data = await response.json();
    const updatedContact = new Contact(data);

    const index = this.contacts.findIndex((c) => c.id === contact.id);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
    }
    
    console.log('Updated contacts array:', this.contacts);
    return updatedContact;
  }

  async delete(id) {
    const response = await fetch(`/api/contacts/${id}`, {
      method: 'delete',
    });

    if (response.status === 204) {
      this.contacts = this.contacts.filter((contact) => contact.id !== id);
      return true;
    }

    return false;
  }

  filter(searchTerm, selectedTags) {
    return this.contacts.filter((contact) => {
      const matchesName = contact.full_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => contact.tags.includes(tag));
      return matchesName && matchesTags;
    });
  }
}
