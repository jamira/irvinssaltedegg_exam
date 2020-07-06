import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/products'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    products: [],
    cart: [],
    isLoading: false
  },
  mutations: {
    SET_LOADING: (state, payload) => (state.isLoading = payload),
    SET_PRODUCTS: (state, payload) => (state.products = payload),
    SET_CART_ITEMS (state, product) {
      const productID = state.cart.find(item => item.id === product.id)
      if (productID) {
        productID.count += 1
      } else {
        product.count = 1
        state.cart.push(product)
      }
      state.isLoading = false
    },
    UPDATE_CART_ITEM (state, cart) {
      const cartID = state.cart.find(item => item.id === cart.payload.id)
      if (!cartID) {
        Vue.set(state.cart[cart.key], 'count', cart.payload.count)
      }
      state.isLoading = false
    },
    REMOVE_ITEM: (state, key) => Vue.delete(state.cart, key)
  },
  actions: {
    GET_PRODUCTS ({ commit }) {
      commit('SET_LOADING', true)
      api.getProducts(products => {
        const tmpArray = []
        products.forEach((product, index) => {
          Vue.set(product, 'id', index)
          Vue.set(product, 'count', 0)
          tmpArray.push(product)
        })
        commit('SET_PRODUCTS', tmpArray)
        commit('SET_LOADING', false)
      })
    }
  }
})
