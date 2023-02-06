<template>
  <Header title-text="Manage Division" />
  <section class="mx-6">
    <!-- Division Controls -->
    <div
      class="flex justify-between w-full bg-light-grey/10 mt-4 p-2 px-5 rounded-md"
    >
      <div class="flex flex-row justify-center">
        <Button button-text="Auto Allocate" size="medium" class="mr-2 my-2" />
        <Button
          button-text="Allocate Bye"
          button-color="bg-light-orange-gold"
          size="medium"
          class="my-2"
        />
      </div>
      <div class="flex flex-row justify-center">
        <div class="flex justify-center flex-col">
          <p class="text-2xl mx-auto font-montserrat">
            13<span class="text-xs">/20</span>
          </p>
          <p class="text-[9px] text-mid-grey font-montserrat">
            Remaining Teams
          </p>
        </div>
        <Button
          button-text="Submit"
          button-color="bg-light-green"
          text-color="text-white"
          size="medium"
          class="ml-5 my-2"
        />
      </div>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      <DivisionPanel
        v-for="(division, idx) in divisions"
        :key="idx"
        :division="idx + 1"
      />

      <div
        class="flex justify-center items-center bg-light-grey/10 mt-4 p-2 px-5 rounded-md h-64 border border-light-grey/20"
        @click="addNewDivision"
      >
        <PlusIcon class="w-14 h-14 text-light-grey/30" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { PlusIcon } from "@heroicons/vue/24/solid";

const initialState = {
  division: 1,
  venue: null,
  teams: null,
};

const divisions = ref([initialState]);

const addNewDivision = () => {
  let currentDivision = divisions.value.length;

  const newState = {
    division: currentDivision + 1,
    venue: null,
    teams: null,
  };
  divisions.value.push(newState);
};
</script>
