import { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';

import styles from './Pizza.module.scss';
import { calcTotalPriceCard } from '../../utils/calcTotalPriceCard';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  addToBasket,
  addToPusheditem,
} from '../../redux/cart/cart.slice';

import { IPizza } from '../../models/Pizza';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favorites/favorite.slice';
import { findIsFavoriteCard } from '../../utils/findIsFavoriteCard';
import toast from 'react-hot-toast';
import { findItemFromCart } from '../../utils/findItemFromCart';
import { findPushedItem } from '../../utils/findPushedItem';

interface PizzaItemProps {
  card: IPizza;
}

const typeNames = ['тонкое', 'традиционное'];

const PizzaItem: FC<PizzaItemProps> = ({ card }) => {
  const dispatch = useAppDispatch();

  const {
    imageUrl,
    id,
    title,
    types,
    sizes,
    price,
    category,
    maxLimits,
  } = card;

  const [typePizza, setTypePizza] = useState<number>(
    types[0]
  );
  const [sizePizza, setSizePizza] = useState<number>(
    sizes[0]
  );

  const [totalPrice, setTotalPrice] =
    useState<number>(price);

  const itemInCart = findItemFromCart(id, sizePizza);

  const [count, setCount] = useState<number>(1);

  const pushedItem = findPushedItem({
    id,
    size: sizePizza,
  });

  const isFavorite = findIsFavoriteCard(id, sizePizza);

  const clickOnPlus = () => {
    if (count > maxLimits) return;
    dispatch(
      addToBasket({
        id,
        imageUrl,
        title,
        price: totalPrice,
        count,
        type: typeNames[typePizza],
        size: sizePizza,
        maxLimits,
      })
    );

    addToPusheditem({
      id,
      size: sizePizza,
      maxLimits,
      count,
    });

    if (pushedItem?.count || 0 < maxLimits) {
      toast.success('Добавлено в корзину');
    }
  };

  const clickOnFavorite = () => {
    isFavorite
      ? dispatch(
          removeFromFavorites({
            id,
            imageUrl,
            title,
            price: totalPrice,
            count,
            type: typeNames[typePizza],
            size: sizePizza,
            maxLimits,
          })
        )
      : dispatch(
          addToFavorites({
            id,
            imageUrl,
            title,
            price: totalPrice,
            count,
            type: typeNames[typePizza],
            size: sizePizza,
            maxLimits,
          })
        );

    isFavorite
      ? toast.success('Удалено из избранного')
      : toast.success('Добавлено в избранное');
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
    count < maxLimits && setCount((prev) => prev + 1);
  };

  const changePizzaType = (type: number) => {
    setTypePizza(type);
  };

  useEffect(() => {
    if (price && sizePizza) {
      setTotalPrice((): number =>
        calcTotalPriceCard(
          sizePizza,
          price,
          typeNames[typePizza],
          category
        )
      );
    }
  }, [sizePizza, typePizza]);

  return (
    <AnimatePresence>
      <div className={styles.pizzaBlock}>
        {isFavorite ? (
          <FaHeart
            onClick={clickOnFavorite}
            fontSize={35}
            color="red"
            className={styles.pizzaBlock__heart}
          />
        ) : (
          <CiHeart
            onClick={clickOnFavorite}
            fontSize={35}
            color="red"
            className={styles.pizzaBlock__heart}
          />
        )}
        <Link to={`/phones/${id}`}>
          <motion.img
            animate={{ scale: [0.9, 1] }}
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
        <h4 className={styles.pizzaBlock__title}>
          {title}
        </h4>
        <div className={styles.pizzaBlock__selector}>
          {/* <ul>
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
          </ul> */}
          <ul>
            {sizes.map((size) => (
              <li
                onClick={() => setSizePizza(size)}
                className={
                  sizePizza === size ? styles.active : ''
                }
                key={size}>
                {size} Гб.
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
            onClick={plusCount}
            disabled={
              (pushedItem &&
                pushedItem.count === maxLimits) ||
              (itemInCart &&
                count + itemInCart.count > maxLimits) ||
              count === maxLimits
            }>
            +
          </button>
        </div>
        <div className={styles.pizzaBlock__bottom}>
          <div className={styles.pizzaBlock__price}>
            {totalPrice} ₽
          </div>
          <button
            onClick={clickOnPlus}
            disabled={
              (pushedItem &&
                pushedItem.count === maxLimits) ||
              (itemInCart &&
                count + itemInCart.count > maxLimits)
            }
            className="button button--outline">
            <span>Добавить</span>
          </button>
        </div>
        <p>Осталось по {maxLimits} шт. у каждой версии</p>
        {itemInCart && (
          <p>В корзине {itemInCart.count} шт.</p>
        )}
      </div>
    </AnimatePresence>
  );
};

export default PizzaItem;
