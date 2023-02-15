<template>
  <div class="h-64 p-2 px-5 mt-4 rounded-md bg-light-grey/10">
    <div class="flex justify-between">
      <div class="flex">
        <p class="my-auto text-xl">Division {{ divisionNumber }}</p>
        <p class="flex items-center px-2 text-xs text-mid-grey font-montserrat">
          (8 teams)
        </p>
      </div>
      <button
        :disabled="currentVenue ? false : true"
        @click.prevent="handleAdd(division)"
      >
        <PlusIcon
          :class="[
            `w-6 h-6`,
            currentVenue ? 'bg-light-orange-gold' : 'bg-mid-grey/20',
            'rounded-full',
          ]"
        />
      </button>
    </div>
    <Dropdown
      class="my-4"
      v-model="currentVenue"
      :items="venues"
      placeholder="Select Venue"
      :isVenue="true"
    />
    <div v-for="team in teamStore.allocatedTeams.values()" :key="team.id">
      <Chip
        v-if="team.division == divisionNumber"
        :text="team.name"
        size="small"
        :bg-color="venuePreferenceColor(team)"
        @remove-chip="unallocateTeam"
      />
    </div>
  </div>
</template>
<script setup>
import { PlusIcon } from "@heroicons/vue/24/solid";
import { useTeamStore } from "../../stores/teams";

const props = defineProps({
  division: {
    type: Object,
    default: () => ({}),
  },
  level: {
    type: String,
    default: "",
  },
  tournamentId: {
    type: String,
    default: "",
  },
  venues: {
    type: Array,
    default: () => [],
  },
});

const teamStore = useTeamStore();
const divisionNumber = ref(props.division.division);

const currentVenue = ref(null);

const divisionVenue = props.division.venue;

if (divisionVenue) {
  const matchingVenue = props.venues.find(
    (venue) =>
      venue.name === divisionVenue.name &&
      venue.week === divisionVenue.week &&
      venue.day === divisionVenue.day
  );
  currentVenue.value = matchingVenue;
}

const emit = defineEmits(["edit"]);

const handleAdd = (division) => {
  emit("edit", {
    editMode: true,
    modalVisibility: true,
    data: division.division,
    venue: currentVenue.value,
  });
};
/* TODO:
  - store division data when updated with venue and teams in store then it will update on submit
*/
const unallocateTeam = (name) => {
  const team = Array.from(teamStore.allocatedTeams.values()).find(
    (team) => team.name === name
  );
  if (team) {
    teamStore.allocatedTeams.delete(
      Array.from(teamStore.allocatedTeams.keys()).find(
        (key) => teamStore.allocatedTeams.get(key) === team
      )
    );
    team.division = null;
    teamStore.unallocatedTeams.set(team.id, team);
  }
};

const updateDivisions = async () => {
  console.log("SUBMITING");
  await teamStore.updateTeamDivision();
};

const venuePreferenceColor = (team) => {
  // Venue Preferences
  const isFirstPref = currentVenue.value.name === team.venuePreference[0];
  const isSecondPref = currentVenue.value.name === team.venuePreference[1];
  const isThirdPref = currentVenue.value.name === team.venuePreference[2];
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
