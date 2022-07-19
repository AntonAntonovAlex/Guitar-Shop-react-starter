import { useCallback, useEffect } from 'react';
import { GuitarType, KEYCODE_ESC, KEYCODE_TAB } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGuitars } from '../../store/guitar-data/selectors';
import { addGuitarInCart } from '../../store/guitar-process/guitar-process';
import { getIdGuitarForCart } from '../../store/guitar-process/selectors';
import { Guitar } from '../../types/guitar';

type ModalAddCartProps = {
  onEventShowModalAddCartCallback: () => void;
  onEventShowModalAddSuccess: () => void;
};

function ModalAddCart({onEventShowModalAddCartCallback, onEventShowModalAddSuccess}: ModalAddCartProps): JSX.Element {
  const guitarsList: Guitar[] = useAppSelector(getGuitars);
  const idGuitarForCart: number = useAppSelector(getIdGuitarForCart);
  const guitarCardForCart = guitarsList.find((guitar) => guitar.id === idGuitarForCart);

  const dispatch = useAppDispatch();

  const keyDownFunction = useCallback((evt) => {
    const lastFocusableEl = document.querySelector('#button-close');
    const firstFocusableEl  = document.querySelector('#button-add');
    if (evt.keyCode === KEYCODE_ESC) {
      onEventShowModalAddCartCallback();
    }
    if (evt.keyCode === KEYCODE_TAB) {
      if ( evt.shiftKey ) {
        if (document.activeElement === firstFocusableEl) {
          (lastFocusableEl as HTMLElement)?.focus();
          evt.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          (firstFocusableEl as HTMLElement)?.focus();
          evt.preventDefault();
        }
      }
    }
  }, [onEventShowModalAddCartCallback]);

  useEffect(() => {
    document.addEventListener('keydown', keyDownFunction);

    return () => {
      document.removeEventListener('keydown', keyDownFunction);
    };
  }, [keyDownFunction]);

  return (
    <div className="modal is-active modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal="" onClick={onEventShowModalAddCartCallback}/>
        <div className="modal__content">
          <h2 className="modal__header title title--medium">
        Добавить товар в корзину
          </h2>
          <div className="modal__info">
            <img
              className="modal__img"
              src={`../../${guitarCardForCart?.previewImg}`}
              srcSet={`../../${guitarCardForCart?.previewImg} 2x`}
              width={67}
              height={137}
              alt={guitarCardForCart?.name}
            />
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">
            Гитара {guitarCardForCart?.name}
              </h3>
              <p className="modal__product-params modal__product-params--margin-11">
            Артикул: {guitarCardForCart?.vendorCode}
              </p>
              <p className="modal__product-params">{(guitarCardForCart?.type)? GuitarType[guitarCardForCart.type] : ''}, {guitarCardForCart?.stringCount} струнная</p>
              <p className="modal__price-wrapper">
                <span className="modal__price">Цена:</span>
                <span className="modal__price">{guitarCardForCart?.price.toLocaleString('ru')} ₽</span>
              </p>
            </div>
          </div>
          <div className="modal__button-container">
            <button
              className="button button--red button--big modal__button modal__button--add"
              id="button-add"
              autoFocus
              onClick={() => {
                onEventShowModalAddCartCallback();
                onEventShowModalAddSuccess();
                dispatch(addGuitarInCart(guitarCardForCart));
              }}
            >
          Добавить в корзину
            </button>
          </div>
          <button
            className="modal__close-btn button-cross"
            id="button-close"
            type="button"
            aria-label="Закрыть"
            onClick={onEventShowModalAddCartCallback}
          >
            <span className="button-cross__icon" />
            <span className="modal__close-btn-interactive-area" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddCart;
