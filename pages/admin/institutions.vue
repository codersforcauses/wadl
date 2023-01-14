<script setup>
import { ref } from "vue";
import { PencilIcon } from "@heroicons/vue/24/solid";
import { useInstitutionStore } from "../../stores/institutions";
import Modal from "../../components/Modal/Modal.vue";

const headers = [
  {
    key: "name",
    title: "Institution",
  },
  {
    key: "number",
    title: "Phone Number",
  },
  {
    key: "email",
    title: "Email",
  },
];

const defaultInputState = {
  id: null,
  name: null,
  code: null,
  abbreviation: null,
  phone: null,
  email: null,
};

const modalVisibility = ref(false);
const editMode = ref(false);
const formInput = ref({ ...defaultInputState });

const store = useInstitutionStore();

store.getInstitutions();

const resetFormState = () => {
  formInput.value = { ...defaultInputState };
  editMode.value = false;
};

const filterInstitutions = (searchTerm) => {
  // institutions.value = data.filter((inst) =>
  //   inst.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  console.log("Filtering institutions");
};

const updateInstitution = () => {
  // update store
  store.editInstitution(formInput.value);
  resetFormState();
};

const createInstitution = () => {
  // update store
  store.createInstitution(formInput.value);
  resetFormState();
};

const handleEdit = (row) => {
  modalVisibility.value = row.modalVisibility;
  editMode.value = row.editMode;
  formInput.value = row.data;
};
</script>

<template>
  <Modal
    :modal-visibility="modalVisibility"
    @close="
      () => {
        modalVisibility = false;
        resetFormState();
      }
    "
  >
    <div v-if="editMode">
      <p class="text-3xl heading-montserrat font-bold px-6 py-3 text-center">
        Edit Institution
      </p>
      <form
        class="px-10"
        @submit.prevent="
          () => {
            modalVisibility = false;
            updateInstitution();
          }
        "
      >
        <FormField v-model="formInput.name" label="Institution Name" />
        <FormField v-model="formInput.code" label="Code" />
        <FormField v-model="formInput.abbreviation" label="Abbreviation" />
        <FormField v-model="formInput.number" label="Phone Number" />
        <FormField v-model="formInput.email" label="Email" />
        <div class="flex justify-evenly items-center">
          <Button
            button-text="Update"
            button-color="bg-gold"
            type="Submit"
            class="m-5 ml-8"
          />
        </div>
      </form>
    </div>
    <div v-else>
      <p class="text-3xl heading-montserrat font-bold px-6 py-3 text-center">
        Add Institution
      </p>
      <form
        class="px-10"
        @submit.prevent="
          () => {
            modalVisibility = false;
            createInstitution();
          }
        "
      >
        <FormField v-model="formInput.name" label="Institution Name" />
        <FormField v-model="formInput.code" label="Code" />
        <FormField v-model="formInput.abbreviation" label="Abbreviation" />
        <FormField v-model="formInput.number" label="Phone Number" />
        <FormField v-model="formInput.email" label="Email" />
        <div class="flex justify-evenly items-center">
          <Button
            button-text="Submit"
            button-color="bg-gold"
            type="Submit"
            class="m-5 ml-8"
          />
        </div>
      </form>
    </div>
  </Modal>

  <Header title-text="Institutions" />
  <SearchBar @handle-filter="filterInstitutions" />

  <!-- Institutions Table  View -->
  <div class="flex content-center justify-center h-[calc(74vh-72px)] px-2">
    <Table :headers="headers" :data="store.institutions" @edit="handleEdit" />
  </div>

  <!--
  <div class="flex justify-center">
    <ul class="bg-white rounded-lg w-11/12">
      <li
        class="text-xl heading-montserrat font-bold px-6 py-3 border-b border-gray-20 rounded-t-lg flex justify-between items-center"
      >
        Institutions
      </li>
      <li
        v-for="institution in store.institutions"
        :key="institution.id"
        class="justify-between flex px-6 py-2 border-b border-gray-20 items-center"
      >
        <p>{{ institution.name }}</p>
        <button
          @click="
            () => {
              formInput = { ...institution };
              editMode = true;
              modalVisibility = true;
            }
          "
        >
          <PencilIcon class="h-4 w-4" />
        </button>
      </li>
    </ul>
  </div>
  -->

  <div class="fixed inset-x-0 bottom-0 w-full bg-white">
    <Button
      button-text="Add Institutions"
      button-color="bg-gold"
      type="button"
      class="m-5 ml-8"
      @click="modalVisibility = true"
    />
  </div>
</template>
