<template>
  <div
    class="m-5 p-5 body-brandon border border-light-grey rounded-3xl max-w-lg"
  >
    <h1 class="header-brandon text-2xl text-center pb-2">Register</h1>
    <DefaultInputs />
    <Roles />
    <div class="w-full flex justify-center mt-4">
      <Button button-text="Submit" button-color="bg-gold" />
    </div>
  </div>
</template>

<script setup>
import DefaultInputs from "./DefaultInputs.vue";
import Roles from "./Roles.vue";
import Button from "../Button/index.vue";
</script>
