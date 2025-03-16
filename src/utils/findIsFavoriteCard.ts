import { useAppSelector } from '../hooks/useAppSelector';
import { selectFavorites } from '../redux/favorites/favorites.selector';

export const findIsFavoriteCard = (
  idCard: string,
  sizePizza: number
) => {
  const { items } = useAppSelector(selectFavorites);

  return items.find(
    ({ id, size }) => id === idCard && sizePizza === size
  );
};
