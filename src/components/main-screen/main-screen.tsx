import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { OrderTypes, SortTypes, SPIN_HEIGHT, SPIN_WIDTH } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchGuitarsAction } from '../../store/api-actions';
import { changeLoadingGuitarsStatus } from '../../store/guitar-data/guitar-data';
import { getCountGuitars, getGuitars, getLoadingGuitarsStatus } from '../../store/guitar-data/selectors';
import { changeActivPage } from '../../store/guitar-process/guitar-process';
import { Guitar } from '../../types/guitar';
import Footer from '../footer/footer';
import FormFilters from '../form-filters/form-filters';
import GuitarCard from '../guitar-card/guitar-card';
import Header from '../header/header';
import ModalAddCart from '../modal-add-cart/modal-add-cart';
import ModalAddSuccess from '../modal-add-success/modal-add-success';
import PaginationList from '../pagination-list/pagination-list';

function MainScreen(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [showModalAddCart, setShowModalAddCart] = useState(false);
  const [showModalAddSuccess, setShowModalAddSuccess] = useState(false);

  const countGuitars = useAppSelector(getCountGuitars);

  useEffect(() => {
    dispatch(changeActivPage(Number(params.id)));
    store.dispatch(fetchGuitarsAction({id: Number(params.id), sortType: searchParams.toString() ? `${searchParams.toString()}&` : ''}));
  }, [dispatch, params.id, searchParams]);

  const guitarsList: Guitar[] = useAppSelector(getGuitars);
  const isLoadingGuitars = useAppSelector(getLoadingGuitarsStatus);

  return (
    <div className="wrapper" style={showModalAddCart || showModalAddSuccess ? { height: '100vh' } : {}}>
      <Header/>
      <main className="page-content">
        {isLoadingGuitars ?
          <div style={{position: 'absolute', left: '50%', top: '30%', transform: 'translate(-50%, -50%)'}}>
            {<TailSpin color="#00BFFF" height={SPIN_HEIGHT} width={SPIN_WIDTH}/>}
          </div> :
          ''}
        {showModalAddCart && <ModalAddCart onEventShowModalAddCartCallback={() => setShowModalAddCart(false)} onEventShowModalAddSuccess={() => setShowModalAddSuccess(true)}/>}
        {showModalAddSuccess && <ModalAddSuccess onEventShowModalAddSuccess={() => setShowModalAddSuccess(false)} isGuitarScreen={false}/>}
        <div className="container">
          <h1 className="page-content__title title title--bigger">
          Каталог гитар
          </h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <Link className="link" to={'/catalog/page_1'}>
              Главная
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to="todo">Каталог</Link>
            </li>
          </ul>
          <div className="catalog">
            <FormFilters/>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button
                  className={searchParams.get('_sort') === SortTypes.Price ?
                    'catalog-sort__type-button catalog-sort__type-button--active' :
                    'catalog-sort__type-button'}
                  aria-label="по цене"
                  onClick={() => {
                    dispatch(changeLoadingGuitarsStatus(true));
                    searchParams.set('_sort', 'price');
                    if (!searchParams.has('_order')) {
                      searchParams.set('_order', 'asc');
                    }
                    setSearchParams(`${searchParams.toString()}`);
                  }}
                >
                по цене
                </button>
                <button
                  className={searchParams.get('_sort') === SortTypes.Rating ?
                    'catalog-sort__type-button catalog-sort__type-button--active' :
                    'catalog-sort__type-button'}
                  aria-label="по популярности"
                  onClick={() => {
                    dispatch(changeLoadingGuitarsStatus(true));
                    searchParams.set('_sort', 'rating');
                    if (!searchParams.has('_order')) {
                      searchParams.set('_order', 'asc');
                    }
                    setSearchParams(`${searchParams.toString()}`);
                  }}
                >
                по популярности
                </button>
              </div>
              <div className="catalog-sort__order">
                <button
                  className={searchParams.get('_order') === OrderTypes.Asc ?
                    'catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active' :
                    'catalog-sort__order-button catalog-sort__order-button--up'}
                  aria-label="По возрастанию"
                  onClick={() => {
                    dispatch(changeLoadingGuitarsStatus(true));
                    if (!searchParams.has('_sort')) {
                      searchParams.set('_sort', 'price');
                    }
                    searchParams.set('_order', 'asc');
                    setSearchParams(`${searchParams.toString()}`);
                  }}
                />
                <button
                  className={searchParams.get('_order') === OrderTypes.Desc ?
                    'catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active' :
                    'catalog-sort__order-button catalog-sort__order-button--down'}
                  aria-label="По убыванию"
                  onClick={() => {
                    dispatch(changeLoadingGuitarsStatus(true));
                    if (!searchParams.has('_sort')) {
                      searchParams.set('_sort', 'price');
                    }
                    searchParams.set('_order', 'desc');
                    setSearchParams(`${searchParams.toString()}`);
                  }}
                />
              </div>
            </div>
            <div className="cards catalog__cards">
              {guitarsList.map((guitar) => (<GuitarCard guitar={guitar} key={guitar.id} onEventShowModalAddCartCallback={() => setShowModalAddCart(true)}/>))}
            </div>
            <div className="pagination page-content__pagination">
              {(countGuitars > 9) && <PaginationList/>}
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default MainScreen;
