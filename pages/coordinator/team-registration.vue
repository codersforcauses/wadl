<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../../stores/user";
import { useInstitutionStore } from "../../stores/institutions";
import { useTournamentStore } from "../../stores/tournaments";
import { navigateTo, useHead } from "#imports";
import useNotification from "../../composables/useNotification";
useHead({
  title: "Team Registration",
});
const institutionStore = useInstitutionStore();
const tournamentStore = useTournamentStore();
const userStore = useUserStore();
const tournaments = ref(null);

onMounted(async () => {
  try {
    await tournamentStore.getTournaments();
    await institutionStore.getInstitutionByID(userStore.institution);
  } catch (error) {
    notification.notifyError(error);
  }

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
  allocatedTue: 0,
  allocatedWed: 0,
  weekPreference: null,
};
const formInput = ref({
  tournament: null,
  tournamentId: null,
  institutionId: null,
  hasVenuePreference: false,
  venuePreference: [],
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

// Notification Modal
const notification = useNotification();
const errorMessage = ref(null);

const saveTeamRegistration = async () => {
  // TODO:
  // Perform validation
  // POST to backend
  formInput.value.userTeam = institutionStore.userInstitution.name;
  try {
    await institutionStore.registerTeams(formInput.value);
  } catch (error) {
    errorMessage.value = error.message;
    return;
  }
  notification.notifySuccess("Successfully Created Teams!");
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
  formInput.value.tournament = data.name;
  formInput.value.tournamentId = data.id;
};

const redirect = () => {
  navigateTo("/coordinator");
};
</script>

<template>
  <p class="text-4xl heading-montserrat px-6 pt-8 text-center">
    Team Registration
  </p>
  <div v-if="tournaments" class="px-10">
    <p
      v-if="institutionStore.userInstitution"
      class="text-2xl heading-montserrat px-6 my-4 text-mid-grey text-center"
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
              v-model="team.allocatedTue"
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
              v-model="team.allocatedWed"
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
                v-model="formInput.venuePreference[idx]"
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
        <p v-if="errorMessage" class="text-danger-red">
          {{ errorMessage }}
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
  <Notification
    :modal-visibility="notification.isVisible"
    :is-success="notification.isSuccess"
    :body="notification.message"
    @close="
      () => {
        notification.dismiss();
        redirect();
      }
    "
  />
</template>
