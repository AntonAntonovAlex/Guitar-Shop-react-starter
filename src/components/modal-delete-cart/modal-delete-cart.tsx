import { useCallback, useEffect } from 'react';
import { GuitarType, KEYCODE_ESC, KEYCODE_TAB } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeGuitarFromCart } from '../../store/guitar-process/guitar-process';
import { getGuitarsCart } from '../../store/guitar-process/selectors';

type ModalDeleteCartProps = {
  onEventShowModalDelete: () => void;
  idGuitarRemoveFromCart: string;
};

function ModalDeleteCart({onEventShowModalDelete, idGuitarRemoveFromCart}: ModalDeleteCartProps): JSX.Element {
  const guitarRemoveFromCart = useAppSelector(getGuitarsCart)[+idGuitarRemoveFromCart];

  const dispatch = useAppDispatch();

  const keyDownFunction = useCallback((evt) => {
    const lastFocusableEl = document.querySelector('#button-close');
    const firstFocusableEl  = document.querySelector('#button-delete');

    if (evt.keyCode === KEYCODE_ESC) {
      onEventShowModalDelete();
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
  }, [onEventShowModalDelete]);

  useEffect(() => {
    document.addEventListener('keydown', keyDownFunction);

    return () => {
      document.removeEventListener('keydown', keyDownFunction);
    };
  }, [keyDownFunction]);

  return (
    <div className="modal is-active modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal="" onClick={onEventShowModalDelete}/>
        <div className="modal__content">
          <h2 className="modal__header title title--medium title--red">
              Удалить этот товар?
          </h2>
          <div className="modal__info">
            <img
              className="modal__img"
              src={`../${guitarRemoveFromCart.previewImg}`}
              srcSet={`../${guitarRemoveFromCart.previewImg} 2x`}
              width={67}
              height={137}
              alt={guitarRemoveFromCart.name}
            />
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">
                  Гитара {guitarRemoveFromCart.name}
              </h3>
              <p className="modal__product-params modal__product-params--margin-11">
                  Артикул: {guitarRemoveFromCart.vendorCode}
              </p>
              <p className="modal__product-params">{GuitarType[guitarRemoveFromCart.type]}, {guitarRemoveFromCart.stringCount} струнная</p>
              <p className="modal__price-wrapper">
                <span className="modal__price">Цена:</span>
                <span className="modal__price">{guitarRemoveFromCart.price.toLocaleString('ru')} ₽</span>
              </p>
            </div>
          </div>
          <div className="modal__button-container">
            <button
              className="button button--small modal__button"
              id="button-delete"
              onClick={() => {
                onEventShowModalDelete();
                dispatch(removeGuitarFromCart(idGuitarRemoveFromCart));
              }}
            >
                Удалить товар
            </button>
            <button
              className="button button--black-border button--small modal__button modal__button--right"
              onClick={onEventShowModalDelete}
              autoFocus
            >
                Продолжить покупки
            </button>
          </div>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            id="button-close"
            onClick={onEventShowModalDelete}
          >
            <span className="button-cross__icon" />
            <span className="modal__close-btn-interactive-area" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteCart;
