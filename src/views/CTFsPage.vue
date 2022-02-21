<script setup>
import Ticket from "../components/Ticket.vue";
import SelectionField from "../components/SelectionField.vue";

let testEvent = {
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
};
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <h1>Upcomming</h1>
    <input type="text" placeholder="Search" />

    <Ticket :details="testEvent" />
    <Ticket :details="testEvent2" />
  </div>
</template>
