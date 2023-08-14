import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import emptyCardImg from '../../assets/img/empty-cart.png';

const EmptyCart = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>
          Корзина пустая <b>😕</b>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную
          страницу.
        </p>
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          src={emptyCardImg} alt="Empty cart" />
        <motion.div
          initial={{ scale: 2 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}>
          <Link to="/" className="button button--black">
            <motion.p
              initial={{ scale: .6 }}
              animate={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 100 }}>
              Вернуться назад
            </motion.p>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default EmptyCart;
