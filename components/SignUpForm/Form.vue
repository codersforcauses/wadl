<template>
  <div
    class="m-5 p-5 body-brandon border border-light-grey rounded-3xl max-w-lg"
  >
    <h1 class="header-brandon text-2xl text-center pb-2">Register</h1>
    <DefaultInputs />
    <Roles />
    <button class="bg-gold px-8 py-2 rounded-md mt-6 body-brandon shadow-md">
      Submit
    </button>
  </div>
</template>

<script setup>
import DefaultInputs from "./DefaultInputs.vue";
import Roles from "./Roles.vue";
</script>
