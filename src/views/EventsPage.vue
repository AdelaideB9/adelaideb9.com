<script setup>
import { computed, onMounted, ref } from "vue";
import Ticket from "../components/Ticket.vue";
import http from "../services/http";

/*let testEvent = {
  title: "Dice CTF 2022",
  date: "Tomorrow at 7:30 PM - Monday 7th of Feb at 7:30 PM",
  url: "https://ctf.dicega.ng/",
  difficulty: "Impossible",
  capacity: "Unlimited",
  description:
    "DiceCTF is a jeopardy-style CTF organized by DiceGang. You will be able to login this event with CTFtime ...",
  location: "Old Uni Bar",
};

let testEvent2 = {
  title: "Meet and Greet 1",
  date: "1/3/2022",
  location: "Old Uni Bar",
  capacity: "35 peeps",
  description: "Join us for a evening full of pizza, drinks and games!",
};*/

let events = ref([]);
let filter = ref("");

onMounted(async () => {
  let res = await http.get("/api/events");
  events.value = res.data.events;
});

const filteredEvents = computed(() => {
  let result = [];
  for (const [i, value] of events.value.entries()) {
    if (value.name.toLowerCase().includes(filter.value.toLowerCase())) {
      result.push(i);
    }
  }
  return result;
});
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <h1>Upcoming</h1>
    <input v-model="filter" type="text" placeholder="Search" />
    <Ticket
      v-for="[i, v] of events.entries()"
      v-show="filteredEvents.includes(i)"
      :key="v.ID"
      :details="v"
    />
  </div>
</template>
