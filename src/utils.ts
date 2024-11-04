export const getStaticDataSource = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    value: i.toString(),
    label: `Item ${i}`,
  }));
};
