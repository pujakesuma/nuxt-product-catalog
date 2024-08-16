<template>
  <div class="product-detail" v-if="product">
    <h1>{{ product.name }}</h1>
    <img :src="product.image" :alt="product.name" class="product-image">
    <p>Price: ${{ product.price }}</p>
    <p>{{ product.description }}</p>

    <div class="product-variants">
      <h3>Variants</h3>
      <ul>
        <li v-for="variant in product.variants" :key="variant.size + variant.color">
          Size: {{ variant.size }} | Color: {{ variant.color }}
        </li>
      </ul>
    </div>

    <div>
      <h3>Gallery</h3>
      <div v-if="product.gallery.length">
        <img
          v-for="(image, index) in product.gallery"
          :key="index"
          :src="image"
          :alt="`Image ${index + 1}`"
          style="width: 200px; height: auto; margin-right: 10px;"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '~/stores/productStore'

const route = useRoute()
const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProduct(Number(route.params.id))
})

const product = computed(() => productStore.product)
</script>

<style lang="scss" scoped>
.product-detail {
  .product-image {
    img {
      width: 100%;
      height: auto;
    }
  }
  .product-variants {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    li {
      border: 1px solid #ddd;
      padding: 5px 10px;
      list-style: none;
    }
  }
}
</style>