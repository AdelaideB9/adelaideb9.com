<script setup>
import { ref, onMounted } from "vue";
//import http from "../services/http";
import axios from "axios";
let toolsMarkdown = ref("");
let learningMarkdown = ref("");

onMounted(async () => {
  //intentionally avoiding http not to display error
  axios.get(
    "https://raw.githubusercontent.com/AdelaideB9/directory/main/TOOLS.md"
  ).then(res=>{
    toolsMarkdown.value = res.data;
  });

  axios.get(
    "https://raw.githubusercontent.com/AdelaideB9/directory/main/LEARNING.md"
  ).then(res=>{
    learningMarkdown.value = res.data;
  });
});
</script>

<template>
  <div>
    <h1>Our Websites</h1>
    <p>
      We have a mission to host our materials as long as possible. <br/>
      Check out some of our previous workshops, events and CTF challenges!
    </p>
    <div class="flex flex-col md:flex-row gap-x-4 w-full">
      <a href="https://weekly.adelaideb9.com" class="no-underline block grow">
        <div class="bg-black/25 p-4 my-4 rounded-md w-full">
          <span class="m-0"><b class="text-2xl">Weekly<div class="inline-block bg-current" style="height: 1em;width: 1em;mask-image: url(/img/icons/external-link.svg); mask-size: cover; vertical-align: middle;"></div></b><br>
            Our challenge per week CTF since 2024.
          </span>
        </div>
      </a>
      <a href="https://crypto.adelaideb9.com" class="no-underline block grow">
        <div class="bg-black/25 p-4 my-4 rounded-md w-full">
          <span class="m-0"><b class="text-2xl">Crypto Workshop<div class="inline-block bg-current" style="height: 1em;width: 1em;mask-image: url(/img/icons/external-link.svg); mask-size: cover; vertical-align: middle;"></div></b><br>
            Our 2024 Cryptography workshop
          </span>
        </div>
      </a>
      <!-- a href="https://github.com" class="no-underline block grow">
        <div class="bg-black/25 p-4 my-4 rounded-md w-full">
          <span class="m-0"><b class="text-2xl">DuckCTF<img src="/img/icons/external-link.svg" class="inline stroke-current"/></b><br>
            Find our previous duckCTF challenges.
          </span>
        </div>
      </a-->
    </div>
    <br/>
    <span v-if="toolsMarkdown.length > 0">
      <h1>Tools</h1>
      <VueShowdown id="markdownTools" :markdown="toolsMarkdown" />
      <br/>
    </span>
    <span v-if="learningMarkdown.length > 0">
      <h1>Learning</h1>
      <VueShowdown id="markdownLearning" :markdown="learningMarkdown" />
      <br/>
    </span>
  </div>
</template>

<style scoped>
h1 {
  @apply mb-4;
}

h2 {
  @apply mt-8 mb-4;
}

h3 {
  @apply mt-4 mb-4;
}

p {
  @apply mb-4;
}
</style>

