import { defineStore } from 'pinia'
import type { Product } from '~/types/Product'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [] as Product[],
    product: null as Product | null,
  }),
  actions: {
    async fetchProducts() {
      const products = await $fetch<Product[]>('https://my-json-server.typicode.com/pujakesuma/nuxt-product-catalog/products')
      this.products = products || []
    },
    async fetchProduct(id: number) {
      const product = await $fetch<Product>(`https://my-json-server.typicode.com/pujakesuma/nuxt-product-catalog/products/${id}`)
      this.product = product || null
    },
  },
})