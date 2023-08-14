import { useEffect, useState, FC } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import styles from './CardPage.module.scss';

import blockstyles from '../../components/PizzaItem/Pizza.module.scss'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { addToBasket } from '../../redux/cart/cart.slice';

import { IPizza } from '../../models/Pizza';
import { calcTotalPriceCard } from '../../utils/calcTotalPriceCard';

const typeNames = ['тонкое', 'традиционное'];

const CardPage: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [pizza, setPizza] = useState<IPizza>();

  const [typePizza, setTypePizza] = useState<number>(0);
  const [sizePizza, setSizePizza] = useState<number>(0);
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState<number>(0)

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
    if (!pizza) return
    setTypePizza(pizza.types[0]);
    setSizePizza(pizza.sizes[0]);
    setTotalPrice(pizza.price)
  }, [pizza]);

  useEffect(() => {

    if (pizza && pizza.price && sizePizza) {
      setTotalPrice((): number => calcTotalPriceCard(sizePizza, pizza.price, typeNames[typePizza]))
    }

  }, [sizePizza, typePizza, totalPrice])


  const clickOnPlus = () => {
    if (!pizza) return
    dispatch(
      addToBasket({
        id: pizza.id,
        imageUrl: pizza.imageUrl,
        title: pizza.title,
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

  const minusCount = () => count >= 2 && setCount((prev) => (prev -= 1));

  const plusCount = () => setCount((prev) => prev + 1);

  const changePizzaType = (type: number) => setTypePizza(type);


  if (!pizza) {
    return <h1>Загрузка</h1>;
  }
  return (
    <>
      <div className={`content  ${styles.wrapper}`}>
        <div className={styles.leftColumn}>
          <img
            src={pizza.imageUrl}
            alt="card"
            data-image="black"
          />
        </div>
        <div className={styles.rightColumn}>
          {/* Product Description */}
          <div className={styles.productDescription}>
            <h1>{pizza.title}</h1>
            <p>
              {pizza.title} he preferred choice of a vast
              range of acclaimed DJs. Punchy, bass-focused
              sound and high isolation. Sturdy headband and
              on-ear cushions suitable for live performance
            </p>
          </div>
          {/* Product Select */}
          <div className={blockstyles.pizzaBlock__selector}>
            <ul>
              {pizza.types.map((type) => (
                <li
                  key={type}
                  onClick={() => changePizzaType(type)}
                  className={`${type === typePizza ? blockstyles.active : ''
                    }`}>
                  {typeNames[type]}
                </li>
              ))}
            </ul>
            <ul>
              {pizza.sizes.map((size) => (
                <li
                  onClick={() => setSizePizza(size)}
                  className={`${size === sizePizza ? blockstyles.active : ''
                    }`}
                  key={size}>
                  {size} см.
                </li>
              ))}
            </ul>
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
              onClick={plusCount}>
              +
            </button>
          </div>
          {/* Product Pricing */}
          <div className={styles.productPrice}>
            <span>{totalPrice} руб.</span>
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
        <pre />
      </div>
    </>
  );
};

export default CardPage;
