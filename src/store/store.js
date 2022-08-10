import { reactive } from 'vue'

export const store = reactive({
  page: localStorage.getItem('page') ? JSON.parse(localStorage.getItem('page')) : { name: 'adminMenu' },
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
  recomendIds: [],
  updateProp(prop, value) {
    this[prop] = value
  },
  updateWithStorage(prop, value) {
    this.updateProp(prop, value)
    localStorage.setItem(prop, JSON.stringify(value))
  },
  clearBasketData() {
    this.basketTotalPrice = 0
    this.basketItems = []
    this.basketItemsQuantity = 0
  },
  getBasketStatus() {
    localStorage.getItem('orderedBasketId') === localStorage.getItem('userAccessKey')
      ? this.isOrderedBasket = true
      : this.isOrderedBasket = false
  }

})
