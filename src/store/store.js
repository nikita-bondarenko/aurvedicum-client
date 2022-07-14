import { reactive } from 'vue'

export const store = reactive({
  basketItemsQuantity: 0,
  basketTotalPrice: 0,
  basketItems: [],
  basketPagination: {},
  basketPaginationConfig: {
    limit: 2,
    page: 1
  },
  isBasketLoading: false,
  isBasketLoadingFailed: false,
  updateProp(prop, value) {
    this[prop] = value
  }

})
