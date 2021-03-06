import {filmDetailsTemplate} from './film-details-template.js';
import dayjs from 'dayjs';
import AbstractView from './abstract.js';
const MINUTES_PER_HOUR = 60;

const  popupFilmDetailsTemplate = (film) => {
  const {title, alternativeTitle, totalRating, ageRating, director, writers, actors, runtime, date, country, genres, poster, description, watchlist, alreadyWatched, favorite} = film;
  const releaseDate = dayjs(date).format('DD MMMM YYYY');
  const duration = `${Math.floor(runtime/MINUTES_PER_HOUR)}h ${runtime%MINUTES_PER_HOUR}m`;
  const getButtonClass = (Boolean) => Boolean ? 'film-details__control-button--active ': '';
  const popupWriters = writers.length > 1 ? 'Writers' : 'Writer';
  const popupGenres = writers.length > 1 ? 'Genres' : 'Genre';

  return (
    `<div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            ${filmDetailsTemplate('Director', director)}
            ${filmDetailsTemplate(popupWriters, writers.join(', '))}
            ${filmDetailsTemplate('Actors', actors.join(', '))}
            ${filmDetailsTemplate('Release Date', releaseDate)}
            ${filmDetailsTemplate('Runtime', duration)}
            ${filmDetailsTemplate('Country', country)}
            ${filmDetailsTemplate(popupGenres, genres.join(', '))}
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button ${getButtonClass(watchlist)}film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button ${getButtonClass(alreadyWatched)}film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button ${getButtonClass(favorite)}film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>`
  );
};

export default class PopupFilmDetails extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._closePopupClickHandler = this._closePopupClickHandler.bind(this);
    this._wachlistClickHandler = this._wachlistClickHandler.bind(this);
    this._wachedClickHandler = this._wachedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  _closePopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.closePopupClick();
  }

  _wachlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.wachlistClick();
  }

  _wachedClickHandler(evt) {
    evt.preventDefault();
    this._callback.wachedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();

  }

  setClosePopupClickHandler(callback) {
    this._callback.closePopupClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closePopupClickHandler);
  }

  setWachlistClickHandler(callback) {
    this._callback.wachlistClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._wachlistClickHandler);
  }

  setWachedClickHandler(callback) {
    this._callback.wachedClick = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._wachedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  getTemplate() {
    return  popupFilmDetailsTemplate(this._film);
  }
}
