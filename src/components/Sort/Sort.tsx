import { useState, useRef, useEffect, FC, memo } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx'
import { useAppDispatch } from '../../hooks/useAppDispatch'

import styles from './Sort.module.scss'

import { ISort } from '../../models/Sort';

import { setSort } from '../../redux/filter/filter.slice';


export const list: ISort[] = [
  {
    name: 'популярности',
    property: 'rating',
    order: 'desc',
  },
  { name: 'алфавиту', property: 'title', order: 'asc' },
  {
    name: 'cамым дешевым',
    property: 'price',
    order: 'asc',
  },
  {
    name: 'cамым дорогим',
    property: 'price',
    order: 'desc',
  },
];

interface iSortProps {
  sort: ISort
}

const Sort: FC<iSortProps> = memo(({ sort }) => {
  const dispatch = useAppDispatch();

  const [popup, setPopup] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const chooseSort = (sort: ISort) => {
    dispatch(setSort(sort));
    setPopup(false);
  };

  const changePopup = (value: boolean) => {
    setPopup(!value);
  };


  useEffect(() => {
    const removePopup = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setPopup(false);
      }
    };

    document.addEventListener('click', removePopup);

    return () => {
      document.removeEventListener('click', removePopup);
    };
  }, []);

  return (
    <div ref={sortRef} className={styles.sort}>
      <div
        onClick={() => changePopup(popup)}
        className={styles.sort__label}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 180, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}>
          {' '}
          <svg
            className={clsx(popup && styles.active)}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
        </motion.div>
        <b>Сортировка по:</b>
        <span>{sort.name}</span>
      </div>
      {popup && (
        <div className={styles.sort__popup}>
          <ul>
            {list.map((c, i) => (
              <li
                key={i}
                className={clsx(sort.name === c.name && styles.active)}
                onClick={() => chooseSort(c)}>
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
})

export default Sort;
