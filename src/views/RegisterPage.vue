<template>
  <div
    class="min-h-screen -mt-20 flex flex-col justify-center py-20 items-center gap-6 max-w-xl m-auto"
  >
    <div class="flex flex-col items-center gap-2 text-center">
      <h1>New Member Registration</h1>
      <p class="text-justify">
        Complete this form to join Capture the Flag Club, free of charge! By
        signing up you'll admission to our club events (in-person and online),
        access to our private Discord channels, and more perks on our member
        platforms.
      </p>
      <p>You will need to use your student email (ending in .edu.au)</p>
    </div>
    <form class="flex flex-col gap-y-6" @submit.prevent="submitRegistration">
      <input v-model="email" type="text" placeholder="University Email" />

      <div class="flex gap-4 flex-col md:flex-row">
        <input
          v-model="firstName"
          type="text"
          placeholder="First Name"
          class="flex-1"
        />
        <input
          v-model="lastName"
          type="text"
          placeholder="Last Name"
          class="flex-1"
        />
      </div>

      <div class="flex gap-4 flex-col md:flex-row">
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="flex-1"
        />
        <input
          v-model="passwordRepeat"
          type="password"
          placeholder="Repeat Password"
          class="flex-1"
        />
      </div>

      <p>
        By clicking submit you are agreeing that you have read and acknowledged
        our
        <router-link to="/constitution">club constitution</router-link>
      </p>

      <Button class="w-auto" content="Submit" :disabled="!isFormValid"></Button>
    </form>
  </div>
</template>

<script setup>
import Button from "../components/Button.vue";
import http from "../services/http";
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import router from "../router";
let firstName = ref("");
let lastName = ref("");
let password = ref("");
let passwordRepeat = ref("");
let email = ref("");
const submitRegistration = async () => {
  let res = await http.post("/api/register", {
    "first-name": firstName.value,
    "last-name": lastName.value,
    email: email.value,
    password: password.value,
  });
  useToast().success(res.data);
  router.push("/");
};
const isFormValid = computed(
  () =>
    firstName.value != "" &&
    lastName.value != "" &&
    email.value.endsWith(".edu.au") &&
    password.value.length >= 8 &&
    password.value != "" &&
    password.value == passwordRepeat.value
);
</script>
