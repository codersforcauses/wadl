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

const user = useUserStore();
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
      <AdminButton title="Results" link="/" :icon="ClipboardIcon" />
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
