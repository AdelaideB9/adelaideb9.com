<template>
  <div class="mb-8">
    <VueShowdown :markdown="constitutionMarkdown" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import http from "../services/http";
let constitutionMarkdown = ref("");
onMounted(async () => {
  let res = await http.get(
    "https://raw.githubusercontent.com/AdelaideB9/ctfc-constitution/main/README.md"
  );
  constitutionMarkdown.value = res.data;
});
</script>

<style scoped>
h1 {
  @apply mb-4;
}

h2 {
  @apply mt-8 mb-4;
}
</style>
