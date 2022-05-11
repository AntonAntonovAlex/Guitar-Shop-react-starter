import { Link } from 'react-router-dom';
import { Guitar } from '../../types/guitar';

type GuitarCardProps = {
  guitar: Guitar;
}

function GuitarCard({guitar}: GuitarCardProps): JSX.Element {
  const {price, name, previewImg, id, rating} = guitar;

  function getRatingStars(ratingGuitar: number) {
    const raitingStarsItems = [];

    for (let i = 0; i < 5; i++) {
      raitingStarsItems.push(
        <svg width={12} height={11} aria-hidden="true" key={`svg_star-${i}`}>
          <use xlinkHref={ratingGuitar > i ? '#icon-full-star' : '#icon-star'}/>
        </svg>,
      );
    }
    return (
      raitingStarsItems
    );
  }

  return (
    <div className="product-card">
      <img
        src={previewImg}
        srcSet={`${previewImg}@2x.jpg 2x`}
        width={75}
        height={190}
        alt={name}
      />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {getRatingStars(rating)}

          <p className="visually-hidden">Рейтинг: Хорошо</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>9
          </p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{price.toLocaleString('ru')} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`${'/guitars/'}${id}`}>
            Подробнее
        </Link>
        <a
          className="button button--red button--mini button--add-to-cart"
          href="#todo"
        >
            Купить
        </a>
      </div>
    </div>
  );
}

export default GuitarCard;
