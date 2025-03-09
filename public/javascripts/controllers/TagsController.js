class TagsController {
  constructor(tagCollection, tagsView, contactFormView, contactCollection, contactListView) {
    this.tagCollection = tagCollection;
    this.tagsView = tagsView;
    this.contactFormView = contactFormView;
    this.contactCollection = contactCollection;
    this.contactListView = contactListView;

    this.init();
  }

  init() {
    this.tagsView.bindTagInput((tag) => this.addTag(tag));
    this.tagsView.bindTagClick(
      (tag) => this.selectTagForContact(tag),
      (index) => this.removeTag(index)
    );

    const tags = this.tagCollection.getAll();
    this.tagsView.renderTagsForFilter(tags);
  }

  refreshTagsForForm() {
    this.renderTags();

    this.tagsView.bindTagInput((tag) => this.addTag(tag));
    this.tagsView.bindTagClick(
      (tag) => this.selectTagForContact(tag),
      (index) => this.removeTag(index)
    );
  }

  renderTags() {
    console.log('renderTags method called')
    const tags = this.tagCollection.getAll();
    console.log(`showing tags from tagsController: ${tags}`)
    this.tagsView.renderTagCreator(tags);
    this.tagsView.renderTagsForFilter(tags);
  }

  addTag(tag) {
    if (this.tagCollection.add(tag)) {
      this.renderTags();
    }
  }

  async loadContacts() {
    await this.contactCollection.fetchAll();
    this.contactListView.render(this.contactCollection.contacts);
  }

  async removeTag(index) {
    const removedTag = this.tagCollection.remove(index);
    if (removedTag) {
      for (const contact of this.contactCollection.contacts) {
        if (contact.tags.includes(removedTag)) {
          contact.tags = contact.tags.filter((t) => t !== removedTag);
          await this.contactCollection.update(contact);
          await this.loadContacts();
        }
      }

      this.renderTags();
      this.contactFormView.removeTagFromContact(removedTag);
    }
  }

  selectTagForContact(tag) {
    this.contactFormView.addTagToContact(tag);
  }
}
