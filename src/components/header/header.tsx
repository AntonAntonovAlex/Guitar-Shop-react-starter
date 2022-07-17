import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { APIRoute, AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { redirectToRoute } from '../../store/action';
import { fetchSimilarGuitarsAction } from '../../store/api-actions';
import { changeLoadingGuitarsStatus, loadSimilarGuitars } from '../../store/guitar-data/guitar-data';
import { getSimilarGuitars } from '../../store/guitar-data/selectors';
import { getGuitarsCart } from '../../store/guitar-process/selectors';
import { Guitar } from '../../types/guitar';

function Header(): JSX.Element {

  const [searchUserText, setSearchUserText] = useState('');
  const similarGuitarsList: Guitar[] = useAppSelector(getSimilarGuitars);

  const guitarsCart = useAppSelector(getGuitarsCart);
  const initialValue = 0;
  const SumGuitarsInCart = Object.keys(guitarsCart).reduce(
    (accumulator, currentValue) => accumulator + guitarsCart[+currentValue].count,
    initialValue,
  );

  const dispatch = useAppDispatch();

  function getListSimilarGuitars(searchText: string) {
    store.dispatch(fetchSimilarGuitarsAction(searchText));
  }

  function handleMouseClick(evt: MouseEvent) {
    const searchList = document.querySelector('.form-search');
    if (searchList) {
      const clickSearchList = evt.composedPath().includes(searchList);
      if (!clickSearchList) {
        setSearchUserText('');
        dispatch(loadSimilarGuitars([]));
        document.removeEventListener('click', handleMouseClick);
      }
    }
  }

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <a className="header__logo logo" href="/">
          <img
            className="logo__img"
            width={70}
            height={70}
            src="../../img/svg/logo.svg"
            alt="Логотип"
          />
        </a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <a className="link main-nav__link link--current" href="#todo">
                Каталог
              </a>
            </li>
            <li>
              <a className="link main-nav__link" href="#todo">
                Где купить?
              </a>
            </li>
            <li>
              <a className="link main-nav__link" href="#todo">
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form className="form-search__form" id="form-search">
            <button className="form-search__submit" type="submit">
              <svg
                className="form-search__icon"
                width={14}
                height={15}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-search" />
              </svg>
              <span className="visually-hidden">Начать поиск</span>
            </button>
            <input
              className="form-search__input"
              id="search"
              type="text"
              autoComplete="off"
              placeholder="что вы ищите?"
              onClick={() => {
                document.addEventListener('click', handleMouseClick);
              }}
              onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                dispatch(changeLoadingGuitarsStatus(true));
                const value = target.value;
                setSearchUserText(value);
                getListSimilarGuitars(value);
              }}
              value={searchUserText}
            />
            <label className="visually-hidden" htmlFor="search">
              Поиск
            </label>
          </form>
          <ul className={similarGuitarsList.length === 0 ? 'form-search__select-list hidden' : 'form-search__select-list'}>
            {similarGuitarsList?.map((similarGuitar: Guitar)=> (
              <li className="form-search__select-item"
                tabIndex={0}
                key={similarGuitar.id}
                onKeyDown={(evt)=> {
                  if (evt.code === 'Enter') {
                    dispatch(redirectToRoute(`${APIRoute.Guitars}/${similarGuitar?.id}/characteristics`));
                    setSearchUserText('');
                    dispatch(loadSimilarGuitars([]));
                  }
                }}
                onClick={() => {
                  dispatch(redirectToRoute(`${APIRoute.Guitars}/${similarGuitar?.id}/characteristics`));
                  setSearchUserText('');
                  dispatch(loadSimilarGuitars([]));
                  document.removeEventListener('click', handleMouseClick);
                }}
              >
                {similarGuitar.name}
              </li>
            ))}
          </ul>
          <button
            className="form-search__reset"
            type="reset"
            form="form-search"
            style={similarGuitarsList.length !== 0 || searchUserText !== '' ? {display: 'block'} : {}}
            onClick={() => {
              setSearchUserText('');
              dispatch(loadSimilarGuitars([]));
              document.removeEventListener('click', handleMouseClick);
            }}
          >
            <svg
              className="form-search__icon"
              width={14}
              height={15}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-close" />
            </svg>
            <span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link className="header__cart-link" to={AppRoute.Cart} aria-label="Корзина">
          <svg
            className="header__cart-icon"
            width={14}
            height={14}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-basket" />
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className={SumGuitarsInCart === 0
            ? 'header__cart-count hidden'
            : 'header__cart-count'}
          >
            {SumGuitarsInCart}
          </span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
