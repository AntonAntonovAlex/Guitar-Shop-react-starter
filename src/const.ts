import { TypesGuitar } from './types/types-guitar';
import { TypesRatingStars } from './types/types-rating-stars';

export const BACKEND_URL = 'https://guitar-shop.accelerator.pages.academy';
export const REQUEST_TIMEOUT = 5000;

export const COUNT_GUITAR_CARD_IN_PAGE = 9;

export const STEP_COUNT_REVIEWS = 3;

export const KEYCODE_TAB = 9;
export const KEYCODE_ESC = 27;

export enum AppRoute {
  Main = '/catalog/page_:id',
  NotFoundScreen = '*',
  Guitars = '/guitars/:id',
}

export enum NameSpace {
  Data = 'DATA',
  Guitar = 'GUITAR',
}

export enum APIRoute {
  Guitars = '/guitars',
  Coupons = '/coupons',
  Orders = '/orders',
  Comments = '/comments',
}

export enum HttpCode {
  BadRequest = 400,
  NotFound = 404,
}


export const GuitarType: TypesGuitar = {
  'ukulele': 'Укулеле',
  'electric': 'Электрогитара',
  'acoustic': 'Акустическая',
};

export const RatingStars: TypesRatingStars = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично',
};
