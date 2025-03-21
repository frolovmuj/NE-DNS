import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';

import {
  removeFromBasket,
  minusItem,
  plusItem,
} from '../../redux/cart/cart.slice';

import { ICartPizza } from '../../models/CartPizza';
import { findPushedItem } from '../../utils/findPushedItem';

interface CartItemProps {
  card: ICartPizza;
}

const CartItem: FC<CartItemProps> = ({ card }) => {
  const dispatch = useAppDispatch();

  const {
    imageUrl,
    id,
    title,
    maxLimits,
    size,
    price,
    count,
  } = card;

  const pushedItem = findPushedItem({
    id,
    size,
  });

  const onClickPlus = () => {
    count < maxLimits && dispatch(plusItem(card));
  };
  const onClickMinus = () => {
    if (count === 1)
      if (
        window.confirm(
          'Ты уверен, что хочешь удалить товар с корзины?'
        )
      )
        dispatch(minusItem(card));
      else return;

    dispatch(minusItem(card));
  };

  const onClickRemove = () => {
    dispatch(removeFromBasket(card));
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <Link to={`/phones/${id}`}>
          <img
            className="pizza-block__image"
            src={imageUrl}
            alt="Phone"
          />
        </Link>
      </div>
      <div className="cart__item-info">
        <h3>
          <Link to={`/phones/${id}`}>{title}</Link>
        </h3>
        <p>{size} Гб.</p>
      </div>
      <div className="cart__item-count">
        <button
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="black"
            />
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="black"
            />
          </svg>
        </button>
        <b>{count}</b>
        <button
          disabled={
            pushedItem && pushedItem.count === maxLimits
          }
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="black"
            />
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price} ₽</b>
      </div>
      <div
        onClick={onClickRemove}
        className="cart__item-remove">
        <div className="button button--outline button--circle">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="black"
            />
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
