<template>
  <div class="flex flex-col gap-8">
    <h1>Account Settings</h1>

    <div class="flex gap-12 flex-col xl:flex-row">
      <!-- <div class="flex flex-1 flex-col gap-y-6">
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
      </div> -->

      <div class="flex flex-1 flex-col">
        <h2>Account Details</h2>

        <form
          class="flex flex-col gap-y-4"
          @submit.prevent="submitRegistration"
        >

          <span>
            <h6>Registered Email</h6>
            <div class="flex justify-between gap-x-2 align-center">
              <input
                type="text"
                class="bg-black/5 border-black/25 cursor-not-allowed text-center w-full"
                placeholder="Secondary Email"
                readonly="true"
                :value="store.state.auth.session.email"
              />
              <Tooltip>
                Used for tracking graduation status & grant-membership reporting to YouX.
              </Tooltip>
            </div>
          </span>

          <span>
            <h6>Name</h6>
            <div class="flex gap-4 flex-col md:flex-row align-center">
              <input
                v-model="firstName"
                type="text"
                placeholder="First name"
                class="bg-white/10 border-black/25 flex-1"
              />
              <input
                v-model="lastName"
                type="text"
                placeholder="Last name"
                class="bg-white/10 border-black/25 flex-1"
              />
              <Tooltip>
                Used for grant-membership reporting to YouX.
              </Tooltip>
            </div>
          </span>

          <span>
            <h6>Secondary Email</h6>
            <div class="flex justify-between gap-x-2 align-center">
              <input
                v-model="secondaryEmail"
                type="text"
                class="bg-white/10 border-black/25 w-full"
                placeholder="Secondary Email"
              />
              <Tooltip>
                Used for post-graduate access & recovery.
              </Tooltip>
            </div>
          </span>

          <span>
            <h6>Event Username</h6>
            <div class="flex justify-between gap-x-2 align-center">
              <input
                v-model="username"
                type="text"
                class="bg-white/10 border-black/25 w-full"
                placeholder="Username"
              />
            </div>
          </span>

          <div class="flex gap-4 flex-col content-end justify-between w-full md:flex-row-reverse">
              <!-- p v-if="error.length > 0" >
                  {{ error  }}
              </p -->
              <button class="w-min self-end" :disabled="!isFormValid || !hasChanges" @click="pushChanges">Update</button>
            </div>

        </form>
      </div> 

      <div class="flex flex-1 flex-col gap-y-12">
        <div class="flex flex-col gap-6">
          <div class="flex justify-between">
            <h2>Discord Connection</h2>
            <Tooltip>
              Join our Discord server with the link in the footer, and select the 'Linked Roles' option from the server title bar dropdown in the top left.
            </Tooltip>
          </div>
          <FieldButton
            v-model="discordText"
            :class="
              store.state.auth.session['discord_linked'] ? 'text-green-300' : 
              generated ? '' : 'text-red-300'
            "
            :readonly="true"
            @click="store.state.auth.session['discord_linked'] ? (showDisconnectPopup = true) : requestDiscordConnection()"
          >
            <span v-if="store.state.auth.session['discord_linked']">Disconnect</span>
            <span v-else>Connect</span>
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
        <!-- <div class="flex flex-col gap-6">
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
        </div> -->
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

let firstName       = ref(store.state.auth.session["first_name"]);
let lastName        = ref(store.state.auth.session["last_name"]);
let username        = ref(store.state.auth.session["username"]);
let secondaryEmail  = ref(store.state.auth.session["secondary_email"]);

//let password  = ref("");
//let passwordRepeat = ref("");

let generated = ref(false);

let error = ref("");

const deleteAccount = () => {
  console.log("deleted");
};

const generateDiscordToken = async () => {
  let res = await http.get("/api/discord/generate");
  generated.value = true;
  discordText.value = "./auth " + res.data;
};

const requestDiscordConnection = async () => {
  window.open('/api/discord/request') 
};

const disconnectDiscord = async () => {
  await http.get("/api/discord/disconnect");
  discordText.value = "Not connected to Discord";
  store.dispatch("auth/refreshSession");
};

const copyDiscordToken = () => {
  navigator.clipboard.writeText(discordText.value);
};

const pushChanges = async ()=>{
  error.value = "";
  if (username.value != store.state.auth.session["username"] ){
    let res = await http.post("/api/setusername",{ username: username.value });
    if( res.status != 200 ){
      error.value += "Error updating username.";
    }
  }

  if (secondaryEmail.value != store.state.auth.session["secondary_email"]) {
    let res = await http.post("/api/setsecondaryemail",{ secondary_email: secondaryEmail.value });
    if( res.status != 200 ){
      error.value += "Error updating email.";
    }
  }

  if (firstName.value != store.state.auth.session["first_name"] || lastName.value != store.state.auth.session["last_name"] ) {
    let res = await http.post("/api/setname",{ first_name: firstName.value, last_name: lastName.value });
    if( res.status != 200 ){
      error.value += "Error updating name.";
    }
  }

};

const hasChanges = computed(()=>
  firstName.value      != store.state.auth.session["first_name"]      ||
  lastName.value       != store.state.auth.session["last_name"]       ||
  secondaryEmail.value != store.state.auth.session["secondary_email"] ||
  username.value       != store.state.auth.session["username"]        
);

const isFormValid = computed(
  () =>
    firstName.value != "" &&
    lastName.value != "" /*&&
    password.value.length >= 8 &&
    password.value == passwordRepeat.value*/
);
</script>
