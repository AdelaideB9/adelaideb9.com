<script setup>
import { ref } from "vue";

defineProps({
  href: String,
  src: String,
  exclusive: Boolean,
});
</script>

<template>
  <a class="no-underline text-xs" :href="href">
    <div v-if="exclusive" class="flex bg-soft-purple/50 rounded-md p-2 gap-2">
      <img :src="src" class="h-8" />
      <p class="hidden md:block font-medium tracking-tighter text-center">
        Members<br />Exclusive
      </p>
    </div>
    <img v-else :src="src" class="h-8" />
  </a>
</template>

<style scoped></style>
