import { IProduct, ISmartphone } from '../../types/types';
import ProductCard from '../ProductCard/ProductCard';
import style from './Main.module.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import data from '../../state/state';

export default function Main(): JSX.Element {
  const productElements = data.products.map((product: IProduct) => {
    return <ProductCard key={product.id} product={product} />;
  });
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
          />
        </div>
        <div className={style.filters__byQuantity}>
          <h3>Quantity</h3>
          <Slider
            range
            allowCross={false}
            dots
            step={5}
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
          />
        </div>
        <div className={style.filters__buttons}>
          <div className={style.buttons__onlyPopular}>
            <h3 className={style.filters__title}>Only popular</h3>
            <input type="checkbox" name="popular" />
          </div>
          <button className={style.buttons__resetFilters}>Reset Filters</button>
        </div>
      </div>
      <div className={style.mainWrapper__content}>
        <div className={style.content__sortMenu}>
          <select value={0} className={style.sortMenu__byName}>
            <option value="0" disabled>
              Sorting by name
            </option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
          <select value={0} className={style.sortMenu__byYear}>
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
