<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <!-- competitions -->
  <ProfileInfo :username="user.firstName" role="Adjudicator" />
  <Header title-text="Competitions" />
  <div
    v-if="store.getRunning.length > 0"
    class="mx-auto mt-4 flex justify-center flex-wrap"
  >
    <!-- replace key with item.id when final data exists -->
    <div v-for="tournament in store.getRunning" :key="tournament.id">
      <NuxtLink :to="`/adjudicator/fixtures/${tournament.id}`">
        <LevelButton :text="tournament.shortName" />
      </NuxtLink>
    </div>
  </div>
  <p
    v-else
    class="text-xl py-5 text-center text-mid-grey font-montserrat font-light"
  >
    There are no running tournaments.
  </p>
</template>

<script setup>
import LevelButton from "../../components/HomePage/LevelButton.vue";
import { useTournamentStore } from "../../stores/tournaments";
import { onMounted } from "vue";
import { useHead } from "#imports";
import ProfileInfo from "../../components/admin/ProfileInfo.vue";
import { useUserStore } from "../../stores/user";

const user = await useUserStore();

useHead({
  title: "WADL",
});
const store = useTournamentStore();

onMounted(async () => {
  await store.getTournaments();
});
</script>
