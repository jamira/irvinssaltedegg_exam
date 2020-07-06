<template>
  <div id="app">
    <div class="loader" v-if="isLoading">
        <p>Loading...</p>
    </div>
    <Products />
    <Cart />
  </div>
</template>

<script>
import Products from './components/Products.vue'
import Cart from './components/Cart.vue'

export default {
  name: 'App',
  components: {
    Products,
    Cart
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>
<style lang="scss">
#app {
  padding: 40px 0;
}
.loader {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(20, 29, 37, 0.4);
  z-index: 9999;

  p {
    background: #fff;
    width: 130px;
    text-align: center;
    margin: 40vh auto 0;
    padding: 20px 0;
    border-radius: 3px;
    box-shadow: 0 0 20px #333;
  }
}
</style>
