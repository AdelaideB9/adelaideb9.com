<template>
  <div class="flex flex-col gap-8">
    <h1>Account Settings</h1>

    <div class="flex gap-12 flex-col xl:flex-row">
      <div class="flex flex-1 flex-col gap-y-6">
        <h2>Edit Details</h2>

        <form
          class="flex flex-col gap-y-6"
          @submit.prevent="submitRegistration"
        >
          <input
            type="text"
            readonly="true"
            class="bg-white/10 border-black/25 cursor-not-allowed"
            :value="store.state.auth.session.email"
          />
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
              placeholder="New password"
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

          <button
            class="w-auto"
            :disabled="!isFormValid"
            @click="submitRegistration"
          >
            Update
          </button>
        </form>
      </div>

      <div class="flex flex-1 flex-col gap-y-12">
        <div class="flex flex-col gap-6">
          <div class="flex justify-between">
            <h2>Discord</h2>
            <Tooltip>
              Join our Discord server with the link in the footer, and send your
              token to our bot (Kitten Bot#6383) to link your Discord account.
            </Tooltip>
          </div>
          <FieldButton
            v-model="discordText"
            :class="
              store.state.auth.session['discord_linked']
                ? 'text-green-300'
                : generated
                ? ''
                : 'text-red-300'
            "
            :readonly="true"
            @click="
              store.state.auth.session['discord_linked']
                ? (showDisconnectPopup = true)
                : generated
                ? copyDiscordToken()
                : generateDiscordToken()
            "
          >
            <span v-if="store.state.auth.session['discord_linked']"
              >Disconnect</span
            >
            <div
              v-else-if="
                !store.state.auth.session['discord_linked'] && generated
              "
              class="flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Copy
            </div>
            <span v-else>Generate token</span>
          </FieldButton>
          <FullscreenModal
            v-if="showDisconnectPopup"
            title="Disconnect Discord"
            confirm-button-text="Disconnect"
            :show-icon="true"
            :action="disconnectDiscord"
            @close="showDisconnectPopup = false"
          >
            Are you sure you want to disconnect your Discord account? You will
            lose access to our Discord server.
          </FullscreenModal>
        </div>
        <div class="flex flex-col gap-6">
          <h2>Emails</h2>
          <CheckBox content="Subscribe to mailing list" />
          <CheckBox content="Notify me the day before a CTF starts" />
        </div>
        <div class="flex flex-col gap-6">
          <h2>Danger Zone</h2>
          <button
            class="w-auto bg-light-carmine"
            @click="showDeletePopup = true"
          >
            Permanently delete account
          </button>
          <FullscreenModal
            v-if="showDeletePopup"
            title="Delete Account"
            confirm-button-text="Delete"
            :show-icon="true"
            :action="deleteAccount"
            @close="showDeletePopup = false"
          >
            Are you sure you want to permanently delete this account? You will
            lose access to services including our Discord server, and will no
            longer be considered a member of this club.
          </FullscreenModal>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CheckBox from "../components/CheckBox.vue";
import Tooltip from "../components/Tooltip.vue";
import FieldButton from "../components/FieldButton.vue";
import FullscreenModal from "../components/FullscreenModal.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import http from "../services/http";

let showDeletePopup = ref(false);
let showDisconnectPopup = ref(false);
const store = useStore();
let discordText = ref(
  store.state.auth.session["discord_linked"]
    ? "Connected to Discord"
    : "Not connected to Discord"
);

let firstName = ref(store.state.auth.session["first_name"]);
let lastName = ref(store.state.auth.session["last_name"]);
let password = ref("");
let passwordRepeat = ref("");

let generated = ref(false);

const deleteAccount = () => {
  console.log("deleted");
};

const generateDiscordToken = async () => {
  let res = await http.get("/api/discord/generate");
  generated.value = true;
  discordText.value = "./auth " + res.data.token;
};

const disconnectDiscord = async () => {
  await http.get("/api/discord/disconnect");
  discordText.value = "Not connected to Discord";
  store.dispatch("auth/refreshSession");
};

const copyDiscordToken = () => {
  navigator.clipboard.writeText(discordText.value);
};

const isFormValid = computed(
  () =>
    firstName.value != "" &&
    lastName.value != "" &&
    password.value.length >= 8 &&
    password.value == passwordRepeat.value
);
</script>
