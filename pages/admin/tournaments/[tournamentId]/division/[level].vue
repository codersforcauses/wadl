<template>
  <Header title-text="Manage Division" />
  <section class="mx-6">
    <!-- Division Controls -->
    <div
      class="flex justify-between w-full p-2 px-5 mt-4 rounded-md bg-light-grey/10"
    >
      <div class="flex flex-row justify-center">
        <Button button-text="Auto Allocate" size="medium" class="my-2 mr-2" />
        <Button
          button-text="Allocate Bye"
          button-color="bg-light-orange-gold"
          size="medium"
          class="my-2"
        />
      </div>
      <div class="flex flex-row justify-center">
        <div class="flex flex-col justify-center">
          <p class="mx-auto text-2xl font-montserrat">
            {{ teamStore.unallocatedTeams.size
            }}<span class="text-xs"
              >/{{ teamStore.getNumberTeams(route.params.level) }}</span
            >
          </p>
          <p class="text-[9px] text-mid-grey font-montserrat">
            Remaining Teams
          </p>
        </div>
        <Button
          button-text="Submit"
          button-color="bg-light-green"
          text-color="text-white"
          size="medium"
          class="my-2 ml-5"
          @click="updateDivisions"
        />
      </div>
    </div>
    <div
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <DivisionPanel
        v-for="(division, idx) in tournamentStore.divisions"
        :key="idx"
        :division="division"
        :tournament-id="tournamentStore.currentTournament.id"
        :level="currentLevel"
        @edit="handleEdit"
      />

      <div
        class="flex items-center justify-center h-64 p-2 px-5 mt-4 border-2 rounded-md bg-light-grey/10 border-light-grey/20"
        @click="addNewDivision"
      >
        <PlusIcon class="w-12 h-12 cursor-pointer text-light-grey/30" />
      </div>
    </div>
  </section>
  <Modal
    :modal-visibility="modalVisibility"
    size="w-9/12"
    @close="
      () => {
        modalVisibility = false;
      }
    "
  >
    <div class="h-96">
      <h1 class="py-4 text-3xl text-center font-montserrat">
        Division {{ division }}
      </h1>
      <p
        class="mb-2 text-sm text-center divide-y-4 font-montserrat text-mid-grey"
      >
        {{ venue }}
      </p>
      <p
        v-if="teamStore.unallocatedTeams.size == 0"
        class="w-full text-center font-montserrat text-light-grey/60"
      >
        No teams to allocate
      </p>
      <div class="container p-1 mx-auto">
        <div class="flex flex-wrap justify-center">
          <Chip
            v-for="team in teamStore.unallocatedTeams.values()"
            :key="team.id"
            :text="team.name"
            size="small"
            :bg-color="venuePreferenceColor"
            :canRemove="false"
            @remove-chip="allocateTeam"
            class="mx-2 my-2"
          />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
/* TODO:
  - Update firebase (divisions document)
*/

import { PlusIcon } from "@heroicons/vue/24/solid";
import { useTournamentStore } from "~/stores/tournaments";
import { useTeamStore } from "~/stores/teams";
import { useVenueStore } from "~/stores/venues";
import { onMounted, onBeforeMount } from "vue";
import useNotification from "../../../../../composables/useNotification";

// eslint-disable-next-line no-undef
const route = useRoute();

const tournamentStore = useTournamentStore();
const notification = useNotification();
const teamStore = useTeamStore();
const venueStore = useVenueStore();

console.log("ROUTE PARAMS TOURNY", route.params.tournamentId);
console.log("ROUTE PARAMS LEVEL", route.params.level);

const initialState = { division: 1, venue: null, teams: null };

const currentLevel = ref(route.params.level);
const flattenVenueData = ref([]);
const isLoading = ref(true);

const addNewDivision = () => {
  const newState = {
    division: tournamentStore.divisions.length + 1,
    venue: null,
    teams: null,
  };
  tournamentStore.divisions.push(newState);
};

const allocateTeam = (name) => {
  const team = Array.from(teamStore.unallocatedTeams.values()).find(
    (team) => team.name === name
  );
  if (team) {
    teamStore.unallocatedTeams.delete(
      Array.from(teamStore.unallocatedTeams.keys()).find(
        (key) => teamStore.unallocatedTeams.get(key) === team
      )
    );
    team.division = division.value;
    teamStore.allocatedTeams.set(team.id, team);
  }
  console.log("%$^#allocated$%^", teamStore.allocatedTeams);
  console.log("unallocated", teamStore.unallocatedTeams);
};

const updateDivisions = async () => {
  console.log("SUBMITING");
  await teamStore.updateTeamDivision();
};

onMounted(async () => {
  try {
    teamStore.sortTeamDivisionAllocation(route.params.level);

    tournamentStore.getTournamentDivisionsByLevel(currentLevel.value);
    console.log("^^^^", tournamentStore);
    if (tournamentStore.divisions === undefined) {
      console.log("PUSHING");
      tournamentStore.divisions = [];
      tournamentStore.divisions.push({ division: 1, venue: null, teams: null });
      console.log(tournamentStore.divisions);
    }

    tournamentStore.currentTournament.venues.forEach(
      ({ week, day, venueIds }) => {
        venueIds.forEach((v) => venueStore.getVenuesById(v, week, day));
      }
    );
    isLoading.value = false;
    console.log("HELLLOOO FLATTT", venueStore.tournamentVenues);
  } catch (error) {
    notification.notifyError(error);
  }
});

const modalVisibility = ref(false);
const editMode = ref(false);
const division = ref("");
const venue = ref("");

const handleEdit = (divisions) => {
  modalVisibility.value = divisions.modalVisibility;
  editMode.value = divisions.editMode;
  division.value = divisions.data;
  const divVenue = divisions.venue;
  console.log("RWERWRTERTEERTERT", divisions.venue.name);
  venue.value = divVenue.name + " " + divVenue.day + " W" + divVenue.week;
};
</script>
