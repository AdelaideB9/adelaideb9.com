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
    minute: "numeric",
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
    class="flex items-center justify-between bg-white text-dark-blue px-10 py-9 leading-relaxed ticket gap-4"
  >
    <div>
      <h2 class="leading-none">{{ details.name }}</h2>
      <div class="my-4 font-medium leading-sm">
        <p>{{ formatDate(details.date, details.end_date) }}</p>
        <p v-if="details.url">
          <a :href="details.url">Event Link</a>
        </p>
        <p v-if="details.location">{{ details.location }}</p>
      </div>
      <p class="whitespace-pre-line leading-none">{{ details.description }}</p>
    </div>

    <div class="hidden md:block basis-64 grow-0 shrink-0 radius-md">
      <ImageSpinner v-if="details.image" style="border-radius:0.5em; object-fit: cover; height: 100%;" :src="details.image" />
    </div>
  </div>
</template>

<style scoped>
.ticket {
  /* https://kovart.github.io/dashed-border-generator/ */

  /*background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23012A36FF' stroke-width='10' stroke-dasharray='17 17' stroke-dashoffset='20' stroke-linecap='round'/%3e%3c/svg%3e");*/
  border-radius: 20px;
}
</style>
