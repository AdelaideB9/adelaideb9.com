<!-- This is for API errors in sections like OAuth, or Discord Connection that should have a rendered message -->
<template>
  <div
    class="min-h-screen -mt-20 flex content-center justify-center text-center items-center gap-12 flex-col-reverse lg:flex-row"
  >
    <div class="text-lg">
      <h1 class="text-9xl mb-6">Error</h1>
      <p v-if="this.$route.query.message"> {{ this.$route.query.message }}</p>
      <p v-for="i in messages[index]" :key="i">
        {{ i }}
      </p>
      <p v-if="window.navigation.canGoBack" @click="window.history.back()">Retry</p>
    </div>
  </div>
</template>

<script setup>
const messages = [
  ["You overlook an empty abyss.", "Is this what the dark web looks like?"],
  ["Nothing to see here."],
  ["Oops!", "Sorry to disappoint, but this page doesn't exist."],
  ["We forgot the crackers, Gromit!"],
  [
    Math.random().toString(36).substring(2, 7),
    Math.random().toString(36).substring(2, 7),
    Math.random().toString(36).substring(2, 7),
  ],
];
let index = Math.floor(Math.random() * messages.length);

</script>
