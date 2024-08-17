import { defineStore } from "pinia";
import type { Product } from "~/types/Product";
import type { AsyncDataRequestStatus } from "#app";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [] as Product[],
    product: null as Product | null,
    status: "idle" as AsyncDataRequestStatus,
  }),
  getters: {
    isLoading: (state) => state.status === "pending",
  },
  actions: {
    async fetchProducts() {
      const apiBase = useRuntimeConfig().public.apiBase;
      const { data, status } = await useAsyncData("products", () =>
        $fetch<Product[]>(`${apiBase}/products`)
      );
      this.products = data.value || [];
      this.status = status.value;
    },
    async fetchProduct(id: number) {
      const apiBase = useRuntimeConfig().public.apiBase;
      const { data, status } = await useAsyncData("product", () =>
        $fetch<Product>(`${apiBase}/products/${id}`)
      );
      this.product = data.value || null;
      this.status = status.value;
    },
  },
});
