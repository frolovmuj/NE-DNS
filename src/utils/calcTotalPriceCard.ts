export const calcTotalPriceCard = (
  size: number,
  price: number,
  type: string,
  category: number
): number => {
  const sizePriceMap: Record<
    number,
    Record<number, number>
  > = {
    256: { 1: 15000, 2: 5000, 3: 7500, 4: 4500, 5: 7500 },
    512: { 1: 25700, 2: 8000, 3: 16500, 4: 9500, 5: 10300 },
    1024: {
      1: 35700,
      2: 12000,
      3: 15500,
      4: 17500,
      5: 19300,
    },
  };

  const typePriceMap: Record<string, number> = {
    тонкое: 0,
    традиционное: 15,
  };

  let totalPrice = price;

  if (
    sizePriceMap[size] &&
    sizePriceMap[size][category] !== undefined
  ) {
    totalPrice += sizePriceMap[size][category];
  }

  totalPrice += typePriceMap[type] ?? 0;

  return totalPrice;
};
