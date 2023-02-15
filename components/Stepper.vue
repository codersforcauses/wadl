<template>
  <div>
    <div class="flex items-center w-1/3">
      <div v-for="(state, index) in stateList" :key="index">
        <div
          :class="`rounded-full w-6 h-6 ${
            stage < index + 1 ? 'bg-light-grey' : 'bg-light-green'
          }`"
        >
          <div
            v-if="index + 1 === stateLength && stage === stateLength"
            class="flex text-l text-white place-content-center"
          >
            <CheckIcon class="text-white" />
          </div>
          <div v-else>
            <div
              v-if="stage < index + 2"
              class="flex text-l text-white place-content-center"
            >
              {{ index + 1 }}
            </div>
            <div v-else>
              <CheckIcon class="text-white" />
            </div>
            <div class="relative w-16 h-px left-5 bg-light-grey" />
          </div>
        </div>
        <div class="w-px h-16 bg-light-grey" />
        <div>{{ state }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from "vue";
import { CheckIcon } from "@heroicons/vue/20/solid";

const stage = 4;
const stateList = ["Open", "Closed", "Running", "Complete"];
const stateLength = stateList.length;
</script>
