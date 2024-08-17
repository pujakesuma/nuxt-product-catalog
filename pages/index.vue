<template>
  <div class="catalog">
    <div class="hero-section">
      <NuxtImg
        src="/images/hero-image.jpg"
        alt="Hero Image"
        class="hero-image"
      />
    </div>
    <div class="carousel-section">
      <h1>STEP INTO IT.</h1>
      <ProductCarousel />
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

useHead({
  title: "Shoe Wan - Step Into It",
  meta: [{ name: "description", content: "Shoe Wan site" }],
});

const productStore = useProductStore();

productStore.fetchProducts();
</script>

<style lang="scss" scoped>
.catalog {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .hero-section {
    position: relative;
    height: 400px;
    overflow: hidden;
    margin-bottom: 3rem;

    .hero-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  h1 {
    font-size: 4rem;
    margin-bottom: 4rem;

    @media (max-width: 768px) {
      font-size: 3rem;
      margin-bottom: 2rem;
      padding-left: 10px;
    }

    @media (max-width: 480px) {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
  }

  h2 {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 3rem;

    @media (max-width: 768px) {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }

  .carousel-section {
    margin-bottom: 3rem;
  }
}
</style>
