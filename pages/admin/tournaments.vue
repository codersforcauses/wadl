<template>
  <Modal
    :modal-visibility="modalVisibility"
    size="w-7/12"
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
        <div class="flex justify-evenly w-full my-5">
          <Button
            button-text="Delete"
            button-color="bg-pink-100"
            type="Submit"
            class="text-red-700"
            @click="deleteTournament(form.id)"
          />
          <Notification
            :modal-visibility="notificationVisibility"
            :is-success="isSuccess"
            :body="notificationMessage"
            @close="
              () => {
                notificationVisibility = false;
                redirect();
              }
            "
          />
          <Button button-text="Update" button-color="bg-gold" type="Submit" />
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

  <div class="flex items-center justify-center w-full">
    <SearchBar
      @handle-filter="
        (searchString) => {
          searchTerm = searchString;
        }
      "
    />
    <Button
      button-text="Add"
      button-color="bg-gold"
      class="ml-2"
      type="button"
      size="medium"
      @click="modalVisibility = true"
    />
  </div>

  <div class="flex content-center justify-center px-2">
    <Table
      :headers="headers"
      :data="filteredTournaments"
      no-data-text="No tournaments registered"
      @edit="handleEdit"
    />
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useTournamentStore } from "../../stores/tournaments";
import { useHead } from "#imports";
useHead({
  title: "Tournaments",
});
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
  form.value.levels = [];
  chips.forEach((level) => {
    form.value.levels.push({ level });
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

const searchTerm = ref(null);
const filteredTournaments = computed(() => {
  const query = searchTerm.value;
  const results = store.tournaments.filter(
    (tournament) =>
      tournament.name.toLowerCase().includes(query) ||
      tournament.status.toLowerCase().includes(query)
  );
  return query !== null ? results : store.tournaments;
});

const updateTournament = () => {
  store.editTournament(form.value);
  resetFormState();
};

const createTournament = () => {
  store.createTournament(form.value);
  resetFormState();
};

// Notification Modal
const notificationVisibility = ref(false);
const isSuccess = ref(false);
const notificationMessage = ref("");

const deleteTournament = (id) => {
  store.deleteTournament(id);
  if (!store.errorMessage) {
    isSuccess.value = true;
    notificationVisibility.value = true;
    notificationMessage.value = "Tournament successfully deleted";
  }
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
