<template>
  <div
    class="min-h-screen -mt-20 flex flex-col justify-center py-20 items-center gap-6 max-w-xl m-auto"
  >
    <div class="flex flex-col items-center gap-4 text-center">
      <h1>Reset Password</h1>
    </div>
    <form class="flex flex-col gap-y-6" @submit.prevent="submitPasswordReset">
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

      <button class="w-auto" :disabled="!isFormValid || submitted">
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import http from "../services/http";
import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import router from "../router";

const route = useRoute();
let password = ref("");
let passwordRepeat = ref("");
let submitted = ref(false);

onMounted(async () => {
  if (!route.query.token) {
    useToast().error("Missing Token");
    router.push("/");
  }
});

const submitPasswordReset = async () => {
  submitted.value = true;

  // @todo: Enforce HTTPS if sending plain-text password?
  http.post("/api/resetpass", {
    token: route.query.token,
    password: password.value,
  }).then(res=>{
    if(res.status != 200) throw res.statusText;
    useToast().success(res.data);
    router.push("/");
  }).catch(err=>{
    console.error("Password Reset Error",err);
    useToast().error("Server Error");

    //Unlock if failed
    submitted.value = false;
  });

};
const isFormValid = computed(
  () =>
    password.value.length >= 8 &&
    password.value == passwordRepeat.value
);
</script>
