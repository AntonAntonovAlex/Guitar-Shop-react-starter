import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCheapestGuitar, getEexpensiveGuitar } from '../../store/guitar-data/selectors';

function FormFilters(): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();

  const expensiveGuitar = useAppSelector(getEexpensiveGuitar);
  const cheapestGuitar = useAppSelector(getCheapestGuitar);

  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const [isCheckedUkulele, setIsCheckedUkulele] = useState(false);
  const [isCheckedElectric, setIsCheckedElectric] = useState(false);
  const [isCheckedAcoustic, setIsCheckedAcoustic] = useState(false);
  const [isCheckedNothing, setIsCheckedNothing] = useState(true);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">
              Фильтр
      </h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="number"
              min="0"
              placeholder={(cheapestGuitar[0]?.price) ? String(cheapestGuitar[0]?.price) : '0'}
              id="priceMin"
              name="от"
              value={priceMin}
              onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                const value = target.value;
                setPriceMin(value);
              }}
              onBlur={() => {
                if (priceMin !== '') {
                  setPriceMin((cheapestGuitar[0]?.price > +priceMin) ? String(cheapestGuitar[0]?.price) : priceMin);
                }

                searchParams.set('price_gte', `${priceMin}`);
                setSearchParams(`${searchParams.toString()}&`);
              }}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              min="0"
              placeholder={(expensiveGuitar[0]?.price) ? String(expensiveGuitar[0]?.price) : '0'}
              id="priceMax"
              name="до"
              value={priceMax}
              onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                const value = target.value;
                setPriceMax(value);
              }}
              onBlur={() => {
                setPriceMax((expensiveGuitar[0]?.price < +priceMax || +priceMax < 0 || +priceMax < +priceMin) ?
                  String(expensiveGuitar[0]?.price) :
                  priceMax);

                searchParams.set('price_lte', `${priceMax}`);
                setSearchParams(`${searchParams.toString()}&`);
              }}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            onChange={({target}: ChangeEvent<HTMLInputElement>) => {
              if (target.checked) {
                setIsCheckedAcoustic(true);
                setIsCheckedNothing(false);
                searchParams.set('type', 'acoustic');
                setSearchParams(`${searchParams.toString()}&`);
              } else {
                setIsCheckedAcoustic(false);
                setIsCheckedNothing(!(isCheckedUkulele || isCheckedElectric));
                searchParams.delete('type');
                setSearchParams(`${searchParams.toString()}`);
              }
            }}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            onChange={({target}: ChangeEvent<HTMLInputElement>) => {
              if (target.checked) {
                setIsCheckedElectric(true);
                setIsCheckedNothing(false);
              } else {
                setIsCheckedElectric(false);
                setIsCheckedNothing(!(isCheckedUkulele || isCheckedAcoustic));
              }
            }}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            //defaultChecked
            onChange={({target}: ChangeEvent<HTMLInputElement>) => {
              if (target.checked) {
                setIsCheckedUkulele(true);
                setIsCheckedNothing(false);
              } else {
                setIsCheckedUkulele(false);
                setIsCheckedNothing(!(isCheckedElectric || isCheckedAcoustic));
              }
            }}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">
                Количество струн
        </legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            disabled={!(isCheckedUkulele || isCheckedElectric || isCheckedNothing)}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            disabled={!(isCheckedAcoustic || isCheckedElectric || isCheckedNothing)}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            disabled={!(isCheckedAcoustic || isCheckedElectric || isCheckedNothing)}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            disabled={!(isCheckedAcoustic || isCheckedNothing)}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset"
        onClick={() => {
          setPriceMax('');
          setPriceMin('');
          setIsCheckedNothing(true);
          setIsCheckedUkulele(false);
          setIsCheckedElectric(false);
          setIsCheckedAcoustic(false);
        }}
      >
              Очистить
      </button>
    </form>
  );
}

export default FormFilters;
