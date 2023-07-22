import View from './view';
import icons from '../../img/icons.svg';
class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe for your query😑<br>pleas,try again.';
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
            <img src="${res.img}" alt="${res.title}" />
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
}

export default new ResultView();
