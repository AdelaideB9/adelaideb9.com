<script setup>
import { ref } from "vue";
import FullscreenModal from "./FullscreenModal.vue";

let open = ref(false);
</script>

<template>
  <div class="relative">
    <div
      class="md:hidden p-0.5 text-xl font-medium h-9 w-9 shadow text-center border-black/20 bg-primary border-2 hover:brightness-110 select-none rounded-full"
      @click="open = true"
    >
      ?
    </div>
    <div
      id="button"
      class="hidden md:block p-0.5 text-xl font-medium h-9 w-9 shadow text-center border-black/20 bg-primary border-2 hover:brightness-110 select-none rounded-full"
    >
      ?
    </div>
    <div
      id="tooltip"
      class="hidden px-3 py-2 absolute rounded border-black/20 bg-primary border-2 shadow w-72 select-none -translate-y-1/2 top-1/2 right-full text-sm mr-2 z-20"
    >
      <slot></slot>
    </div>
    <FullscreenModal
      v-if="open"
      class="md:hidden"
      title="Help"
      @close="open = false"
      ><slot></slot
    ></FullscreenModal>
  </div>
</template>

<style scoped>
#button:hover + #tooltip {
  @apply block;
}
</style>
