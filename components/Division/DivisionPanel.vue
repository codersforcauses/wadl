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
    <Dropdown
      class="my-4"
      v-modal="currentVenue"
      :items="venues"
      placeholder="Select Venue"
      :isVenue="true"
    />
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
import { useVenueStore } from "../../stores/venues";

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
  - Change chip color based on venue preference
  - convert venues back into venueData object { name: "abc", day: "tue", week: 1}
  - store division data when updated with venue and teams in store then it will update on submit


*/

// TODO Get from tournament structure under division - This currently doesnt display in the dropdown because they arent real ids
// swap this for the actual data
const venueData = [
  {
    week: 1,
    day: "Tuesday",
    venue: "0QF7MLBkUDAvuqxfU73n",
  },
  {
    week: 1,
    day: "Tuesday",
    venue: "0kxcHd49GSKvLhRwsir7",
  },
  {
    week: 1,
    day: "Wednesday",
    venue: "0kxcHd49GSKvLhRwsir7",
  },
  {
    week: 1,
    day: "Wednesday",
    venue: "0QF7MLBkUDAvuqxfU73n",
  },
  { week: 2, day: "Wednesday", venue: "8fdv4qUT1hcbSPP95Omu" },
  {
    week: 2,
    day: "Tuesday",
    venue: "0kxcHd49GSKvLhRwsir7",
  },
  {
    week: 2,
    day: "Tuesday",
    venue: "8fdv4qUT1hcbSPP95Omu",
  },
];

const teamStore = useTeamStore();
const venueStore = useVenueStore();
const venues = ref([]);
const currentVenue = ref("");

const handleVenues = () => {
  venueData.forEach((v) => {
    Promise.resolve(
      venueStore.getVenuesById(v.venue, v.week, v.day).then((val) => {
        console.log(val);
        const venueData = val.name + " " + val.week + " " + val.day;
        venues.value.push(venueData);
      })
    );
  });
};

handleVenues();

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
