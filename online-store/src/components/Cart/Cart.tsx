import { connect } from 'react-redux';
import { removeFromCart } from '../../redux/actions';
import { IProduct, ISmartphone, State } from '../../types/types';
import ProductCard from '../ProductCard/ProductCard';
import style from './Cart.module.css';

type CartProps = {
  cart: IProduct[] | ISmartphone[];
  removeFromCart: (id: number) => {
    type: string;
    payload: number;
  };
};

function Cart(props: CartProps): JSX.Element {
  const productElements = props.cart.map((product: IProduct | ISmartphone) => {
    return (
      <ProductCard
        cart={props.cart}
        removeFromCart={props.removeFromCart}
        key={product.id}
        product={product as ISmartphone}
      />
    );
  });
  return (
    <main className={style.cartWrapper}>
      <h3 className={style.cartWrapper__title}>
        {props.cart.length !== 0
          ? `You have ${props.cart.length} ${props.cart.length == 1 ? 'item' : 'items'} in your cart`
          : 'Cart is empty. You can add something on the main page'}
      </h3>
      <div className={style.cartWrapper__elements}>{productElements}</div>
    </main>
  );
}

const mapStateToProps = (state: State) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = {
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
