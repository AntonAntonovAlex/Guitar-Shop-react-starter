import { useCallback, useEffect } from 'react';
import { AppRoute, KEYCODE_ESC, KEYCODE_TAB } from '../../const';
import { useAppDispatch } from '../../hooks';
import { redirectToRoute } from '../../store/action';

type ModalAddSuccessProps = {
  onEventShowModalAddSuccess: () => void;
  isGuitarScreen: boolean;
};

function ModalAddSuccess({onEventShowModalAddSuccess, isGuitarScreen}: ModalAddSuccessProps): JSX.Element {
  const dispatch = useAppDispatch();

  const keyDownFunction = useCallback((evt) => {
    const lastFocusableEl = document.querySelector('#button-close');
    const firstFocusableEl  = document.querySelector('#button-container');

    if (evt.keyCode === KEYCODE_ESC) {
      onEventShowModalAddSuccess();
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
  }, [onEventShowModalAddSuccess]);

  useEffect(() => {
    document.addEventListener('keydown', keyDownFunction);

    return () => {
      document.removeEventListener('keydown', keyDownFunction);
    };
  }, [keyDownFunction]);

  return (
    <div className="modal is-active modal--success modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal="" onClick={onEventShowModalAddSuccess}/>
        <div className="modal__content">
          <svg className="modal__icon" width={26} height={20} aria-hidden="true">
            <use xlinkHref="#icon-success" />
          </svg>
          <p className="modal__message">Товар успешно добавлен в корзину</p>
          <div className="modal__button-container modal__button-container--add">
            <button
              className="button button--small modal__button"
              autoFocus
              id="button-container"
              onClick={() => dispatch(redirectToRoute(AppRoute.Cart))}
            >
          Перейти в корзину
            </button>
            <button
              className="button button--black-border button--small modal__button modal__button--right"
              onClick={() => {
                onEventShowModalAddSuccess();
                if (isGuitarScreen) {
                  dispatch(redirectToRoute('/catalog/page_1'));
                }
              }}
            >
          Продолжить покупки
            </button>
          </div>
          <button
            className="modal__close-btn button-cross"
            type="button"
            id="button-close"
            aria-label="Закрыть"
            onClick={onEventShowModalAddSuccess}
          >
            <span className="button-cross__icon" />
            <span className="modal__close-btn-interactive-area" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddSuccess;
