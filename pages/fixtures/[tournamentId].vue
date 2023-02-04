<script setup>
import { ref } from "vue";
import { useTournamentStore } from "../../stores/tournaments";
import { useTeamStore } from "../../stores/teams";
import { useVenueStore } from "../../stores/venues";

const tournamentStore = useTournamentStore();
const teamStore = useTeamStore();
const venueStore = useVenueStore();
const route = useRoute();

onMounted(() => {
  teamStore.getTeams();
  venueStore.getVenues();
});

const headers = [
  {
    key: "div",
    title: "Div",
  },
  {
    key: "venue",
    title: "Venue",
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
    key: "affirmative",
    title: "Affirmative",
  },
  {
    key: "negative",
    title: "Negative",
  },
  {
    key: "topic",
    title: "Topic",
  },
];
const levelTabs = [
  { label: "Novice", active: false },
  { label: "Junior", active: true },
  { label: "Senior", active: false },
];
const roundTabs = tournamentStore.getRunning.reduce((arr, tournament) => {
  if (tournament.id === route.params.tournamentId) {
    let round = 1;
    while (round <= tournament.numRounds) {
      arr.push({ label: `Round ${round}`, active: false });
      round++;
    }
  }
  return arr;
}, []);

const hasNotSelectedRoundTab = ref(true);
const tableData = ref([]);
const levelSelected = ref("Junior");
const roundSelected = ref(undefined);
const levelTabsKey = ref(0);

const levelClicked = (tabName) => {
  levelSelected.value = tabName;
  tableData.value = [];
  levelTabsKey.value++;
  roundTabs.forEach((round) => (round.active = false));
  roundSelected.value = undefined;
  hasNotSelectedRoundTab.value = true;
};

const roundClicked = (roundName) => {
  tableData.value = [];
  hasNotSelectedRoundTab.value = false;
  roundSelected.value = parseInt(roundName.split("")[roundName.length - 1]);

  const selectedTournament = tournamentStore.getRunning.filter(
    (tournament) => tournament.id === route.params.tournamentId
  );

  const levelFound = selectedTournament[0].levels.filter(
    (lev) => lev.level === levelSelected.value
  );

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, "0");
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  levelFound[0].divisions.map((div) => {
    div.matchups.map((matchup) => {
      const date = new Date(matchup.datetime)
        .toDateString()
        .split(" ")
        .slice(0, 3)
        .join(" ");
      const time = formatTime(new Date(matchup.datetime));
      if (matchup.round === roundSelected.value) {
        const row = {
          div: div.division,
          venue: "",
          date,
          time,
          affirmative: teamStore.teams.find(
            (team) => team.id === matchup.affirmativeTeam
          ).name,
          negative: teamStore.teams.find(
            (team) => team.id === matchup.negativeTeam
          ).name,
          topic: matchup.topic,
        };
        console.log(row);
        tableData.value.push(row);
      }
    });
  });
};

const handleFilter = (searchTerm) => {
  tableData.value = tableData.value.filter(
    (data) =>
      data?.div.toString().toLowerCase().includes(searchTerm) ||
      data?.venue.toLowerCase().includes(searchTerm) ||
      data?.date.toLowerCase().includes(searchTerm) ||
      data?.time.toLowerCase().includes(searchTerm) ||
      data?.affirmative.toLowerCase().includes(searchTerm) ||
      data?.negative.toLowerCase().includes(searchTerm) ||
      data?.topic.toLowerCase().includes(searchTerm)
  );
};
</script>

<template>
  <Tabs :tabs="levelTabs" font-size="text-xl" @handle-tab="levelClicked" />
  <div class="flex items-center justify-center w-full">
    <SearchBar @handle-filter="handleFilter" />
  </div>
  <Tabs
    :tabs="roundTabs"
    font-size="text-base"
    @handle-tab="roundClicked"
    :key="levelTabsKey"
  />
  <Table
    :headers="headers"
    :data="tableData"
    :can-edit="false"
    no-data-text="Please select a round"
  />
</template>
