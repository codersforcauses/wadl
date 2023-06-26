<script setup>
import { ref, computed, onMounted } from "vue";
import { useTournamentStore } from "../../stores/tournaments";
import { useMatchupStore } from "../../stores/matchups";
import { useRoute } from "#imports";

const tournamentStore = useTournamentStore();
const matchupStore = useMatchupStore();
const route = useRoute();
const isLoading = ref(true);
const modalVisibility = ref(false);
const topicData = ref(null);

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
];
const levelTabs = [
  { label: "Novice", active: true },
  { label: "Junior", active: false },
  { label: "Senior", active: false },
];
const roundTabs = [];

let levelSelected = "Novice";
let levelTabsKey = 0;

const selectedLevel = ref(matchupStore.novice);
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
  selectedLevel.value[0].forEach((matchup) => {
    if (parseInt(matchup.round) === selectedRound) {
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
      @edit="handleEdit"
    />
  </div>
</template>
