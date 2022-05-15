import { COUNT_GUITAR_CARD_IN_PAGE } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCountGuitars } from '../../store/guitar-data/selectors';
import { getActivPage } from '../../store/guitar-process/selectors';

function PaginationList(): JSX.Element {
  const countPages = Math.ceil(useAppSelector(getCountGuitars)/COUNT_GUITAR_CARD_IN_PAGE);
  const activPage = useAppSelector(getActivPage);

  function getPaginationLinks() {
    const paginationLinksItems = [];

    for (let i = 1; i <= countPages; i++) {
      paginationLinksItems.push(
        <li className={activPage === i ? 'pagination__page--active pagination__page' : 'pagination__page'} key={`pagination__page-${i}`}>
          <a className="link pagination__page-link" href={`/catalog/page_${i}`}>
            {i}
          </a>
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
        <a className="link pagination__page-link" href={`/catalog/page_${activPage+1}`}>
          Далее
        </a>
      </li>
    );
  }

  function getPaginationPrevButtonLinks() {
    return (
      <li className="pagination__page pagination__page--prev" id="prev">
        <a className="link pagination__page-link" href={`/catalog/page_${activPage-1}`}>
          Назад
        </a>
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
