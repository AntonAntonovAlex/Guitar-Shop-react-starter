import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterGuitarTypes, FilterStringsCount } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeLoadingGuitarsStatus } from '../../store/guitar-data/guitar-data';
import { getCheapestGuitar, getEexpensiveGuitar } from '../../store/guitar-data/selectors';

function FormFilters(): JSX.Element {

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const expensiveGuitar = useAppSelector(getEexpensiveGuitar);
  const cheapestGuitar = useAppSelector(getCheapestGuitar);

  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

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
                dispatch(changeLoadingGuitarsStatus(true));
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
                dispatch(changeLoadingGuitarsStatus(true));
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
            checked={searchParams.getAll('type').includes(FilterGuitarTypes.Acoustic)}
            onChange={({target}: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeLoadingGuitarsStatus(true));
              if (target.checked) {
                if (searchParams.has('type')) {
                  searchParams.append('type', FilterGuitarTypes.Acoustic);
                } else {
                  searchParams.set('type', FilterGuitarTypes.Acoustic);
                }
                setSearchParams(`${searchParams.toString()}&`);
              } else {
                if (searchParams.getAll('type').length > 1) {
                  const guitarTypes = searchParams.getAll('type');
                  searchParams.delete('type');
                  guitarTypes.filter((typeGuitar) => typeGuitar !== FilterGuitarTypes.Acoustic)
                    .map((typeGuitar) => searchParams.append('type', typeGuitar));
                } else {
                  searchParams.delete('type');
                }
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
            checked={searchParams.getAll('type').includes(FilterGuitarTypes.Electric)}
            onChange={({target}: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeLoadingGuitarsStatus(true));
              if (target.checked) {
                if (searchParams.has('type')) {
                  searchParams.append('type', FilterGuitarTypes.Electric);
                } else {
                  searchParams.set('type', FilterGuitarTypes.Electric);
                }
                setSearchParams(`${searchParams.toString()}&`);
              } else {
                if (searchParams.getAll('type').length > 1) {
                  const guitarTypes = searchParams.getAll('type');
                  searchParams.delete('type');
                  guitarTypes.filter((typeGuitar) => typeGuitar !== FilterGuitarTypes.Electric)
                    .map((typeGuitar) => searchParams.append('type', typeGuitar));
                } else {
                  searchParams.delete('type');
                }
                setSearchParams(`${searchParams.toString()}`);
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
            checked={searchParams.getAll('type').includes(FilterGuitarTypes.Ukulele)}
            onChange={({target}: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeLoadingGuitarsStatus(true));
              if (target.checked) {
                if (searchParams.has('type')) {
                  searchParams.append('type', FilterGuitarTypes.Ukulele);
                } else {
                  searchParams.set('type', FilterGuitarTypes.Ukulele);
                }
                setSearchParams(`${searchParams.toString()}&`);
              } else {
                if (searchParams.getAll('type').length > 1) {
                  const guitarTypes = searchParams.getAll('type');
                  searchParams.delete('type');
                  guitarTypes.filter((typeGuitar) => typeGuitar !== FilterGuitarTypes.Ukulele)
                    .map((typeGuitar) => searchParams.append('type', typeGuitar));
                } else {
                  searchParams.delete('type');
                }
                setSearchParams(`${searchParams.toString()}`);
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
            disabled={!(searchParams.getAll('type').includes(FilterGuitarTypes.Ukulele) || searchParams.getAll('type').includes(FilterGuitarTypes.Electric) || (searchParams.getAll('type').length === 0))}
            checked={searchParams.getAll('stringCount').includes(FilterStringsCount.Four)}
            onChange={({target}: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeLoadingGuitarsStatus(true));
              if (target.checked) {
                if (searchParams.has('stringCount')) {
                  searchParams.append('stringCount', FilterStringsCount.Four);
                } else {
                  searchParams.set('stringCount', FilterStringsCount.Four);
                }
                setSearchParams(`${searchParams.toString()}&`);
              } else {
                if (searchParams.getAll('stringCount').length > 1) {
                  const guitarTypes = searchParams.getAll('stringCount');
                  searchParams.delete('stringCount');
                  guitarTypes.filter((typeGuitar) => typeGuitar !== FilterStringsCount.Four)
                    .map((typeGuitar) => searchParams.append('stringCount', typeGuitar));
                } else {
                  searchParams.delete('stringCount');
                }
                setSearchParams(`${searchParams.toString()}`);
              }
            }}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            disabled={!(searchParams.getAll('type').includes(FilterGuitarTypes.Acoustic) || searchParams.getAll('type').includes(FilterGuitarTypes.Electric) || (searchParams.getAll('type').length === 0))}
            checked={searchParams.getAll('stringCount').includes(FilterStringsCount.Six)}
            onChange={({target}: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeLoadingGuitarsStatus(true));
              if (target.checked) {
                if (searchParams.has('stringCount')) {
                  searchParams.append('stringCount', FilterStringsCount.Six);
                } else {
                  searchParams.set('stringCount', FilterStringsCount.Six);
                }
                setSearchParams(`${searchParams.toString()}&`);
              } else {
                if (searchParams.getAll('stringCount').length > 1) {
                  const guitarTypes = searchParams.getAll('stringCount');
                  searchParams.delete('stringCount');
                  guitarTypes.filter((typeGuitar) => typeGuitar !== FilterStringsCount.Six)
                    .map((typeGuitar) => searchParams.append('stringCount', typeGuitar));
                } else {
                  searchParams.delete('stringCount');
                }
                setSearchParams(`${searchParams.toString()}`);
              }
            }}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            disabled={!(searchParams.getAll('type').includes(FilterGuitarTypes.Acoustic) || searchParams.getAll('type').includes(FilterGuitarTypes.Electric) || (searchParams.getAll('type').length === 0))}
            checked={searchParams.getAll('stringCount').includes(FilterStringsCount.Seven)}
            onChange={({target}: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeLoadingGuitarsStatus(true));
              if (target.checked) {
                if (searchParams.has('stringCount')) {
                  searchParams.append('stringCount', FilterStringsCount.Seven);
                } else {
                  searchParams.set('stringCount', FilterStringsCount.Seven);
                }
                setSearchParams(`${searchParams.toString()}&`);
              } else {
                if (searchParams.getAll('stringCount').length > 1) {
                  const guitarTypes = searchParams.getAll('stringCount');
                  searchParams.delete('stringCount');
                  guitarTypes.filter((typeGuitar) => typeGuitar !== FilterStringsCount.Seven)
                    .map((typeGuitar) => searchParams.append('stringCount', typeGuitar));
                } else {
                  searchParams.delete('stringCount');
                }
                setSearchParams(`${searchParams.toString()}`);
              }
            }}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            disabled={!(searchParams.getAll('type').includes(FilterGuitarTypes.Acoustic) || (searchParams.getAll('type').length === 0))}
            checked={searchParams.getAll('stringCount').includes(FilterStringsCount.Twelve)}
            onChange={({target}: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeLoadingGuitarsStatus(true));
              if (target.checked) {
                if (searchParams.has('stringCount')) {
                  searchParams.append('stringCount', FilterStringsCount.Twelve);
                } else {
                  searchParams.set('stringCount', FilterStringsCount.Twelve);
                }
                setSearchParams(`${searchParams.toString()}&`);
              } else {
                if (searchParams.getAll('stringCount').length > 1) {
                  const guitarTypes = searchParams.getAll('stringCount');
                  searchParams.delete('stringCount');
                  guitarTypes.filter((typeGuitar) => typeGuitar !== FilterStringsCount.Twelve)
                    .map((typeGuitar) => searchParams.append('stringCount', typeGuitar));
                } else {
                  searchParams.delete('stringCount');
                }
                setSearchParams(`${searchParams.toString()}`);
              }
            }}
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
          searchParams.delete('type');
          searchParams.delete('price_gte');
          searchParams.delete('price_lte');
          searchParams.delete('stringCount');
          setSearchParams(`${searchParams.toString()}`);
        }}
      >
              Очистить
      </button>
    </form>
  );
}

export default FormFilters;
