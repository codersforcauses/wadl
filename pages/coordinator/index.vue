<script setup>
import ProfileInfo from "~/components/admin/ProfileInfo.vue";

import { ref, onMounted } from "vue";
import { useInstitutionStore } from "../../stores/institutions";
import { useUserStore } from "../../stores/user";
import { useHead } from "#imports";
import useNotification from "../../composables/useNotification";
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/solid";
useHead({
  title: "Teams",
});
const store = useInstitutionStore();
const userStore = await useUserStore();
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
    title: "Division",
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

const defaultInputState = {
  id: null,
  level: null,
  division: null,
  timeslot: null,
  venuePreference: [],
  allocatedTue: null,
  allocatedWed: null,
  weekPreference: null,
};

const form = ref({ ...defaultInputState });
const modalVisibility = ref(false);

onMounted(async () => {
  if (store.teams.length === 0) {
    await store.getTeamsByID(userStore.institution);
    console.table(store.teams);
  }
});

const resetFormState = () => {
  form.value = { ...defaultInputState };
};

const handleEdit = (row) => {
  modalVisibility.value = row.modalVisibility;
  form.value = row.data;
};

const updateTeam = async () => {
  try {
    await store.editTeam(form.value);
  } catch (error) {
    notification.notifyError(error);
    return;
  }
  notification.notifySuccess("Updated team successfully");
  resetFormState();
};
</script>

<template>
  <ProfileInfo username="Sarah Tan" role="Team Coordinator" />
  <div class="w-full px-36">
    <div class="grid grid-cols-2 justify-between bg-lighter-grey rounded-lg">
      <div class="text-xl flex p-5">Your Competitions</div>
      <NuxtLink
        v-if="userStore.institution"
        class="flex justify-end p-5"
        to="/coordinator/team-registration"
      >
        <Button
          button-text="Team Registration"
          button-color="bg-gold"
          class="transition duration-200 ease-in-out hover:bg-light-gold hover:shadow-lg"
        />
      </NuxtLink>
    </div>
  </div>
  <div class="w-full px-36 mt-6">
    <div class="grid grid-cols-3 justify-between">
      <div class="p-4 bg-lighter-grey rounded-lg">
        <div class="grid grid-cols-1 gap-y-4">
          <div class="text-xl flex place-content-center p-4">SDC 2023</div>
          <div class="grid grid-cols-2">
            <div class="flex justify-center">
              <Button
                button-text="Teams"
                button-color="bg-light-orange-gold"
                class="transition duration-200 ease-in-out hover:bg-light-gold hover:shadow-lg justify-center"
                size="small"
              />
            </div>
            <div class="flex justify-center">
              <Button
                button-text="Draw"
                button-color="bg-light-green"
                class="transition duration-200 ease-in-out hover:bg-light-gold hover:shadow-lg justify-center"
                size="small"
                textColor="text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
