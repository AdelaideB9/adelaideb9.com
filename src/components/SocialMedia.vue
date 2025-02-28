<script setup>
defineProps({
  href: String(),
  src: String(),
  style: String(),
  exclusive: Boolean,
});
</script>

<template>
  <a class="no-underline text-xs" target="_blank" :href="href">
    <div v-if="exclusive" class="flex bg-soft-purple/50 rounded-md p-2 gap-2" :style="style">
      <img :src="src" class="h-8" />
      <p class="hidden md:block font-medium tracking-tighter text-center">
        Members<br />Exclusive
      </p>
    </div>
    <img v-else :src="src" class="h-8" />
  </a>
</template>

<style scoped></style>
