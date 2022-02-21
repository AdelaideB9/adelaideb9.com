<script setup>
import { ref } from "vue";

defineProps({
  href: String,
  src: String,
  exclusive: Boolean,
});

const count = ref(0);
</script>

<template>
  <div class="flex-grow text-center text-xs">
    <a class="text-inherit" :href="href">
      <div class="bg-soft-purple/50 rounded-md px-2 py-3" v-if="exclusive"> 
        <img :src="src" class="mb-2 h-8 m-auto" />
        <p class="font-medium tracking-tighter text-center">Members<br>Exclusive</p>        
      </div>
      <img v-else :src="src" class="h-8 m-auto" />
    </a>
  </div>
</template>

<style scoped></style>
