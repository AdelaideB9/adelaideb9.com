<template>
  <div style="display: flex; justify-content: center;">
    <button @click="verify">Click to verify your account</button>
  </div>
</template>

<script setup>
import http from "../services/http";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
const router = useRouter();
const route = useRoute();
onMounted(async () => {
  if (!route.query.token) {
    router.push("/");
    useToast().error("What are you doing?!");
  }
});

const verify = async () => {
  if (route.query.token) {
    try {
      let res = await http.post("/api/verify", { token: route.query.token });
      router.push("/");
      useToast().success(res.data);
    } catch (err) {
      router.push("/");
    }
  }
}
</script>
