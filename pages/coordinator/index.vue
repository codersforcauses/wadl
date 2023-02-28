<script setup>
import ProfileInfo from "~/components/admin/ProfileInfo.vue";

import { onMounted } from "vue";
import { useInstitutionStore } from "../../stores/institutions";
import { useTournamentStore } from "../../stores/tournaments";
import { useUserStore } from "../../stores/user";
import { useHead } from "#imports";
import useNotification from "../../composables/useNotification";
useHead({
  title: "Teams",
});
const store = useInstitutionStore();
const tournamentStore = useTournamentStore();
const userStore = await useUserStore();

const notification = useNotification();

onMounted(async () => {
  try {
    await tournamentStore.getTournaments();
    await store.getInstitutionByID(userStore.institution);
    if (store.userInstitution.tournaments !== null) {
      tournamentStore.filterTournaments(store.userInstitution.tournaments);
    } else {
      console.log("No tournaments registered");
    }
  } catch (error) {
    notification.notifyError(error);
  }
});
</script>

<template>
  <ProfileInfo :username="userStore.firstName" role="Team Coordinator" />
  <div class="w-full px-36">
    <div class="grid grid-cols-2 justify-between bg-lighter-grey rounded-lg">
      <div class="text-xl flex p-5">Your Competitions</div>
      <NuxtLink
        v-if="userStore.institution"
        class="flex justify-end p-5"
        to="/coordinator/team-registration"
      >
        <Button
          button-text="Team Registration"
          button-color="bg-gold"
          class="transition duration-200 ease-in-out hover:bg-light-gold hover:shadow-lg"
        />
      </NuxtLink>
    </div>
  </div>
  <div class="w-full px-36 mt-6">
    <div
      v-if="tournamentStore.hasTournaments"
      class="grid grid-cols-1 md:grid-cols-3 justify-between gap-4"
    >
      <div
        v-for="tournament in tournamentStore.filteredTournaments"
        :key="tournament.id"
        class="p-4 bg-lighter-grey rounded-lg"
      >
        <div class="grid grid-cols-1 gap-y-4">
          <div class="text-xl flex place-content-center p-4">
            {{ tournament.name }}
          </div>
          <div class="grid grid-cols-2">
            <div class="flex justify-center">
              <NuxtLink :to="`/coordinator/teams/${tournament.id}`">
                <Button
                  button-text="Teams"
                  button-color="bg-light-orange-gold"
                  class="transition duration-200 ease-in-out hover:bg-light-gold hover:shadow-lg justify-center"
                  size="small"
                />
              </NuxtLink>
            </div>
            <div class="flex justify-center">
              <Button
                button-text="Draw"
                button-color="bg-light-green"
                class="transition duration-200 ease-in-out hover:bg-light-gold hover:shadow-lg justify-center"
                size="small"
                text-color="text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>No competitions registered</div>
  </div>
</template>
