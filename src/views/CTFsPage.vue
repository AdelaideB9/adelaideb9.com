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

let ctfs = ref([]);
let filter = ref("");

onMounted(async () => {
  let res = await http.get("/api/ctfs");
  ctfs.value = res.data.ctfs;
});

const filteredctfs = computed(() => {
  let result = [];
  for (const [i, value] of ctfs.value.entries()) {
    if (value.Name.toLowerCase().includes(filter.value.toLowerCase())) {
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
      v-for="[i, v] of ctfs.entries()"
      v-show="filteredctfs.includes(i)"
      :key="v.id"
      :details="v"
    />
  </div>
</template>
