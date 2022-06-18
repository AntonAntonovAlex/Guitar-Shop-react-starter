import { useCallback, useEffect } from 'react';
import { APIRoute, KEYCODE_ESC, KEYCODE_TAB } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { store } from '../../store';
import { redirectToRoute } from '../../store/action';
import { fetchGuitarAction } from '../../store/api-actions';
import { loadGuitar } from '../../store/guitar-data/guitar-data';
import { getGuitar } from '../../store/guitar-data/selectors';
import { resetCountReviews } from '../../store/guitar-process/guitar-process';

type ModalSuccessReviewProps = {
    onEventsetShowModalSuccessReview: () => void;
  };

function ModalSuccessReview({onEventsetShowModalSuccessReview}: ModalSuccessReviewProps): JSX.Element {

  const dispatch = useAppDispatch();

  const selectedGuitar = useAppSelector(getGuitar);

  const closePopup = useCallback(()=> {
    onEventsetShowModalSuccessReview();
    dispatch(resetCountReviews());
    dispatch(redirectToRoute(`${APIRoute.Guitars}/${selectedGuitar?.id}/characteristics`));
    store.dispatch(loadGuitar({guitar: null, reviews: []}));
    store.dispatch(fetchGuitarAction(Number(selectedGuitar?.id)));
  }, [dispatch, onEventsetShowModalSuccessReview, selectedGuitar?.id]);

  const keyDownFunction = useCallback((evt) => {
    const firstFocusableEl  = document.querySelector('#button-review');
    const lastFocusableEl = document.querySelector('#button-close');

    if (evt.keyCode === KEYCODE_ESC) {
      closePopup();
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
  }, [closePopup]);

  useEffect(() => {
    document.addEventListener('keydown', keyDownFunction);

    return () => {
      document.removeEventListener('keydown', keyDownFunction);
    };
  }, [keyDownFunction]);

  return (
    <div className="modal is-active modal--success modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal="" onClick={() => closePopup()}/>
        <div className="modal__content">
          <svg className="modal__icon" width={26} height={20} aria-hidden="true">
            <use xlinkHref="#icon-success" />
          </svg>
          <p className="modal__message">Спасибо за ваш отзыв!</p>
          <div className="modal__button-container modal__button-container--review">
            <button
              id="button-review"
              className="button button--small modal__button modal__button--review"
              onClick={() => closePopup()}
            >
              К покупкам!
            </button>
          </div>
          <button
            autoFocus
            id="button-close"
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={() => closePopup()}
          >
            <span className="button-cross__icon" />
            <span className="modal__close-btn-interactive-area" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccessReview;
