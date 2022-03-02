<script setup>
import { useStore } from "vuex";
import ImageSpinner from "./ImageSpinner.vue";

const store = useStore();

defineProps({
  details: Object(),
});

function formatDate(start, end) {
  let dateOptions = {
    timeZone: "Australia/Adelaide",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
  };

  let dateStart = new Date(start);
  let dateEnd = new Date(end);
  let currentYear = new Date().getFullYear();

  if (
    currentYear == dateStart.getFullYear() &&
    currentYear == dateEnd.getFullYear()
  ) {
    delete dateOptions.year;
  }

  return new Intl.DateTimeFormat("en-AU", dateOptions).formatRange(
    dateStart,
    dateEnd
  );
}
</script>

<template>
  <div
    class="flex items-center bg-white text-dark-blue p-12 leading-relaxed ticket gap-10"
  >
    <div>
      <h2>{{ details.name }}</h2>
      <div class="my-4 font-medium">
        <p>{{ formatDate(details.date, details.end_date) }}</p>
        <p v-if="details.url">
          Website:
          <a :href="details.url">{{ details.url }}</a>
        </p>
        <p v-if="details.location">Location: {{ details.location }}</p>
        <p v-if="details.difficulty">Difficulty: {{ details.difficulty }}</p>
        <p v-if="details.capacity">Max Participants: {{ details.capacity }}</p>
      </div>
      <p class="whitespace-pre-line">{{ details.description }}</p>
      <div v-if="store.state.auth.isLoggedIn">
        <br />
        <button class="bg-royal-blue text-white" disabled="true">
          I'm Interested!
        </button>
      </div>
    </div>

    <div class="hidden md:block basis-64 grow-0 shrink-0">
      <ImageSpinner v-if="details.image" :src="details.image" />
    </div>
  </div>
</template>

<style scoped>
.ticket {
  /* https://kovart.github.io/dashed-border-generator/ */

  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23012A36FF' stroke-width='10' stroke-dasharray='17 17' stroke-dashoffset='20' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 20px;
}
</style>
