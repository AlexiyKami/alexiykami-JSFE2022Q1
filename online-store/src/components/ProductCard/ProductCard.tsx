import React from 'react';
import { ActionCreator, IProduct, ISmartphone } from '../../types/types';
import style from './ProductCard.module.css';

type ProductCardProps = {
  cart: IProduct[] | ISmartphone[];
  product: ISmartphone;
  addToCart?: ActionCreator<object>;
  removeFromCart: ActionCreator<number>;
  setModalActive?: React.Dispatch<boolean>;
};

export default function ProductCard(props: ProductCardProps): JSX.Element {
  function isProductInCart() {
    return (
      props.cart.filter((item: IProduct) => {
        return item.id === props.product.id;
      }).length !== 0
    );
  }
  function onButtonClickHandler(event: React.MouseEvent) {
    if (!isProductInCart()) {
      if (props.cart.length >= 20) {
        (props.setModalActive as React.Dispatch<boolean>)(true);
        setTimeout(() => (props.setModalActive as React.Dispatch<boolean>)(false), 2500);
      } else {
        (event.target as Element).classList.add('active');
        (props.addToCart as ActionCreator<object>)(props.product);
      }
    } else {
      (event.target as Element).classList.remove('active');
      props.removeFromCart(props.product.id);
    }
  }
  return (
    <div className={style.card} data-id={props.product.id}>
      <div className={style.card__imgWrapper}>
        <img className={style.imgWrapper__img} src={props.product.imgSrc} alt="photo" />
      </div>
      <div className={style.card__text}>
        <h4 className={style.text__name}>
          {props.product.type} {props.product.brand} {props.product.name}
        </h4>
        <p className={style.text__year}>Year: {props.product.year}</p>
        <p className={style.text__color}>Color: {props.product.color}</p>
        <p className={style.text__quantity}>
          {props.product.quantity !== 0 ? `Quantity: ${props.product.quantity} pcs` : ''}
        </p>
        <h3 className={style.text__price}>
          {props.product.quantity !== 0 ? `US $${props.product.price}` : 'Out of stock'}
        </h3>
        <button
          className={
            isProductInCart()
              ? `${style.text__button} ${style.buttonPrimary} ${style.active}`
              : `${style.text__button} ${style.buttonPrimary}`
          }
          disabled={props.product.quantity == 0}
          onClick={onButtonClickHandler}
        >
          {isProductInCart() ? 'Remove from Cart' : 'Add To Cart'}
        </button>
      </div>
      <div className={style.card__additionalInfo}>
        <h4>RAM: {props.product.RAM}</h4>
        <h4>Memory: {props.product.memory}</h4>
        <h4>Number of cameras: {props.product.numberOfCameras}</h4>
        <h4>Popular: {props.product.isPopular ? 'Yes' : 'No'}</h4>
      </div>
    </div>
  );
}
