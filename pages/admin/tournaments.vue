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
          :selected-chips="form.levels.map((l) => l.level)"
          @change="updateSelectedLevels"
        />
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
          :selected-chips="form.levels.map((l) => l.level)"
          @change="updateSelectedLevels"
        />
        <FormField
          v-model="form.rounds"
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
  <SearchBar @handle-filter="handleFilter" />
  <div class="flex content-center justify-center h-[calc(74vh-72px)] px-2">
    <Table
      :headers="headers"
      :data="store.filteredTournaments"
      @edit="handleEdit"
    />
  </div>
  <div class="fixed inset-x-0 bottom-0 w-full bg-white">
    <Button
      button-text="Add Tournament"
      button-color="bg-gold"
      class="m-5 ml-8"
      @click="modalVisibility = true"
    />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useTournamentStore } from "../../stores/tournaments";

const defaultInputState = {
  id: null,
  name: null,
  shortName: null,
  levels: [],
  rounds: null,
};

const form = ref({ ...defaultInputState });
const modalVisibility = ref(false);
const editMode = ref(false);
const store = useTournamentStore();
onMounted(() => {
  store.getTournaments();
});
onUnmounted(() => {
  store.clearStore();
});

const updateSelectedLevels = (chips) => {
  form.value.levels = chips;
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
