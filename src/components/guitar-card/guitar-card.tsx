import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { changeIdCardForCart } from '../../store/guitar-process/guitar-process';
import { Guitar } from '../../types/guitar';
import RatingStar from '../rating-star/rating-star';

type GuitarCardProps = {
  guitar: Guitar;
  onEventShowModalAddCartCallback: () => void;
}

const widthStar = 12;
const heightStar = 11;

function GuitarCard({guitar, onEventShowModalAddCartCallback}: GuitarCardProps): JSX.Element {
  const {price, name, previewImg, id, rating, comments} = guitar;

  const dispatch = useAppDispatch();

  return (
    <div className="product-card">
      <img
        src={`../${previewImg}`}
        srcSet={`../${previewImg} 2x`}
        width={75}
        height={190}
        alt={name}
      />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStar ratingGuitar={rating} widthStar={widthStar} heightStar={heightStar} />
          <p className="visually-hidden">Рейтинг: Хорошо</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{comments.length}
          </p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{price.toLocaleString('ru')} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`${'/guitars/'}${id}/characteristics`}>
            Подробнее
        </Link>
        <a
          className="button button--red button--mini button--add-to-cart"
          href="#todo"
          onClick={() => {
            dispatch(changeIdCardForCart(id));
            onEventShowModalAddCartCallback();
          }}
        >
            Купить
        </a>
      </div>
    </div>
  );
}

export default GuitarCard;
