import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const EmptyCart = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>Корзина пуста</h2>
        <p>
          Всего скорей вы не сохраняли телефон
          <br />
          Для того, чтобы положить телефон в корзину,
          <br />
          перейдите на главную страницу.
        </p>
        <motion.div
          initial={{ scale: 2 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}>
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
  );
};

export default EmptyCart;
