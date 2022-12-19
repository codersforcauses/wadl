<script setup>
import { ref } from "vue";
import { PencilIcon } from "@heroicons/vue/24/solid";
import data from "../../data/institutions.json";

const institutions = ref(data);

const filterInstitutions = (searchTerm) => {
  institutions.value = data.filter((inst) =>
    inst.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

const addInstitution = () => {};
</script>

<template>
  <Header title-text="Institutions" />
  <SearchBar @handle-filter="filterInstitutions" />
  <div class="flex justify-center">
    <ul class="bg-white rounded-lg w-11/12">
      <li
        class="text-xl heading-montserrat font-bold px-6 py-3 border-b border-gray-20 rounded-t-lg flex justify-between items-center"
      >
        Institutions
      </li>
      <li
        v-for="(inst, idx) in institutions"
        :key="idx"
        data-test="institution"
        class="justify-between flex px-6 py-2 border-b border-gray-20 items-center"
      >
        <p>{{ inst.name }}</p>
        <NuxtLink>
          <button><PencilIcon class="h-4 w-4" /></button>
        </NuxtLink>
      </li>
    </ul>
  </div>
  <div class="w-full bg-white fixed inset-x-0 bottom-0">
    <Button
      data-test="addInstitution"
      button-text="Add Institutions"
      button-color="bg-gold"
      type="button"
      class="m-5 ml-8"
      @click="addInstitution"
    />
  </div>
</template>
