<script setup>
import { computed, onMounted, ref } from "vue";
import Ticket from "../components/Ticket.vue";
import http from "../services/http";

let events = ref([]);
let filter = ref("");
let loaded = ref(false);

onMounted(async () => {
  let res = await http.get("/api/events");
  events.value = res.data.events;
  loaded.value = true;
});

let isUpcoming = ref(true);

const filteredEvents = computed(() => {
  let result = [];
  for (const [i, value] of events.value.entries()) {
    if (value.name.toLowerCase().includes(filter.value.toLowerCase())) {
      if (isUpcoming.value) {
        if (new Date() <= new Date(value.date)) {
          result.push(i);
        }
      } else {
        if (new Date() > new Date(value.date)) {
          result.push(i);
        }
      }
    }
  }
  return result;
});

function sortByDate(events) {
  events.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  return events;
}
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <div class="flex flex-col gap-y-2 sm:flex-row gap-x-8">
      <h1
        class="select-none cursor-pointer text-3xl md:text-4xl"
        :class="{ 'text-secondary/25': !isUpcoming }"
        @click="isUpcoming = true"
      >
        Upcoming
      </h1>
      <h1
        class="select-none cursor-pointer text-3xl md:text-4xl"
        :class="{ 'text-secondary/25': isUpcoming }"
        @click="isUpcoming = false"
      >
        Previous
      </h1>
    </div>
    <input v-model="filter" type="text" placeholder="Search" />
    <p
      v-if="filteredEvents.length < 1 && isUpcoming && loaded"
      class="text-center max-w-3xl mx-auto my-10"
    >
      Hey, looks like there aren't any events coming up soon! We might be taking
      a break, or grinding out a bunch of CTFs. Check out our past
      {{ events.length }} events in the meantime.
    </p>
    <Ticket
      v-for="v of sortByDate(
        events.filter((_, i) => filteredEvents.includes(i))
      )"
      :key="v.ID"
      :details="v"
    />
  </div>
</template>
