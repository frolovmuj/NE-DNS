export const calcTotalPriceCard = (
  size: number,
  price: number,
  type: string
): number => {


  let totalPrice = price;

  if (size === 26) {
    totalPrice += 0;
  } else if (size === 30) {
    totalPrice += 35;
  } else if (size === 40) {
    totalPrice += 60;
  }

  if (type === 'тонкое') {
    totalPrice += 0;
  } else if (type === 'традиционное') {
    totalPrice += 15;
  }

  
  return totalPrice;
};
