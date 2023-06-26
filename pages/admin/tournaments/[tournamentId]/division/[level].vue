<template>
  <Header title-text="Manage Division" :subtitle-text="route.params.level" />
  <section class="mx-6">
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
        v-for="(d, idx) in tournamentStore.divisions"
        :key="idx"
        :division="d"
        :tournament-id="tournamentStore.currentTournament.id"
        :level="currentLevel"
        :venues="tournamentStore.currentTournament.venues"
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
            :bg-color="venuePreferenceColor(team)"
            :can-remove="false"
            class="mx-2 my-2"
            @add-chip="allocateTeam"
          />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { PlusIcon } from "@heroicons/vue/24/solid";
import { useTournamentStore } from "~/stores/tournaments";
import { useTeamStore } from "~/stores/teams";
import { onMounted, ref } from "vue";
import useNotification from "../../../../../composables/useNotification";

// eslint-disable-next-line no-undef
const route = useRoute();

const tournamentStore = useTournamentStore();
const notification = useNotification();
const teamStore = useTeamStore();

const initialState = { division: 1, venue: null, teams: null };

const currentLevel = ref(route.params.level);

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
};

const updateDivisions = async () => {
  try {
    await teamStore.updateTeamDivision();
    await tournamentStore.updateDivisionVenue(route.params.level);
  } catch {
    notification.notifyError("Problem updating divisions and team divisions");
    return;
  }
  notification.notifySuccess(
    "Updated divisions and team divisions successfully"
  );
};

onMounted(async () => {
  try {
    teamStore.sortTeamDivisionAllocation(route.params.level);
    tournamentStore.getTournamentDivisionsByLevel(currentLevel.value);

    if (tournamentStore.divisions === undefined) {
      tournamentStore.divisions = [];
      tournamentStore.divisions.push({ ...initialState });
    }
  } catch (error) {
    notification.notifyError(error);
  }
});

const modalVisibility = ref(false);
const editMode = ref(false);
const division = ref("");
const venue = ref("");
const currentVenue = ref(null);

const handleEdit = (divisions) => {
  modalVisibility.value = divisions.modalVisibility;
  editMode.value = divisions.editMode;
  division.value = divisions.data;
  currentVenue.value = divisions.venue;

  venue.value =
    currentVenue.value.name +
    " " +
    currentVenue.value.day +
    " W" +
    currentVenue.value.week;
};

const venuePreferenceColor = (team) => {
  // Venue Preferences
  const isFirstPref = currentVenue.value.name === team.venuePreference[0];
  // const isSecondPref = currentVenue.value.name === team.venuePreference[1];
  // const isThirdPref = currentVenue.value.name === team.venuePreference[2];
  // Day Preferences
  const hasTuesPref = currentVenue.value.day === "Tuesday" && team.allocatedTue;
  const hasWedPref =
    currentVenue.value.day === "Wednesday" && team.allocatedWed;
  const isDayPref = hasTuesPref || hasWedPref;
  // Week Preferences
  const isWeekPref =
    team.weekPreference.includes(currentVenue.value.week) ||
    team.weekPreference === "Either";
  // Team is happy with anything
  // todo change to !team.hasVenuePreference (dummy data has wrong boolean value)
  const noPref =
    team.hasVenuePreference &&
    team.weekPreference === "Either" &&
    hasWedPref &&
    hasTuesPref;
  // todo change to !team.hasVenuePreference (dummy data has wrong boolean value)
  if ((isFirstPref || team.hasVenuePreference) && isDayPref && isWeekPref) {
    return "bg-light-green/20";
  } else if (isDayPref) {
    return "bg-light-orange-gold/40";
  } else if (noPref) {
    return "bg-white";
  } else {
    return "bg-danger-red/20";
  }
};
</script>
