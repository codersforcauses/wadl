<template>
  <div>
    <div class="flex items-center w-1/4">
      <div
        v-for="(state, index) in stateList"
        :key="index"
        class="ml-[45px] w-1/2"
      >
        <div
          :class="`rounded-full w-7 h-7 ${
            stage < index + 1 ? 'bg-light-grey' : 'bg-light-green'
          }`"
        >
          <div
            v-if="index + 1 === stateLength && stage === stateLength"
            class="flex text-l text-white items-center justify-center"
          >
            <CheckIcon class="text-white w-7 h-7" />
          </div>
          <div v-else>
            <div
              v-if="stage < index + 2"
              class="flex text-xl w-7 h-7 text-white items-center justify-center"
            >
              {{ index + 1 }}
            </div>
            <div v-else>
              <CheckIcon class="text-white w-7 h-7" />
            </div>
            <div
              v-if="index + 1 !== stateLength"
              class="relative w-[65px] h-px left-[30px] top-[-14px] opacity-50 bg-light-grey"
            />
          </div>
        </div>
        <div
          class="relative w-px h-12 left-[13px] top-[3px] opacity-50 bg-light-grey"
        />
        <div
          :class="`relative right-[10px] text-xl ${
            index + 1 === stage ? 'text-light-green' : ''
          }`"
        >
          {{ state }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from "vue";
import { CheckIcon } from "@heroicons/vue/20/solid";

// const stage = ref(3);
// console.log(stage.value);
const stateList = ["Open", "Closed", "Running", "Complete"];
const stateLength = stateList.length;

defineProps({
  stage: { type: Number, default: 1 },
});
</script>
