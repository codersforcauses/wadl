<template>
  <Header title-text="Adjudicators" />
  <SearchBar @handle-filter="handleFilter" />

  <div class="flex justify-center">
    <ul class="bg-white rounded-lg w-11/12">
      <li
        v-for="(adjudicator, idx) in adjudicators"
        :key="idx"
        class="px-6 py-2 border-b border-gray-20 rounded-t-lg flex justify-between items-center"
      >
        <p>{{ adjudicator.firstName }} {{ adjudicator.lastName }}</p>
        <NuxtLink>
          <button><PencilIcon class="h-4 w-4" /></button>
        </NuxtLink>
      </li>
    </ul>
  </div>
  <div class="w-full bg-white fixed inset-x-0 bottom-0 px-3">
    <button class="bg-gold m-5 py-2 px-6 rounded-md shadow-md">
      Add Adjudicator
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { PencilIcon } from "@heroicons/vue/24/solid";
import data from "../data/adjudicators.json";

const adjudicators = ref(data);

const handleFilter = (searchTerm) => {
  adjudicators.value = data.filter((adj) =>
    adj.firstName.toLowerCase().includes(searchTerm)
  );
};
</script>
