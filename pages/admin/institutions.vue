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

// Modal function
let modal_visibility = ref(false);

const showModal = () => {
  modal_visibility.value = true;
 
};
const closeModal = () => {
  modal_visibility.value = false;
};
const submitForm = (event) => { 
  event.preventDefault();
  const data = new FormData(event.target);

  const value = Object.fromEntries(data.entries());
  
  value.topics = data.getAll("topics");

  console.log({ value });
}

};

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
      button-text="Add Institutions"
      button-color="bg-gold"
      type="button"
      class="m-5 ml-8"
      @click="showModal"
    />
  </div>
  <div v-show="modal_visibility"
    class="flex justify-center items-center fixed top-0 z-50 left-0 w-full h-full bg-slate-300 bg-opacity-60">
    <div class="bg-white min-w-[50%] min-h-[50%] rounded-2xl">
      <header class="flex justify-end items-center pt-2 pr-2 pb-2 bg-gold rounded-t-2xl">
        <XMarkIcon class="h-6 w-6 cursor-pointer" @click="closeModal" />
      </header>
      <p class="text-3xl heading-montserrat font-bold px-6 py-3 text-center">
        Add Institution
      </p>
      <form class="px-10">
        <FormField label="Institution Name" />
        <FormField label="Code"  />
        <FormField label="Abbreviation"  />
        <div class="flex justify-evenly items-center">
          <Button button-text="Submit" button-color="bg-gold" type="submit" class="m-5 ml-8" @click="submitForm" />
          
        </div>
      </form>
    </div>
  </div>
</template>
