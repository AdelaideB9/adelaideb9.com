<script setup>
defineProps({
  href: String(),
  src: String(),
  style: String(),
  exclusive: Boolean,
  join: Boolean,
});
</script>

<template>
  <a class="no-underline text-xs self-center" target="_blank" :href="href">
    <div v-if="exclusive" class="flex bg-soft-purple/50 rounded-md p-2 gap-2" :style="style">
      <img :src="src" class="h-8" />
      <p class="hidden md:block font-medium tracking-tighter text-center">
        Members<br />Exclusive
      </p>
    </div>
    <div v-else-if="join" class="flex text-s bg-soft-purple/50 rounded-md px-6 py-3 gap-4" :style="style">
      <img :src="src" class="h-8 self-center" />
      <p class="block font-medium tracking-tighter text-center mx-2">
        Join our<br/>
        Discord
      </p>
    </div>
    <img v-else :src="src" class="h-8" />
  </a>
</template>

<style scoped></style>
