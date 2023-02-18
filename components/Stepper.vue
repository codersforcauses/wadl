<template>
  <div>
    <div class="flex items-center w-1/3">
      <div v-for="(state, index) in stateList" :key="index" class="ml-[20px]">
        <div
          :class="`rounded-full w-5 h-5 ${
            stage < index + 1 ? 'bg-light-grey' : 'bg-light-green'
          }`"
        >
          <div
            v-if="index + 1 === stateLength && stage === stateLength"
            class="flex text-l text-white items-center justify-center"
          >
            <CheckIcon class="text-white w-5 h-5" />
          </div>
          <div v-else>
            <div
              v-if="stage < index + 2"
              class="flex text-l w-5 h-5 text-white items-center justify-center"
            >
              {{ index + 1 }}
            </div>
            <div v-else>
              <CheckIcon class="text-white w-5 h-5" />
            </div>
            <div
              v-if="index + 1 !== stateLength && stage !== stateLength"
              class="relative w-10 h-px left-[25px] bottom-[13px] opacity-30 bg-light-grey"
            />
          </div>
        </div>
        <div
          class="relative w-px h-8 left-[9px] top-[3px] opacity-30 bg-light-grey"
        />
        <div class="relative right-[10px]">{{ state }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { CheckIcon } from "@heroicons/vue/20/solid";

const stage = ref(3);
const stateList = ["Open", "Closed", "Running", "Complete"];
const stateLength = stateList.length;
</script>
