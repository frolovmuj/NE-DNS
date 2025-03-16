import { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

import { useAppSelector } from '../../hooks/useAppSelector.js';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';

import { FaShoppingCart } from 'react-icons/fa';
import styles from './Header.module.scss';

import { selectCart } from '../../redux/cart/cart.selectors';

import { calcTotalLength } from '../../utils/calcTotalLength.js';
import { selectFavorites } from '../../redux/favorites/favorites.selector.js';
import {
  calcTotalPrice,
  calcTotalPriceWithoutCount,
} from '../../utils/calcTotalPrice.js';

const Header: FC = () => {
  const { totalPrice: priceCart, items: cartItems } =
    useAppSelector(selectCart);
  const { items: favoriteItems } =
    useAppSelector(selectFavorites);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div>
          <Link to={'/'} className={styles.header__logo}>
            <HiOutlineDevicePhoneMobile fontSize={60} />
            <div>
              <h1>Ne DNS</h1>
              <p>магазин телефонов</p>
            </div>
          </Link>
        </div>
        <div className={styles.header__wrapper}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 360,
              damping: 20,
            }}>
            <Link
              to={'/favorites'}
              className={styles.header__logo}>
              <div className={styles.header__favorites}>
                <h1>
                  <FaHeart />
                  {favoriteItems.length && (
                    <span className={styles.header__length}>
                      {favoriteItems.length}
                    </span>
                  )}
                </h1>
                <p>Избранное</p>
                {calcTotalPrice(favoriteItems) > 0 && (
                  <span className={styles.header__price}>
                    {calcTotalPriceWithoutCount(
                      favoriteItems
                    )}
                  </span>
                )}
              </div>
            </Link>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 360,
              damping: 20,
            }}>
            <Link
              to={'/cart'}
              className={styles.header__logo}>
              <div className={styles.header__cart}>
                <h1>
                  <FaShoppingCart />
                  {cartItems.length && (
                    <span className={styles.header__length}>
                      {calcTotalLength(cartItems)}
                    </span>
                  )}
                </h1>
                <p>Корзина</p>
                {priceCart > 0 && (
                  <span className={styles.header__price}>
                    {priceCart}
                  </span>
                )}
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Header;
