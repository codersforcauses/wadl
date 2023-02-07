<template>
  <div class="bg-light-grey/10 mt-4 p-2 px-5 rounded-md h-64">
    <div class="flex justify-between">
      <div class="flex">
        <p class="text-xl my-auto">Division {{ division }}</p>
        <p class="text-xs text-mid-grey font-montserrat flex items-center px-2">
          (8 teams)
        </p>
      </div>
      <PlusIcon class="w-6 h-6 bg-light-orange-gold rounded-full" />
    </div>
    <Dropdown class="my-4" placeholder="Select Venue" />
    <div v-for="team in teamStore.divisions" :key="team.id">
      <Chip
        v-if="team.division == division"
        :text="team.name"
        size="small"
        :bg-color="venuePreferenceColor"
      />
    </div>
  </div>
</template>
<script setup>
import { PlusIcon } from "@heroicons/vue/24/solid";
import { useTeamStore } from "../../stores/teams";

const props = defineProps({
  division: {
    type: Number,
    default: 1,
  },
  level: {
    type: String,
    default: "",
  },
  tournamentId: {
    type: String,
    default: "",
  },
});

/* TODO:
  - Load venues into dropdown or multiselect (finding out this info from client). combine venue name and week, day available
  - Change chip color based on venue preference


*/

const teamStore = useTeamStore();

await teamStore.getTeamByTournamentDivision(
  props.tournamentId,
  props.level,
  props.division
);

// todo make sure perferences match current venue
const venuePreferenceColor = computed((preference) => {
  switch (preference) {
    case "pref1":
      return "bg-light-green/20";
    case "pref2":
      return "bg-light-orange-gold/40";
    case "pref3":
      return "bg-danger-red/20";
    default:
      return "bg-white";
  }
});
</script>
