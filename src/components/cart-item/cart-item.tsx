import { GuitarType } from '../../const';
import { useAppSelector } from '../../hooks';
import { getGuitarsCart } from '../../store/guitar-process/selectors';

type CartItemProps = {
    guitarId: number;
  }

function CartItem({guitarId}: CartItemProps): JSX.Element {
  const guitar = useAppSelector(getGuitarsCart)[guitarId];

  return (
    <div className="cart-item">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
      >
        <span className="button-cross__icon" />
        <span className="cart-item__close-button-interactive-area" />
      </button>
      <div className="cart-item__image">
        <img
          src={`../${guitar.previewImg}`}
          srcSet={`../${guitar.previewImg} 2x`}
          width={55}
          height={130}
          alt="ЭлектроГитара Честер bass"
        />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{GuitarType[guitar.type]} {guitar.name}</p>
        <p className="product-info__info">Артикул: {guitar.vendorCode}</p>
        <p className="product-info__info">{GuitarType[guitar.type]}, {guitar.stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{guitar.price.toLocaleString('ru')} ₽</div>
      <div className="quantity cart-item__quantity">
        <button
          className="quantity__button"
          aria-label="Уменьшить количество"
        >
          <svg width={8} height={8} aria-hidden="true">
            <use xlinkHref="#icon-minus" />
          </svg>
        </button>
        <input
          className="quantity__input"
          type="number"
          placeholder='1'
          id="2-count"
          name="2-count"
          max={99}
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
        >
          <svg width={8} height={8} aria-hidden="true">
            <use xlinkHref="#icon-plus" />
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{guitar.price.toLocaleString('ru')} ₽</div>
    </div>
  );
}

export default CartItem;
