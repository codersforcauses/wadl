<script setup>
import { onMounted } from "vue";
import { useTeamStore } from "../../stores/teams";
import { useHead } from "#imports";
import useNotification from "../../composables/useNotification";

useHead({
  title: "Teams",
});
const headers = [
  {
    key: "name",
    title: "Team",
  },
  {
    key: "level",
    title: "Level",
  },
  {
    key: "timeslot",
    title: "Timeslot",
  },
  {
    key: "weekPreference",
    title: "Week Pref.",
  },
  {
    key: "allocatedTue",
    title: "Tue",
  },
  {
    key: "allocatedWed",
    title: "Wed",
  },
  {
    key: "venuePreference",
    title: "Venue Pref.",
  },
];

const notification = useNotification();

const store = useTeamStore();
onMounted(async () => {
  try {
    await store.getTeams();
  } catch (error) {
    notification.notifyError(error);
  }
});
</script>

<template>
  <section>
    <Header title-text="Teams" />
    <!-- <SearchBar /> -->
    <Table
      :headers="headers"
      :data="store.teams"
      class="mt-5"
      :can-edit="false"
    />
  </section>
  <Notification
    :modal-visibility="notification.isVisible"
    :is-success="notification.isSuccess"
    :body="notification.message"
    @close="notification.dismiss()"
  />
</template>
