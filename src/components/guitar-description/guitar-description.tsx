import { useAppSelector } from '../../hooks';
import { getGuitar } from '../../store/guitar-data/selectors';

function GuitarDescription(): JSX.Element {
  const selectedGuitar = useAppSelector(getGuitar);

  return (
    <p className="tabs__product-description" >
      {selectedGuitar?.description}
    </p>
  );
}

export default GuitarDescription;
