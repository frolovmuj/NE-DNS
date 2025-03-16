import { useEffect, useState, FC } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import styles from './CardPage.module.scss';

import blockstyles from '../../components/PizzaItem/Pizza.module.scss';
import { MdOutlineStarBorder } from 'react-icons/md';
import { MdOutlineStar } from 'react-icons/md';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addToBasket } from '../../redux/cart/cart.slice';

import { IPizza } from '../../models/Pizza';
import { calcTotalPriceCard } from '../../utils/calcTotalPriceCard';
import Rating from '../../components/Rating/Rating';
import { motion } from 'framer-motion';
import { findItemFromCart } from '../../utils/findItemFromCart';
import { findPushedItem } from '../../utils/findPushedItem';
import { findIsFavoriteCard } from '../../utils/findIsFavoriteCard';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favorites/favorite.slice';
import toast from 'react-hot-toast';

const typeNames = ['тонкое', 'традиционное'];

const CardPage: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [pizza, setPizza] = useState<IPizza>();

  const [typePizza, setTypePizza] = useState<number>(0);
  const [sizePizza, setSizePizza] = useState<number>(0);
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const { data } = await axios.get<IPizza>(
          `https://644e76af4e86e9a4d8f969fb.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        console.log('Mistake!');
      }
    };
    fetchPizzas();
  }, []);

  useEffect(() => {
    if (!pizza) return;
    setTypePizza(pizza.types[0]);
    setSizePizza(pizza.sizes[0]);
    setTotalPrice(pizza.price);
  }, [pizza]);

  useEffect(() => {
    if (pizza && pizza.price && sizePizza) {
      setTotalPrice((): number =>
        calcTotalPriceCard(
          sizePizza,
          pizza.price,
          typeNames[typePizza],
          pizza.category
        )
      );
    }
  }, [sizePizza, typePizza, pizza]);

  const clickOnPlus = () => {
    if (!pizza) return;
    dispatch(
      addToBasket({
        id: pizza.id,
        imageUrl: pizza.imageUrl,
        title: pizza.title,
        price: totalPrice,
        count,
        type: typeNames[typePizza],
        size: sizePizza,
        maxLimits: pizza.maxLimits,
      })
    );
  };

  const changeCount = (number: number) => {
    if (number <= 0) {
      number = 1;
    }
    setCount(number);
  };

  const minusCount = () =>
    count >= 2 && setCount((prev) => (prev -= 1));

  const plusCount = () => setCount((prev) => prev + 1);

  const itemInCart = findItemFromCart(id || '', sizePizza);
  const isFavorite = findIsFavoriteCard(
    id || '',
    sizePizza
  );

  const pushedItem = findPushedItem({
    id: id || '',
    size: sizePizza,
  });

  const clickOnFavorite = () => {
    isFavorite
      ? dispatch(
          removeFromFavorites({
            id: id || '',
            imageUrl: pizza?.imageUrl || '',
            title: pizza?.title || '',
            price: totalPrice,
            count,
            type: typeNames[typePizza],
            size: sizePizza,
            maxLimits: pizza?.maxLimits || 0,
          })
        )
      : dispatch(
          addToFavorites({
            id: id || '',
            imageUrl: pizza?.imageUrl || '',
            title: pizza?.title || '',
            price: totalPrice,
            count,
            type: typeNames[typePizza],
            size: sizePizza,
            maxLimits: pizza?.maxLimits || 0,
          })
        );

    isFavorite
      ? toast.success('Удалено из избранного')
      : toast.success('Добавлено в избранное');
  };

  if (!pizza) {
    return <h1>Загрузка</h1>;
  }

  return (
    <>
      <div className={`${styles.wrapper}`}>
        <div className={styles.leftColumn}>
          <img
            className={styles.img}
            src={pizza.imageUrl}
            alt="card"
            data-image="black"
          />
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.productDescription}>
            <h1>{pizza.title}</h1>
            <motion.p
              initial={{ maxHeight: 0, opacity: 0 }}
              animate={{ maxHeight: '500px', opacity: 1 }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
              }}
              style={{
                overflow: 'hidden',
                fontSize: '18px',
                lineHeight: '1.4',
              }}>
              {pizza.description}
            </motion.p>
          </div>

          <div className={blockstyles.pizzaBlock__selector}>
            {/* <ul>
              {pizza.types.map((type) => (
                <li
                  key={type}
                  onClick={() => changePizzaType(type)}
                  className={`${
                    type === typePizza
                      ? blockstyles.active
                      : ''
                  }`}>
                  {typeNames[type]}
                </li>
              ))}
            </ul> */}
            <ul>
              {pizza.sizes.map((size) => (
                <li
                  onClick={() => setSizePizza(size)}
                  className={`${
                    size === sizePizza
                      ? blockstyles.active
                      : ''
                  }`}
                  key={size}>
                  {size} Гб.
                </li>
              ))}
            </ul>
          </div>
          <div className={blockstyles.pizzaBlock__rating}>
            <Rating rating={pizza.rating} />
          </div>
          <div className={blockstyles.pizzaBlock__counter}>
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
                  pushedItem.count === pizza.maxLimits) ||
                (itemInCart &&
                  count + itemInCart.count >
                    pizza.maxLimits) ||
                count === pizza.maxLimits
              }>
              +
            </button>
          </div>
          {/* Product Pricing */}
          <div className={styles.productPrice}>
            <span>{totalPrice} руб.</span>
            <button
              onClick={clickOnPlus}
              className="button button--outline"
              disabled={
                (pushedItem &&
                  pushedItem.count === pizza.maxLimits) ||
                (itemInCart &&
                  count + itemInCart.count >
                    pizza.maxLimits) ||
                count === pizza.maxLimits
              }>
              <span>Добавить в корзину</span>
            </button>
            <button
              onClick={clickOnFavorite}
              className="button button--outline">
              <span>
                {isFavorite
                  ? 'Удалить из избранного'
                  : 'Добавить в избранное'}
              </span>
            </button>
            <p>
              Осталось по {pizza.maxLimits} шт. у каждой
              версии
            </p>
            {itemInCart && (
              <p>В корзине {itemInCart.count} шт.</p>
            )}
          </div>
        </div>
        <pre />
      </div>
    </>
  );
};

export default CardPage;
