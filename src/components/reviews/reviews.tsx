import { useAppSelector } from '../../hooks';
import { getReviews } from '../../store/guitar-data/selectors';
import { getCountReviews } from '../../store/guitar-process/selectors';
import { Review } from '../../types/review';
import RatingStar from '../rating-star/rating-star';
import ShowMoreButton from '../show-more-button/show-more-button';

type ReviewsProps = {
  onEventShowModalReviewCallback: () => void;
};

function Reviews({onEventShowModalReviewCallback}: ReviewsProps): JSX.Element {
  const widthStar = 16;
  const heightStar = 16;

  const reviews :Review[] = useAppSelector(getReviews);
  const countReviews = useAppSelector(getCountReviews);

  const reviewsForSort = [...reviews];
  const sortedReviews = reviewsForSort.sort((reviewA, reviewB) => (+(new Date(reviewB.createAt))) - (+(new Date(reviewA.createAt))));

  const sliceReviews = sortedReviews.slice(0, countReviews);

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a
        className="button button--red-border button--big reviews__sumbit-button"
        href="#todo"
        onClick={onEventShowModalReviewCallback}
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
            <RatingStar ratingGuitar={review.rating} widthStar={widthStar} heightStar={heightStar} />
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
