<template>
  <div class="flex items-center w-1/3">
    <div class="rounded-full w-6 h-6 bg-light-green">
      <div
        v-if="stage === 1"
        class="flex text-l text-white place-content-center"
      >
        1
      </div>
      <div v-else>
        <CheckIcon class="text-white" />
      </div>
    </div>

    <div class="w-16 h-px inline-block bg-light-grey" />

    <div
      :class="`rounded-full w-6 h-6 ${
        stage < 2 ? 'bg-light-grey' : 'bg-light-green'
      }`"
    >
      <div v-if="stage < 3" class="flex text-l text-white place-content-center">
        2
      </div>
      <div v-else>
        <CheckIcon class="text-white" />
      </div>
    </div>

    <div class="w-16 h-px inline-block bg-light-grey" />

    <div
      :class="`rounded-full w-6 h-6 ${
        stage < 3 ? 'bg-light-grey' : 'bg-light-green'
      }`"
    >
      <div v-if="stage < 4" class="flex text-l text-white place-content-center">
        3
      </div>
      <div v-else>
        <CheckIcon class="text-white" />
      </div>
    </div>

    <div class="w-16 h-px inline-block bg-light-grey" />

    <div
      :class="`rounded-full w-6 h-6 ${
        stage < 4 ? 'bg-light-grey' : 'bg-light-green'
      }`"
    >
      <div v-if="stage < 5" class="flex text-l text-white place-content-center">
        4
      </div>
      <div v-else>
        <CheckIcon class="text-white" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { CheckIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  labelText1: { type: String, default: "Open" },
  labelText2: { type: String, default: "Closed" },
  labelText3: { type: String, default: "Running" },
  labelText4: { type: String, default: "Complete" },
});

const stage = ref(1);
</script>
