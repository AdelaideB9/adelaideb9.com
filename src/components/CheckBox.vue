<script setup>
defineProps({
  content: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <label class="flex align-middle gap-2 ">
    <input type="checkbox" />
    {{ content }} </label
  >
</template>

<style scoped>
input[type="checkbox"] {
  /* reset styles */
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--form-background);
  margin: 0;

  @apply rounded bg-white w-7 h-7 shadow-raised;
  transform: translateY(-0.075em);

  display: inline-grid;
  place-content: center;
}

input[type="checkbox"]::before {
  @apply h-5 w-5;

  content: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'><path fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd'/></svg>");

  opacity: 0;
  transition: 120ms opacity ease-in-out;
}

input[type="checkbox"]:checked::before {
  opacity: 1;
}
</style>
