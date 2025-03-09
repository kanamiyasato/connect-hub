class TagCollection {
  constructor() {
    this.tags = this.loadFromStorage() || [];
  }

  loadFromStorage() {
    return JSON.parse(localStorage.getItem('createdTags')) || [];
  }

  saveToStorage() {
    localStorage.setItem('createdTags', JSON.stringify(this.tags));
  }

  add(tag) {
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  remove(index) {
    if (index >= 0 && index < this.tags.length) {
      const removedTag = this.tags.splice(index, 1)[0];
      this.saveToStorage();
      return removedTag;
    }
    return null;
  }

  getAll() {
    return this.tags;
  }
}
