<!-- eslint-disable vue/attribute-hyphenation -->
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
      <Header titleText="Edit Tournament" />
      <form
        class="px-10"
        @submit.prevent="
          () => {
            modalVisibility = false;
            updateTournament();
          }
        "
      >
        <div class="grid grid-cols-2 gap-x-4">
          <div>
            <FormField
              v-model="form.name"
              label="Tournament Name"
              placeholder="Name"
            />
          </div>
          <div class="mt-6">
            <FormField v-model="form.shortName" placeholder="Short Name" />
          </div>
        </div>
        <FormField
          v-model="form.rounds"
          label="Rounds"
          placeholder="Total number of rounds"
        />
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
      <Header titleText="Create Tournament" />
      <form
        class="px-10"
        @submit.prevent="
          () => {
            modalVisibility = false;
            createTournament();
          }
        "
      >
        <div class="grid grid-cols-2 gap-x-4">
          <div>
            <FormField
              v-model="form.name"
              label="Tournament Name"
              placeholder="Name"
            />
          </div>
          <div class="mt-6">
            <FormField v-model="form.shortName" placeholder="Short Name" />
          </div>
        </div>
        <FormField v-model="form.levels" label="Levels" placeholder="To Do" />
        <FormField
          v-model="form.rounds"
          label="Rounds"
          placeholder="Total number of rounds"
        />
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
  </Modal>

  <Header titleText="Tournaments" />
  <SearchBar @handle-filter="handleFilter" />
  <div class="flex content-center justify-center h-[calc(74vh-72px)] px-2">
    <Table :headers="headers" :data="tournaments" />
  </div>
  <div class="inset-x-0 hottom-0 w-full bg-white">
    <Button
      button-text="Add Tournament"
      button-color="bg-gold"
      class="m-5 ml-8"
      @click="modalVisibility = true"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import data from "../../data/tournaments.json";

const defaultInputState = {
  id: null,
  name: null,
  shortName: null,
  levels: [],
  rounds: null,
};

const modalVisibility = ref(false);
const editMode = ref(false);
const form = ref({ ...defaultInputState });

//const store = useTournamentStore();

const resetFormState = () => {
  form.value = { ...defaultInputState };
  editMode.value = false;
};

const tournaments = ref(data);

const handleFilter = (searchTerm) => {
  tournaments.value = data.filter(
    (tournament) =>
      tournament.tournament.toLowerCase().includes(searchTerm) ||
      tournament.venue.toLowerCase().includes(searchTerm)
  );
};

const updateTournament = () => {
  // update store
  // store.editInstitution(formInput.value);
  resetFormState();
};

const createTournament = () => {
  // update store
  // store.createInstitution(formInput.value);
  resetFormState();
};

const headers = [
  {
    key: "tournament",
    title: "Tournament",
  },
  {
    key: "venue",
    title: "Venue",
  },
];
</script>
