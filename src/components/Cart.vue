<template>
  <div class="shopping-cart">
    <p v-text="checkCart" v-if="checkCart"></p>
    <template v-else>
      <h2 class="page-title">Shopping cart <span > - {{ totalCart }} {{ totalCart > 1 ? 'items' : 'item' }}</span></h2>
      <div class="heading">
        <div v-for="(heading, key) in headings" :key="key" :class="`heading-${key+1}`" v-text="heading"></div>
      </div>
      <div class="items">
        <div class="item" v-for="(item, key) in formattedCartItems" :key="key">
            <div class="action-btn">
                <span class="remove" @click="removeItem(key)">x</span>
            </div>
            <div class="product">
                <img :src="item.productImg" alt="Product Image">
                <span>{{ item.productName }}</span>
            </div>
            <div class="price">
                <span class="currency">{{ item.currency }}</span>
                <span class="price">{{ item.productPrice | currency }}</span>
            </div>
            <div class="qty">
                <input type="number" class="qty-box" @input="updateQty(cart, $event, key)" v-model.lazy="item.productQty">
            </div>
            <div class="total">
                <span class="currency">{{ item.currency }}</span>
                <span class="price">{{ item.totalPrice | currency }}</span>
            </div>
        </div>
      </div>
      <div class="subtotal">
        <div class="amount">
        <span class="currency">SGD</span> {{ subTotal | currency }}</div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'cart',
  data () {
    return {
      headings: ['Product', 'Price', 'Quantity', 'Total']
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart
    }),
    checkCart () {
      return this.cart.length < 1 ? "You don't have any items in cart." : ''
    },
    formattedCartItems () {
      return this.cart.map(item => {
        return {
          productId: item.id,
          productName: item.name,
          productImg: item.image,
          productPrice: item.price,
          productQty: item.count,
          currency: item.currency,
          totalPrice: item.count * item.price
        }
      })
    },
    totalCart () {
      return this.cart.length
    },
    subTotal () {
      return this.formattedCartItems.reduce((previousVal, currentval) => {
        return previousVal + currentval.totalPrice
      }, 0)
    }
  },
  methods: {
    removeItem (key) {
      this.$store.commit('REMOVE_ITEM', key)
    },
    updateQty (cart, e, key) {
      this.$store.commit('SET_LOADING', true)
      const payload = cart
      payload.count = e.target.value
      const data = {
        payload,
        key
      }
      this.$store.commit('UPDATE_CART_ITEM', data)
    }
  }
}
</script>
