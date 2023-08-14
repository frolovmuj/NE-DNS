import { useRef, FC } from 'react';
import { motion } from 'framer-motion';

import styles from './NotFound.module.scss';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const NotFound: FC = () => {
  const constraintsRef = useRef(null);
  return (
    <div className={styles.wrapper}>
      <motion.div ref={constraintsRef}>
        <motion.div drag dragConstraints={constraintsRef} />
      </motion.div>
      <motion.ul
        className={styles.container}
        variants={container}
        initial="hidden"
        ref={constraintsRef}
        animate="visible">
        {[0, 1, 2].map((index) => (
          <motion.li
            drag
            dragConstraints={constraintsRef}
            key={index}
            className={
              index !== 2 ? styles.item : styles.down
            }
            variants={item}
          />
        ))}
      </motion.ul>
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 360,
          damping: 20,
        }}>
        Страница не найдена :(
      </motion.h1>
      <motion.p
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 360,
          damping: 20,
        }}>
        К сожалаению такой страницы на сайте нет, или она
        была удалена.
      </motion.p>
    </div>
  );
};

export default NotFound;
