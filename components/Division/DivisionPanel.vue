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
  - Change chip color based on venue preference
  - store division data when updated with venue and teams in store then it will update on submit
  - update (8 teams) to number of teams currently in that division
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
