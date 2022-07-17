import { IProduct, ISmartphone } from '../../types/types';
import ProductCard from '../ProductCard/ProductCard';
import style from './Main.module.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { connect } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  filterByYear,
  filterByQuantity,
  filterByBrand,
  filterByColor,
  filterByCameras,
  filterByPopular,
  resetFilters,
  sortByName,
  sortByYear,
} from '../../redux/actions';
import { useState } from 'react';

function Main(props: any): JSX.Element {
  const resetAllFilters = () => {
    props.resetFilters();
    setSliderYear([minYear, maxYear]);
    setSliderQuantity([minQuantity, maxQuantity]);
  };
  const sortProductsByName = (a: IProduct, b: IProduct): number => {
    switch (props.sort.sortByName) {
      case 'A-Z':
        return a.brand < b.brand ? -1 : 1;
      case 'Z-A':
        return a.brand > b.brand ? -1 : 1;
      default:
        return 0;
    }
  };
  const sortProductsByYear = (a: IProduct, b: IProduct): number => {
    switch (props.sort.sortByYear) {
      case 'earlier':
        return a.year < b.year ? -1 : 1;
      case 'later':
        return a.year > b.year ? -1 : 1;
      default:
        return 0;
    }
  };
  const filterProducts = (products: ISmartphone[], filters: any) => {
    const filterKeys = Object.keys(filters);
    return products.filter((product) => {
      return filterKeys.every((key) => {
        if (key == 'isPopular') return filters[key] ? filters[key] == product[key] : true;
        if (!filters[key].length) return true;
        switch (key) {
          case 'brand':
          case 'color':
          case 'numberOfCameras':
            return filters[key].toString().includes(product[key as keyof ISmartphone].toString());
          case 'year':
          case 'quantity':
            return (
              filters[key][0] <= product[key as keyof ISmartphone] &&
              filters[key][1] >= product[key as keyof ISmartphone]
            );
        }
      });
    });
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

  const productElements = filterProducts(props.products, props.filter)
    .sort(sortProductsByName)
    .sort(sortProductsByYear)
    .map((product: IProduct) => {
      return (
        <ProductCard
          cart={props.cart}
          addToCart={props.addToCart}
          removeFromCart={props.removeFromCart}
          key={product.id}
          product={product}
          setModalActive={props.setActive}
        />
      );
    });
  const brands = [...new Set<string>(props.products.map((product: IProduct) => product.brand))].sort().map((item) => (
    <p
      className={props.filter.brand.includes(item) ? style.filters__value + ' ' + style.active : style.filters__value}
      onClick={(e) => {
        props.filterByBrand(e.currentTarget.textContent);
        e.currentTarget.classList.toggle(style.active);
      }}
    >
      {item}
    </p>
  ));
  const colors = [...new Set<string>(props.products.map((product: IProduct) => product.color))].sort().map((item) => (
    <p
      className={props.filter.color.includes(item) ? style.filters__value + ' ' + style.active : style.filters__value}
      onClick={(e) => {
        props.filterByColor(e.currentTarget.textContent);
      }}
    >
      {item}
    </p>
  ));
  const cameras = [...new Set<string>(props.products.map((product: ISmartphone) => product.numberOfCameras))]
    .sort()
    .map((item) => (
      <p
        className={
          props.filter.numberOfCameras.includes(item.toString())
            ? style.filters__value + ' ' + style.active
            : style.filters__value
        }
        onClick={(e) => {
          props.filterByCameras(e.currentTarget.textContent);
          e.currentTarget.classList.toggle(style.active);
        }}
      >
        {item}
      </p>
    ));
  return (
    <main className={style.mainWrapper}>
      <div className={style.mainWrapper__filters}>
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
              props.filterByYear(value);
            }}
          />
          {sliderYear[0]}-{sliderYear[1]}
        </div>
        <div className={style.filters__byQuantity}>
          <h3>Quantity</h3>
          <Slider
            range
            allowCross={false}
            dots
            step={5}
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
              props.filterByQuantity(value);
            }}
          />
          {sliderQuantity[0]}-{sliderQuantity[1]}
        </div>
        <div className={style.filters__byBrand}>
          <h3 className={style.filters__title}>Brands</h3>
          {brands.length ? brands : <p>No filters</p>}
        </div>
        <div className={style.filters__byColor}>
          <h3 className={style.filters__title}>Colors</h3>
          {colors.length ? colors : <p>No filters</p>}
        </div>
        <div className={style.filters__byCameras}>
          <h3 className={style.filters__title}>Count of cameras</h3>
          {cameras.length ? cameras : <p>No filters</p>}
        </div>
        <div className={style.filters__buttons}>
          <div className={style.buttons__onlyPopular}>
            <h3 className={style.filters__title}>Only popular</h3>
            <input
              checked={props.filter.isPopular}
              type="checkbox"
              name="popular"
              onChange={(e) => props.filterByPopular(e.target.checked)}
            />
          </div>
          <button onClick={resetAllFilters} className={style.buttons__resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>
      <div className={style.mainWrapper__content}>
        <div className={style.content__sortMenu}>
          <select
            value={props.sort.sortByName}
            onChange={(e) => props.sortByName(e.target.value)}
            className={style.sortMenu__byName}
          >
            <option value="0" disabled>
              Sorting by name
            </option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
          <select
            value={props.sort.sortByYear}
            onChange={(e) => props.sortByYear(e.target.value)}
            className={style.sortMenu__byYear}
          >
            <option value="0" disabled>
              Sorting by year
            </option>
            <option value="earlier">Earlier</option>
            <option value="later">Later</option>
          </select>
        </div>
        <div className={style.content__products}>
          {productElements.length !== 0 ? (
            productElements
          ) : (
            <h3>Products not found. Try change the search query or choose another filters </h3>
          )}
        </div>
      </div>
    </main>
  );
}
const mapStateToProps = (state: any) => {
  return {
    products: state.products.products,
    cart: state.cart,
    filter: state.filter,
    sort: state.sort,
  };
};
const mapDispatchToProps = {
  addToCart,
  removeFromCart,
  filterByYear,
  filterByQuantity,
  filterByBrand,
  filterByColor,
  filterByCameras,
  filterByPopular,
  resetFilters,
  sortByName,
  sortByYear,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
