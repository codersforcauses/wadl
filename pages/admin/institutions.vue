<script setup>
import { ref } from "vue";
import { PencilIcon } from "@heroicons/vue/24/solid";
import data from "../../data/institutions.json";
import { useInstitutionStore } from "../../stores/institutions";
import Modal from "../../components/Modal/Modal.vue";

const institutions = ref(data);

const form = ref({
  institutionName: "",
  code: "",
  abbreviation: "",
});

const filterInstitutions = (searchTerm) => {
  institutions.value = data.filter((inst) =>
    inst.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Modal
const modalVisibility = ref(false);

const toggleModal = () => {
  modalVisibility.value = !modalVisibility.value;
};

const editInstitution = (inst) => {
  inst_input.value = {
    name: inst.name,
    code: inst.code,
    abbreviation: inst.abbreviation,
  };
  toggleModal();
};

// Pinia
const inst_store = useInstitutionStore();
const inst_input = ref({
  name: "",
  code: "",
  abbreviation: "",
});

const CreateInst = (e) => {
  inst_store.CreateInst(inst_input.value);
  inst_input.value = {
    name: "",
    code: "",
    abbreviation: "",
  };
  toggleModal();
};
</script>

<template>
  <!-- Modal -->
  <Modal :modal-visibility="modalVisibility" @close="toggleModal">
    <p class="text-3xl heading-montserrat font-bold px-6 py-3 text-center">
      Add Institutions
    </p>
    <form class="px-10" @submit.prevent="CreateInst">
      <FormField v-model="inst_input.name" label="Institution Name" />
      <FormField v-model="inst_input.code" label="Code" />
      <FormField v-model="inst_input.abbreviation" label="Abbreviation" />
      <div class="flex justify-evenly items-center">
        <Button
          button-text="Submit"
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
        v-for="(inst, idx) in inst_store.institutions"
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
  <div class="w-full bg-white flex inset-x-0 bottom-0">
    <Button
      button-text="Add Institutions"
      button-color="bg-gold"
      type="button"
      class="m-5 ml-8"
      @click="toggleModal"
    />
  </div>
</template>
