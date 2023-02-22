<script setup>
import { ref, onMounted, computed } from "vue";
import { useInstitutionStore } from "../../../stores/institutions";
import { useTournamentStore } from "../../../stores/tournaments";
import { useUserStore } from "../../../stores/user";
import { useHead } from "#imports";
import useNotification from "../../../composables/useNotification";
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/solid";
useHead({
  title: "Teams",
});

// eslint-disable-next-line no-undef
const route = useRoute();
const store = useInstitutionStore();
const tournamentStore = useTournamentStore();
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
  await tournamentStore.getTournaments();
});

const resetFormState = () => {
  form.value = { ...defaultInputState };
};

const filteredTeams = computed(() => {
  const tournamentId = route.params.tournamentId;
  const results = store.teams.filter(
    (teams) => teams.tournamentId === tournamentId
  );
  return tournamentId !== null ? results : store.teams;
});

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

const tournamentName = tournamentStore.getTournamentById(
  route.params.tournamentId
).name;
</script>

<template>
  <Modal
    :modal-visibility="modalVisibility"
    size="w-7/12"
    @close="
      () => {
        modalVisibility = false;
        resetFormState();
      }
    "
  >
    <Header title-text="Edit Preferences" />
    <form
      class="px-10"
      @submit.prevent="
        async () => {
          modalVisibility = false;
          await updateTeam();
        }
      "
    >
      <div class="flex flex-row justify-evenly accent-gold pt-5 pb-2">
        <div>
          <input v-model="form.allocatedTue" type="checkbox" class="w-5 h-5" />
          <label class="ml-3 heading-montserrat">Tuesday Allocation</label>
        </div>
        <div>
          <input v-model="form.allocatedWed" type="checkbox" class="w-5 h-5" />

          <label class="ml-3 heading-montserrat">Wednesday Allocation</label>
        </div>
      </div>
      <FormField v-model="form.timeslot" label="Timeslot" />
      <Select
        v-model="form.weekPreference"
        :options="['Week 1', 'Week 2', 'Either']"
        label="Week Preference"
        class="w-full"
      />
      <div class="flex flex-row accent-gold py-2">
        <input
          v-model="form.hasVenuePreference"
          type="checkbox"
          class="w-5 h-5"
          @change="form.venuePreference = []"
        />

        <label class="ml-3 heading-montserrat"
          >Do you have venue preferences?</label
        >
      </div>
      <FormField
        v-if="form.hasVenuePreference"
        v-model="form.venuePreference[0]"
        label="1st Venue Preference"
      />
      <FormField
        v-if="form.hasVenuePreference"
        v-model="form.venuePreference[1]"
        label="2nd Venue Preference"
      />
      <FormField
        v-if="form.hasVenuePreference"
        v-model="form.venuePreference[2]"
        label="3rd Venue Preference"
      />

      <div class="flex justify-evenly items-center">
        <Button
          button-text="Update"
          button-color="bg-gold"
          type="Submit"
          class="m-5 ml-8"
        />
      </div>
    </form>
  </Modal>
  <section
    class="flex flex-col items-center justify-center max-w-screen max-h-screen"
  >
    <Header title-text="Manage Teams" :subtitleText="tournamentName" />
    <NuxtLink
      v-if="userStore.institution"
      class="flex flex-row w-full justify-end p-5"
      to="/coordinator/team-registration"
    >
      <Button
        button-text="Team Registration"
        button-color="bg-gold"
        class="transition duration-200 ease-in-out hover:bg-light-gold hover:shadow-lg"
      />
    </NuxtLink>
    <!-- <SearchBar /> -->
    <Table
      :headers="headers"
      :data="filteredTeams"
      class="mt-5 mx-auto"
      @edit="handleEdit"
    >
      <template #division="{ value }">
        <p v-if="!value">Not Allocated</p>
      </template>
      <template #allocatedTue="{ value }">
        <p>
          <CheckIcon v-if="value" class="w-6 h-6" />
          <XMarkIcon v-else class="w-6 h-6" />
        </p>
      </template>
      <template #allocatedWed="{ value }">
        <p>
          <CheckIcon v-if="value" class="w-6 h-6" />
          <XMarkIcon v-else class="w-6 h-6" />
        </p>
      </template>
      <template #venuePreference="{ value }">
        <p v-for="(ven, idx) in value" :key="idx" class="text-xs">
          {{ idx + 1 }}. {{ ven }}
        </p>
      </template>
    </Table>
  </section>
  <Notification
    :modal-visibility="notification.isVisible"
    :is-success="notification.isSuccess"
    :body="notification.message"
    @close="notification.dismiss()"
  />
</template>
