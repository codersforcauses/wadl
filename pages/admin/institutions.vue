<script setup>
import { ref } from "vue";
import { XMarkIcon, PencilIcon } from "@heroicons/vue/24/solid";
import data from "../../data/institutions.json";

const institutions = ref(data);
var modal_visibility = ref(false);

const form = ref({
  institution_name: "",
  code: "",
  abbreviation: "",
});

const filterInstitutions = (searchTerm) => {
  institutions.value = data.filter((inst) =>
    inst.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Launches the modal and fills in with values
const editInstitution = (institution_name, code, abbreviation) => {
  form.value.institution_name = institution_name;
  form.value.code = code;
  form.value.abbreviation = abbreviation;
  showModal();
};

// Launches the modal 
const showModal = () => {
  modal_visibility.value = true;
};

// Closes the modal 
const closeModal = () => {
  modal_visibility.value = false;
};

// Request sent to server to create or update an institution
const updateInstitution = () => {
  console.log("Updating with")
  console.log(form);
};
// Request sent to server to delete an institution
const deleteInstitution = () => {
  console.log("Deleting with")
  console.log(form);
};
</script>

<template>
  <div
    v-show="modal_visibility"
    class="flex justify-center items-center fixed top-0 z-50 left-0 w-full h-full bg-slate-300 bg-opacity-60"
  >
    <div class="bg-white min-w-[50%] min-h-[50%] rounded-2xl">
      <header class="flex justify-end items-center pt-2 pr-2 pb-2 bg-gold rounded-t-2xl">
        <XMarkIcon class="h-6 w-6 cursor-pointer" @click="closeModal" />
      </header>
      <p class="text-3xl heading-montserrat font-bold px-6 py-3 text-center">
        Edit Institutions
      </p>
      <form class="px-10">
        <FormField label="Institution Name" v-model="form.institution_name" />
        <FormField label="Code" v-model="form.code" />
        <FormField label="Abbreviation" v-model="form.abbreviation" />
        <div class="flex justify-evenly items-center">
          <Button
            button-text="Save"
            button-color="bg-gold"
            type="button"
            class="m-5 ml-8"
            @click="updateInstitution"
          />
          <Button
            button-text="Delete"
            button-color="bg-red-200"
            type="button"
            class="m-5 ml-8"
            @click="deleteInstitution"
          />
        </div>
      </form>
    </div>
  </div>
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
        <button
          @click="editInstitution(inst.name, inst.code, inst.name.slice(0, Math.min(3,inst.name.length)))"
        >
          <PencilIcon class="h-4 w-4" />
        </button>
      </li>
    </ul>
  </div>
  <div class="w-full bg-white fixed inset-x-0 bottom-0">
    <Button
      button-text="Add Institutions"
      button-color="bg-gold"
      type="button"
      class="m-5 ml-8"
      @click="editInstitution('', '', '')"
    />
  </div>
</template>
