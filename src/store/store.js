import { reactive } from 'vue'

export const store = reactive({
  adminPage: 'adminProducts',
  basketCounterLoading: true,
  basketItemsQuantity: 0,
  basketTotalPrice: 0,
  basketItems: [],
  basketPagination: {},
  basketPaginationConfig: {
    limit: 5,
    page: 1
  },
  isBasketLoading: true,
  isBasketLoadingFailed: false,
  updateProp(prop, value) {
    this[prop] = value
  }

})
