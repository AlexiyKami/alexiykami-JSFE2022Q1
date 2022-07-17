import React from 'react';
import style from './Header.module.css';

export default function Header(): JSX.Element {
  return (
    <header className={style.header}>
      <div className={style.header__logo}>
        <h1 className={style.logo__title}>AlexExpress</h1>
        <h5 className={style.logo__miniTitle}>online store</h5>
      </div>
      <div className={style.header__searchForm}>
        <button className={style.searchForm__cross}></button>
        <input
          className={style.searchForm__input}
          type="text"
          autoFocus
          placeholder="Search..."
          autoComplete="off"
        ></input>
      </div>
      <div className={style.header__cart}>
        <img className={style.cart__image} src="img/cart.svg" alt="cart"></img>
        <div className={style.cart__quantity}>0</div>
      </div>
    </header>
  );
}
