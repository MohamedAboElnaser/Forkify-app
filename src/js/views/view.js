import icons from '../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();

    this._data = data;
    let markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    let newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    // these are the new created elements
    const newElements = Array.from(newDom.querySelectorAll('*'));
    // these are the current existing elements in the page
    const currentElemts = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const currEl = currentElemts[i];

      //update changed Text
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      )
        currEl.textContent = newEl.textContent;

      //update changed attributes
      if (!newEl.isEqualNode(currEl))
        Array.from(newEl.attributes).forEach(attr => {
          currEl.setAttribute(attr.name, attr.value);
        });
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    let markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
   </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderErrorMessage(message = this._errorMessage) {
    let markup = `
       <div class="error">
       <div>
         <svg>
           <use href="${icons}#icon-alert-triangle"></use>
         </svg>
       </div>
       <p>${message}</p>
     </div>
       `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    let markup = `
       <div class="message">
       <div>
         <svg>
           <use href="${icons}#icon-smile"></use>
         </svg>
       </div>
       <p>${message}</p>
     </div>
       `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
