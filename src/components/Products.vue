<template>
  <div class="products product-items">
    <div class="product" v-for="product in products" :key="product.id" :class="`product-item-${product.id + 1}`">
        <div class="product-thumb"><img :src="product.image" alt="" class="img-thumb"></div>
        <div class="product-info">
            <div class="product-meta">
                <h3 class="product-title">{{ product.name }}</h3>
                <div class="product-price">
                    <span class="currency">{{ product.currency }}</span>
                    <span class="price"> {{ product.price | currency }}</span>
                </div>
            </div>
            <button type="button" class="btn-cart" @click="addCart(product)">Add to cart</button>
        </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'products',
  created () {
    this.$store.dispatch('GET_PRODUCTS')
  },
  computed: {
    ...mapState({
      products: state => state.products
    })
  },
  methods: {
    addCart (product) {
      this.$store.commit('SET_LOADING', true)
      this.$store.commit('SET_CART_ITEMS', product)
    }
  }
}
</script>
