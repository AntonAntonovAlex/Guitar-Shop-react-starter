import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { changeIdGuitarForCart } from '../../store/guitar-process/guitar-process';
import { getGuitarsCart } from '../../store/guitar-process/selectors';
import { Guitar } from '../../types/guitar';
import { GuitarCart } from '../../types/guitar-cart';
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

  const guitarsInCart: GuitarCart = useAppSelector(getGuitarsCart);
  const isGuitarInCart = (id in guitarsInCart);

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
        <button
          className={isGuitarInCart
            ? 'button button--red-border button--mini button--in-cart'
            : 'button button--red button--mini button--add-to-cart'}
          onClick={() => {
            if (isGuitarInCart) {
              dispatch(redirectToRoute(AppRoute.Cart));
              return;
            }
            dispatch(changeIdGuitarForCart(id));
            onEventShowModalAddCartCallback();
          }}
        >
          {isGuitarInCart ? 'В Корзине' : 'Купить'}
        </button>
      </div>
    </div>
  );
}

export default GuitarCard;
