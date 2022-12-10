<script setup>
    import AdminButton from '~/components/SuperAdminPage/AdminButton.vue';
    import ProfileInfo from '~/components/SuperAdminPage/ProfileInfo.vue';
    import { UserIcon } from "@heroicons/vue/24/outline";
    import { TrophyIcon } from "@heroicons/vue/24/outline";
    import { BuildingLibraryIcon } from "@heroicons/vue/24/outline";
    import { ScaleIcon } from "@heroicons/vue/24/outline";
    import { UserGroupIcon } from "@heroicons/vue/24/outline";
    import { MapPinIcon } from "@heroicons/vue/24/outline";
    import { TableCellsIcon } from "@heroicons/vue/24/outline";
    import { UsersIcon } from "@heroicons/vue/24/outline";
    import { ClipboardIcon } from "@heroicons/vue/24/outline";
    import { UserPlusIcon } from "@heroicons/vue/24/outline";
</script>

<template>
    <div class="flex items-center justify-center">
        <UserIcon class="w-28 h-28" />
        <ProfileInfo username="Carmen Leong" role="Super Admin"/>
    </div>
    <div class="flex items-center justify-center w-full">
        <div class="grid w-2/3 grid-cols-3 gap-2">
            <AdminButton title="Tournaments" link="/" :icon="TrophyIcon" />
            <AdminButton title="Institutions" link="/" :icon="BuildingLibraryIcon" />
            <AdminButton title="Adjudicators" link="/Adjudicators" :icon="ScaleIcon"/>
            <AdminButton title="Teams" link="/" :icon="UserGroupIcon"/>
            <AdminButton title="Venues" link="/" :icon="MapPinIcon"/>
            <AdminButton title="Fixtures" link="/" :icon="TableCellsIcon"/>
            <AdminButton title="Users" link="/" :icon="UsersIcon"/>
            <AdminButton title="Results" link="/" :icon="ClipboardIcon"/>
            <AdminButton title="Sign-up Requests" link="/" :icon="UserPlusIcon"/>
        </div>
    </div>
</template>