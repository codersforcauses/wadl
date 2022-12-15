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
      <AdminButton title="Tournaments" link="/" :icon="TrophyIcon" />
      <AdminButton
        title="Institutions"
        link="admin/institutions"
        :icon="BuildingLibraryIcon"
      />
      <AdminButton
        title="Adjudicators"
        link="admin/adjudicators"
        :icon="ScaleIcon"
      />
      <AdminButton title="Teams" link="/" :icon="UserGroupIcon" />
      <AdminButton title="Venues" link="/" :icon="MapPinIcon" />
      <AdminButton title="Fixtures" link="/" :icon="TableCellsIcon" />
      <AdminButton title="Users" link="/" :icon="UsersIcon" />
      <AdminButton title="Results" link="/" :icon="ClipboardIcon" />
      <AdminButton title="Sign-up Requests" link="/" :icon="UserPlusIcon" />
    </div>
  </div>
</template>
