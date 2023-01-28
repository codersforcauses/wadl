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
      <Header title-text="Edit Tournament" />
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
        <label class="heading-montserrat">Level</label>
        <Multiselect
          :selected-chips="getLevels()"
          @change="updateSelectedLevels"
        />
        <FormField
          v-model="form.numRounds"
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
      <Header title-text="Create Tournament" />
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
        <label class="heading-montserrat">Level</label>
        <Multiselect
          :selected-chips="getLevels()"
          @change="updateSelectedLevels"
        />
        <FormField
          v-model="form.numRounds"
          label="Rounds"
          placeholder="Total number of rounds"
        />
        <div class="flex justify-evenly items-center">
          <Button
            button-text="Save"
            button-color="bg-gold"
            type="Submit"
            class="m-5 ml-8"
          />
        </div>
      </form>
    </div>
  </Modal>

  <Header title-text="Tournaments" />

  <div class="flex items-center">
    <SearchBar class="w-3/4" @handle-filter="handleFilter" />
    <Button
      button-text="Add"
      button-color="bg-gold"
      class="m-5 ml-8"
      @click="modalVisibility = true"
    />
  </div>

  <div class="flex content-center justify-center h-[calc(74vh-72px)] px-2">
    <Table
      :headers="headers"
      :data="store.filteredTournaments"
      @edit="handleEdit"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useTournamentStore } from "../../stores/tournaments";

const defaultInputState = {
  id: null,
  levels: [],
  name: null,
  numRounds: null,
  shortName: null,
  status: "Open",
};

const form = ref({ ...defaultInputState });
const modalVisibility = ref(false);
const editMode = ref(false);
const store = useTournamentStore();
store.getTournaments();

const getLevels = () => form.value.levels.map((l) => l.level);

const updateSelectedLevels = (chips) => {
  form.value.levels.forEach(function callback(l, index) {
    if (!chips.includes(l.level)) {
      form.value.levels.splice(index, 1);
    }
  });

  chips.forEach((level) => {
    if (!getLevels().includes(level)) {
      form.value.levels.push({ level });
    }
  });
};

const resetFormState = () => {
  form.value = { ...defaultInputState };
  editMode.value = false;
};

const handleEdit = (row) => {
  modalVisibility.value = row.modalVisibility;
  editMode.value = row.editMode;
  form.value = row.data;
};

const handleFilter = (searchTerm) => {
  store.filteredTournaments = store.tournaments.filter(
    (tournament) =>
      tournament.name.toLowerCase().includes(searchTerm) ||
      tournament.status.toLowerCase().includes(searchTerm)
  );
};

const updateTournament = () => {
  store.editTournament(form.value);
  resetFormState();
};

const createTournament = () => {
  store.createTournament(form.value);
  resetFormState();
};

const headers = [
  {
    key: "name",
    title: "Tournament",
  },
  {
    key: "status",
    title: "Status",
  },
];
</script>
