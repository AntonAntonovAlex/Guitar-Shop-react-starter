import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchGuitarAction } from '../../store/api-actions';
import { loadGuitar } from '../../store/guitar-data/guitar-data';
import { getGuitar, getReviews } from '../../store/guitar-data/selectors';
import Footer from '../footer/footer';
import Header from '../header/header';
import ModalReview from '../modal-review/modal-review';
import ModalSuccessReview from '../modal-success-review/modal-success-review';
import RatingStar from '../rating-star/rating-star';
import Reviews from '../reviews/reviews';

function GuitarScreen(): JSX.Element {
  const widthStar = 14;
  const heightStar = 14;

  const params = useParams();

  const selectedGuitar = useAppSelector(getGuitar);
  const guitarReviews = useAppSelector(getReviews);

  useEffect(() => {
    store.dispatch(fetchGuitarAction(Number(params.id)));
    return () => {
      store.dispatch(loadGuitar({guitar: null, reviews: []}));
    };
  }, [params.id]);

  const [showModalReview, setShowModalReview] = useState(false);
  const [showModalSuccessReview, setShowModalSuccessReview] = useState(false);
  const [isCharacteristics, setIsCharacteristics] = useState(true);

  return (
    <div className="wrapper" style={showModalReview || showModalSuccessReview ? { height: '100vh' } : {}}>
      <Header/>
      <main className="page-content">
        {showModalReview && <ModalReview onEventShowModalReviewCallback={() => setShowModalReview(false)} onEventShowModalSuccessReview={() => setShowModalSuccessReview(true)}/>}
        {showModalSuccessReview && <ModalSuccessReview onEventsetShowModalSuccessReview={() => setShowModalSuccessReview(false)}/>}
        <div className="container">
          <h1 className="page-content__title title title--bigger">{selectedGuitar?.name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <a className="link" href="/">
              Главная
              </a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link" href="/">
              Каталог
              </a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link" href="todo">{selectedGuitar?.name}</a>
            </li>
          </ul>
          <div className="product-container">
            <img
              className="product-container__img"
              src={`../${selectedGuitar?.previewImg}`}
              srcSet={`../${selectedGuitar?.previewImg} 2x`}
              width={90}
              height={235}
              alt=""
            />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">
                {selectedGuitar?.name}
              </h2>
              <div className="rate product-container__rating">
                <RatingStar ratingGuitar={(selectedGuitar?.rating)? selectedGuitar.rating : 0} widthStar={widthStar} heightStar={heightStar} />
                <p className="visually-hidden">Оценка: Хорошо</p>
                <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{guitarReviews.length}</p>
              </div>
              <div className="tabs">
                <Link
                  className={isCharacteristics ?
                    'button button--medium tabs__button' :
                    'button button--medium tabs__button button--black-border'}
                  to='characteristics'
                  onClick={() => setIsCharacteristics(true)}
                >
                Характеристики
                </Link>
                <Link
                  className={isCharacteristics ?
                    'button button--medium tabs__button button--black-border' :
                    'button button--medium tabs__button'}
                  to='description'
                  onClick={() => setIsCharacteristics(false)}
                >
                Описание
                </Link>
                <div className="tabs__content" id="characteristics_tabs">
                  <Outlet/>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">
              Цена:
              </p>
              <p className="product-container__price-info product-container__price-info--value">
                {selectedGuitar?.price.toLocaleString('ru')} ₽
              </p>
              <a
                className="button button--red button--big product-container__button"
                href="#todo"
              >
              Добавить в корзину
              </a>
            </div>
          </div>
          <Reviews onEventShowModalReviewCallback={() => setShowModalReview(true)}/>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default GuitarScreen;
