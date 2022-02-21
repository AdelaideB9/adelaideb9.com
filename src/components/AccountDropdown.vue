<template>
  <div id="account-dropdown" class="relative" v-click-outside="unfocus">
    <div @click="showMenu = !showMenu" class="anchor cursor-pointer">
      <span v-if="$store.state.isLoggedIn">Account</span>
      <span v-else>Log in / Register</span> 
    </div>
    <div
      v-if="showMenu"
      class="text-secondary absolute menu right-0 mt-2 z-50 border-black/20 border-2 rounded-lg shadow bg-primary w-full md:w-96"
      :class="store.state.pageClasses"
    >
      <div class="flex flex-col" v-if="$store.state.isLoggedIn">
        <router-link to="/settings" class="menu-item text-secondary"
          >Settings</router-link
        >
        <a class="menu-item text-secondary" @click="$store.dispatch('logout')"
          >Logout</a
        >
      </div>
      <div v-else>
        <form @submit.prevent="submitLogin" class="flex flex-col gap-y-4 p-4">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="University Email"
            v-model="email"
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            v-model="password"
          />

          <span style="padding-bottom: 10px; padding-left: 5px"
            >Or register <router-link to="/register">here</router-link></span
          >

          <Button
            type="submit"
            id="submit"
            content="Login"
            :class="store.pageClasses"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.anchor::after {
  display: inline-block;
  margin-left: 0.5em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.28em solid transparent;
  border-bottom: 0;
  border-left: 0.28em solid transparent;
}

// .menu-item {
//   padding: 0.5rem 1.5rem;
//   transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
//     border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
//   border-radius: 0.25rem;
//   text-decoration: none;
// }
// .menu-item:hover {
//   @apply bg-secondary text-primary cursor-pointer;
// }

// #login {
//   // padding: 1rem;
//   // margin: 0;
//   // display: flex;
//   // flex-direction: column;
//   // align-content: stretch;
//   // min-width: 22rem;
// }
</style>

<script setup>
import Button from "./Button.vue";
import { ref, computed, watch } from "vue";
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
let email = ref("");
let password = ref("");
const submitLogin = async () => {
  useStore().dispatch("login", {
    email,
    password,
  });
};
</script>
