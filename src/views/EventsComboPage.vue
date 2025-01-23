<script setup>
import { computed, onMounted, ref } from "vue";
import Ticket from "../components/Ticket.vue";
import http from "../services/http";

let ctfs = ref([]);
let events = ref([]);
let query = ref("");
let loaded = ref(false);

onMounted(async () => {
  http.get("/api/ctfs").then((res=>{
    ctfs.value = res.data.map(i=>Object.assign(i,{type:"ctf"}));
    loaded.value = true;
  }));
  http.get("/api/events").then((res=>{
    events.value = res.data.map(i=>Object.assign(i,{type:"event"}));
    loaded.value = true;
  }));
});

let isUpcoming = ref(true);
let listType = ref(null);

const applyFilters = computed(() => {
  // Merge results
  let result = Object.assign(ctfs.value,events.value);

  // Search
  if(query.value.length > 0){
    result = result.filter(i=>i.name.toLowerCase().includes(query.value.toLowerCase()))
  }

  // Time Filter
  let now = new Date()
  result = (isUpcoming.value)?
              result.filter(i=>now <= new Date(i.date)) :
              result.filter(i=>now >  new Date(i.date))

  // List Type
  result = (listType.value)?result.filter(i=>i.type==listType.value):result

  return result
});

function sortByDate(list) {
  return list.sort((a, b)=>new Date(b.date) - new Date(a.date));
}

const noun = () => (listType.value != "ctf") ? "events" : 'CTFs';
const pastCount = () => ([null,"ctf"].includes(listType.value)?ctfs.value.length:0) + ([null,"event"].includes(listType.value)?events.value.length:0);
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
    <div class="flex flex-col gap-y-2 sm:flex-row gap-x-8">
      <h1
        class="select-none cursor-pointer text-3xl md:text-4xl"
        :class="{ 'text-secondary/25': listType != null }"
        @click="listType = null"
      >
        All
      </h1>
      <h1
        class="select-none cursor-pointer text-3xl md:text-4xl"
        :class="{ 'text-secondary/25': listType != 'ctf' }"
        @click="listType = 'ctf'"
      >
        CTFs
      </h1>
      <h1
        class="select-none cursor-pointer text-3xl md:text-4xl"
        :class="{ 'text-secondary/25': listType != 'event' }"
        @click="listType = 'event'"
      >
        Events
      </h1>
    </div>
    <input v-model="query" type="text" placeholder="Search" />
    <p
      v-if="applyFilters.length < 1 && isUpcoming && loaded"
      class="text-center max-w-3xl mx-auto my-10"
    >
      Hey, looks like there aren't any {{  noun()  }} coming up soon!  <br/> 
      We might be taking a break, or preparing for the next big event. <br/> <br/> 
      Check out our <u class="cursor-pointer" @click="isUpcoming = false">past {{ pastCount() }} {{ noun() }}</u> in the meantime.
      <!-- Render Preview -->
    </p>
    <Ticket
      v-for="v in sortByDate(applyFilters)"
      :key="v.id"
      :details="v"
    />
  </div>
</template>
