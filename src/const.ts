export const BACKEND_URL = 'https://guitar-shop.accelerator.pages.academy';
export const REQUEST_TIMEOUT = 5000;

export enum AppRoute {
    Main = '/',
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
