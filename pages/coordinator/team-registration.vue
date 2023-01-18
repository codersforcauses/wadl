<script setup>
import { ref } from "vue";
import { useInstitutionStore } from "../../stores/institutions";
const institutionStore = useInstitutionStore();
const currentTeam = ref("Perth Modern");
const venuePreferenceLabels = ref([
  "1st Preference",
  "2nd Preference",
  "3rd Preference",
]);

const teamState = {
  levelPresent: false,
  numberOfTeams: 0,
  tuesdayAllocation: 0,
  wednesdayAllocation: 0,
  weekPreference: null,
};
const formInput = ref({
  tournament: null,
  hasVenuePreference: false,
  venuePreferences: [],
  notes: null,
  teams: [
    { teamLevel: "Novice", ...teamState },
    { teamLevel: "Junior", ...teamState },
    { teamLevel: "Senior", ...teamState },
  ],
});
const updateLevels = (chips) => {
  // if level no longer selected, delete form data for corresponding level
  formInput.value.teams = formInput.value.teams.map((team) => {
    if (chips.includes(team.teamLevel)) {
      return { ...team, levelPresent: true };
    } else {
      return { teamLevel: team.teamLevel, ...teamState };
    }
  });
};
const saveTeamRegistration = async () => {
  // TODO:
  // Perform validation
  // POST to backend
  institutionStore.registerTeam(formInput.value);
  // resetForm();
};
// commenting it out for now because we might need it in the future
// const resetForm = () => {
//   formInput.value = {
//     tournament: null,
//     hasVenuePreference: false,
//     venuePreferences: [],
//     notes: null,
//     teams: [
//       { teamLevel: "Novice", ...teamState },
//       { teamLevel: "Junior", ...teamState },
//       { teamLevel: "Senior", ...teamState },
//     ],
//   };
// };
</script>

<template>
  <p class="text-4xl heading-montserrat px-6 pt-5 py-3 text-center">
    Team Registration
  </p>
  <div class="px-10">
    <p
      class="text-2xl font-semibold heading-montserrat px-6 py-2 text-mid-grey text-center"
    >
      {{ currentTeam }}
    </p>
    <hr class="pb-3" />
    <div class="flex justify-center">
      <form class="md:w-7/12" @submit.prevent="saveTeamRegistration()">
        <FormField v-model="formInput.tournament" label="Tournament" />
        <label class="heading-montserrat">Level</label>
        <Multiselect
          :items="
            formInput.teams.map((t) => {
              return t.teamLevel;
            })
          "
          @change="updateLevels"
        />
        <div class="flex items-center pt-5 pb-3">
          <label class="heading-montserrat text-lg font-medium">
            Number of Teams
          </label>
          <hr class="h-px ml-2 flex-1" />
        </div>
        <div class="flex flex-row space-x-3">
          <div v-for="team in formInput.teams" :key="team.teamLevel">
            <FormField
              v-model="team.numberOfTeams"
              type="number"
              :label="team.teamLevel"
              :disabled="!team.levelPresent"
            />
          </div>
        </div>
        <div class="flex items-center pt-5 pb-3">
          <label class="heading-montserrat text-lg font-medium">
            Week Preference
          </label>
          <hr class="h-px ml-2 flex-1" />
        </div>
        <div class="flex flex-row space-x-3">
          <Select
            v-for="team in formInput.teams"
            :key="team.teamLevel"
            v-model="team.weekPreference"
            :options="['Week 1', 'Week 2', 'Either']"
            :label="team.teamLevel"
            class="w-full"
            :disabled="!team.levelPresent"
          />
        </div>
        <div class="flex items-center pt-5 pb-3">
          <label class="heading-montserrat text-lg font-medium">
            Tuesday Allocation
          </label>
          <hr class="h-px ml-2 flex-1" />
        </div>
        <div class="flex flex-row space-x-3">
          <div v-for="team in formInput.teams" :key="team.teamLevel">
            <FormField
              v-model="team.tuesdayAllocation"
              type="number"
              :label="team.teamLevel"
              :disabled="!team.levelPresent"
            />
          </div>
        </div>
        <div class="flex items-center pt-5 pb-3">
          <label class="heading-montserrat text-lg font-medium">
            Wednesday Allocation
          </label>
          <hr class="h-px ml-2 flex-1" />
        </div>
        <div class="flex flex-row space-x-3">
          <div v-for="team in formInput.teams" :key="team.teamLevel">
            <FormField
              v-model="team.wednesdayAllocation"
              type="number"
              :label="team.teamLevel"
              :disabled="!team.levelPresent"
            />
          </div>
        </div>
        <div class="flex flex-row accent-gold mt-5">
          <input
            v-model="formInput.hasVenuePreference"
            type="checkbox"
            class="w-5 h-5"
          />
          <label class="ml-3 heading-montserrat"
            >Do you have a venue preference?</label
          >
        </div>
        <div v-if="formInput.hasVenuePreference" class="pb-5">
          <div class="flex items-center pt-5 pb-3">
            <label class="heading-montserrat text-lg font-medium">
              Venue Preferences
            </label>
            <hr class="h-px ml-2 flex-1" />
          </div>
          <div class="flex flex-row space-x-3">
            <div v-for="(pref, idx) in venuePreferenceLabels" :key="idx">
              <FormField
                v-model="formInput.venuePreferences[idx]"
                placeholder="Enter Preference"
                :label="venuePreferenceLabels[idx]"
              />
            </div>
          </div>
        </div>
        <label class="heading-montserrat">Notes </label>
        <textarea
          v-model="formInput.notes"
          placeholder="Enter any notes"
          class="p-1 pl-2.5 mb-2.5 border border-solid border-light-grey rounded-md w-full placeholder:heading-montserrat heading-montserrat"
        ></textarea>

        <div class="flex justify-evenly items-center mb-2">
          <Button
            class="my-3"
            button-color="bg-gold"
            button-text="Save"
            type="Submit"
          />
        </div>
      </form>
    </div>
  </div>
</template>
