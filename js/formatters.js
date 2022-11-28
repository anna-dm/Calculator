// 4, 752 %
export const percentFormatter = new Intl.NumberFormat('ru-Ru',
  {
    style: 'percent',
    maximumFractionDigits: 3
  });

// 7 000 000 Р
export const priceFormatter = new Intl.NumberFormat('ru-Ru',
  {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 2
  });
