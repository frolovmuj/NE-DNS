export const calcTotalLength = <
  T extends { count: number }
>(
  items: T[]
) => {
  return items.reduce(
    (acc: number, item: T) => acc + item.count,
    0
  );
};
