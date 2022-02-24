<script setup>
defineProps({
  content: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button
    class="px-5 py-2 w-fit rounded shadow-raised text-center border-black/20 bg-primary border-2 cursor-pointer hover:brightness-110 active:brightness-90 active:shadow-none mb-1 active:mt-1 active:mb-0 select-none disabled:brightness-75"
  >
    {{ content }}
  </button>
</template>

<style scoped></style>
