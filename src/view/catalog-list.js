import AbstractView from './abstract.js';


const catalogListTemplate = (listTitle, listModifier = '', listTitleClass = '') => (
  `<section class="films-list ${listModifier}">
    <h2 class="films-list__title ${listTitleClass}">${listTitle}</h2>
  </section>`
);


export default class CatalogList extends AbstractView {
  constructor(listTitle, listModifier, listTitleClass) {
    super();
    this._listTitle = listTitle;
    this._listModifier = listModifier;
    this._listTitleClass = listTitleClass;
  }

  getTemplate() {
    return catalogListTemplate(this._listTitle, this._listModifier, this._listTitleClass);
  }
}
