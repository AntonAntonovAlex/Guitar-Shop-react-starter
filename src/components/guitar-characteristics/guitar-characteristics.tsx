import { GuitarType } from '../../const';
import { useAppSelector } from '../../hooks';
import { getGuitar } from '../../store/guitar-data/selectors';

function GuitarCharacteristics(): JSX.Element {
  const selectedGuitar = useAppSelector(getGuitar);

  return (
    <table className="tabs__table">
      <tbody>
        <tr className="tabs__table-row">
          <td className="tabs__title">Артикул:</td>
          <td className="tabs__value">{selectedGuitar?.vendorCode}</td>
        </tr>
        <tr className="tabs__table-row">
          <td className="tabs__title">Тип:</td>
          <td className="tabs__value">{(selectedGuitar?.type)? GuitarType[selectedGuitar.type] : ''} </td>
        </tr>
        <tr className="tabs__table-row">
          <td className="tabs__title">Количество струн:</td>
          <td className="tabs__value">{selectedGuitar?.stringCount} струнная</td>
        </tr>
      </tbody>
    </table>
  );
}

export default GuitarCharacteristics;
