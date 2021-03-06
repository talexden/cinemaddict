import Catalog from './view/catalog.js';
import CatalogSorting from './view/catalog-sorting.js';
import FooterStatistic from './view/footer-statistic.js';
import UserProfile from './view/user-profile.js';
import Navigation from './view/navigation.js';
import {createFilmCards} from './mock/create-film-cards';
import MoviePresenter from './presenter/movie';
import {getComments} from './mock/create-comments';
import MoviesModel from './model/movies.js';
import CommentsModel from './model/comments.js';
import Api from './api.js';
import {getAlphaNumericRandom, getRandomInt} from './mock/utils.js';
import {render, RenderPosition} from './utils/render.js';
import {UpdateType} from './const.js';

const FILMS_CATALOG_SIZE = 8;


const AUTHORIZATION = `Basic ${getAlphaNumericRandom(getRandomInt(1, 64))}`;
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';


const mainNode = document.querySelector('.main');

const movies = createFilmCards(FILMS_CATALOG_SIZE);
const comments = getComments();

const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();

api
  .getMovies()
  .then((moviesData) => {
    moviesModel.setMovies(UpdateType.INIT, moviesData);
  });

const commentsModel = new CommentsModel();
commentsModel.setComments(UpdateType.INIT, comments);


render(mainNode, new Navigation(movies), RenderPosition.BEFOREEND);
const headerNode = document.querySelector('.header');
render(headerNode, new UserProfile(), RenderPosition.BEFOREEND);


render(mainNode, new CatalogSorting(), RenderPosition.BEFOREEND);
render(mainNode, new Catalog(), RenderPosition.BEFOREEND);

const catalogFilmsNode = mainNode.querySelector('.films');
const moviePresenter = new MoviePresenter(catalogFilmsNode, moviesModel, api);
moviePresenter.init(movies, getComments());

const footerNode = document.querySelector('.footer');
render(footerNode, new FooterStatistic(movies.length), RenderPosition.BEFOREEND);
