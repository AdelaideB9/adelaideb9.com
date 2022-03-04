<template>
  <div class="mb-8">
    <VueShowdown id="markdown" :markdown="constitutionMarkdown" />
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

<style lang="scss" scoped>
#markdown {
  :deep(h1) {
    @apply mb-4;
  }

  :deep(h2) {
    @apply mt-8 mb-4;
  }

  :deep(ul) {
    @apply list-disc m-4 pl-6;
  }

  :deep(li) {
    @apply m-1;
  }

  :deep(ol) {
    @apply list-decimal m-4 pl-6;
  }

  :deep(p) {
    @apply mb-2;
  }
}
</style>
