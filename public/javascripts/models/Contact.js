class Contact {
  constructor(data = {}) {
    this.id = data.id || null;
    this.full_name = data.full_name || '';
    this.email = data.email || '';
    this.phone_number = data.phone_number || '';
    
    if (Array.isArray(data.tags)) {
      this.tags = data.tags;
    } else if (typeof data.tags === 'string') {
      this.tags = data.tags.split(',');
    } else {
      this.tags = [];
    }
  }

  isValid() {
    return this.isValidName() && this.isValidEmail();
  }

  isValidName() {
    return this.full_name.split(' ').length === 2;
  }

  isValidEmail() {
    return /^[a-z0-9]+@([a-z]+\.)+[a-z]+$/i.test(this.email);
  }

  toJSON() {
    return {
      id: this.id,
      full_name: this.full_name,
      email: this.email,
      phone_number: this.phone_number,
      tags: this.tags.length > 0 ? this.tags.join(', ') : null,
    };
  }
}
