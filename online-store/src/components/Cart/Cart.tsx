import { connect } from 'react-redux';
import { removeFromCart } from '../../redux/actions';
import { IProduct } from '../../types/types';
import ProductCard from '../ProductCard/ProductCard';
import style from './Cart.module.css';

type CartProps = {
  cart : IProduct[],
  removeFromCart: Function,
}

function Cart(props: CartProps) {
  console.log(props);
  const productElements = props.cart.map((product: IProduct) => {
    return <ProductCard cart={props.cart} removeFromCart={props.removeFromCart} key={product.id} product={product} />;
  });
  console.log(productElements);
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

const mapStateToProps = (state: any) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = {
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
