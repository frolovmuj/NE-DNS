import { useEffect, useRef, FC, } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch'

import { selectFilter } from '../../redux/filter/filter.selectors';
import { selectPizzasData } from '../../redux/pizzas/pizzas.selectors';


import { setFilters } from '../../redux/filter/filter.slice';

import { fetchPizzas } from '../../redux/pizzas/asyncActions';

import {
  Categories,
  Sort,
  PizzaItem,
  SkeletonCard,
  Pagination,
  ErrorInfo
} from '../../components/index';

import { Status } from '../../redux/pizzas/types';
import { ISearchPizzaParams } from '../../redux/filter/types'

import { list } from '../../components/Sort/Sort';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items: pizzas, status } = useAppSelector(selectPizzasData);
  const { sort, category, currentPage, searchText } = useAppSelector(selectFilter);

  const isSearch = useRef(false);
  const isMounted = useRef(false);


  const getPizzas = async () => {

    const categoryProperty =
      category > 0 ? `category=${category}` : '';

    const sortProperty = `sortBy=${sort.property}`;

    const orderProperty = `order=${sort.order}`;

    const searchTextProperty =
      searchText.length > 0 ? `search=${searchText}` : '';

    const pageProperty = `page=${currentPage}`;

    dispatch(
      fetchPizzas({
        category: categoryProperty,
        sort: sortProperty,
        order: orderProperty,
        search: searchTextProperty,
        currentPage: pageProperty,
      })
    );
  };
  // Парсим параметры при первом рендере
  useEffect(() => {
    if (window.location.search) {

      isSearch.current = true;

      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as ISearchPizzaParams;

      const sort = list.find(
        (item) =>
          item.property === params.sort &&
          item.order === params.order
      );

      dispatch(
        setFilters({
          sort: sort || list[0],
          searchText: params.search,
          category: Number(params.category),
          currentPage: Number(params.currentPage),
        })
      );
    }
    //! Idk but is working
    return () => {
      isSearch.current = true;
    };
  }, []);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category,
        sort: sort.property,
        order: sort.order,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [navigate, category, sort, currentPage]);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [category, sort, searchText, currentPage]);

  const items = pizzas.map((pizza) =>
    pizza.title
      .toLowerCase()
      .includes(searchText.toLowerCase()) ? (
      <PizzaItem key={pizza.id} card={pizza} />
    ) : null
  );

  const skeletons = [...new Array(4)].map((_, i) => (
    <SkeletonCard key={i} />
  ));


  return (
    <>
      <div className="content__top">
        <Categories category={category} />
        <Sort sort={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === Status.ERROR && (
        <ErrorInfo title='Пицца не смогла загрзится, попробуй позже 😕' />
      )}

      {status === Status.SUCCESS && items.length === 0 && (
        <ErrorInfo title='Таких пицц не найдено 😕' />
      )}

      {status === Status.SUCCESS && items.length !== 0 && (
        <div className="content__items">{items}</div>
      )}

      {status === Status.LOADING && (
        <div className="content__items">{skeletons}</div>
      )}

      {status === Status.SUCCESS || status === Status.LOADING ? (
        <Pagination currentPage={currentPage} />
      ) : null}
    </>
  );
};

export default Home;
