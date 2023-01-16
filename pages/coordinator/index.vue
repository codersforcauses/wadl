<script setup>
import { ref } from "vue";
import { useInstitutionStore } from "../../stores/institutions";
const store = useInstitutionStore();
const headers = [
  {
    key: "name",
    title: "Team",
  },
  {
    key: "level",
    title: "Level",
  },
  {
    key: "division",
    title: "Div",
  },
  {
    key: "timeslot",
    title: "Timeslot",
  },
  {
    key: "venPref1",
    title: "Venue Pref 1",
  },
  {
    key: "venPref2",
    title: "Venue Pref 2",
  },
  {
    key: "venPref3",
    title: "Venue Pref 3",
  },
];

const defaultInputState = {
  id: null,
  level: null,
  division: null,
  timeslot: null,
  venPref1: null,
  venPref2: null,
  venPref3: null,
};

const form = ref({ ...defaultInputState });
const modalVisibility = ref(false);

const resetFormState = () => {
  form.value = { ...defaultInputState };
};

const handleEdit = (row) => {
  modalVisibility.value = row.modalVisibility;
  form.value = row.data;
};

const updateTeam = () => {
  store.editTeam(form.value);
  resetFormState();
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
    <Header title-text="Edit Team" />
    <form
      class="px-10"
      @submit.prevent="
        () => {
          modalVisibility = false;
          updateTeam();
        }
      "
    >
      <FormField v-model="form.timeslot" label="Timeslot" />
      <FormField v-model="form.venPref1" label="1st Venue Preference" />
      <FormField v-model="form.venPref2" label="2nd Venue Preference" />
      <FormField v-model="form.venPref3" label="3rd Venue Preference" />

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
  <section>
    <Header title-text="Teams" />
    <!-- <SearchBar /> -->
    <Table
      :headers="headers"
      :data="store.teams"
      class="mt-5"
      @edit="handleEdit"
    />
    <div class="fixed inset-x-0 bottom-0 w-full">
      <div class="flex flex-row gap-4 m-5 justify-left">
        <Button
          button-text="Team Registration"
          button-color="bg-gold"
          class="transition duration-200 ease-in-out hover:bg-light-gold hover:shadow-lg"
        />
      </div>
    </div>
  </section>
</template>
