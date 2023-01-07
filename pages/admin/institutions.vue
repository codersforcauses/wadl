<script setup>
import { ref } from "vue";
import { PencilIcon } from "@heroicons/vue/24/solid";
import data from "../../data/institutions.json";
import { useInstitutionStore } from "../../stores/institutions";
import Modal from "../../components/Modal/Modal.vue";

const institutions = ref(data);

const filterInstitutions = (searchTerm) => {
  institutions.value = data.filter((inst) =>
    inst.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
const clearInput = () => {
  instInput.value = {
    id: "",
    name: "",
    code: "",
    abbreviation: "",
  };
};

// Modal
const modalVisibility = ref(false);
const isEditing = ref(false);

const toggleModal = () => {
  if (!isEditing.value) {
    clearInput();
  }
  modalVisibility.value = !modalVisibility.value;
  if (!modalVisibility.value) {
    isEditing.value = false;
  }
};

const editInstitution = (inst) => {
  instInput.value = {
    id: inst.id,
    name: inst.name,
    code: inst.code,
    abbreviation: inst.abbreviation,
  };
  isEditing.value = true;

  toggleModal();
};

// Pinia
const instStore = useInstitutionStore();
const instInput = ref({
  id: "",
  name: "",
  code: "",
  abbreviation: "",
});

// Calls pinia store
const updateInstitution = () => {
  isEditing.value = false;
  instStore.editInstitution(instInput.value);
  toggleModal();
};

const createInstitution = (e) => {
  instStore.createInstitution(instInput.value);
  toggleModal();
};
</script>

<template>
  <!-- Modal -->
  <Modal :modal-visibility="modalVisibility" @close="toggleModal">
    <p
      v-if="!isEditing"
      class="text-3xl heading-montserrat font-bold px-6 py-3 text-center"
    >
      Add Institutions
    </p>
    <p
      v-else
      class="text-3xl heading-montserrat font-bold px-6 py-3 text-center"
    >
      Edit Institutions
    </p>
    <form
      v-if="!isEditing"
      id="Inst"
      class="px-10"
      @submit.prevent="createInstitution"
    >
      <FormField v-model="instInput.name" label="Institution Name" />
      <FormField v-model="instInput.code" label="Code" />
      <FormField v-model="instInput.abbreviation" label="Abbreviation" />
      <div class="flex justify-evenly items-center">
        <Button
          button-text="Submit"
          button-color="bg-gold"
          type="Submit"
          class="m-5 ml-8"
        />
      </div>
    </form>
    <form v-else id="Inst" class="px-10" @submit.prevent="updateInstitution">
      <FormField v-model="instInput.name" label="Institution Name" />
      <FormField v-model="instInput.code" label="Code" />
      <FormField v-model="instInput.abbreviation" label="Abbreviation" />
      <div class="flex justify-evenly items-center">
        <Button
          button-text="Update"
          button-color="bg-gold"
          type="Submit"
          class="m-5 ml-8"
        />
      </div>
    </form>
  </Modal>

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
        v-for="(inst, idx) in instStore.institutions"
        :key="idx"
        class="justify-between flex px-6 py-2 border-b border-gray-20 items-center"
      >
        <p>{{ inst.name }}</p>
        <button @click="editInstitution(inst)">
          <PencilIcon class="h-4 w-4" />
        </button>
      </li>
    </ul>
  </div>
  <div class="fixed inset-x-0 bottom-0 w-full bg-white">
    <Button
      button-text="Add Institutions"
      button-color="bg-gold"
      type="button"
      class="m-5 ml-8"
      @click="toggleModal"
    />
  </div>
</template>
