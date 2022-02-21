<template>
  <div id="constitution">
    <VueShowdown :markdown="constitutionMarkdown" />
  </div>
</template>

<style>
#constitution h1 {
  @apply mt-10 mb-4;
}

#constitution h2 {
  @apply mt-8 mb-4;
}
</style>

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
