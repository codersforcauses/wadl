<template>
  <Header title-text="Manage Division" />
  <section class="mx-6">
    <!-- Division Controls -->
    <div
      class="flex justify-between w-full bg-light-grey/10 mt-4 p-2 px-5 rounded-md"
    >
      <div class="flex flex-row justify-center">
        <Button button-text="Auto Allocate" size="medium" class="mr-2 my-2" />
        <Button
          button-text="Allocate Bye"
          button-color="bg-light-orange-gold"
          size="medium"
          class="my-2"
        />
      </div>
      <div class="flex flex-row justify-center">
        <div class="flex justify-center flex-col">
          <p class="text-2xl mx-auto font-montserrat">
            13<span class="text-xs">/20</span>
          </p>
          <p class="text-[9px] text-mid-grey font-montserrat">
            Remaining Teams
          </p>
        </div>
        <Button
          button-text="Submit"
          button-color="bg-light-green"
          text-color="text-white"
          size="medium"
          class="ml-5 my-2"
        />
      </div>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <DivisionPanel
        v-for="(division, idx) in tournamentStore.divisions"
        :key="idx"
        :division="division.division"
        :tournament-id="tournamentStore.currentTournament.id"
        :level="currentLevel"
        :venues="tournamentStore.currentTournament.venues"
      />

      <div
        class="flex justify-center items-center bg-light-grey/10 mt-4 p-2 px-5 rounded-md h-64 border-2 border-light-grey/20"
        @click="addNewDivision"
      >
        <PlusIcon class="w-12 h-12 text-light-grey/30 cursor-pointer" />
      </div>
    </div>
  </section>
</template>

<script setup>
/* TODO:
  - Handle first time allocating divisions
  - Update firebase (divisions and teams document)
  - Open Modal on plus click

*/
import { PlusIcon } from "@heroicons/vue/24/solid";
import { useTournamentStore } from "~/stores/tournaments";
import { useTeamStore } from "~/stores/teams";
import { onMounted } from "vue";
import useNotification from "../../../../../composables/useNotification";

// eslint-disable-next-line no-undef
const route = useRoute();

const tournamentStore = useTournamentStore();
const notification = useNotification();
const teamStore = useTeamStore();

console.log("ROUTE PARAMS TOURNY", route.params.tournamentId);
console.log("ROUTE PARAMS LEVEL", route.params.level);

const initialState = { division: 1, venue: null, teams: null };

const currentLevel = ref(route.params.level);
const divisions = ref([]);

const addNewDivision = () => {
  const newState = {
    division: tournamentStore.divisions.length + 1,
    venue: null,
    teams: null,
  };
  tournamentStore.divisions.push(newState);
};

onMounted(async () => {
  try {
    await teamStore.getTeamByLevels(route.params.level);
    tournamentStore.getTournamentDivisionsByLevel(currentLevel.value);
    if (tournamentStore.divisions === undefined) {
      tournamentStore.divisions = [];
      tournamentStore.divisions.push({ division: 1, venue: null, teams: null });
    }
    console.log("YOO");
  } catch (error) {
    notification.notifyError(error);
  }
});
</script>
