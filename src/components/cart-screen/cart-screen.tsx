import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendCouponAction } from '../../store/api-actions';
import { getCartBonus, getGuitarsCart } from '../../store/guitar-process/selectors';
import CartItem from '../cart-item/cart-item';
import Footer from '../footer/footer';
import Header from '../header/header';
import ModalDeleteCart from '../modal-delete-cart/modal-delete-cart';

function CartScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const cartBonusPercent = useAppSelector(getCartBonus);
  const guitarsCart = useAppSelector(getGuitarsCart);
  const guitarCartIds = Object.keys(guitarsCart);
  const initialValue = 0;
  const priceGuitarsInCart = Object.keys(guitarsCart).reduce(
    (accumulator, currentValue) => accumulator + guitarsCart[+currentValue].count * guitarsCart[+currentValue].price,
    initialValue,
  );

  const cartBonusValue = priceGuitarsInCart / 100 * cartBonusPercent;

  const [idGuitarRemoveFromCart, setIdGuitarRemoveFromCart] = useState('');
  const [couponValue, setCouponValue] = useState('');
  const [showCouponInputMessage, setShowCouponInputMessage] = useState(false);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(sendCouponAction({coupon: couponValue}));
    setShowCouponInputMessage(true);
  };

  function getClassNameCouponInput () {
    if (!showCouponInputMessage || guitarCartIds.length === 0) {
      return 'hidden';
    }
    return cartBonusValue > 0
      ? 'form-input__message form-input__message--success'
      : 'form-input__message form-input__message--error';
  }

  return (
    <div className="wrapper" style={idGuitarRemoveFromCart ? { height: '100vh' } : {}}>
      <Header/>
      <main className="page-content">
        {idGuitarRemoveFromCart && <ModalDeleteCart idGuitarRemoveFromCart={idGuitarRemoveFromCart} onEventShowModalDelete={() => setIdGuitarRemoveFromCart('')}/>}
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item">
              <Link className="link" to={'/catalog/page_1'}>
            Главная
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to={'/catalog/page_1'}>
            Каталог
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to="todo">Корзина</Link>
            </li>
          </ul>
          <div className="cart">
            {guitarCartIds.map((guitarId) => (<CartItem guitarId={+guitarId} key={guitarId} onEventShowModalDelete={() => setIdGuitarRemoveFromCart(guitarId)}/>))}
            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">
              Промокод на скидку
                </h2>
                <p className="coupon__info">
              Введите свой промокод, если он у вас есть.
                </p>
                <form
                  className="coupon__form"
                  id="coupon-form"
                  method="post"
                  action="/"
                  onSubmit={handleFormSubmit}
                >
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input
                      type="text"
                      placeholder="Введите промокод"
                      id="coupon"
                      name="coupon"
                      autoComplete="off"
                      pattern='^[^\s]*$'
                      onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                        const value = target.value.replace(/\s/g, '');
                        setCouponValue(value);
                      }}
                      value={couponValue}
                    />
                    <p className={getClassNameCouponInput()}>
                      {cartBonusValue > 0 ? 'Промокод принят' : 'неверный промокод'}
                    </p>
                  </div>
                  <button className="button button--big coupon__button">
                Применить
                  </button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span>
                  <span className="cart__total-value">{priceGuitarsInCart?.toLocaleString('ru')} ₽</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Скидка:</span>
                  <span className={cartBonusValue > 0
                    ? 'cart__total-value cart__total-value--bonus'
                    : 'cart__total-value'}
                  >
                    {cartBonusValue > 0 ? '-' : ''} {(cartBonusValue)?.toLocaleString('ru')} ₽
                  </span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">К оплате:</span>
                  <span className="cart__total-value cart__total-value--payment">
                    {(priceGuitarsInCart - (cartBonusValue))?.toLocaleString('ru')} ₽
                  </span>
                </p>
                <button className="button button--red button--big cart__order-button">
              Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>

  );
}

export default CartScreen;
