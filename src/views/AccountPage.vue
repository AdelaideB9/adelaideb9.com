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
            <div class="flex justify-between gap-x-2 content-center">
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
            <div class="flex gap-4 flex-col md:flex-row content-center">
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
              <div class="self-end">
                <Tooltip>
                  Used for grant-membership reporting to YouX.
                </Tooltip>
              </div>
            </div>
          </span>

          <span>
            <h6>Secondary Email</h6>
            <div class="flex justify-between gap-x-2 content-center">
              <input
                v-model="secondaryEmail"
                type="text"
                class="bg-white/10 border-black/25 w-full"
                placeholder="Secondary Email"
              />
              <Tooltip>
                Used for post-graduate access & recovery.
                Must not be an .edu.au address.
              </Tooltip>
            </div>
          </span>

          <span>
            <h6>Event Username</h6>
            <div class="flex justify-between gap-x-2 content-center">
              <input
                v-model="username"
                type="text"
                class="bg-white/10 border-black/25 w-full"
                placeholder="Username"
              />
            </div>
          </span>

          <div class="flex gap-4 flex-col content-end justify-between w-full md:flex-row-reverse">
              <button class="w-min self-end" :disabled="!isFormValid || !hasChanges" @click="pushChanges">Update</button>
              <p v-if="errors.length > 0"></p>
              <!-- div v-for="e in errors" class="py-2 px-3 border-2 border-red-500 bg-red-600 items-center text-indigo-100 leading-none rounded-full inline-flex" role="alert" :key="e">
                 <span class="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">Error</span>
                <span class="font-semibold mr-2 text-left flex-auto">{{ e }}</span>
              </div -->
              <div class="items-center m-0 p-0 bg-red-600 text-red-100 leading-none rounded-full flex overflow-hidden gap-2 select-none" style="height: 2em;padding-right: 8px;" v-if="errors.length > 0">
                <span class="flex rounded-full bg-red-500 uppercase px-6 py-2 text-xs font-bold text-white" style="box-shadow: 0 0 10px 0px rgb(255 0 0 / 100%);">Error</span>
                <span class="font-semibold rounded-full uppercase px-0 text-xs font-bold text-left mx-2" v-for="e in errors" :key="e">{{ e }}</span>
              </div>
            </div>

        </form>
      </div> 

      <div class="flex flex-1 flex-col gap-y-12">
        <div class="flex flex-col gap-6">
          <div class="flex justify-between">
            <h2>Discord Connection</h2>
            <Tooltip>
              Join our Discord server with the link in the footer, and select the 'Linked Roles' option from the server title bar dropdown on the top left.
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
          <a class="m-auto" v-if="store.state.auth.session['discord_linked']" target="_blank" href="https://support.discord.com/hc/en-us/articles/8063233404823#h_01GK286J648XF4HPGKZYW9AMQF" alt="Discord Linked Role Help Article">Read more about Linked Roles in Discord<img style="display:inline-block;text-decoration: underline;" src="/img/icons/external-link.svg"/></a>
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
import axios from "axios";
import http, { axiosBegin, axiosError, axiosSuccess } from "../services/http";

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

let errors = ref([])

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
  errors.value = [];
  try{
    if (username.value != store.state.auth.session["username"] ){
      const axiosUser = axios.create();
      axiosUser.interceptors.request.use(axiosBegin);
      axiosUser.interceptors.response.use(axiosSuccess, (error)=>{
        error.response.data.message = "Error Updating Username\nName might be taken!";
        console.log(error.response);
        return axiosError(error);
      });
      let res = await axiosUser.post("/api/setusername",{ username: username.value });
      if( res.status != 200 ){
        errors.value.push("username");
      }
    }
  } catch (err) {
    errors.value.push("username");
  }

  try{
    if (secondaryEmail.value != store.state.auth.session["secondary_email"]) {
      const axiosEmail = axios.create();
      axiosEmail.interceptors.request.use(axiosBegin);
      axiosEmail.interceptors.response.use(axiosSuccess, (error)=>{
        error.response.data.message = "Error Updating Email\nEmail must not be Educational";
        console.log(error.response);
        return axiosError(error);
      });
      let res = await axiosEmail.post("/api/setsecondaryemail",{ email: secondaryEmail.value });
      if( res.status != 200 ){
        errors.value.push("email");
      }
    }
  } catch (err) {
    errors.value.push("email");
  }

  try{
    if (firstName.value != store.state.auth.session["first_name"] || lastName.value != store.state.auth.session["last_name"] ) {
      const axiosName = axios.create();
      axiosName.interceptors.request.use(axiosBegin);
      axiosName.interceptors.response.use(axiosSuccess, (error)=>{
        error.response.data.message = "Error Updating Name";
        console.log(error.response);
        return axiosError(error);
      });
      let res = await axiosName.post("/api/setname",{ "first-name": firstName.value, "last-name": lastName.value });
      if( res.status != 200 ){
        errors.value.push("name");
      }
    }
  } catch (err) {
    errors.value.push("name");
  }

};

const hasChanges = computed(()=>
  firstName.value.trim()      != store.state.auth.session["first_name"]      ||
  lastName.value.trim()       != store.state.auth.session["last_name"]       ||
  secondaryEmail.value.trim() != store.state.auth.session["secondary_email"] ||
  username.value.trim()       != store.state.auth.session["username"]        
);

const isFormValid = computed(
  () =>
    firstName.value != "" &&
    lastName.value != "" /*&&
    password.value.length >= 8 &&
    password.value == passwordRepeat.value*/
);
</script>
