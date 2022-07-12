import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterGuitarTypes, FilterStringsCount } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { changeLoadingGuitarsStatus } from '../../store/guitar-data/guitar-data';
import { getCheapestGuitar, getEexpensiveGuitar } from '../../store/guitar-data/selectors';
import { getActivPage } from '../../store/guitar-process/selectors';

function FormFilters(): JSX.Element {

  const dispatch = useAppDispatch();

  const activPage = useAppSelector(getActivPage);

  const [searchParams, setSearchParams] = useSearchParams();

  const expensiveGuitar = useAppSelector(getEexpensiveGuitar);
  const cheapestGuitar = useAppSelector(getCheapestGuitar);

  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  function setUrlParams() {
    if (activPage !== 1) {
      dispatch(redirectToRoute(`/catalog/page_1?${searchParams.toString()}`));
    } else {
      setSearchParams(`${searchParams.toString()}&`);
    }
  }

  function setFilter(isChecked: boolean, filterType: string, filterValue: FilterGuitarTypes | FilterStringsCount) {
    if (isChecked) {
      if (searchParams.has(filterType)) {
        searchParams.append(filterType, filterValue);
      } else {
        searchParams.set(filterType, filterValue);
      }
      setUrlParams();
    } else {
      const guitarTypes = searchParams.getAll(filterType);
      if (searchParams.getAll(filterType).length > 1) {
        searchParams.delete(filterType);
        guitarTypes.filter((typeGuitar) => typeGuitar !== filterValue)
          .map((typeGuitar) => searchParams.append(filterType, typeGuitar));
      } else if (guitarTypes.includes(filterValue)) {
        searchParams.delete(filterType);
      }
      setUrlParams();
    }
    if (filterType === 'type' && searchParams.getAll('type').length && searchParams.getAll('stringCount').length) {
      const guitarTypes = searchParams.getAll(filterType);
      if (!guitarTypes.includes(FilterGuitarTypes.Ukulele) && !guitarTypes.includes(FilterGuitarTypes.Electric)) {
        setFilter(false, 'stringCount', FilterStringsCount.Four);
      }
      if (!guitarTypes.includes(FilterGuitarTypes.Acoustic)) {
        setFilter(false, 'stringCount', FilterStringsCount.Twelve);
      }
      if (!guitarTypes.includes(FilterGuitarTypes.Acoustic) && !guitarTypes.includes(FilterGuitarTypes.Electric)) {
        setFilter(false, 'stringCount', FilterStringsCount.Six);
        setFilter(false, 'stringCount', FilterStringsCount.Seven);
        setFilter(false, 'stringCount', FilterStringsCount.Twelve);
      }
    }
  }

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
                let priceMinValue = '';
                dispatch(changeLoadingGuitarsStatus(true));
                if (priceMin !== '') {
                  priceMinValue = (cheapestGuitar[0]?.price > +priceMin) ? String(cheapestGuitar[0]?.price) : priceMin;
                  setPriceMin(priceMinValue);
                }
                searchParams.set('price_gte', `${priceMinValue}`);
                setUrlParams();
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
                let priceMaxValue = '';
                dispatch(changeLoadingGuitarsStatus(true));
                priceMaxValue = (expensiveGuitar[0]?.price < +priceMax || +priceMax < 0 || +priceMax < +priceMin)
                  ? String(expensiveGuitar[0]?.price)
                  : priceMax;

                setPriceMax(priceMaxValue);
                searchParams.set('price_lte', `${priceMaxValue}`);
                setUrlParams();
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
              setFilter(target.checked, 'type', FilterGuitarTypes.Acoustic);
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
              setFilter(target.checked, 'type', FilterGuitarTypes.Electric);
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
              setFilter(target.checked, 'type', FilterGuitarTypes.Ukulele);
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
              setFilter(target.checked, 'stringCount', FilterStringsCount.Four);
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
              setFilter(target.checked, 'stringCount', FilterStringsCount.Six);
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
              setFilter(target.checked, 'stringCount', FilterStringsCount.Seven);
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
              setFilter(target.checked, 'stringCount', FilterStringsCount.Twelve);
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
          searchParams.delete('stringCount');
          searchParams.delete('type');
          searchParams.delete('price_gte');
          searchParams.delete('price_lte');
          dispatch(redirectToRoute(`/catalog/page_1?${searchParams.toString()}`));
        }}
      >
              Очистить
      </button>
    </form>
  );
}

export default FormFilters;
