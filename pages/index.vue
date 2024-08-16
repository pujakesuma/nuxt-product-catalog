<template>
  <div class="catalog">
    <h1>Product Catalog</h1>
    <div class="product-list">
      <div v-for="product in productStore.products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" />
        <h2>{{ product.name }}</h2>
        <p>{{ product.price }}</p>
        <nuxt-link :to="`/product/${product.id}`">View Details</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '~/stores/productStore'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})

</script>

<style lang="scss" scoped>
.catalog {
  display: flex;
  flex-direction: column;
  align-items: center;

  .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  .product-card {
    border: 1px solid #ddd;
    padding: 20px;
    text-align: center;

    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>