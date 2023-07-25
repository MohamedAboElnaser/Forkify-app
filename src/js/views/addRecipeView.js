import View from './view.js';
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe Uploaded successfully';
  _window = document.querySelector('.add-recipe-window ');
  _overLay = document.querySelector('.overlay');
  _closeBtn = document.querySelector('.btn--close-modal');
  _openBtn = document.querySelector('.nav__btn--add-recipe');

  constructor() {
    super();
    this._addHandelerShowWindow();
    this._addHandelerHideWindow();
  }
  _generateMarkup() {}

  toggleWindo() {
    this._overLay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandelerShowWindow() {
    this._openBtn.addEventListener('click', this.toggleWindo.bind(this));
  }

  _addHandelerHideWindow() {
    this._closeBtn.addEventListener('click', this.toggleWindo.bind(this));
    this._overLay.addEventListener('click', this.toggleWindo.bind(this));
  }

  addHadelerUpload(handeler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();

      let dataArr = [...new FormData(this)];
      let data = Object.fromEntries(dataArr);
      //console.log('data from addhandelerUpload', data);
      handeler(data);
    });
  }
}

export default new AddRecipeView();
