<script setup>
import AdminButton from "~/components/admin/AdminButton.vue";
import ProfileInfo from "~/components/admin/ProfileInfo.vue";
import {
  TrophyIcon,
  BuildingLibraryIcon,
  UserGroupIcon,
  MapPinIcon,
  TableCellsIcon,
  UsersIcon,
  ClipboardIcon,
  UserPlusIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/outline";
import { useUserStore } from "../../stores/user";

import { useTeamStore } from "../../stores/teams";

const user = useUserStore();

const exportTeams = async () => {
  const store = useTeamStore();
  await store.getTeams();
  const teams = store.teams;

  let teamsList = [];
  const headings = Object.keys(teams[0]);
  teamsList.push(headings.join(","));

  for (const team of teams) {
    const row = '"'.concat(Object.values(team).join('","'), '"');
    teamsList.push(row);
  }

  teamsList = teamsList.join("\n");

  const blob = new Blob([teamsList], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.setAttribute("href", url);
  anchor.setAttribute("download", "WADL Teams List.csv");
  anchor.click();
};
</script>

<template>
  <ProfileInfo :username="user.firstName" role="Admin" />
  <div class="flex items-center justify-evenly mt-4">
    <div class="grid w-11/12 grid-cols-1 gap-4 md:grid-cols-3">
      <AdminButton
        title="Tournaments"
        link="admin/tournaments"
        :icon="TrophyIcon"
      />
      <AdminButton
        title="Institutions"
        link="admin/institutions"
        :icon="BuildingLibraryIcon"
      />
      <AdminButton title="Contacts" link="admin/contacts" :icon="UsersIcon" />
      <AdminButton title="Teams" link="" :icon="UserGroupIcon" />
      <AdminButton title="Venues" link="admin/venues" :icon="MapPinIcon" />
      <AdminButton title="Fixtures" link="" :icon="TableCellsIcon" />
      <AdminButton
        title="Export Teams"
        :icon="ClipboardIcon"
        class="cursor-pointer"
        @click="exportTeams"
      />
      <AdminButton
        title="Sign-up Requests"
        link="admin/signup-requests"
        :icon="UserCircleIcon"
      />
      <AdminButton
        title="Create Admin"
        link="admin/create-admin"
        :icon="UserPlusIcon"
      />
    </div>
  </div>
</template>
