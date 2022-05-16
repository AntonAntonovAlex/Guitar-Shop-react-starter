import { useAppDispatch } from '../../hooks';
import { incrementCountReviews } from '../../store/guitar-process/guitar-process';

function ShowMoreButton(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <button className="button button--medium reviews__more-button"
      onClick={(evt: { currentTarget:  HTMLElement }) => {
        dispatch(incrementCountReviews());
      }}
    >
            Показать еще отзывы
    </button>
  );
}

export default ShowMoreButton;
