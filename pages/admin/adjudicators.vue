<template>
  <Header title-text="Adjudicators" />
  <SearchBar @handle-filter="handleFilter" />
  <div class="flex justify-center">
    <ul class="w-11/12 bg-white rounded-lg">
      <li
        class="flex items-center justify-between px-6 py-3 text-xl font-bold border-b rounded-t-lg heading-montserrat border-gray-20"
      >
        Adjudicator
      </li>
      <li
        v-for="(adjudicator, idx) in adjudicators"
        :key="idx"
        data-test="abjudicator"
        class="flex items-center justify-between px-6 py-2 border-b rounded-t-lg border-gray-20"
      >
        <p data-test="abjudicatorFullName">
          {{ adjudicator.firstName }} {{ adjudicator.lastName }}
        </p>
        <NuxtLink data-test="abjudicatorButton">
          <button><PencilIcon class="w-4 h-4" /></button>
        </NuxtLink>
      </li>
    </ul>
  </div>
  <div class="fixed inset-x-0 bottom-0 w-full bg-white">
    <Button
      data-test="addAbjudicator"
      button-text="Add Adjudicator"
      button-color="bg-gold"
      class="m-5 ml-8"
      @click="addAdjudicator"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { PencilIcon } from "@heroicons/vue/24/solid";
import data from "../../data/adjudicators.json";

const adjudicators = ref(data);

const handleFilter = (searchTerm) => {
  adjudicators.value = data.filter(
    (adj) =>
      adj.firstName.toLowerCase().includes(searchTerm) ||
      adj.lastName.toLowerCase().includes(searchTerm)
  );
};

const addAdjudicator = () => {
  // Open Modal
  console.log("Adding Adjudicator");
};
</script>
