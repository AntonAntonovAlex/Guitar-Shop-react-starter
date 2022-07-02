import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { OrderTypes, SortTypes } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchGuitarsAction } from '../../store/api-actions';
import { getGuitars } from '../../store/guitar-data/selectors';
import { changeActivPage } from '../../store/guitar-process/guitar-process';
import { Guitar } from '../../types/guitar';
import Footer from '../footer/footer';
import GuitarCard from '../guitar-card/guitar-card';
import Header from '../header/header';
import PaginationList from '../pagination-list/pagination-list';

function MainScreen(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getSortType = (searchParamsUrl: string | null) => {
      let sortType = '';
      if (searchParamsUrl) {
        sortType = searchParams.get('order') ?
          `_sort=${searchParamsUrl}&_order=${searchParams.get('order')}&` :
          `_sort=${searchParamsUrl}&`;
      }
      return sortType;
    };
    dispatch(changeActivPage(Number(params.id)));
    store.dispatch(fetchGuitarsAction({id: Number(params.id), sortType: getSortType(searchParams.get('sort'))}));
  }, [dispatch, params.id, searchParams]);

  const guitarsList: Guitar[] = useAppSelector(getGuitars);

  return (
    <div className="wrapper">
      <Header/>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">
          Каталог гитар
          </h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <a className="link" href="/">
              Главная
              </a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link" href="todo">Каталог</a>
            </li>
          </ul>
          <div className="catalog">
            <form className="catalog-filter">
              <h2 className="title title--bigger catalog-filter__title">
              Фильтр
              </h2>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Цена, ₽</legend>
                <div className="catalog-filter__price-range">
                  <div className="form-input">
                    <label className="visually-hidden">Минимальная цена</label>
                    <input
                      type="number"
                      placeholder="1 000"
                      id="priceMin"
                      name="от"
                    />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">Максимальная цена</label>
                    <input
                      type="number"
                      placeholder="30 000"
                      id="priceMax"
                      name="до"
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Тип гитар</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="acoustic"
                    name="acoustic"
                  />
                  <label htmlFor="acoustic">Акустические гитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="electric"
                    name="electric"
                    defaultChecked
                  />
                  <label htmlFor="electric">Электрогитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="ukulele"
                    name="ukulele"
                    defaultChecked
                  />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">
                Количество струн
                </legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="4-strings"
                    name="4-strings"
                    defaultChecked
                  />
                  <label htmlFor="4-strings">4</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="6-strings"
                    name="6-strings"
                    defaultChecked
                  />
                  <label htmlFor="6-strings">6</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="7-strings"
                    name="7-strings"
                  />
                  <label htmlFor="7-strings">7</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    id="12-strings"
                    name="12-strings"
                    disabled
                  />
                  <label htmlFor="12-strings">12</label>
                </div>
              </fieldset>
              <button
                className="catalog-filter__reset-btn button button--black-border button--medium"
                type="reset"
              >
              Очистить
              </button>
            </form>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button
                  className={searchParams.get('sort') === SortTypes.Price ?
                    'catalog-sort__type-button catalog-sort__type-button--active' :
                    'catalog-sort__type-button'}
                  aria-label="по цене"
                  onClick={() => {
                    setSearchParams(searchParams.get('order') ?
                      `?sort=price&order=${searchParams.get('order')}` :
                      '?sort=price&order=asc');
                  }}
                >
                по цене
                </button>
                <button
                  className={searchParams.get('sort') === SortTypes.Rating ?
                    'catalog-sort__type-button catalog-sort__type-button--active' :
                    'catalog-sort__type-button'}
                  aria-label="по популярности"
                  onClick={() => {
                    setSearchParams(searchParams.get('order') ?
                      `?sort=rating&order=${searchParams.get('order')}` :
                      '?sort=rating&order=asc');
                  }}
                >
                по популярности
                </button>
              </div>
              <div className="catalog-sort__order">
                <button
                  className={searchParams.get('order') === OrderTypes.Asc ?
                    'catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active' :
                    'catalog-sort__order-button catalog-sort__order-button--up'}
                  aria-label="По возрастанию"
                  onClick={() => {
                    setSearchParams(searchParams.get('sort') ?
                      `?sort=${searchParams.get('sort')}&order=asc` :
                      '?sort=price&order=asc');
                  }}
                />
                <button
                  className={searchParams.get('order') === OrderTypes.Desc ?
                    'catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active' :
                    'catalog-sort__order-button catalog-sort__order-button--down'}
                  aria-label="По убыванию"
                  onClick={() => {
                    setSearchParams(searchParams.get('sort') ?
                      `?sort=${searchParams.get('sort')}&order=desc` :
                      '?sort=price&order=desc');
                  }}
                />
              </div>
            </div>
            <div className="cards catalog__cards">
              {guitarsList.map((guitar) => (<GuitarCard guitar={guitar} key={guitar.id}/>))}
            </div>
            <div className="pagination page-content__pagination">
              <PaginationList/>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default MainScreen;
