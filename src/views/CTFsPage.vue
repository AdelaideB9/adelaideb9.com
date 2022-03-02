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

let isUpcoming = ref(true);

const filteredCTFs = computed(() => {
  let result = [];
  for (const [i, value] of ctfs.value.entries()) {
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

function sortByDate(ctfs) {
  ctfs.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  return ctfs;
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
      v-if="filteredCTFs.length < 1 && isUpcoming"
      class="text-center max-w-3xl mx-auto my-10"
    >
      Hey, looks like there aren't any CTFs coming up soon! We might be taking a
      break, or maybe training ourselves for the next big event. Check out our
      past {{ ctfs.length }} ctfs in the meantime.
    </p>
    <Ticket
      v-for="v of sortByDate(ctfs.filter((_, i) => filteredCTFs.includes(i)))"
      :key="v.id"
      :details="v"
    />
  </div>
</template>
