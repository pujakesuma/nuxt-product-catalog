<template>
  <div class="horizontal-scroll-container">
    <div class="header">
      <div class="controls">
        <button
          class="scroll-button left"
          :disabled="currentIndex === 0"
          @click="scrollLeft"
        >
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
              fill="#fff"
            />
          </svg>
        </button>
        <button
          class="scroll-button right"
          :disabled="currentIndex >= maxIndex"
          @click="scrollRight"
        >
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
              fill="#fff"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="horizontal-scroll-wrapper">
      <div class="horizontal-scroll" ref="scrollContainer">
        <div
          class="product-card"
          v-for="(product, index) in products"
          :key="index"
        >
          <nuxt-link :to="`/product/${product.id}`">
            <NuxtImg
              :src="product.image"
              :alt="product.name"
              placeholder="images/placeholder.png"
            />
            <div class="product-info">
              <p class="product-name">{{ product.name }}</p>
              <p class="product-price">{{ formatCurrency(product.price) }}</p>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "~/stores/productStore";

const scrollContainer = ref<HTMLDivElement | null>(null);
const productStore = useProductStore();
const products = productStore.products;

const currentIndex = ref(0);
const visibleItems = ref(3); // Default number of visible items

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
    visibleItems.value = 2;
  } else {
    visibleItems.value = 3;
  }
  updateScrollPosition(); // Update position after changing visibleItems
};

// Calculate the maximum index based on visible items and total products
const maxIndex = computed(
  () => Math.ceil(products.length / visibleItems.value) - 1
);

const updateScrollPosition = () => {
  if (scrollContainer.value) {
    scrollContainer.value.style.transform = `translateX(-${
      currentIndex.value * 100
    }%)`;
  }
};

const scrollLeft = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
    updateScrollPosition();
  }
};

const scrollRight = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value += 1;
    updateScrollPosition();
  }
};
</script>

<style scoped lang="scss">
.horizontal-scroll-container {
  width: 100%;
  position: relative;
  scroll-behavior: smooth;

  .header {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-bottom: 1rem;

    h2 {
      margin: 0;
    }

    .controls {
      display: flex;
      align-items: center;
      gap: 8px;

      .scroll-button {
        background-color: rgba(0, 0, 0, 0.5);
        border: none;
        padding: 12px;
        cursor: pointer;
        border-radius: 50%;
        display: flex;
        align-items: center;

        &:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      }
    }
  }

  .horizontal-scroll-wrapper {
    overflow: hidden;
    width: 100%;
  }

  .horizontal-scroll {
    display: flex;
    transition: transform 0.5s ease-in-out;

    .product-card {
      min-width: calc(100% / v-bind(visibleItems));
      box-sizing: border-box;
      cursor: pointer;
      padding: 10px;

      img {
        width: 100%;
        height: auto;
        display: block;
        margin-bottom: 10px;
      }

      .product-info {
        .product-name {
          font-weight: bold;
          margin-bottom: 5px;
        }

        .product-price {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
