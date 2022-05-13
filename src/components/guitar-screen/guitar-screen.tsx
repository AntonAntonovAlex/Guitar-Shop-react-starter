import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GuitarType } from '../../const';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchGuitarAction } from '../../store/api-actions';
import { loadGuitar } from '../../store/guitar-data/guitar-data';
import { getGuitar, getReviews } from '../../store/guitar-data/selectors';
import Footer from '../footer/footer';
import Header from '../header/header';

function GuitarScreen(): JSX.Element {
  const params = useParams();

  const selectedGuitar = useAppSelector(getGuitar);
  const guitarReviews = useAppSelector(getReviews);
  // eslint-disable-next-line no-console
  console.log('selectedGuitar - ', selectedGuitar);
  // eslint-disable-next-line no-console
  console.log('guitarReviews - ', guitarReviews);

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


  return (
    <div className="wrapper">
      <Header/>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>
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
              <a className="link">Товар</a>
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
                {getRatingStars((selectedGuitar?.rating)? selectedGuitar.rating : 0)}
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <div className="tabs">
                <a
                  className="button button--medium tabs__button"
                  href="#characteristics"
                >
                Характеристики
                </a>
                <a
                  className="button button--black-border button--medium tabs__button"
                  href="#description"
                >
                Описание
                </a>
                <div className="tabs__content" id="characteristics">
                  <table className="tabs__table">
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
                  <p className="tabs__product-description hidden">
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
                href="#"
              >
              Добавить в корзину
              </a>
            </div>
          </div>
          <section className="reviews">
            <h3 className="reviews__title title title--bigger">Отзывы</h3>
            <a
              className="button button--red-border button--big reviews__sumbit-button"
              href="#"
            >
            Оставить отзыв
            </a>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">
                Иванов Максим
                </h4>
                <span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">
              Хороший корпус, чистый звук, стурны хорошего качества
              </p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">
              У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла
              и ремня.
              </p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">
                Перова Ольга
                </h4>
                <span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">
              Хороший корпус, чистый звук, стурны хорошего качества
              </p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">
              У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла
              и ремня.{' '}
              </p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">
                Преображенская Ксения
                </h4>
                <span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">
              Хороший корпус, чистый звук, стурны хорошего качества
              </p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">
              У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла
              и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте
              неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в
              компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево.
              Тяжелая, в компдлекте неть чехла и ремня.{' '}
              </p>
            </div>
            <button className="button button--medium reviews__more-button">
            Показать еще отзывы
            </button>
            <a
              className="button button--up button--red-border button--big reviews__up-button"
              href="#header"
            >
            Наверх
            </a>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default GuitarScreen;
