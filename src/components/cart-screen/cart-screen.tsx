import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getGuitarsCart } from '../../store/guitar-process/selectors';
import CartItem from '../cart-item/cart-item';
import Footer from '../footer/footer';
import Header from '../header/header';
import ModalDeleteCart from '../modal-delete-cart/modal-delete-cart';

function CartScreen(): JSX.Element {
  const guitarsCart = useAppSelector(getGuitarsCart);
  const guitarCartIds = Object.keys(guitarsCart);
  const initialValue = 0;
  const priceGuitarsInCart = Object.keys(guitarsCart).reduce(
    (accumulator, currentValue) => accumulator + guitarsCart[+currentValue].count * guitarsCart[+currentValue].price,
    initialValue,
  );

  const [idGuitarRemoveFromCart, setIdGuitarRemoveFromCart] = useState('');

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
                >
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input
                      type="text"
                      placeholder="Введите промокод"
                      id="coupon"
                      name="coupon"
                    />
                    <p className="form-input__message form-input__message--success">
                  Промокод принят
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
                  <span className="cart__total-value cart__total-value--bonus">
                - 3000 ₽
                  </span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">К оплате:</span>
                  <span className="cart__total-value cart__total-value--payment">
                49 000 ₽
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
