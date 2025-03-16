import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useAppSelector';

import { selectFavorites } from '../../redux/favorites/favorites.selector';

import FavoriteItem from '../../components/FavoriteItem/FavoriteItem';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Favorites: FC = () => {
  const { items } = useAppSelector(selectFavorites);

  return (
    <>
      {items.length > 0 ? (
        <div>
          <h2 className="content__title">
            <FaHeart />
            Избранное
          </h2>
          <div>
            {items.map((item, idx) => (
              <FavoriteItem key={idx} card={item} />
            ))}
          </div>
        </div>
      ) : (
        <div className="container container--cart">
          <div className="cart cart--empty">
            <h2>Избранных товаров нет</h2>
            <p>
              Добавьте какой-либо телефон в избранное,
              <br />
              чтобы он отобразился здесь
            </p>
            <motion.div
              initial={{ scale: 2 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 100,
              }}>
              <Link to="/" className="button button--black">
                <motion.p
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1.2 }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                  }}>
                  Вернуться назад
                </motion.p>
              </Link>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default Favorites;
