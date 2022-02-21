<template>
  <div v-click-outside="unfocus">
    <div
      class="hidden md:flex items-center px-6 lg:px-12 h-20 font-medium justify-between"
    >
      <div class="flex gap-x-8 lg:gap-x-16 items-center">
        <router-link to="/">
          <img class="h-10" src="/img/icon.png" />
        </router-link>
        <router-link class="no-underline" to="/ctfs">CTFs</router-link>
        <router-link class="no-underline" to="/events">Events</router-link>
        <!-- <router-link class="no-underline" to="/about">About</router-link> -->
        <a class="no-underline" href="https://blog.adelaideb9.com">Blog</a>
      </div>
      <AccountDropdown />
    </div>

    <div class="md:hidden py-5 justify-center flex">
      <div class="w-full">
        <router-link to="/">
          <img class="h-10" src="/img/icon.png" />
        </router-link>
      </div>
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
        class="absolute top-0 left-0 flex flex-col w-full bg-secondary text-primary p-5 font-medium text-lg md:hidden"
      >
        <router-link
          class="no-underline p-2 hover:bg-primary hover:text-secondary rounded"
          to="/"
        >
          Home
        </router-link>
        <router-link
          class="no-underline p-2 hover:bg-primary hover:text-secondary rounded"
          to="/ctfs"
          >CTFs</router-link
        >
        <router-link
          class="no-underline p-2 hover:bg-primary hover:text-secondary rounded"
          to="/events"
          >Events</router-link
        >
        <!-- <router-link
          class="no-underline p-2 hover:bg-primary hover:text-secondary rounded"
          to="/about"
          >About</router-link
        > -->
        <a
          class="no-underline p-2 hover:bg-primary hover:text-secondary rounded"
          href="https://blog.adelaideb9.com"
          >Blog</a
        >
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
import { useStore } from "vuex";
const store = useStore();
let showMenu = ref(false);
const route = useRoute();
const unfocus = () => (showMenu.value = false);
watch(
  () => route.path,
  () => (showMenu.value = false)
);
</script>
