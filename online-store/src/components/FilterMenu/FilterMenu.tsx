import style from './FilterMenu.module.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';
import { ActionCreator, FilterState, IProduct, ISmartphone, State } from '../../types/types';
import { connect } from 'react-redux';
import {
  filterByYear,
  filterByQuantity,
  filterByBrand,
  filterByColor,
  filterByCameras,
  filterByPopular,
  resetFilters,
} from '../../redux/actions';

type FilterMenuProps = {
  products: ISmartphone[] | IProduct[];
  filter: FilterState;
  filterByYear: ActionCreator<number[]>;
  filterByQuantity: ActionCreator<number[]>;
  filterByBrand: ActionCreator<string>;
  filterByColor: ActionCreator<string>;
  filterByCameras: ActionCreator<number>;
  filterByPopular: ActionCreator<boolean>;
  resetFilters: () => void;
};

function FilterMenu(props: FilterMenuProps): JSX.Element {
  const resetAllFilters = () => {
    props.resetFilters();
    setSliderYear([minYear, maxYear]);
    setSliderQuantity([minQuantity, maxQuantity]);
  };

  const minYear = props.products.length !== 0 ? Math.min(...props.products.map((data: IProduct) => data.year)) : 0;
  const maxYear = props.products.length !== 0 ? Math.max(...props.products.map((data: IProduct) => data.year)) : 0;
  const minQuantity =
    props.products.length !== 0 ? Math.min(...props.products.map((data: IProduct) => data.quantity)) : 0;
  const maxQuantity =
    props.products.length !== 0 ? Math.max(...props.products.map((data: IProduct) => data.quantity)) : 0;

  const [sliderYear, setSliderYear] = useState(props.filter.year ? props.filter.year : [minYear, maxYear]);
  const [sliderQuantity, setSliderQuantity] = useState(
    props.filter.quantity ? props.filter.quantity : [minQuantity, maxQuantity]
  );

  const brands = [...new Set<string>(props.products.map((product: IProduct) => product.brand))]
    .sort()
    .map((item, index) => (
      <p
        key={index}
        className={
          props.filter.brand.includes(item)
            ? style.filters__value + ' ' + style.buttonPrimary + ' ' + style.active
            : style.filters__value + ' ' + style.buttonPrimary
        }
        onClick={(e) => {
          props.filterByBrand(e.currentTarget.textContent as string);
          e.currentTarget.classList.toggle(style.active);
        }}
      >
        {item}
      </p>
    ));
  const colors = [...new Set<string>(props.products.map((product: IProduct) => product.color))]
    .sort()
    .map((item, index) => (
      <p
        key={index}
        className={
          props.filter.color.includes(item)
            ? style.filters__value + ' ' + style.buttonPrimary + ' ' + style.active
            : style.filters__value + ' ' + style.buttonPrimary
        }
        onClick={(e) => {
          props.filterByColor(e.currentTarget.textContent as string);
        }}
      >
        {item}
      </p>
    ));
  const cameras = [...new Set<number>(props.products.map((product) => (product as ISmartphone).numberOfCameras))]
    .sort()
    .map((item, index) => (
      <p
        key={index}
        className={
          props.filter.numberOfCameras.includes(item)
            ? style.filters__value + ' ' + style.buttonPrimary + ' ' + style.active
            : style.filters__value + ' ' + style.buttonPrimary
        }
        onClick={(e) => {
          props.filterByCameras(Number(e.currentTarget.textContent) as number);
          e.currentTarget.classList.toggle(style.active);
        }}
      >
        {item}
      </p>
    ));

  return (
    <div className={style.filters}>
      <h3 className={style.filters__mainTitle}>Filters</h3>
      <div className={style.filters__byYear}>
        <h3>Year</h3>
        <Slider
          range
          allowCross={false}
          dots
          min={minYear}
          max={maxYear}
          value={sliderYear}
          railStyle={{
            height: 2,
          }}
          handleStyle={{
            height: 14,
            width: 14,
            marginTop: -7,
            backgroundColor: '#FF2820',
            opacity: 1,
            border: 0,
          }}
          trackStyle={{
            backgroundColor: 'rgb(200, 200, 200)',
          }}
          dotStyle={{
            backgroundColor: 'white',
            border: '1px solid #FF2820',
          }}
          onChange={(value) => {
            setSliderYear(value as number[]);
            props.filterByYear(value as number[]);
          }}
        />
        {sliderYear[0]}-{sliderYear[1]}
      </div>
      <div className={style.filters__byQuantity}>
        <h3>Quantity</h3>
        <Slider
          range
          allowCross={false}
          min={minQuantity}
          max={maxQuantity}
          value={sliderQuantity}
          railStyle={{
            height: 2,
          }}
          handleStyle={{
            height: 14,
            width: 14,
            marginTop: -7,
            backgroundColor: '#FF2820',
            opacity: 1,
            border: 0,
          }}
          trackStyle={{
            backgroundColor: 'rgb(200, 200, 200)',
          }}
          dotStyle={{
            backgroundColor: 'white',
            border: '1px solid #FF2820',
          }}
          onChange={(value) => {
            setSliderQuantity(value as number[]);
            props.filterByQuantity(value as number[]);
          }}
        />
        {sliderQuantity[0]}-{sliderQuantity[1]}
      </div>
      <div className={style.filters__byBrand}>
        <h3 className={style.filters__title}>Brands</h3>
        <div className={style.filters__elements}>{brands.length ? brands : <p>No filters</p>}</div>
      </div>
      <div className={style.filters__byColor}>
        <h3 className={style.filters__title}>Colors</h3>
        <div className={style.filters__elements}>{colors.length ? colors : <p>No filters</p>}</div>
      </div>
      <div className={style.filters__byCameras}>
        <h3 className={style.filters__title}>Count of cameras</h3>
        <div className={style.filters__elements}>{cameras.length ? cameras : <p>No filters</p>}</div>
      </div>
      <div className={style.filters__buttons}>
        <div className={style.buttons__onlyPopular}>
          <h3 className={style.filters__title + ' ' + style.onlyPopular__title}>Only popular</h3>
          <input
            checked={props.filter.isPopular}
            type="checkbox"
            name="popular"
            onChange={(e) => props.filterByPopular(e.target.checked)}
          />
        </div>
        <button onClick={resetAllFilters} className={style.buttons__resetFilters + ' ' + style.buttonPrimary}>
          Reset Filters
        </button>
        <button
          onClick={() => localStorage.clear()}
          className={style.buttons__resetStorage + ' ' + style.buttonPrimary}
        >
          Reset LocalStorage
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: State) => {
  return {
    products: state.products.products,
    filter: state.filter,
  };
};
const mapDispatchToProps = {
  filterByYear,
  filterByQuantity,
  filterByBrand,
  filterByColor,
  filterByCameras,
  filterByPopular,
  resetFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu);
