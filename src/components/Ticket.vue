<script setup>
import Button from "../components/Button.vue";

defineProps({
  details: Object,
});
</script>

<template>
  <div
    class="flex w-full items-center bg-white text-dark-blue p-12 leading-relaxed ticket gap-10"
  >
    <div>
      <h2>{{ details.Name }}</h2>
      <div class="my-4 font-medium">
        <p>
          {{ details.Date }}
        </p>
        <p v-if="details.URL">
          Website: <a :href="details.URL">{{ details.URL }}</a>
        </p>
        <p v-if="details.Location">Location: {{ details.Location }}</p>
        <p v-if="details.Difficulty">Difficulty: {{ details.Difficulty }}</p>
        <p v-if="details.Capacity">Max Participants: {{ details.Capacity }}</p>
      </div>
      <p>{{ details.Description }}</p>
      <!--<br />
      <Button class="bg-royal-blue text-white" content="I'm Interested!" />-->
    </div>

    <img
      v-if="details.Image.Valid"
      class="hidden md:block h-60"
      :src="details.Image.String"
    />
  </div>
</template>

<style scoped>
.ticket {
  /* https://kovart.github.io/dashed-border-generator/ */

  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23012A36FF' stroke-width='10' stroke-dasharray='17 17' stroke-dashoffset='20' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 20px;
}
</style>
