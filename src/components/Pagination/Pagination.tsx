import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

import { useAppDispatch } from '../../hooks/useAppDispatch';

import { setCurrentPage } from '../../redux/filter/filter.slice';

interface IEvent {
  selected: number;
}

interface IPaginationProps {
  currentPage: number;
}

const Pagination: FC<IPaginationProps> = ({
  currentPage,
}) => {
  const dispatch = useAppDispatch();

  const changeCurrentPage = (e: IEvent) => {
    dispatch(setCurrentPage(e.selected + 1));
  };

  return (
    <div className={styles.pagination}>
      <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={changeCurrentPage}
        pageRangeDisplayed={5}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
