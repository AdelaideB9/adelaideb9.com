<template>
  <div
    class="min-h-screen -mt-20 flex flex-col justify-center py-20 items-center gap-6 max-w-xl m-auto"
  >
    <div class="flex flex-col items-center gap-4 text-center">
      <h1>Forgot Password</h1>
    </div>
    <form class="flex flex-col gap-y-6" @submit.prevent="submitPasswordReset">
      <p class="text-left">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <input v-model="email" type="text" placeholder="University email" />

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

let email = ref("");
let submitted = ref(false);

const submitPasswordReset = async () => {
  submitted.value = true;
  let res = await http.post("/api/forgot", {
    email: email.value
  });
  useToast().success(res.data);
  router.push("/");
};

const isFormValid = computed(() => email.value.endsWith(".edu.au"));
</script>
