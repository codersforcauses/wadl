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

// Modal
const modalVisibility = ref(false);

const toggleModal = () => {
  modalVisibility.value = !modalVisibility.value;
};

// Pinia
const instStore = useInstitutionStore();
const instInput = ref({
  name: "",
  code: "",
  abbreviation: "",
});

const createInstitution = (e) => {
  instStore.createInstitution(instInput.value);
  instInput.value = {
    name: "",
    code: "",
    abbreviation: "",
  };
  toggleModal();
};
</script>

<template>
  <!-- Modal -->
  <Modal :modalVisibility="modalVisibility" @close="toggleModal">
    <p class="text-3xl heading-montserrat font-bold px-6 py-3 text-center">
      Add Institutions
    </p>
    <form class="px-10" @submit.prevent="createInstitution" id="Inst">
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
        <NuxtLink>
          <button><PencilIcon class="h-4 w-4" /></button>
        </NuxtLink>
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
