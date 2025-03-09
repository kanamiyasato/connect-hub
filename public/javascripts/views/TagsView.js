class TagsView {
  constructor() {
    this.tagsFilterContainer = document.querySelector('#tags-filter span');
  }

  getElements() {
    this.tagContainer = document.getElementById('tag-container');
    this.tagInput = document.querySelector('input#tag-input');

    return {
      tagContainer: this.tagContainer,
      tagInput: this.tagInput
    };
  }

  renderTagCreator(tags) {
    console.log('renderTagCreator called with tags:', tags);
    const { tagContainer } = this.getElements();
    if (!tagContainer) {
      console.error('Tag container element not found');
      return;
    }
    
    tagContainer.innerHTML = '';

    tags.forEach((tag, index) => {
      const tagElement = document.createElement('div');
      tagElement.className = 'tag';
      tagElement.title = 'Add tag to contact';
      tagElement.innerText = tag;
      tagElement.dataset.index = index;

      const removeButton = document.createElement('button');
      removeButton.classList.add('delete-tag');
      removeButton.innerText = 'x';
      removeButton.title = 'Delete tag';

      tagElement.appendChild(removeButton);
      tagContainer.insertAdjacentElement('beforeend', tagElement);
    });
  }

  renderTagsForFilter(tags) {
    this.tagsFilterContainer.innerHTML = '';

    if (tags.length === 0) {
      this.tagsFilterContainer.innerHTML = 'None';
      return;
    }

    tags.forEach((tag) => {
      const tagElement = document.createElement('button');
      tagElement.textContent = tag;
      tagElement.classList.add('tag-filter');
      tagElement.dataset.tag = tag;
      this.tagsFilterContainer.insertAdjacentElement('beforeend', tagElement);
    });
  }

  bindTagInput(handler) {
    const { tagInput } = this.getElements();
    if (!tagInput) return;
  
    tagInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const tag = tagInput.value.trim().toLowerCase();
        handler(tag);
        tagInput.value = '';
      }
    });
  }

  bindTagClick(selectHandler, deleteHandler) {
    const { tagContainer } = this.getElements();
    if (!tagContainer) return;
    
    tagContainer.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.classList.contains('tag')) {
        const tag = e.target.innerText.replace('x', '').trim();
        selectHandler(tag);
      } else if (e.target.classList.contains('delete-tag')) {
        const tagElement = e.target.closest('.tag');
        const index = parseInt(tagElement.dataset.index);
        deleteHandler(index);
      }
    });
  }
}
