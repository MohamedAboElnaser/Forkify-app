class SearchView {
  #parentElement = document.querySelector('.search');

  getQuary() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#clearSearchBar();

    return query;
  }
  #clearSearchBar() {
    this.#parentElement.querySelector('.search__field').value = '';
  }
  addHandelerSearch(handeller) {
    this.#parentElement.addEventListener('submit', function (ev) {
      ev.preventDefault();
      handeller();
    });
  }
}

export default new SearchView();
