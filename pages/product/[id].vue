<template>
  <div class="product-detail" v-if="product">
    <h1>{{ product.name }}</h1>
    <img :src="product.image" :alt="product.name" class="product-image" />
    <p>Price: ${{ product.price }}</p>
    <p>{{ product.description }}</p>

    <div class="product-variants">
      <h3>Variants</h3>
      <ul>
        <li
          v-for="variant in product.variants"
          :key="variant.size + variant.color"
        >
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
          style="width: 200px; height: auto; margin-right: 10px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "~/stores/productStore";

const route = useRoute();
const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProduct(Number(route.params.id));
});

const product = computed(() => productStore.product);
</script>

<style lang="scss" scoped>
.product-detail {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;

  h1 {
    font-family: "New Amsterdam", sans-serif;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .product-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
  }

  p {
    font-family: "Roboto", sans-serif;
    line-height: 1.6;
    margin-bottom: 15px;
  }

  .product-variants {
    margin-bottom: 30px;

    h3 {
      font-family: "New Amsterdam", sans-serif;
      font-size: 1.5rem;
      margin-bottom: 10px;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 5px;
      }
    }
  }

  h3 {
    font-family: "New Amsterdam", sans-serif;
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  div[v-if] {
    display: flex;
    overflow-x: auto;

    img {
      flex: 0 0 auto;
    }
  }
}
</style>
