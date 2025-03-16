import { FC, memo, useCallback } from 'react';
import { motion } from 'framer-motion';

import styles from './Categories.module.scss';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setCategory } from '../../redux/filter/filter.slice';

const categories = [
  'Все',
  'Apple',
  'Xiaomi',
  'Samsung',
  'Vivo',
  'Oppo',
];

interface ICategoryProps {
  category: number;
}

const Categories: FC<ICategoryProps> = memo(
  ({ category }) => {
    const dispatch = useAppDispatch();

    const onChangeCategory = useCallback(
      (category: number) => {
        dispatch(setCategory(category));
      },
      []
    );

    return (
      <div className={styles.categories}>
        <ul>
          {categories.map((c, i) => (
            <motion.div
              initial={{ scale: 0 }}
              key={i}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}>
              <li
                className={
                  category === i ? styles.active : ''
                }
                onClick={() => onChangeCategory(i)}>
                {c}
              </li>
            </motion.div>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
