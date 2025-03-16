import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ICartPizza } from '../../models/CartPizza';
import styles from './FavoriteItem.module.scss';
import { removeFromFavorites } from '../../redux/favorites/favorite.slice';

interface Props {
  card: ICartPizza;
}

const FavoriteItem: FC<Props> = ({ card }) => {
  const dispatch = useAppDispatch();

  const {
    imageUrl,
    id,
    title,
    size,
    price,
    count,
    type,
    maxLimits,
  } = card;

  const handleRemoveFromFavorites = () => {
    dispatch(
      removeFromFavorites({
        id,
        imageUrl,
        title,
        price,
        count,
        type,
        size,
        maxLimits,
      })
    );
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
      <div className="cart__item-price">
        <b>{price} ₽</b>
      </div>
      <div className={styles.favorite__buttons}>
        <Link to={`/phones/${id}`}>
          <span className="button button--outline">
            Перейти на страницу товара
          </span>
        </Link>
        <button
          className="button button--outline"
          onClick={handleRemoveFromFavorites}>
          <span>Удалить из избранного</span>
        </button>
      </div>
    </div>
  );
};

export default FavoriteItem;
