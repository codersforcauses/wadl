<script setup>
import { ref } from "vue";
import ProfileInfo from "~/components/admin/ProfileInfo.vue";
import Table from "~/components/Coordinator/Table.vue";

const modalVisibility = ref(false);
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
  venuePreferences: [],
};
const formInput = ref({
  tournament: null,
  hasVenuePreference: false,
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
  console.log(formInput.value);
  console.log("Team Saved!");
  resetModal();
};
const resetModal = () => {
  formInput.value = {
    tournament: null,
    teams: [
      { teamLevel: "Novice", ...teamState },
      { teamLevel: "Junior", ...teamState },
      { teamLevel: "Senior", ...teamState },
    ],
  };
};
</script>

<template>
  <Modal
    :modal-visibility="modalVisibility"
    @close="
      () => {
        modalVisibility = false;
        resetModal();
      }
    "
  >
    <p class="text-3xl heading-montserrat font-bold px-6 py-3 text-center">
      Team Registration
    </p>
    <div class="px-10">
      <p
        class="text-2xl font-semibold heading-montserrat px-6 py-2 text-mid-grey text-center"
      >
        {{ currentTeam }}
      </p>
      <hr class="pb-3" />
      <form @submit.prevent="modalVisibility = false">
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
        <label class="heading-montserrat"> Number of Teams </label>
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
        <label class="heading-montserrat"> Week Preference </label>
        <div class="flex flex-row space-x-3">
          <Select
            v-for="team in formInput.teams"
            :key="team.teamLevel"
            v-model="team.weekPreference"
            :options="['Week 1', 'Week 2', 'Either']"
            label="Novice"
            class="w-full"
            :disabled="!team.levelPresent"
          />
        </div>
        <label class="heading-montserrat"> Tuesday Allocation </label>
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
        <label class="heading-montserrat"> Wednesday Allocation </label>
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
        <div class="flex flex-row accent-gold my-3">
          <input
            v-model="formInput.hasVenuePreference"
            type="checkbox"
            class="w-5 h-5"
          />
          <label class="ml-3 heading-montserrat"
            >Do you have a venue preference?</label
          >
        </div>
        <div v-if="formInput.hasVenuePreference">
          <label class="heading-montserrat"> Venue Preference </label>
          <div class="flex flex-row space-x-3">
            <div v-for="(team, idx) in formInput.teams" :key="team.teamLevel">
              <FormField
                v-model="team.venuePreferences[idx]"
                type="text"
                :disabled="!team.levelPresent"
                :placeholder="venuePreferenceLabels[idx]"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-evenly items-center mb-2">
          <Button
            class="my-3"
            button-color="bg-gold"
            button-text="Save"
            type="Submit"
            @click="
              () => {
                modalVisibility = false;
                saveTeamRegistration();
              }
            "
          />
        </div>
      </form>
    </div>
  </Modal>
  <ProfileInfo username="John Doe" role="Admin" />
  <Table :headings="['Teams', 'Level', 'Division']" />
  <div class="fixed inset-x-0 bottom-0 w-full bg-white">
    <div class="flex flex-row gap-4 m-5 justify-left">
      <Button
        button-text="Team Registration"
        button-color="bg-gold"
        class="transition duration-200 ease-in-out hover:bg-light-gold hover:shadow-lg"
        @click="modalVisibility = true"
      />
    </div>
  </div>
</template>
