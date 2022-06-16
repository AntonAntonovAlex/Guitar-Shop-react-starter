type RatingStarProps = {
    ratingGuitar: number;
    widthStar: number;
    heightStar: number;
  }

function RatingStar({ratingGuitar, widthStar, heightStar}: RatingStarProps): JSX.Element {

  function getRatingStars(rating: number, width: number, height: number) {
    const raitingStarsItems = [];

    for (let i = 0; i < 5; i++) {
      raitingStarsItems.push(
        <svg width={width} height={height} aria-hidden="true" key={`svg_star-${i}`}>
          <use xlinkHref={rating > i ? '#icon-full-star' : '#icon-star'}/>
        </svg>,
      );
    }
    return (
      raitingStarsItems
    );
  }
  return (
    <>
      {getRatingStars(ratingGuitar, widthStar, heightStar)}
    </>
  );
}

export default RatingStar;
