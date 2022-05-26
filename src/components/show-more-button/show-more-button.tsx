import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { incrementCountReviews } from '../../store/guitar-process/guitar-process';

function ShowMoreButton(): JSX.Element {
  const dispatch = useAppDispatch();

  const onScrollFunction = () => {
    const windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
      dispatch(incrementCountReviews());
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScrollFunction);

    return () => {
      window.removeEventListener('scroll', onScrollFunction);
    };
  });

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
