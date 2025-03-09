document.addEventListener('DOMContentLoaded', () => {
  const templates = {};
  document
    .querySelectorAll("script[type='text/x-handlebars']")
    .forEach((tmpl) => {
      templates[tmpl['id']] = Handlebars.compile(tmpl['innerHTML']);
    });
  document.querySelectorAll('[data-type=partial]').forEach((tmpl) => {
    Handlebars.registerPartial(tmpl['id'], tmpl['innerHTML']);
  });

  const contactCollection = new ContactCollection();
  const tagCollection = new TagCollection();

  const contactView = new ContactView(templates);
  const contactListView = new ContactListView(templates);
  const contactFormView = new ContactFormView(templates);
  const tagsView = new TagsView();
  const modalView = new ModalView();

  const tagsController = new TagsController(
    tagCollection,
    tagsView,
    contactFormView,
    contactCollection,
    contactListView
  );

  const contactsController = new ContactsController(
    contactCollection,
    contactView,
    contactListView,
    contactFormView,
    modalView,
    tagsController
  );
});
