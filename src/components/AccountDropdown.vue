<template>
  <div
    id="account-dropdown"
    v-click-outside="unfocus"
    class="relative text-normal"
  >
    <div class="anchor cursor-pointer" @click="showMenu = !showMenu">
      <span v-if="$store.state.auth.isLoggedIn">{{
        store.state.auth.session["first_name"]
      }}</span>
      <span v-else>Log in / Register</span>
    </div>
    <div
      v-if="showMenu"
      class="text-secondary absolute menu right-0 mt-2 z-50 border-black/20 border-2 rounded-lg shadow bg-primary w-full md:w-auto"
      :class="store.state.pageClasses"
    >
      <div v-if="$store.state.auth.isLoggedIn" class="flex flex-col">
        <router-link to="/settings" class="menu-item text-secondary"
          >Settings</router-link
        >
        <a
          class="menu-item text-secondary"
          @click="$store.dispatch('auth/logout')"
          >Log out</a
        >
      </div>
      <div v-else>
        <form class="flex flex-col gap-y-4 p-4" @submit.prevent="submitLogin">
          <input
            id="email"
            v-model="email"
            type="text"
            name="email"
            placeholder="University Email"
          />

          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Password"
          />

          <span class="gap-2 flex flex-wrap">
            <button id="submit" class="inline-block" :disabled="!canSubmit">Log in</button>
            <div class="flex-1 flex flex-wrap gap-x-2 items-center">
              <router-link class="flex-none" to="/register">Register<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block stroke-current feather"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></router-link>
              <router-link class="flex-none" to="/forgot">Forgot<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block stroke-current feather"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></router-link>
            </div>
          </span>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
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
  if (canSubmit.value) {
    store.dispatch("auth/login", {
      email: email.value,
      password: password.value,
    });
  }
};

const canSubmit = computed(
  () => email.value.endsWith(".edu.au") && password.value.length >= 8
);
</script>

<style scoped lang="scss">
.anchor::after {
  display: inline-block;
  margin-left: 0.5rem;
  vertical-align: 0.255rem;
  content: "";
  border-top: 0.3rem solid;
  border-right: 0.28rem solid transparent;
  border-bottom: 0;
  border-left: 0.28rem solid transparent;
}

.menu-item {
  @apply transition-colors py-2 px-6 rounded no-underline;
}
.menu-item:hover {
  @apply bg-secondary text-primary cursor-pointer;
}
</style>
