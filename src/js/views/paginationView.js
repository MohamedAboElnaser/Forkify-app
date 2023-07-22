import icons from '../../img/icons.svg';

import View from './view.js';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandelerClick(handeler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      let btn = e.target.closest('.btn--inline');
      if (!btn) return;
      let page = +btn.getAttribute('page_');
      handeler(page);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    let currentPage = this._data.page;
    //the scenarios that may be exist

    //page 1 and ther are others
    if (currentPage === 1 && numPages > 1)
      return `
    <button page_=${currentPage + 1} class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
        <use href=" ${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `;

    // last page
    if (currentPage === numPages && numPages > 1)
      return `
    <button page_=${currentPage - 1} class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
    </button>`;

    //other pages
    if (currentPage < numPages)
      return `
    <button page_=${currentPage - 1} class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
    </button>
    <button page_=${currentPage + 1} class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
        <use href=" ${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `;

    // page 1 and ther is no other pages
    return ``;
  }
}

export default new PaginationView();
