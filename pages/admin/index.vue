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
      <AdminButton
        data-test="Contacts"
        title="Contacts"
        link="admin/contacts"
        :icon="UsersIcon"
      />
      <AdminButton
        data-test="Teams"
        title="Teams"
        link="/"
        :icon="UserGroupIcon"
      />
      <AdminButton
        data-test="Venues"
        title="Venues"
        link="admin/venues"
        :icon="MapPinIcon"
      />
      <AdminButton
        data-test="Fixtures"
        title="Fixtures"
        link="/"
        :icon="TableCellsIcon"
      />
      <AdminButton
        data-test="Results"
        title="Results"
        link="/"
        :icon="ClipboardIcon"
      />
      <AdminButton
        data-test="signUpRequests"
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
