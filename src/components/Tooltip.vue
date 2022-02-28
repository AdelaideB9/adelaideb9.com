<script setup>
defineProps({
  content: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="relative">
    <div
      id="button" class="p-0.5 text-xl font-medium h-9 w-9 aspect-square shadow-raised text-center border-black/20 bg-primary border-2 cursor-pointer hover:brightness-110 mb-1 select-none rounded-full"
    >
      ?
    </div>
    <div id="tooltip" class="hidden p-2 absolute rounded border-black/20 bg-primary border-2 shadow w-72 select-none -translate-y-1/2 top-1/2 right-full text-sm mr-2">
      {{ content }}
    </div>
  </div>
</template>

<style scoped>
#button:hover + #tooltip {
  @apply block;
}
</style>
