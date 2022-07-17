import { ChangeEvent } from 'react';
import { GuitarType, MAX_COUNT_GUITAR_IN_CART, MIN_COUNT_GUITAR_IN_CART } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCountGuitarInCart } from '../../store/guitar-process/guitar-process';
import { getGuitarsCart } from '../../store/guitar-process/selectors';

type CartItemProps = {
    guitarId: number;
    onEventShowModalDelete: () => void;
  }

function CartItem({guitarId, onEventShowModalDelete}: CartItemProps): JSX.Element {
  const guitar = useAppSelector(getGuitarsCart)[guitarId];

  const dispatch = useAppDispatch();

  return (
    <div className="cart-item">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
        onClick={onEventShowModalDelete}
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
          onClick={() =>{
            if (+guitar.count === MIN_COUNT_GUITAR_IN_CART) {
              onEventShowModalDelete();
              return;
            }
            dispatch(changeCountGuitarInCart({id: guitarId, count: (guitar.count - 1)}));
          }}
        >
          <svg width={8} height={8} aria-hidden="true">
            <use xlinkHref="#icon-minus" />
          </svg>
        </button>
        <input
          className="quantity__input"
          type="number"
          placeholder='1'
          id={`${guitarId}-count`}
          name={`${guitarId}-count`}
          max={99}
          value={guitar.count.toString()}
          onChange={({target}: ChangeEvent<HTMLInputElement>) => {
            let value = +target.value;
            if (+target.value > MAX_COUNT_GUITAR_IN_CART) {
              value = MAX_COUNT_GUITAR_IN_CART;
            } else if (+target.value < MIN_COUNT_GUITAR_IN_CART) {
              value = MIN_COUNT_GUITAR_IN_CART;
            }
            dispatch(changeCountGuitarInCart({id: guitarId, count: value}));
          }}
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={() =>{
            if (+guitar.count === MAX_COUNT_GUITAR_IN_CART) {return;}
            dispatch(changeCountGuitarInCart({id: guitarId, count: (+guitar.count + 1)}));
          }}
        >
          <svg width={8} height={8} aria-hidden="true">
            <use xlinkHref="#icon-plus" />
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{(guitar.price * guitar.count).toLocaleString('ru')} ₽</div>
    </div>
  );
}

export default CartItem;
