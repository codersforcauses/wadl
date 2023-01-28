<template>
  <Header title-text="Adjudicators" />
  <div class="flex items-center">
    <SearchBar @handle-filter="handleFilter" />
    <Button
      button-text="Add"
      button-color="bg-gold"
      type="button"
      size="medium"
      @click="addAdjudicator"
    />
  </div>
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
        class="flex items-center justify-between px-6 py-2 border-b rounded-t-lg border-gray-20"
      >
        <p>{{ adjudicator.firstName }} {{ adjudicator.lastName }}</p>
        <NuxtLink>
          <button><PencilIcon class="w-4 h-4" /></button>
        </NuxtLink>
      </li>
    </ul>
  </div>
  <div class="fixed inset-x-0 bottom-0 w-full bg-white">
    <Button
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
