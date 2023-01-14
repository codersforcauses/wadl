<script setup>
import { ref } from "vue";
import ProfileInfo from "~/components/admin/ProfileInfo.vue";
import Table from "~/components/Coordinator/Table.vue";
import Modal from "~/components/Modal/Modal.vue";

const modalVisibility = ref(false);
const currentTeam = ref("Perth Modern");

const teamState = {
  levelPresent: false,
  numberOfTeams: 0,
  tuesdayAllocation: 0,
  wednesdayAllocation: 0,
};
const formInput = ref({
  tournament: null,
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
  modalVisibility.value = false;
};
</script>

<template>
  <Modal :modal-visibility="modalVisibility" @close="modalVisibility = false">
    <p class="text-3xl heading-montserrat font-bold px-6 py-3 text-center">
      Team Registration
    </p>
    <div class="px-10">
      <p
        class="text-2xl font-semibold heading-montserrat px-6 py-2 text-slate-500 text-center"
      >
        {{ currentTeam }}
      </p>
      <hr class="mx-8 h-0.5 bg-slate-500 my-1 border-0" />
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
        <div class="flex justify-evenly items-center">
          <Button
            class="my-3 w-9/12"
            button-color="bg-gold"
            button-text="Save"
            type="Submit"
            @click="saveTeamRegistration"
          />
        </div>
      </form>
    </div>
  </Modal>
  <ProfileInfo username="Carmen Leong" role="Admin" />
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
