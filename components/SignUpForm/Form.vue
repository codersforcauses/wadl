<template>
  <form
    class="p-5 heading-montserrat border border-light-grey rounded-3xl max-w-lg"
  >
    <h1 class="text-2xl text-center pb-2">Register</h1>
    <DefaultInputs />
    <Roles />
    <div class="w-full flex justify-center mt-4">
      <Button button-text="Submit" button-color="bg-gold" />
    </div>
  </form>
</template>

<script setup>
import DefaultInputs from "./DefaultInputs.vue";
import Roles from "./Roles.vue";
import Button from "../Button/index.vue";
</script>
