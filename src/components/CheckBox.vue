<script setup>
defineProps({
  content: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <label class="flex items-center gap-4 cursor-pointer">
    <input type="checkbox" />
    <span>{{ content }}</span>
  </label>
</template>

<style scoped>
input[type="checkbox"] {
  /* reset styles */
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--form-background);
  margin: 0;

  @apply rounded bg-white w-5 h-5 shadow-raised mb-1 cursor-pointer p-0;

  display: inline-grid;
  place-content: center;
}

input[type="checkbox"]::before {
  @apply h-4 w-4;

  content: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='012A36' viewBox='0 0 20 20'><path fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd'/></svg>");

  opacity: 0;
  transform: scale(1.2, 1.2);
  transition: 120ms opacity ease-in-out,
    240ms transform cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
  opacity: 1;
}
</style>
