import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { KEYCODE_ESC, KEYCODE_TAB, RatingStars } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendReviewAction } from '../../store/api-actions';
import { getGuitar } from '../../store/guitar-data/selectors';
import { ReviewData } from '../../types/review-data';

type ModalReviewProps = {
  onEventShowModalReviewCallback: () => void;
  onEventShowModalSuccessReview: () => void;
};

function ModalReview({onEventShowModalReviewCallback, onEventShowModalSuccessReview}: ModalReviewProps): JSX.Element {

  const selectedGuitar = useAppSelector(getGuitar);

  const [userName, setUserName] = useState('');
  const [userAdvantage, setUserAdvantage] = useState('');
  const [userDisadvantage, setUserDisadvantage] = useState('');
  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(0);

  const dispatch = useAppDispatch();

  const lastFocusableEl = document.querySelector('#button-submit');
  const firstFocusableEl  = document.querySelector('#user-name');

  const sendReview = (reviewData: ReviewData) => {
    dispatch(sendReviewAction(reviewData));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (selectedGuitar && userRating !== null && userComment !== null && userDisadvantage !== null && userAdvantage !== null && userName !== null) {
      sendReview({
        guitarId: selectedGuitar.id,
        userName: userName,
        advantage: userAdvantage,
        disadvantage: userDisadvantage,
        comment: userComment,
        rating: userRating,
        closeModalReviewCallback: () => onEventShowModalReviewCallback(),
        showModalSuccessReview: () => onEventShowModalSuccessReview(),
      });
    }
  };

  const handleRatingChange = ({ target}: ChangeEvent<HTMLInputElement>) => {
    setUserRating(+target.value);
  };

  function getRatingStars() {
    const raitingStarsItems = [];

    for (let i = 5; i > 0; i--) {
      raitingStarsItems.push(
        <input
          key={`input_star-${i}`}
          className="visually-hidden"
          id={`star-${i}`}
          name="rate"
          type="radio"
          defaultValue={i}
          onChange={handleRatingChange}
          required
        />,
      );
      raitingStarsItems.push(
        <label
          key={`label_star-${i}`}
          className="rate__label"
          htmlFor={`star-${i}`}
          title={RatingStars[i]}
        />,
      );
    }

    return (
      raitingStarsItems
    );
  }

  const keyDownFunction = useCallback((evt) => {
    if (evt.keyCode === KEYCODE_ESC) {
      onEventShowModalReviewCallback();
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
  }, [firstFocusableEl, lastFocusableEl, onEventShowModalReviewCallback]);

  useEffect(() => {
    document.addEventListener('keydown', keyDownFunction);

    return () => {
      document.removeEventListener('keydown', keyDownFunction);
    };
  }, [keyDownFunction]);

  return (
    <div className="modal is-active modal--review modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal="" onClick={onEventShowModalReviewCallback}/>
        <div className="modal__content">
          <h2 className="modal__header modal__header--review title title--medium">
          Оставить отзыв
          </h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">
            {selectedGuitar?.name}
          </h3>
          <form className="form-review" onSubmit={handleFormSubmit}>
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label
                  className="form-review__label form-review__label--required"
                  htmlFor="user-name"
                >
                Ваше Имя
                </label>
                <input
                  autoFocus
                  className="form-review__input form-review__input--name"
                  id="user-name"
                  type="text"
                  autoComplete="off"
                  required
                  onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                    const value = target.value;
                    setUserName(value);
                  }}
                  value={userName}
                />
                <p className="form-review__warning">{userName === '' ? 'Заполните поле' : ''}</p>
              </div>
              <div>
                <span className="form-review__label form-review__label--required">
                Ваша Оценка
                </span>
                <div className="rate rate--reverse">
                  {getRatingStars()}
                  <p className="rate__message">{userRating === 0 ? 'Поставьте оценку' : ''}</p>
                </div>
              </div>
            </div>
            <label
              className="form-review__label form-review__label--required"
              htmlFor="adv"
            >
            Достоинства
            </label>
            <input
              className="form-review__input"
              id="adv"
              type="text"
              autoComplete="off"
              required
              onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                const value = target.value;
                setUserAdvantage(value);
              }}
              value={userAdvantage}
            />
            <p className="form-review__warning">{userAdvantage === '' ? 'Заполните поле' : ''}</p>
            <label
              className="form-review__label form-review__label--required"
              htmlFor="disadv"
            >
            Недостатки
            </label>
            <input
              className="form-review__input"
              id="disadv"
              type="text"
              autoComplete="off"
              required
              onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                const value = target.value;
                setUserDisadvantage(value);
              }}
              value={userDisadvantage}
            />
            <p className="form-review__warning">{userDisadvantage === '' ? 'Заполните поле' : ''}</p>
            <label
              className="form-review__label form-review__label--required"
              htmlFor="comment"
            >
            Комментарий
            </label>
            <textarea
              className="form-review__input form-review__input--textarea"
              id="comment"
              rows={10}
              autoComplete="off"
              required
              onChange={({target}: ChangeEvent<HTMLTextAreaElement>) => {
                const value = target.value;
                setUserComment(value);
              }}
              value={userComment}
            />
            <p className="form-review__warning">{userComment === '' ? 'Заполните поле' : ''}</p>
            <button
              className="button button--medium-20 form-review__button"
              type="submit"
              id="button-submit"
            >
            Отправить отзыв
            </button>
          </form>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={onEventShowModalReviewCallback}
          >
            <span className="button-cross__icon" />
            <span className="modal__close-btn-interactive-area" />
          </button>
        </div>
      </div>
    </div>

  );
}

export default ModalReview;
