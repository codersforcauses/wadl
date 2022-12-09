<template>
  <div id="logo">
    <img class="mx-auto" src="../assets/logos/TransparentLongLogo.png" />
  </div>
  <div>
    <h1 class="text-center font-montserrat text-4xl">Competitions</h1>
  </div>

  <hr class="my-5 w-4/5 h-px mx-auto bg-black border-0"> 

  <div >
    <div class="flex v-screen justify-center">
      <NuxtLink to="/">
        <LevelButton buttonText="SDC" class="bg-[#A8A8A8]" />
      </NuxtLink>

      <NuxtLink to="/">
        <LevelButton buttonText="AIHSA" class="bg-[#8A8A8A]" />
      </NuxtLink>

      <NuxtLink to="/">
        <LevelButton buttonText="RDC" class="bg-[#474747]" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import LevelButton from "../components/HomePage/LevelButton.vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat");

</style>
