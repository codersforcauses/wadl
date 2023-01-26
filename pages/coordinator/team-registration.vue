<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../../stores/user";
import { useInstitutionStore } from "../../stores/institutions";
import { useTournamentStore } from "../../stores/tournaments";
const institutionStore = useInstitutionStore();
const tournamentStore = useTournamentStore();
const userStore = useUserStore();
const tournaments = ref(null);

onMounted(async () => {
  await tournamentStore.getTournaments();
  await institutionStore.getInstitutionByID(userStore.institution);

  tournaments.value = tournamentStore.getOpen;
  formInput.value.institutionId = userStore.institution;
});

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
  tournamentId: null,
  institutionId: null,
  hasVenuePreference: false,
  venuePreferences: [],
  notes: null,
  userTeam: null,
  teams: [
    // TODO double check on the timeslot allocations
    { teamLevel: "Novice", timeslot: "5.15pm", ...teamState },
    { teamLevel: "Junior", timeslot: "6.15pm", ...teamState },
    { teamLevel: "Senior", timeslot: "7.15pm", ...teamState },
  ],
});
const updateLevels = (chips) => {
  // if level no longer selected, delete form data for corresponding level
  formInput.value.teams = formInput.value.teams.map((team) => {
    if (chips.includes(team.teamLevel)) {
      return { ...team, levelPresent: true };
    } else {
      return {
        teamLevel: team.teamLevel,
        ...teamState,
        timeslot: team.timeslot,
      };
    }
  });
};
const saveTeamRegistration = async () => {
  // TODO:
  // Perform validation
  // POST to backend
  formInput.value.userTeam = institutionStore.userInstitution.name;
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
const getInfo = (data) => {
  console.log("torni info", data);
  formInput.value.tournament = data.name;
  formInput.value.tournamentId = data.id;
};
</script>

<template>
  <p class="text-4xl heading-montserrat px-6 pt-5 py-3 text-center">
    Team Registration
  </p>
  <div v-if="tournaments" class="px-10">
    <p
      v-if="institutionStore.userInstitution"
      class="text-2xl font-semibold heading-montserrat px-6 py-2 text-mid-grey text-center"
    >
      {{ institutionStore.userInstitution.name }}
    </p>
    <hr class="pb-3" />
    <div class="flex justify-center">
      <form class="md:w-7/12" @submit.prevent="saveTeamRegistration()">
        <SearchSelect
          v-model="formInput.tournament"
          placeholder="Tournament"
          label="Tournament"
          :items="tournaments"
          @info="getInfo"
        />
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
        <p v-if="institutionStore.errorMessage" class="text-danger-red">
          {{ institutionStore.errorMessage }}
        </p>
        <p v-if="institutionStore.successMessage" class="text-black">
          {{ institutionStore.successMessage }}
        </p>
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
