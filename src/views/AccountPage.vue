<template>
  <div>
    <div class="flex gap-20 flex-col xl:flex-row">
      <form
        class="flex flex-1 flex-col gap-y-10"
        @submit.prevent="submitRegistration"
      >
        <h1>Account</h1>

        <div class="flex gap-6 flex-col md:flex-row">
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

        <input v-model="email" type="text" placeholder="University Email" />

        <div class="flex gap-6 flex-col md:flex-row">
          <input
            v-model="password"
            type="password"
            placeholder="New Password"
            class="flex-1"
          />
          <input
            v-model="passwordRepeat"
            type="password"
            placeholder="Repeat Password"
            class="flex-1"
          />
        </div>

        <button
          class="w-auto"
          :disabled="!isFormValid"
          @click="submitRegistration"
        >
          Submit
        </button>
      </form>
      <div class="flex flex-1 flex-col gap-y-6">
        <div class="flex justify-between">
          <h2>Discord Token</h2>
          <Tooltip
            content="Join our server with the link in the footer, and send your token to our bot, which will DM you when you join (Kitten Bot#6383)."
          />
        </div>
        <FieldButton>Connect</FieldButton>

        <h2>Emails</h2>
        <CheckBox content="Subscribe to mailing list" />
        <CheckBox content="Notify me the day before a CTF starts" />

        <h2>Danger Zone</h2>
        <button class="w-auto bg-light-carmine" @click="showDeletePopup = true">
          Permanently delete account
        </button>
        <FullscreenModal
          v-if="showDeletePopup"
          title="Delete Account"
          confirm-button-text="Delete"
          :action="deleteAccount"
          @close="showDeletePopup = false"
          >Are you sure you want to permanently delete this account? All of your
          data will be permanently removed, you will loose access to services
          including our Discord server, and will no longer be considered a
          member of this club.</FullscreenModal
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import CheckBox from "../components/CheckBox.vue";
import Tooltip from "../components/Tooltip.vue";
import FieldButton from "../components/FieldButton.vue";
import FullscreenModal from "../components/FullscreenModal.vue";
import { ref } from "vue";

let showDeletePopup = ref(false);

const deleteAccount = () => {
  console.log("deleted");
};
</script>
