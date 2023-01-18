<script setup>
import { ref } from "vue";
import { useInstitutionStore } from "../../stores/institutions";
const store = useInstitutionStore();
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
    key: "venuePreferences",
    title: "Venue Pref.",
  },
];

const defaultInputState = {
  id: null,
  level: null,
  division: null,
  timeslot: null,
  venuePreferences: [],
  tuesdayAllocation: null,
  wednesdayAllocation: null,
};

const form = ref({ ...defaultInputState });
const modalVisibility = ref(false);

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
          <input
            v-model="form.tuesdayAllocation"
            type="checkbox"
            class="w-5 h-5"
          />
          <label class="ml-3 heading-montserrat">Tuesday Allocation</label>
        </div>
        <div>
          <input
            v-model="form.wednesdayAllocation"
            type="checkbox"
            class="w-5 h-5"
          />

          <label class="ml-3 heading-montserrat">Wednesday Allocation</label>
        </div>
      </div>
      <FormField v-model="form.timeslot" label="Timeslot" />
      <div class="flex flex-row accent-gold py-2">
        <input
          v-model="form.hasVenuePreference"
          type="checkbox"
          class="w-5 h-5"
          @change="form.venuePreferences = []"
        />

        <label class="ml-3 heading-montserrat"
          >Do you have venue preferences?</label
        >
      </div>
      <FormField
        v-if="form.hasVenuePreference"
        v-model="form.venuePreferences[0]"
        label="1st Venue Preference"
      />
      <FormField
        v-if="form.hasVenuePreference"
        v-model="form.venuePreferences[1]"
        label="2nd Venue Preference"
      />
      <FormField
        v-if="form.hasVenuePreference"
        v-model="form.venuePreferences[2]"
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
  <section>
    <Header title-text="Teams" />
    <!-- <SearchBar /> -->
    <Table
      :headers="headers"
      :data="store.teams"
      class="mt-5"
      @edit="handleEdit"
    />
    <div class="fixed inset-x-0 bottom-0 w-full">
      <div class="flex flex-row gap-4 m-5 justify-left">
        <NuxtLink to="/coordinator/team-registration">
          <Button
            button-text="Team Registration"
            button-color="bg-gold"
            class="transition duration-200 ease-in-out hover:bg-light-gold hover:shadow-lg"
          />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
