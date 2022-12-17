<script setup>
import AdminButton from "~/components/admin/AdminButton.vue";
import ProfileInfo from "~/components/admin/ProfileInfo.vue";
import {
  TrophyIcon,
  BuildingLibraryIcon,
  ScaleIcon,
  UserGroupIcon,
  MapPinIcon,
  TableCellsIcon,
  UsersIcon,
  ClipboardIcon,
  UserPlusIcon,
} from "@heroicons/vue/24/outline";
</script>

<template>
  <ProfileInfo username="Carmen Leong" role="Admin" />
  <div class="flex items-center justify-center w-full">
    <div class="grid w-2/3 grid-cols-3 gap-2">
      <AdminButton
        data-test="tournaments"
        title="Tournaments"
        link="/"
        :icon="TrophyIcon"
      />
      <AdminButton
        data-test="institutions"
        title="Institutions"
        link="admin/institutions"
        :icon="BuildingLibraryIcon"
      />
      <AdminButton
        data-test="Adjudicators"
        title="Adjudicators"
        link="admin/adjudicators"
        :icon="ScaleIcon"
      />
      <AdminButton
        data-test="teams"
        title="Teams"
        link="/"
        :icon="UserGroupIcon"
      />
      <AdminButton
        data-test="venues"
        title="Venues"
        link="/"
        :icon="MapPinIcon"
      />
      <AdminButton
        data-test="fixtures"
        title="Fixtures"
        link="/"
        :icon="TableCellsIcon"
      />
      <AdminButton data-test="users" title="Users" link="/" :icon="UsersIcon" />
      <AdminButton
        data-test="results"
        title="Results"
        link="/"
        :icon="ClipboardIcon"
      />
      <AdminButton
        data-test="signUpRequests"
        title="Sign-up Requests"
        link="/"
        :icon="UserPlusIcon"
      />
    </div>
  </div>
</template>
