import React, { useState } from 'react';
import { connect } from 'react-redux';
import style from './Header.module.css';
import { searchProducts } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { ActionCreator, IProduct, State } from '../../types/types';
import cartImg from '../../img/cart.svg';

type HeaderProps = {
  cart: IProduct[];
  searchProducts: ActionCreator<string>;
};

function Header(props: HeaderProps): JSX.Element {
  const [query, setQuery] = useState(
    localStorage.getItem('searchQuery') ? (localStorage.getItem('searchQuery') as string) : ''
  );
  props.searchProducts(query);
  function onChangeInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    localStorage.setItem('searchQuery', e.target.value);
    props.searchProducts(e.target.value);
  }
  function onClickButtonHandler(e: React.MouseEvent<HTMLButtonElement>) {
    setQuery('');
    localStorage.setItem('searchQuery', '');
    props.searchProducts('');
  }
  return (
    <header className={style.header}>
      <Link to="/">
        <div className={style.header__logo}>
          <h1 className={style.logo__title}>AlexExpress</h1>
          <h5 className={style.logo__miniTitle}>online store</h5>
        </div>
      </Link>
      <div className={style.header__searchForm}>
        <button className={style.searchForm__cross} onClick={onClickButtonHandler}></button>
        <input
          className={style.searchForm__input}
          type="text"
          autoFocus
          placeholder="Search..."
          autoComplete="off"
          onChange={onChangeInputHandler}
          value={query}
        ></input>
      </div>
      <Link to="cart">
        <div className={style.header__cart}>
          <img className={style.cart__image} src={cartImg} alt="cart"></img>
          <div className={style.cart__quantity}>{props.cart.length}</div>
        </div>
      </Link>
    </header>
  );
}

const mapStateToProps = (state: State) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = {
  searchProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
