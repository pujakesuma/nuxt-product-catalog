<template>
  <div class="product-detail">
    <div class="product-gallery">
      <div class="thumbnails">
        <template v-if="product?.gallery.length">
          <NuxtImg
            v-for="(image, index) in product.gallery"
            :key="index"
            :src="image"
            :alt="`Thumbnail ${index + 1}`"
            :class="{ active: index === activeImageIndex }"
            @click="activeImageIndex = index"
            placeholder="/images/placeholder.png"
          />
        </template>
        <template v-else>
          <NuxtImg
            v-for="i in 3"
            :key="i"
            src="/images/placeholder.png"
            :alt="`Thumbnail ${i + 1}`"
          />
        </template>
      </div>
      <div class="main-image">
        <template v-if="product?.gallery.length">
          <NuxtImg
            :src="product.gallery[activeImageIndex]"
            :alt="product.name"
            placeholder="/images/placeholder.png"
          />
        </template>
        <template v-else>
          <NuxtImg
            src="/images/placeholder.png"
            alt="placeholder"
            placeholder="/images/placeholder.png"
          />
        </template>
      </div>
    </div>

    <div class="product-info">
      <h1>{{ product?.name }}</h1>
      <p class="price">Rp {{ product?.price.toLocaleString() }}</p>
      <div class="size-options">
        <h3>Select Size</h3>
        <div class="size-list">
          <button
            v-for="variant in product?.variants"
            :key="variant.size + variant.color"
            :class="{ selected: selectedSize === variant.size }"
            @click="selectSize(variant.size)"
          >
            {{ variant.size }}
          </button>
        </div>
      </div>
      <button class="add-to-bag">Add to Bag</button>
      <div class="description">
        <h3>Description</h3>
        <p>{{ product?.description }}</p>
        <ul>
          <li>
            Colour Shown:
            <span v-for="(variant, i) in product?.variants" :key="i"
              >{{ variant.color
              }}{{ i + 1 !== product?.variants.length ? "/" : "" }}</span
            >
          </li>
          <li>Country/Region of Origin: Indonesia</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "~/stores/productStore";

const route = useRoute();
const productStore = useProductStore();
const activeImageIndex = ref(0);
const selectedSize = ref(""); // Store the selected size

productStore.fetchProduct(Number(route.params.id));

const product = computed(() => productStore.product);

const selectSize = (size: string) => {
  selectedSize.value = size;
};
</script>

<style lang="scss" scoped>
.product-detail {
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 5rem;
  width: 100%;

  .product-gallery {
    display: flex;
    gap: 10px;
    width: 60%;

    .thumbnails {
      display: flex;
      flex-direction: column;
      gap: 10px;

      img {
        width: 80px;
        height: auto;
        cursor: pointer;
        border: 2px solid transparent; // For active state

        &.active {
          border-color: #333; // Highlight active image
        }
      }
    }

    .main-image {
      width: 100%;
      img {
        width: 100%;
        height: auto;
      }
    }
  }

  .product-info {
    flex: 1;
    display: flex;
    flex-direction: column;

    h1 {
      font-size: 28px;
      margin-bottom: 10px;
    }

    .price {
      font-size: 24px;
      margin-bottom: 20px;
      color: #333;
    }

    .size-options {
      margin-bottom: 20px;

      h3 {
        margin-bottom: 10px;
      }

      .size-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        button {
          padding: 10px 20px;
          border: 1px solid #ccc;
          background-color: #fff;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s ease;

          &.selected {
            background-color: #000;
            color: #fff;
          }
        }
      }
    }

    .add-to-bag {
      padding: 15px;
      background-color: #000;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-bottom: 30px;
    }

    .description {
      ul {
        list-style-type: none;
        padding: 0;

        li {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
