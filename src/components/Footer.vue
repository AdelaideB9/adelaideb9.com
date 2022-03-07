<script setup>
import SocialMedia from "./SocialMedia.vue";
</script>

<template>
  <div class="bg-white text-dark-blue w-full grid grid-cols-2 gap-y-8 p-8">
    <div class="">
      <h4>Contact Us</h4>
      <a class="no-underline" href="mailto:hello@adelaideb9.com"
        >hello@adelaideb9.com</a
      >
    </div>
    <div
      class="flex items-center text-right gap-6 ml-auto md:flex-row flex-col row-span-2 md:row-span-1"
    >
      <SocialMedia
        src="/img/social/discord-brands.svg"
        href="https://discord.gg/M3x2Bkbb3N"
        :exclusive="true"
      />
      <SocialMedia
        class=""
        src="/img/social/github-brands.svg"
        href="https://github.com/adelaideb9"
      />
      <SocialMedia
        class=""
        src="/img/social/linkedin-brands.svg"
        href="https://au.linkedin.com/company/adelaideb9?trk=public_profile_volunteering-position_profile-section-card_full-click"
      />
      <SocialMedia
        class=""
        src="/img/social/facebook-brands.svg"
        href="https://www.facebook.com/AdelaideB9"
      />
      <SocialMedia
        class=""
        src="/img/social/ctftime-brands.svg"
        href="https://ctftime.org/team/147168"
      />
    </div>

    <div class="flex items-end">
      <img class="h-14 mr-6 hidden lg:block" src="/img/logo.png" />
      <div class="flex-col">
        <h3 class="font-logo font-normal">ADELAIDE B9</h3>
        <p class="text-sm">
          The University of Adelaide, North Terrace<br />&copy;
          {{ new Date().getFullYear() }} AdelaideB9
        </p>
      </div>
    </div>

    <div class="hidden md:flex text-right flex-col justify-center">
      <p class="text-sm">Brought to you by</p>
      <p class="font-display tracking-tighter text-3xl">
        Capture the Flag Club
      </p>
    </div>
  </div>
</template>
