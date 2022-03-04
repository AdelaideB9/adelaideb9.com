<template>
  <div>
    <h1>About Us</h1>
    <p>
      AdelaideB9 is a competitive, student capture-the-flag team. We include
      computer-science, mathematics and engineering students from all around
      South-Australia, all who are curious about hacking. We try to participate
      in competitions every two weeks!
    </p>
    <p>
      We've only been around since 2021, but are already so proud of our amazing
      team, beating out some of Australia's oldest teams across various national
      and international competitions. Since then, we've also seen an exponential
      increase in our reach among students interested in ethical hacking.
    </p>
    <p>
      If you're an SA student and this sounds interesting, just head over to our
      <router-link to="/register">registration page</router-link> and make an
      account. Membership is free!
    </p>
    <h2>FAQs</h2>
    <h3>What are CTFs?</h3>
    <p>
      CTF stands for Capture the Flag, and no, this isn't the sport or the
      multiplayer video game mode. In computer science, a CTF (or Capture the
      Flag) commonly refers to a type of hacking competition. Typically, teams
      try to collect cleverly hidden sequences of characters, called flags, to
      earn points.
    </p>
    <p>
      Still confused? Imagine for a second that you're given one of these
      digital flags. Think about how you could hide it. Maybe you'd use some
      sort of encoding (like morse code), or try to hide it in the metadata of
      an image, or maybe embed it into the source-code of a secret website.
      Maybe you'd take it a step further and hide it in a video game level that
      can only be accessed by cheating, or protect it within a heavily secured
      server.
    </p>
    <p>
      These are the sort of challenges we're presented with, drawing upon a vast
      array of cyber-security skills in reverse-engineering, forensics, web,
      cryptography, and much more.
    </p>
    <h3>I have zero prior knowledge, should I still join?</h3>
    <p>
      Absolutely! There really is no better way to learn CTFs than to jump in
      and give it a shot, with the support of an experienced team right behind
      you. It will probably be super challenging when you first start, but
      that's normal. You're not supposed to look at a challenge and instantly
      know how to do it. You have to research it, understand fundamentally how
      the technology works, and uncover that critical flaw which breaks the
      challenge wide open.
    </p>
    <p>
      Our team's favourite past challenges include some of the most gruelling
      ones to complete, because an incredibly complicated, elegant, or
      mountainous solution gives you a true sense of satisfaction.
    </p>
    <h3>What is Capture the Flag Club and how does it relate to AdelaideB9?</h3>
    <p>
      AdelaideB9 is our original CTF team, and anytime we're participating in a
      competition or running some sort of global event, that's the name you'll
      probably see.
    </p>
    <p>
      However, as we grew, it became fairly evident that our team was in need of
      a dedicated subset of our members to handle administrative stuff - running
      training events, liasing with sponsors and academic bodies to draw upon
      their support, advertising for growth, handling treasury, branding, social
      media, and much, much more. To access to the resources we needed, an
      Adelaide University Union club was formed titled 'Capture the Flag Club'.
    </p>
    <p>
      For all intents and purposes, members should simply know that becoming a
      part of team AdelaideB9 requires you to become a member of Capture the
      Flag Club for administrative reasons, and requires agreement to the club's
      consititution, which you can
      <router-link to="/constitution">read here</router-link>.
    </p>
    <h3>What do I need to start hacking?</h3>
    <p>
      Depends on your style. Some people swear by tooled-up operating systems
      like Kali Linux, while others will recommend you make use of package
      managment in other Linux distributions to build up your toolset from the
      ground up. Once you
      <router-link to="/register">become a member</router-link>, we recommend
      joining our <a href="https://discord.gg/M3x2Bkbb3N">Discord server</a> and
      asking for help. There will definitely be people there to support you.
    </p>
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
