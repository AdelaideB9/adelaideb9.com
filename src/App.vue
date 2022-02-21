<script setup>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import TopProgress from "./components/TopProgress.vue";
import { useStore } from "vuex";
import router from "./router";

const store = useStore();
const onLeave = () => {
  store.commit("updatePageTheme", router.currentRoute.value.meta.theme);
};
</script>

<template>
  <div
    class="transition-colors duration-500 bg-primary text-secondary"
    :class="'theme-' + store.state.pageTheme"
  >
    <TopProgress :trickle-speed="50" color="#0ea5e9"></TopProgress>
    <div class="container m-auto px-12 min-h-screen">
      <NavBar />
      <router-view v-slot="{ Component }" class="py-10">
        <transition name="fade" mode="out-in" @after-leave="onLeave">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <Footer />
  </div>
</template>
