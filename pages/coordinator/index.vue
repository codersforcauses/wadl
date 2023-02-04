<script setup>
import { ref, onMounted } from "vue";
import { useInstitutionStore } from "../../stores/institutions";
import { useUserStore } from "../../stores/user";
import { useHead } from "#imports";
useHead({
  title: "Teams",
});
const store = useInstitutionStore();
const userStore = useUserStore();
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

const updateTeam = () => {
  store.editTeam(form.value);
  resetFormState();
};
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
        () => {
          modalVisibility = false;
          updateTeam();
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
    <Header title-text="Teams" />
    <NuxtLink
      v-if="userStore.institution"
      class="flex flex-row justify-end p-5"
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
      :data="store.teams"
      class="mt-5 mx-auto"
      @edit="handleEdit"
    >
      <template #division="{ value }">
        <p v-if="!value">Not Allocated</p>
      </template>
    </Table>
  </section>
</template>
