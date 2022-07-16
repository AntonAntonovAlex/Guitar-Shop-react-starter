import { Link, useSearchParams } from 'react-router-dom';
import { COUNT_GUITAR_CARD_IN_PAGE } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCountGuitars } from '../../store/guitar-data/selectors';
import { getActivPage } from '../../store/guitar-process/selectors';

function PaginationList(): JSX.Element {
  const countPages = Math.ceil(useAppSelector(getCountGuitars)/COUNT_GUITAR_CARD_IN_PAGE);
  const activPage = useAppSelector(getActivPage);

  const [searchParams] = useSearchParams();
  const searchParamsUrl = searchParams.has('_sort') || searchParams.has('type') || searchParams.has('stringCount') || searchParams.has('price_gte') || searchParams.has('price_lte') ?
    `?${searchParams.toString()}` : '';

  function getPaginationLinks() {
    const paginationLinksItems = [];

    for (let i = 1; i <= countPages; i++) {
      paginationLinksItems.push(
        <li className={activPage === i ? 'pagination__page--active pagination__page' : 'pagination__page'} key={`pagination__page-${i}`}>
          <Link className="link pagination__page-link" to={`/catalog/page_${i}${searchParamsUrl}`}>
            {i}
          </Link>
        </li>,
      );
    }
    return (
      paginationLinksItems
    );
  }

  function getPaginationNextButtonLinks() {
    return (
      <li className="pagination__page pagination__page--next" id="next">
        <Link className="link pagination__page-link" to={`/catalog/page_${activPage+1}${searchParamsUrl}`}>
          Далее
        </Link>
      </li>
    );
  }

  function getPaginationPrevButtonLinks() {
    return (
      <li className="pagination__page pagination__page--prev" id="prev">
        <Link className="link pagination__page-link" to={`/catalog/page_${activPage-1}${searchParamsUrl}`}>
          Назад
        </Link>
      </li>
    );
  }

  return (
    <ul className="pagination__list">
      {(activPage !== 1) && getPaginationPrevButtonLinks()}
      {getPaginationLinks()}
      {!(activPage === countPages) && getPaginationNextButtonLinks()}
    </ul>
  );
}

export default PaginationList;
