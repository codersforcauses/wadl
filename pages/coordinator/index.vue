<script setup>
import ProfileInfo from "~/components/admin/ProfileInfo.vue";
// import Table from "~/components/Coordinator/Table.vue";
import { useTeamStore } from "../../stores/teams";
const store = useTeamStore();

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
    key: "division",
    title: "Div",
  },
  {
    key: "timeslot",
    title: "Timeslot",
  },
  {
    key: "venPref1",
    title: "Venue Pref 1",
  },
  {
    key: "venPref2",
    title: "Venue Pref 2",
  },
  {
    key: "venPref3",
    title: "Venue Pref 3",
  },
];
</script>

<template>
  <div>
    <ProfileInfo username="Carmen Leong" role="Admin" />
    <!-- <Table :headings="['Teams', 'Level', 'Division']" /> -->
    <Table :headers="headers" :data="store.teams" />
    <div class="fixed inset-x-0 bottom-0 w-full">
      <div class="flex flex-row gap-4 m-5 justify-left">
        <Button
          button-text="Team Registration"
          button-color="bg-gold"
          class="transition duration-200 ease-in-out hover:bg-light-gold hover:shadow-lg"
        />
      </div>
    </div>
  </div>
</template>
