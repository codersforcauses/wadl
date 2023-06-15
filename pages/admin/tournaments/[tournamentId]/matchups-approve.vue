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
      :score-board="true"
      @edit="handleEdit"
    >
    </Table>
  </div>
  <Notification
    :modal-visibility="notification.isVisible"
    :is-success="notification.isSuccess"
    :body="notification.message"
    @close="handleClose()"
  />
</template>

<script setup>
import { useMatchupStore } from "../../../../stores/matchups";
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "#imports";
import useNotification from "../../../../composables/useNotification";
import { useTournamentStore } from "../../../../stores/tournaments";

onMounted(async () => {
  try {
    selectedTournament = await tournamentStore.getRunning.find(
      (tournament) => tournament.id === route.params.tournamentId
    );
    selectedRound = parseInt(selectedTournament?.currentRound);
    await createRoundTabs();
    await matchupStore.getMatchups(route.params.tournamentId);
    await handleMatchups();
    await getFixturesTableData();
  } catch (error) {
    console.log(error);
    //  uncomment out when finished testing
    // notification.notifyError(error);
  }
});

const tournamentStore = useTournamentStore();
const modalVisibility = ref(false);
const topicData = ref(null);
const notification = useNotification();
const route = useRoute();
const router = useRouter();
const matchupStore = useMatchupStore();
const isLoading = ref(true);
let matchups = [];
const junior = ref();
const senior = ref();
const novice = ref();
let selectedTournament = null;
let selectedRound = null;

const levelTabs = [
  { label: "Novice", active: true },
  { label: "Junior", active: false },
  { label: "Senior", active: false },
];
const roundTabs = [];

let levelSelected = "Novice";
let levelTabsKey = 0;
const selectedLevel = ref(novice);
const tableData = ref([]);
const tableFilter = ref("");

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
  {
    key: "scoreboard",
    title: "Scoreboard",
  },
];

const handleMatchups = async () => {
  matchups = matchupStore.sortMatchups;
  if (matchups.length === 0) {
    console.log("nothing");
    notification.notifySuccess("No Matchups to approve");
  } else {
    junior.value = matchups[0];
    senior.value = matchups[1];
    novice.value = matchups[2];
  }
};

const handleClose = () => {
  notification.dismiss();
  router.back();
};

const createRoundTabs = async () => {
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

const handleLevel = async (tabName) => {
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
    selectedLevel.value = junior;
  } else if (levelSelected === "Novice") {
    selectedLevel.value = novice;
  } else {
    selectedLevel.value = senior;
  }

  tableFilter.value = "";
  await getFixturesTableData();
};

const handleRound = async (roundName) => {
  tableData.value = [];
  selectedRound = parseInt(roundName.split("")[roundName.length - 1]);
  await getFixturesTableData();
};

const getFixturesTableData = async () => {
  // Used only for JSON fixtures
  // console.log(junior, novice, senior);
  selectedLevel.value.forEach((matchup) => {
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
