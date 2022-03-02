<script setup>
import { ref } from "vue";

defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
});

let loaded = ref(false);
</script>

<template>
  <div class="flex justify-center items-center">
    <div v-show="!loaded" class="fulfilling-square-spinner">
      <div class="spinner-inner"></div>
    </div>
    <img v-show="loaded" :src="src" :alt="alt" @load="loaded = true" />
  </div>
</template>

<style scoped>
.fulfilling-square-spinner,
.fulfilling-square-spinner * {
  box-sizing: border-box;
}

.fulfilling-square-spinner {
  height: 50px;
  width: 50px;
  position: relative;
  @apply border-4 border-silver;
  animation: fulfilling-square-spinner-animation 4s infinite ease;
}

.fulfilling-square-spinner .spinner-inner {
  @apply bg-silver;
  vertical-align: top;
  display: inline-block;
  width: 100%;
  opacity: 1;
  animation: fulfilling-square-spinner-inner-animation 4s infinite ease-in;
}

@keyframes fulfilling-square-spinner-animation {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes fulfilling-square-spinner-inner-animation {
  0% {
    height: 0%;
  }

  25% {
    height: 0%;
  }

  50% {
    height: 100%;
  }

  75% {
    height: 100%;
  }

  100% {
    height: 0%;
  }
}
</style>
