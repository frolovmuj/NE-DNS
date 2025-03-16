import { FC } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';

import { calcTotalLength } from '../../utils/calcTotalLength';
import { FaShoppingCart } from 'react-icons/fa';
import { CartItem } from '../../components/index';
import EmptyCart from './EmptyCart';

import { removeAllBasket } from '../../redux/cart/cart.slice';
import { selectCart } from '../../redux/cart/cart.selectors';

const Cart: FC = () => {
  const dispatch = useAppDispatch();

  const { items, totalPrice } = useAppSelector(selectCart);

  const isEmpty = items.length === 0;

  const onClickRemoveAll = () => {
    if (
      window.confirm(
        'Вы уверены, что хотите очистить коризну?'
      )
    )
      dispatch(removeAllBasket());
  };

  const onConfirmPay = () => {
    if (items.length === 1) {
      if (window.confirm('Поздравляем с покупкой телефона'))
        dispatch(removeAllBasket());
    } else {
      if (
        window.confirm('Поздравляем с покупкой телефонов')
      )
        dispatch(removeAllBasket());
    }
  };

  return (
    <>
      {!isEmpty ? (
        <div className="cart container--cart">
          <div className="cart__top">
            <h2 className="content__title">
              <FaShoppingCart /> Корзина
            </h2>
          </div>
          <div className="content__items">
            {items.map((item) => (
              <CartItem key={nanoid()} card={item} />
            ))}
          </div>
          <div className="cart__bottom">
            <div className="cart__bottom-details">
              <span>
                Всего телефонов:
                <b> {calcTotalLength(items)} шт.</b>
              </span>
              <span>
                Сумма заказа: <b>{totalPrice} ₽</b>
              </span>
            </div>
            <div className="cart__bottom-buttons">
              <Link
                to={'/'}
                className="button button--outline button--add go-back-btn">
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 13L1 6.93015L6.86175 1"
                    stroke="#D3D3D3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Вернуться назад</span>
              </Link>
              <div className="cart__button-wrapper">
                <button
                  onClick={onConfirmPay}
                  className="button button--outline">
                  <span>Оплатить сейчас</span>
                </button>
                <button
                  onClick={onClickRemoveAll}
                  className="button button--black">
                  <span>Очистить коризну</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Cart;
