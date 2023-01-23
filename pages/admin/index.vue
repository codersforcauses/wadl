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

//var teams = store.getInstitutions();

const exportTeams = () => {

  const teams = store.institutions;

  const csvdata = csvmaker(teams);
  console.log(csvdata);
  //download(csvdata);

  var teams_list = [];

  for (let team of teams) {
  teams_list.push(Object.values(team).join(","));
  }

  console.log(Object.values(teams_list).join("\n"));
  //console.log(teams_list);
};


const download = function (data) {
 
 // Creating a Blob for having a csv file format
 // and passing the data with type
 const blob = new Blob([data], { type: 'text/csv' });

 // Creating an object for downloading url
 const url = window.URL.createObjectURL(blob)

 // Creating an anchor(a) tag of HTML
 const a = document.createElement('a')

 // Passing the blob downloading url
 a.setAttribute('href', url)

 // Setting the anchor tag attribute for downloading
 // and passing the download file name
 a.setAttribute('download', 'download.csv');

 // Performing a download with click
 a.click()
}

const csvmaker = function (data) {

 // Empty array for storing the values
 var csvRows = [];

 // Headers is basically a keys of an
 // object which is id, name, and
 // profession
 const headers = Object.keys(data[0]);

 // As for making csv format, headers
 // must be separated by comma and
 // pushing it into array
 csvRows.push(headers.join(','));

 // Pushing Object values into array
 // with comma separation
 for (let team in data){
 csvRows.push(Object.values(team).join(','));
 }

 // Returning the array joining with new line
 return csvRows.join('\n')
}

const get = async function () {

 // JavaScript object
 /*
 const data = {
     id: 1,
     name: "Geeks",
     profession: "developer"
 }
 */

 const csvdata = csvmaker(data);
 download(csvdata);
}

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
