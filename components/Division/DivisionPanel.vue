<template>
  <div class="bg-light-grey/10 mt-4 p-2 px-5 rounded-md h-64">
    <div class="flex justify-between">
      <div class="flex">
        <p class="text-xl my-auto">Division {{ divisionNumber }}</p>
        <p class="text-xs text-mid-grey font-montserrat flex items-center px-2">
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
      v-if="!isLoading"
      class="my-4"
      v-model="currentVenue"
      :items="venueStore.tournamentVenues"
      :selected="currentVenue"
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
import { reactive } from "vue";

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
});

const venueStore = useVenueStore();
const teamStore = useTeamStore();
const tournamentStore = useTournamentStore();
const divisionNumber = ref(props.division.division);

const currentVenue = ref("");
const isLoading = ref(true);

onMounted(() => {
  console.log("DIV venue", props.division.venue);
  const divisionVenue = props.division.venue;
  console.log("IS THERE VENUE DATA, PROBS NOT", venueStore.tournamentVenues);
  if (divisionVenue) {
    venueStore.tournamentVenues.forEach((venue) => {
      if (
        venue.name === divisionVenue.name &&
        venue.week === divisionVenue.week &&
        venue.day === divisionVenue.day
      ) {
        console.log("MATCH FOUND");
        currentVenue.value = venue;
      }
    });
  }
  isLoading.value = false;
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
  - store division data when updated with venue and teams in store then it will update on submit
  - update (8 teams) Number of teams currently in that division
  - Venue not displaying in dropdown  when it already exists for that division
*/

// todo make sure perferences match current venue
// green if name, venue, day is a 1st preference
// yellow if day is a preference
// red if no preference/ did not have this preference
// white if has no preferences
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
