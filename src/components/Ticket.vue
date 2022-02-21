<script setup>
import Button from "../components/Button.vue";

defineProps({
  details: Object,
});
</script>

<template>
  <div class="w-full bg-white text-dark-blue p-12 leading-relaxed ticket">
    <h2>{{ details.title }}</h2>
    <div class="my-4 font-medium">
      <p>
        {{ details.date }}
      </p>
      <p v-if="details.url">
        Website: <a :href="details.url">{{ details.url }}</a>
      </p>
      <p v-if="details.location">Location: {{ details.location }}</p>
      <p v-if="details.difficulty">Difficulty: {{ details.difficulty }}</p>
      <p v-if="details.capacity">Max Participants: {{ details.capacity }}</p>
    </div>
    <p>{{ details.description }}</p>
    <br />
    <Button class="bg-royal-blue text-white" content="I'm Interested!" />
  </div>
</template>

<style scoped>
.ticket {
  /* https://kovart.github.io/dashed-border-generator/ */

  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23012A36FF' stroke-width='10' stroke-dasharray='17 17' stroke-dashoffset='20' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 20px;
}
</style>
