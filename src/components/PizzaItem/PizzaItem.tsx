import { useState, useEffect, useRef, FC } from 'react';
import { Link } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';

import styles from './Pizza.module.scss'
import { calcTotalPriceCard } from '../../utils/calcTotalPriceCard'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { addToBasket } from '../../redux/cart/cart.slice';

import { IPizza } from '../../models/Pizza';

interface PizzaItemProps {
  card: IPizza
}

const typeNames = ['тонкое', 'традиционное'];

const PizzaItem: FC<PizzaItemProps> = ({ card }) => {
  const dispatch = useAppDispatch();

  const { imageUrl, id, title, types, sizes, price } = card;

  const [typePizza, setTypePizza] = useState<number>(types[0]);
  const [sizePizza, setSizePizza] = useState<number>(sizes[0]);
  const [count, setCount] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(price)


  const clickOnPlus = () => { 
    dispatch(
      addToBasket({
        id,
        imageUrl,
        title,
        price: totalPrice,
        count,
        type: typeNames[typePizza],
        size: sizePizza,
      })
    );
  };
  const changeCount = (number: number) => {
    if (number <= 0) {
      number = 1;
    }
    setCount(number);
  };
  const minusCount = () => {
    count >= 2 && setCount((prev) => (prev -= 1));
  };
  const plusCount = () => {
    setCount((prev) => prev + 1);
  };

  const changePizzaType = (type: number) => {
    setTypePizza(type);
  };


  useEffect(() => {

    if (price && sizePizza) {
      setTotalPrice((): number => calcTotalPriceCard(sizePizza, price, typeNames[typePizza]))
    }

  }, [sizePizza, typePizza])

  return (
    <AnimatePresence>
      <div className={styles.pizzaBlock}>
        <Link to={`/pizzas/${id}`}>
          <motion.img
            animate={{ rotate: [0, 50] }}
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 20,
            }}
            className={styles.pizzaBlock__image}
            src={imageUrl}
            alt="Pizza"
          />
        </Link>
        <h4 className={styles.pizzaBlock__title}>{title}</h4>
        <div className={styles.pizzaBlock__selector}>
          <ul>
            {types.map((type) => (
              <li
                key={type}
                onClick={() => changePizzaType(type)}
                className={
                  typePizza === type ? styles.active : ''
                }>
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size) => (
              <li
                onClick={() => setSizePizza(size)}
                className={
                  sizePizza === size ? styles.active : ''
                }
                key={size}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.pizzaBlock__counter}>
          <button
            className="button button--circle"
            onClick={minusCount}>
            -
          </button>
          <input
            type="number"
            value={count}
            onChange={(e) =>
              changeCount(Number(e.target.value))
            }
          />
          <button
            className="button button--circle"
            onClick={plusCount}>
            +
          </button>
        </div>
        <div className={styles.pizzaBlock__bottom}>
          <div className={styles.pizzaBlock__price}>
            {totalPrice} ₽
          </div>
          <div
            onClick={clickOnPlus}
            className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default PizzaItem;
