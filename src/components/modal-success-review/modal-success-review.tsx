import { useCallback, useEffect } from 'react';
import { APIRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { getGuitar } from '../../store/guitar-data/selectors';

type ModalSuccessReviewProps = {
    onEventsetShowModalSuccessReview: () => void;
  };

function ModalSuccessReview({onEventsetShowModalSuccessReview}: ModalSuccessReviewProps): JSX.Element {

  const dispatch = useAppDispatch();

  const selectedGuitar = useAppSelector(getGuitar);

  const escFunction = useCallback((evt) => {
    if (evt.keyCode === 27) {
      onEventsetShowModalSuccessReview();
      dispatch(redirectToRoute(`${APIRoute.Guitars}/${selectedGuitar?.id}#characteristics`));
    }
  }, [dispatch, onEventsetShowModalSuccessReview, selectedGuitar?.id]);

  useEffect(() => {
    document.addEventListener('keydown', escFunction);

    return () => {
      document.removeEventListener('keydown', escFunction);
    };
  }, [escFunction]);

  return (
    <div
      style={{ position: 'relative', width: 550, height: 410, marginBottom: 50 }}
    >
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal="" onClick={onEventsetShowModalSuccessReview}/>
          <div className="modal__content">
            <svg className="modal__icon" width={26} height={20} aria-hidden="true">
              <use xlinkHref="#icon-success" />
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button
                className="button button--small modal__button modal__button--review"
                onClick={onEventsetShowModalSuccessReview}
              >
              К покупкам!
              </button>
            </div>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={onEventsetShowModalSuccessReview}
            >
              <span className="button-cross__icon" />
              <span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccessReview;
