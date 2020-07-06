import Vue from 'vue'

export default {
  async getProducts (products) {
    const response = await Vue.axios.get('/api/products')
    products(response.data.data)
  }
}
