import View from './view';
import icons from '../../img/icons.svg';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Bookmarks yet <br>Find a recipe and bookmark it😃';
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(res) {
    let id = window.location.hash.slice(1);
    return `
    <li class="preview">
        <a class="preview__link ${
          id === res.id ? 'preview__link--active' : ''
        }" href="#${res.id}">
        <figure class="preview__fig">
            <img src="${res.image}" alt="${res.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${res.title}</h4>
            <p class="preview__publisher">${res.publisher}</p>
            <div class="recipe__user-generated ${res.key ? '' : 'hidden'}">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
        </div>
        </a>
  </li>
    `;
  }
  addHandellerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
