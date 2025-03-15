<template>
  <div v-click-outside="unfocus">
    <div class="hidden md:flex items-center h-20 font-medium justify-between">
      <div class="flex gap-x-8 lg:gap-x-16 items-center">
        <router-link to="/">
          <!-- <img class="h-10" src="/img/icons/icon.png" /> -->
          <img class="h-10" src="/img/icons/icon.svg" />
        </router-link>
        <router-link class="no-underline" to="/events">CTFs & Events</router-link>
        <router-link class="no-underline" to="/resources">Resources</router-link>
        <a class="no-underline" href="https://blog.adelaideb9.com">Blog<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block stroke-current feather"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></a>
        <router-link class="no-underline" to="/about">About</router-link>
      </div>
      <AccountDropdown />
    </div>

    <div class="md:hidden h-20 items-center justify-between flex">
      <router-link to="/">
        <img class="h-10" src="/img/icons/icon.png" />
      </router-link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 cursor-pointer select-none items-end"
        viewBox="0 0 20 20"
        @click="showMenu = !showMenu"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <transition name="fade" mode="out-in">
      <div
        v-show="showMenu"
        class="absolute top-0 left-0 flex flex-col w-full bg-secondary text-primary p-5 font-medium text-lg md:hidden z-50"
      >
        <router-link
          class="no-underline p-2 hover:bg-primary hover:text-secondary rounded"
          to="/"
          >Home</router-link
        >
        <router-link
          class="no-underline p-2 hover:bg-primary hover:text-secondary rounded"
          to="/events"
          >CTFs & Events</router-link
        >
        <router-link
          class="no-underline p-2 hover:bg-primary hover:text-secondary rounded"
          to="/resources"
          >Resources</router-link
        >
        <a
          class="no-underline p-2 hover:bg-primary hover:text-secondary rounded"
          href="https://blog.adelaideb9.com"
          >Blog<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block stroke-current feather"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></a
        >
        <router-link
          class="no-underline p-2 hover:bg-primary hover:text-secondary rounded"
          to="/about"
          >About
        </router-link>
        <a
          class="no-underline p-2 bg-primary/10 hover:bg-primary hover:text-secondary rounded"
        >
          <AccountDropdown />
        </a>
      </div>
    </transition>
  </div>
</template>

<script setup>
import AccountDropdown from "./AccountDropdown.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
let showMenu = ref(false);
const route = useRoute();
const unfocus = () => (showMenu.value = false);
watch(
  () => route.path,
  () => (showMenu.value = false)
);
</script>
