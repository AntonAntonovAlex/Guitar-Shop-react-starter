import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { GuitarType } from '../../const';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchGuitarAction } from '../../store/api-actions';
import { loadGuitar } from '../../store/guitar-data/guitar-data';
import { getGuitar, getReviews } from '../../store/guitar-data/selectors';
import Footer from '../footer/footer';
import Header from '../header/header';
import ModalReview from '../modal-review/modal-review';
import Reviews from '../reviews/reviews';

function GuitarScreen(): JSX.Element {
  const params = useParams();

  const [showModalReview, setShowModalReview] = useState(false);

  const location = useLocation();
  const isCharacteristics = location.hash !== '#description';

  const selectedGuitar = useAppSelector(getGuitar);
  const guitarReviews = useAppSelector(getReviews);

  useEffect(() => {
    store.dispatch(fetchGuitarAction(Number(params.id)));
    return () => {
      store.dispatch(loadGuitar({film: null, similarFilms: [], reviews: []}));
    };
  }, [params.id]);

  function getRatingStars(ratingGuitar: number) {
    const raitingStarsItems = [];

    for (let i = 0; i < 5; i++) {
      raitingStarsItems.push(
        <svg width={14} height={14} aria-hidden="true" key={`svg_star-${i}`}>
          <use xlinkHref={ratingGuitar > i ? '#icon-full-star' : '#icon-star'}/>
        </svg>,
      );
    }
    return (
      raitingStarsItems
    );
  }

  /* function onScrollList(event: React.UIEvent<HTMLDivElement>) {
    const scrollBottom = event.target;

    if (scrollBottom) {
      // eslint-disable-next-line no-console
      console.log('allert');
    }
  }*/

  /*window.addEventListener('scroll', (e) => {
    // eslint-disable-next-line no-console
    console.log('allert');
  });*/


  return (
    <div className="wrapper">
      <Header/>
      <main className="page-content">
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
              <a className="link">{selectedGuitar?.name}</a>
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
            {showModalReview && <ModalReview />}
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">
                {selectedGuitar?.name}
              </h2>
              <div className="rate product-container__rating">
                {getRatingStars((selectedGuitar?.rating)? selectedGuitar.rating : 0)}
                <p className="visually-hidden">Оценка: Хорошо</p>
                <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{guitarReviews.length}</p>
              </div>
              <div className="tabs">
                <a
                  className={isCharacteristics ?
                    'button button--medium tabs__button' :
                    'button button--medium tabs__button button--black-border'}
                  href="#characteristics"
                >
                Характеристики
                </a>
                <a
                  className={isCharacteristics ?
                    'button button--medium tabs__button button--black-border' :
                    'button button--medium tabs__button'}
                  href="#description"
                >
                Описание
                </a>
                <div className="tabs__content" id="characteristics">
                  <table className={isCharacteristics ? 'tabs__table' : 'tabs__table hidden'}>
                    <tbody>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Артикул:</td>
                        <td className="tabs__value">{selectedGuitar?.vendorCode}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Тип:</td>
                        <td className="tabs__value">{(selectedGuitar?.type)? GuitarType[selectedGuitar.type] : ''} </td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Количество струн:</td>
                        <td className="tabs__value">{selectedGuitar?.stringCount} струнная</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className={isCharacteristics ? 'tabs__product-description hidden' : 'tabs__product-description' }>
                    {selectedGuitar?.description}
                  </p>
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
