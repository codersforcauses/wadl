<script setup>
import { ref, computed, onMounted } from "vue";
import { useTournamentStore } from "~/stores/tournaments";
import { useMatchupStore } from "~/stores/matchups";
import { useRoute } from "#imports";
import { PencilIcon } from "@heroicons/vue/24/solid";

const tournamentStore = useTournamentStore();
const matchupStore = useMatchupStore();
const route = useRoute();
const isLoading = ref(true);
const modalVisibility = ref(false);
const topicData = ref(null);

const defaultInputState = {
  id: null,
  affirmativeTeam: null,
  negativeTeam: null,
  date: null,
  round: null,
  division: null,
  venue: null,
  time: null,
  topic: null,
};

const form = ref({ ...defaultInputState });

let selectedTournament = null;
let selectedRound = null;

onMounted(async () => {
  try {
    await matchupStore.getMatchups(route.params.tournamentId);
    selectedTournament = tournamentStore.getRunning.find(
      (tournament) => tournament.id === route.params.tournamentId
    );
    selectedRound = parseInt(selectedTournament?.currentRound);
    createRoundTabs();
    await getFixturesTableData();
  } catch (error) {
    console.log(error);
  }
});

const headers = [
  {
    key: "division",
    title: "Division",
  },
  {
    key: "date",
    title: "Date",
  },
  {
    key: "time",
    title: "Time",
  },
  {
    key: "affirmativeTeam",
    title: "Affirmative",
  },
  {
    key: "negativeTeam",
    title: "Negative",
  },
  {
    key: "venue",
    title: "Venue",
  },
  {
    key: "topic",
    title: "Topic",
  },
  { key: "scoreboard", title: "Scoreboard" },
  { key: "edit", title: "Edit" },
];
const levelTabs = [
  { label: "Novice", active: false },
  { label: "Junior", active: true },
  { label: "Senior", active: false },
];
const roundTabs = [];

let levelSelected = "Junior";
let levelTabsKey = 0;

const selectedLevel = ref(matchupStore.junior);
const tableData = ref([]);
const tableFilter = ref("");

const createRoundTabs = () => {
  let round = 1;
  while (round <= parseInt(selectedTournament?.numRounds)) {
    if (round === parseInt(selectedTournament?.currentRound)) {
      roundTabs.push({ label: `Round ${round}`, active: true });
    } else {
      roundTabs.push({ label: `Round ${round}`, active: false });
    }
    round++;
  }
};

const handleLevel = (tabName) => {
  selectedRound = parseInt(selectedTournament?.currentRound);
  levelSelected = tabName;
  levelTabsKey++;
  tableData.value = [];
  roundTabs.forEach((round) => {
    if (
      parseInt(round.label.split("")[round.label.length - 1]) === selectedRound
    ) {
      round.active = true;
    } else {
      round.active = false;
    }
  });

  // Only used for JSON fixtures
  if (levelSelected === "Junior") {
    selectedLevel.value = matchupStore.junior;
  } else if (levelSelected === "Novice") {
    selectedLevel.value = matchupStore.novice;
  } else {
    selectedLevel.value = matchupStore.senior;
  }

  tableFilter.value = "";
  getFixturesTableData();
};

const handleRound = (roundName) => {
  tableData.value = [];
  selectedRound = parseInt(roundName.split("")[roundName.length - 1]);
  getFixturesTableData();
};

const getFixturesTableData = () => {
  // Used only for JSON fixtures
  selectedLevel.value[0].forEach((matchup) => {
    if (matchup.round === selectedRound) {
      tableData.value.push(matchup);
    }
  });
  isLoading.value = false;
};

const handleFilter = (searchTerm) => {
  tableFilter.value = searchTerm;
};

const handleEdit = (row) => {
  modalVisibility.value = row.modalVisibility;
  topicData.value = row.data.topic;
  console.log(row);
};

const filteredTableData = computed(() => {
  return tableFilter.value
    ? tableData.value.filter(
        (data) =>
          data?.division?.toString().includes(tableFilter.value) ||
          data?.venue?.toLowerCase().includes(tableFilter.value) ||
          data?.date?.toLowerCase().includes(tableFilter.value) ||
          data?.time?.toLowerCase().includes(tableFilter.value) ||
          data?.affirmativeTeam?.toLowerCase().includes(tableFilter.value) ||
          data?.negativeTeam?.toLowerCase().includes(tableFilter.value) ||
          data?.topic?.toLowerCase().includes(tableFilter.value) ||
          data?.status?.toLowerCase().includes(tableFilter.value)
      )
    : tableData.value;
});

const editMode = ref(false);
const handleRowEdit = (row) => {
  editMode.value = true;
  form.value = row;
};

const updateMatchup = () => {
  matchupStore.updateMatchups(
    levelSelected,
    form.value,
    route.params.tournamentId
  );
  editMode.value = false;
};
</script>

<template>
  <Modal
    :modal-visibility="modalVisibility"
    size="w-8/12"
    @close="
      () => {
        modalVisibility = false;
      }
    "
  >
    <p class="m-8">{{ topicData }}</p>
  </Modal>

  <Modal
    :modal-visibility="editMode"
    size="w-8/12"
    @close="
      () => {
        editMode = false;
      }
    "
  >
    <Header title-text="Edit Matchup" />
    <form class="px-10 pt-2" @submit.prevent="">
      <FormField
        v-model="form.affirmativeTeam"
        label="Affirmative Team"
        placeholder="Affirmative Team"
      />
      <FormField
        v-model="form.negativeTeam"
        label="Negative Team"
        placeholder="Negative Team"
      />
      <div class="grid grid-cols-2 gap-x-4">
        <div>
          <FormField
            v-model="form.date"
            label="Date"
            placeholder="Enter the Date"
          />
        </div>
        <div>
          <FormField
            v-model="form.time"
            label="Time"
            placeholder="Enter the Time"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-x-4">
        <div>
          <FormField
            v-model="form.division"
            label="Division"
            placeholder="Enter the Division"
          />
        </div>
        <div>
          <FormField
            v-model="form.round"
            label="Round"
            placeholder="Select a Round"
          />
        </div>
      </div>
      <FormField
        v-model="form.venue"
        label="Venue"
        placeholder="Enter a Venue Name"
      />
      <label class="heading-montserrat">Topic</label>
      <textarea
        v-model="form.topic"
        placeholder="Change the topic"
        class="p-1 pl-2.5 mb-2.5 border border-solid border-light-grey rounded-md w-full placeholder:heading-montserrat heading-montserrat"
      ></textarea>
      <div class="flex justify-evenly w-full my-5">
        <Button
          button-text="Delete"
          button-color="bg-pink-100"
          type="Submit"
          class="text-red-700"
        />
        <Button
          button-text="Update"
          button-color="bg-gold"
          type="Update"
          @click="updateMatchup"
        />
      </div>
    </form>
  </Modal>

  <Tabs :tabs="levelTabs" font-size="text-xl" @handle-tab="handleLevel" />
  <div class="flex items-center justify-center w-full">
    <SearchBar @handle-filter="handleFilter" />
  </div>
  <Tabs
    v-if="!isLoading"
    :key="levelTabsKey"
    :tabs="roundTabs"
    font-size="text-base"
    @handle-tab="handleRound"
  />
  <div v-if="!isLoading" class="flex justify-center w-full">
    <Table
      :headers="headers"
      :data="filteredTableData"
      :can-edit="false"
      no-data-text="Please select a round"
      :score-board="true"
      @edit="handleEdit"
    >
      <template #edit="{ row }">
        <button @click.prevent="handleRowEdit(row)">
          <PencilIcon class="w-4 h-4" />
        </button>
      </template>
    </Table>
  </div>
</template>
