import { ActionCreator, FilterState, IProduct, ISmartphone, SortState, State } from '../../types/types';
import ProductCard from '../ProductCard/ProductCard';
import style from './Main.module.css';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions';
import FilterMenu from '../FilterMenu/FilterMenu';
import SortMenu from '../SortMenu/SortMenu';

type MainProps = {
  sort: SortState;
  products: ISmartphone[] | IProduct[];
  filter: FilterState;
  cart: ISmartphone[] | IProduct[];
  setActive: React.Dispatch<boolean>;
  addToCart: ActionCreator<object>;
  removeFromCart: ActionCreator<number>;
};

function Main(props: MainProps): JSX.Element {
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
  const filterProducts = (products: ISmartphone[], filters: FilterState) => {
    const filterKeys = Object.keys(filters);
    return products.filter((product) => {
      return filterKeys.every((key) => {
        if (key == 'isPopular') return filters[key] ? filters[key] == product[key] : true;
        if (!(filters[key as keyof FilterState] as number[] | string[]).length) return true;
        switch (key) {
          case 'brand':
          case 'color':
          case 'numberOfCameras':
            return filters[key].toString().includes(product[key as keyof ISmartphone].toString());
          case 'year':
          case 'quantity':
            return (
              (filters[key] as number[])[0] <= product[key as keyof ISmartphone] &&
              (filters[key] as number[])[1] >= product[key as keyof ISmartphone]
            );
        }
      });
    });
  };

  const productElements = filterProducts(props.products as ISmartphone[], props.filter)
    .sort(sortProductsByYear)
    .sort(sortProductsByName)
    .map((product: ISmartphone) => {
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

  return (
    <main className={style.mainWrapper}>
      <FilterMenu />
      <div className={style.mainWrapper__content}>
        <SortMenu />
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
const mapStateToProps = (state: State) => {
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
