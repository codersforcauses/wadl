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
import { useUserStore } from "../../stores/auth";

import { useInstitutionStore } from "../../stores/institutions";

const user = useUserStore();

const store = useInstitutionStore();  

const exportTeams = () => {

  // retreiving teams data from store
  const teams = store.teams;

  // converting teams list to csv format
  var teams_list = [];
  const headings = Object.keys(teams[0]);
  teams_list.push(headings.join(','));

  for (let team of teams) {
  teams_list.push(Object.values(team).join(","));
  }

  teams_list = teams_list.join("\n");

  // downlaoding file as csv
  // https://www.geeksforgeeks.org/how-to-create-and-download-csv-file-in-javascript/
  const blob   = new Blob([teams_list], { type: 'text/csv' });
  const url    = window.URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.setAttribute('href', url)
  anchor.setAttribute('download', 'WADL Teams List.csv');
  anchor.click()
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
      <AdminButton title="Teams" link="/" :icon="UserGroupIcon" />
      <AdminButton title="Venues" link="admin/venues" :icon="MapPinIcon" />
      <AdminButton title="Fixtures" link="/" :icon="TableCellsIcon" />
      <AdminButton title="Export Teams" :icon="ClipboardIcon" v-on:click="exportTeams"/>
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
