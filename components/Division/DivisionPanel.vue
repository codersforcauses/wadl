<template>
  <div class="bg-light-grey/10 mt-4 p-2 px-5 rounded-md h-64">
    <div class="flex justify-between">
      <div class="flex">
        <p class="text-xl my-auto">Division {{ divisionNumber }}</p>
        <p class="text-xs text-mid-grey font-montserrat flex items-center px-2">
          (8 teams)
        </p>
      </div>
      <button @click.prevent="handleAdd(division)">
        <PlusIcon class="w-6 h-6 bg-light-orange-gold rounded-full" />
      </button>
    </div>
    <Dropdown
      class="my-4"
      v-model="currentVenue"
      :items="flattenVenueData"
      placeholder="Select Venue"
      :isVenue="true"
    />
    <div v-for="team in teamStore.allocatedTeams.values()" :key="team.id">
      <Chip
        v-if="team.division == divisionNumber"
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
import { useTournamentStore } from "../../stores/tournaments";
import { useVenueStore } from "../../stores/venues";

const props = defineProps({
  division: {
    type: Object,
    default: () => {},
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

console.log("THE DIV", props.division);
const venueStore = useVenueStore();
const teamStore = useTeamStore();
const divisionNumber = ref(props.division.division);

const flattenVenueData = ref([]);
const currentVenue = ref("");

props.venues.forEach(({ week, day, venueIds }) => {
  return venueIds.map((v) =>
    Promise.resolve(
      venueStore.getVenuesById(v, week, day).then((val) => {
        const venueData = val.name + " " + val.week + " " + val.day;
        flattenVenueData.value.push(venueData);
      })
    )
  );
});

const emit = defineEmits(["edit"]);

const handleAdd = (division) => {
  emit("edit", {
    editMode: true,
    modalVisibility: true,
    data: division.division,
    venue: currentVenue,
  });
};
/* TODO:
  - Change chip color based on venue preference
  - convert venues back into venueData object { name: "abc", day: "tue", week: 1}
  - store division data when updated with venue and teams in store then it will update on submit
  - update (8 teams) Number of teams currently in that division
*/
// console.log("**TEAM DIV*", teamStore.divisions);
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
