import { useAppSelector } from '../hooks/useAppSelector';

import { selectCart } from '../redux/cart/cart.selectors';

export const findPushedItem = ({
  id,
  size,
}: {
  id: string;
  size: number;
}) => {
  const { items } = useAppSelector(selectCart);

  return items.find((o) => o.id === id && o.size === size);
};
