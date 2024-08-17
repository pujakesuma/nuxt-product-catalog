<template>
  <div class="catalog">
    <div class="carousel-section">
      <h1>STEP INTO IT.</h1>
      <ProductCarousel :products="productStore.products" />
    </div>
    <div class="slider-section">
      <h2>Where Style Meets Support.</h2>
      <ProductSlider />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/stores/productStore";
import ProductCarousel from "~/components/Carousel.vue";
import ProductSlider from "~/components/Slider.vue";

const productStore = useProductStore();

productStore.fetchProducts();
</script>

<style lang="scss" scoped>
.catalog {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    font-size: 4rem;
    margin-bottom: 4rem;
  }

  h2 {
    font-size: 3rem;
    text-align: center;
  }

  .carousel-section {
    margin-bottom: 3rem;
  }
}
</style>
