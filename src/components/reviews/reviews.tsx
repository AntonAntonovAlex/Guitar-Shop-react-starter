import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getReviews } from '../../store/guitar-data/selectors';
import { getCountReviews } from '../../store/guitar-process/selectors';
import { Review } from '../../types/review';
import ModalReview from '../modal-review/modal-review';
import ModalSuccessReview from '../modal-success-review/modal-success-review';
import ShowMoreButton from '../show-more-button/show-more-button';

function Reviews(): JSX.Element {
  const reviews :Review[] = useAppSelector(getReviews);
  const countReviews = useAppSelector(getCountReviews);

  const reviewsForSort = [...reviews];
  const sortedReviews = reviewsForSort.sort((reviewA, reviewB) => (+(new Date(reviewB.createAt))) - (+(new Date(reviewA.createAt))));

  const sliceReviews = sortedReviews.slice(0, countReviews);

  const [showModalReview, setShowModalReview] = useState(false);
  const [showModalSuccessReview, setShowModalSuccessReview] = useState(false);

  function getRatingStars(ratingGuitar: number) {
    const raitingStarsItems = [];

    for (let i = 0; i < 5; i++) {
      raitingStarsItems.push(
        <svg width={16} height={16} aria-hidden="true" key={`svg_star-${i}`}>
          <use xlinkHref={ratingGuitar > i ? '#icon-full-star' : '#icon-star'} />
        </svg>,
      );
    }
    return (
      raitingStarsItems
    );
  }

  return (
    <section className="reviews">
      {showModalReview && <ModalReview onEventShowModalReviewCallback={() => setShowModalReview(false)} onEventShowModalSuccessReview={() => setShowModalSuccessReview(true)}/>}
      {showModalSuccessReview && <ModalSuccessReview onEventsetShowModalSuccessReview={() => setShowModalSuccessReview(false)}/>}
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a
        className="button button--red-border button--big reviews__sumbit-button"
        href="#todo"
        onClick={() => setShowModalReview(true)}
      >
            Оставить отзыв
      </a>
      {sliceReviews.map((review)=> (
        <div className="review" key={review.id}>
          <div className="review__wrapper">
            <h4 className="review__title review__title--author title title--lesser">
              {review.userName}
            </h4>
            <span className="review__date">{new Date(review.createAt).toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="rate review__rating-panel">
            {getRatingStars(review.rating)}
            <p className="visually-hidden">Оценка: Хорошо</p>
          </div>
          <h4 className="review__title title title--lesser">Достоинства:</h4>
          <p className="review__value">
            {review.advantage}
          </p>
          <h4 className="review__title title title--lesser">Недостатки:</h4>
          <p className="review__value">{review.disadvantage}</p>
          <h4 className="review__title title title--lesser">Комментарий:</h4>
          <p className="review__value">
            {review.comment}
          </p>
        </div>
      ))}
      {(reviews.length > countReviews) && <ShowMoreButton/>}
      <a
        className="button button--up button--red-border button--big reviews__up-button"
        href="#header"
        style={{zIndex: 10}}
      >
            Наверх
      </a>
    </section>
  );
}

export default Reviews;
