<template>
  <div class="carousel-container">
    <div class="carousel-wrapper">
      <div class="carousel" ref="carousel">
        <div
          class="carousel-item"
          v-for="(product, index) in duplicatedProducts"
          :key="index"
        >
          <nuxt-link :to="`/product/${product.id}`">
            <NuxtImg
              :src="product.image"
              :alt="product.name"
              placeholder="images/placeholder.png"
            />
            <div class="product-name">{{ product.name }}</div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <button class="carousel-control left" @click="prevSlide">
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
          fill="#333"
        />
      </svg>
    </button>
    <button class="carousel-control right" @click="nextSlide">
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z"
          fill="#333"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "~/stores/productStore";

const productStore = useProductStore();
const products = productStore.products;

const carousel = ref<HTMLDivElement | null>(null);

const duplicatedProducts = computed(() => {
  if (products.length > 0) {
    return [...products, ...products];
  }
  return [];
});

const totalDuplicatedProducts = duplicatedProducts.value.length;

let currentIndex = 0;
const visibleItems = ref<number>(4); // Default number of visible items

// Update visibleItems based on screen width
onMounted(() => {
  updateVisibleItems();
  window.addEventListener("resize", updateVisibleItems);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateVisibleItems);
});

const updateVisibleItems = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    visibleItems.value = 1;
  } else if (screenWidth < 1024) {
    visibleItems.value = 3;
  } else {
    visibleItems.value = 4;
  }
  updateCarouselPosition(); // Update position after changing visibleItems
};
const updateCarouselPosition = () => {
  if (carousel.value) {
    carousel.value.style.transition = "transform 0.5s ease-in-out";
    carousel.value.style.transform = `translateX(-${
      currentIndex * (100 / visibleItems.value)
    }%)`;
  }
};

const prevSlide = () => {
  if (currentIndex === 0) {
    currentIndex = products.length;
    updateCarouselPositionWithoutAnimation();
    setTimeout(() => {
      currentIndex -= visibleItems.value;
      updateCarouselPosition();
    }, 0);
  } else {
    currentIndex -= visibleItems.value;
    if (currentIndex < 0) {
      currentIndex = 0;
    }
    updateCarouselPosition();
  }
};

const nextSlide = () => {
  if (currentIndex === products.length) {
    currentIndex = 0;
    updateCarouselPositionWithoutAnimation();
    setTimeout(() => {
      currentIndex += visibleItems.value;
      updateCarouselPosition();
    }, 0);
  } else {
    currentIndex += visibleItems.value;
    if (currentIndex > products.length) {
      currentIndex = products.length;
    }
    updateCarouselPosition();
  }
};

const updateCarouselPositionWithoutAnimation = () => {
  if (carousel.value) {
    carousel.value.style.transition = "none";
    carousel.value.style.transform = `translateX(-${
      currentIndex * (100 / visibleItems.value)
    }%)`;
  }
};
</script>

<style scoped lang="scss">
.carousel-container {
  position: relative;
  width: 100%;
  scroll-behavior: smooth;

  .carousel-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  .carousel {
    display: flex;
    transition: transform 0.5s ease-in-out;
    width: calc(100% * v-bind(totalDuplicatedProducts / visibleItems));

    .carousel-item {
      min-width: calc(100% / v-bind(visibleItems));
      box-sizing: border-box;
      text-align: center;
      cursor: pointer;
      padding: 10px;

      img {
        width: 100%;
        height: auto;
        display: block;
      }

      .product-name {
        font-weight: bold;
        margin-top: 10px;
        font-size: 1.5rem;

        @media (max-width: 768px) {
          font-size: 1.25rem;
        }

        @media (max-width: 480px) {
          font-size: 1rem;
        }
      }
    }
  }

  .carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: #fff;
    border: none;
    padding: 1rem;
    cursor: pointer;
    border-radius: 50%;
    z-index: 1;
    display: flex;
    align-items: center;

    &.left {
      left: 10px;
    }

    &.right {
      right: 10px;
    }
  }
}
</style>
