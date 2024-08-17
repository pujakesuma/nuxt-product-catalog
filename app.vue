<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Product App",
  meta: [{ name: "description", content: "Product site." }],
});
</script>
