<template>
  <div>
    <div class="flex gap-20 flex-col xl:flex-row">
      <form class="flex flex-1 flex-col gap-y-10" @submit.prevent="submitRegistration">
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

        <Button
          class="w-auto"
          content="Submit"
          :disabled="!isFormValid"
          @click="submitRegistration"
        ></Button>
      </form>

      <div class="flex flex-1 flex-col gap-y-6">
        <h2>Emails</h2>
        <CheckBox content="Subscribe to mailing list"/>
        <h2>Danger Zone</h2>
        <Button
          class="w-auto bg-light-carmine"
          content="Permanently delete account"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "../components/Button.vue";
import CheckBox from "../components/CheckBox.vue";
</script>
