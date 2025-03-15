<template>
  <div
    class="min-h-screen -mt-20 flex flex-col justify-center py-20 items-center gap-6 max-w-xl m-auto"
  >
    <div class="flex flex-col items-center gap-4 text-center">
      <h1>New Member Registration</h1>
      <div>
        <p class="text-justify">
          Complete this form to join Capture the Flag Club, free of charge! By
          signing up you'll gain admission to our club events (in-person and
          online), access to our private Discord channels, and more perks on our
          member platforms.<br/><br/>

          <b>You will need to use your student email (ending in .edu.au)</b><br/>
          Non-Students may request an account via <a href="mailto:hello@adelaideb9.com">email</a>.
        </p>
      </div>
    </div>
    <form class="flex flex-col gap-y-6" @submit.prevent="submitRegistration">
      <input v-model="email" type="text" placeholder="University email" />

      <div class="flex gap-4 flex-col md:flex-row">
        <input
          v-model="firstName"
          type="text"
          placeholder="First name"
          class="flex-1"
        />
        <input
          v-model="lastName"
          type="text"
          placeholder="Last name"
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
          placeholder="Repeat password"
          class="flex-1"
        />
      </div>
      <p v-if="password.length > 0">
        Password length: {{ password.length }} / 8<br />
        Passwords
        {{
          password == passwordRepeat && password.length > 0
            ? "match"
            : "do not match"
        }}
      </p>

      <p>
        By clicking submit you are agreeing that you have read and acknowledged
        our
        <router-link to="/constitution">club constitution</router-link>
      </p>

      <button class="w-auto" :disabled="!isFormValid || submitted">
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import http from "../services/http";
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import router from "../router";
let firstName = ref("");
let lastName = ref("");
let password = ref("");
let passwordRepeat = ref("");
let email = ref("");
let submitted = ref(false);
const submitRegistration = async () => {
  submitted.value = true;
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
    password.value == passwordRepeat.value
);
</script>
