/* eslint-disable */
export default function () {
  const pluralize = require('pluralize-ru');
  const pluralizeProductAmount = (quantity) => pluralize(quantity, 'Товара нет', '%d товар', '%d товара', '%d товаров');

  const editNumberFormat = (number) => new Intl.NumberFormat('ru-RU').format(number);

  const editVolumeFormat = (text) => {
    if (text) {
      const row = text.split(' ').filter(item => item.length > 0)
      const number = Number(row.reduce((arr, item) => Number(item) ? [...arr, item] : arr, []).join(''))
      const type = row.reduce((arr, item) => !Number(item) ? [...arr, item] : arr, []).join('')

      return [(new Intl.NumberFormat('ru-RU').format(number)), type].join(' ')
    }
    return text
  }

  return {
    editVolumeFormat,
    editNumberFormat,
    pluralizeProductAmount,
  };
}
