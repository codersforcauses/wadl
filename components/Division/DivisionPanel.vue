<template>
  <div class="min-h-64 p-2 px-5 mt-4 rounded-md bg-light-grey/10">
    <div class="flex justify-between">
      <div class="flex">
        <p class="my-auto text-xl">Division {{ divisionNumber }}</p>
        <p class="flex items-center px-2 text-xs text-mid-grey font-montserrat">
          ({{ getTeamCount }} teams)
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
      v-model="currentVenue"
      class="my-4"
      :items="venues"
      placeholder="Select Venue"
      :is-venue="true"
    />
    <div v-for="team in teamStore.allocatedTeams.values()" :key="team.id">
      <Chip
        v-if="team.division == divisionNumber"
        :text="team.name"
        size="small"
        :bg-color="venuePreferenceColor(team)"
      />
    </div>
    <Chip
        v-if="props.division.hasBye"
        text="Bye"
        size="small"
        bg-color="bg-white"
        :can-remove="true"
        class="my-2"
        @remove-chip="
        () => {
          props.division.hasBye = false;
        }
      "
      />
  </div>
</template>
<script setup>
import { PlusIcon } from "@heroicons/vue/24/solid";
import { useTeamStore } from "../../stores/teams";
import { useTournamentStore } from "../../stores/tournaments";
import { ref, watch, computed } from "vue";

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
const tournamentStore = useTournamentStore();
const divisionNumber = ref(props.division.division);

const currentVenue = ref(null);

const divisionVenue = ref(props.division.venue);

watch(currentVenue, (newValue, oldValue) => {
  if (oldValue) {
    tournamentStore.updateDivision(newValue, divisionNumber.value);
  }
});

const getTeamCount = computed(() => {
  props.division.teamCount = 0;
  teamStore.allocatedTeams.forEach((team) => {
    if (team.division === divisionNumber.value) {
      props.division.teamCount += 1;
    }
  });
  return props.division.teamCount;
});

if (divisionVenue.value) {
  const matchingVenue = props.venues.find(
    (venue) =>
      venue.name === divisionVenue.value.name &&
      venue.week === divisionVenue.value.week &&
      venue.day === divisionVenue.value.day
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
