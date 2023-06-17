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
      no-data-text="No Matchups to approve"
      :score-board="true"
      @edit="handleEdit"
    >
    <template #scoreboard="{ row }">
        <NuxtLink
          :to="`/admin/tournaments/${route.params.tournamentId}/matchups-approve/scoresheet/${row.id}`"
        >
          <TableCellsIcon class="w-[28px] h-[28px]" />
        </NuxtLink>
      </template>
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
import { useMatchupStore } from "../../../../../stores/matchups";
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "#imports";
import useNotification from "../../../../../composables/useNotification";
import { useTournamentStore } from "../../../../../stores/tournaments";
import { TableCellsIcon } from "@heroicons/vue/24/outline";

onMounted(async () => {
  try {
    selectedTournament = await tournamentStore.getRunning.find(
      (tournament) => tournament.id === route.params.tournamentId
    );
    selectedRound = parseInt(selectedTournament?.currentRound);
    await createRoundTabs();
    await matchupStore.getMatchups(route.params.tournamentId);
    await handleMatchups();
  } catch (error) {
    console.log(error);
    notification.notifyError(
      "There has been an error please try again or contact cfc for help."
    );
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
const selectedLevel = ref();
const pendingMatchups = ref(null);
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
  await matchupStore.sortPendingMatchups();
  matchups = matchupStore.pendingMatchups;
  if (matchups.length === 0) {
    notification.notifySuccess("No Matchups to approve");
  } else {
    matchups.forEach((info) => {
      if (info.level === "junior") {
        junior.value = info.junior;
      } else if (info.level === "novice") {
        novice.value = info.novice;
      } else if (info.level === "senior") {
        senior.value = info.senior;
      }
    });
    selectedLevel.value = novice.value;
  }
  await getFixturesTableData();
};

const handleClose = () => {
  if (pendingMatchups.value) {
    notification.dismiss();
  } else {
    notification.dismiss();
    router.back();
  }
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
    selectedLevel.value = junior.value;
  } else if (levelSelected === "Novice") {
    selectedLevel.value = novice.value;
  } else {
    selectedLevel.value = senior.value;
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
  if (selectedLevel.value === undefined) {
    notification.notifySuccess("No Matchups to approve for this level");
    pendingMatchups.value = true;
  } else {
    selectedLevel.value.forEach((matchup) => {
      if (parseInt(matchup.round) === selectedRound) {
        tableData.value.push(matchup);
      }
    });
  }
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
