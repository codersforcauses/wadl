<script setup>
import { ref, onMounted } from "vue";
import { useVenueStore } from "../../stores/venues";
import { useHead } from "#imports";

useHead({
  title: "Venues",
});
const defaultInputState = {
  name: null,
  roomNo: null,
  capacity: null,
  days: [],
};

const formInput = ref({ ...defaultInputState });
const modalVisibility = ref(false);
const editMode = ref(false);
const filtering = ref(false);
const loading = ref(true);
const modalLoading = ref(false);

const store = useVenueStore();

onMounted(async () => {
  await store.getVenues();
  loading.value = false;
});

const handleFilter = (searchString) => {
  if (searchString) {
    filtering.value = true;
    store.filteredVenues = store.venues.filter((v) => {
      return v.name.toLowerCase().includes(searchString.toLowerCase());
    });
  } else {
    filtering.value = false;
  }
};

const updateSelectedDays = (chips) => {
  formInput.value.days = chips;
};

const resetFormState = () => {
  formInput.value = { ...defaultInputState };
  editMode.value = false;
};

const handleEdit = (row) => {
  modalVisibility.value = row.modalVisibility;
  editMode.value = row.editMode;
  formInput.value = row.data;
};

const updateVenue = async () => {
  modalLoading.value = true;
  await store.editVenue(formInput.value);
  modalVisibility.value = false;
  modalLoading.value = false;
  resetFormState();
};

const createVenue = async () => {
  modalLoading.value = true;
  await store.createVenue(formInput.value);
  modalVisibility.value = false;
  modalLoading.value = false;
  resetFormState();
};

const headers = [
  {
    key: "name",
    title: "Venue",
  },
  {
    key: "roomNo",
    title: "Room No.",
  },
];
</script>

<template>
  <Header title-text="Venues" />
  <div class="flex items-center justify-center w-full">
    <SearchBar @handle-filter="handleFilter" />
    <Button
      button-text="Add"
      button-color="bg-gold"
      type="button"
      size="medium"
      @click="modalVisibility = true"
    />
  </div>
  <div class="flex content-center justify-center h-[calc(74vh-72px)] px-2">
    <div v-if="loading">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        class="fill-gold animate-spin"
      >
        <path
          d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
        ></path>
      </svg>
    </div>
    <Table
      v-else
      :headers="headers"
      :data="filtering ? store.filteredVenues : store.venues"
      @edit="handleEdit"
      no-data-text="No venues registered"
      :loading="loading"
    />
  </div>

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
    <div v-if="editMode">
      <Header title-text="Edit Venue" />
      <form class="px-10" @submit.prevent="updateVenue">
        <FormField v-model="formInput.name" label="Venue Name" />
        <div class="grid grid-cols-2 gap-x-4">
          <div>
            <FormField v-model="formInput.roomNo" label="Room Number" />
          </div>
          <div>
            <FormField v-model="formInput.capacity" label="Team Capacity" />
          </div>
        </div>
        <label class="heading-montserrat">Days</label>
        <Multiselect
          :selected-chips="formInput.days"
          :items="[
            'Tuesday W1',
            'Tuesday W2',
            'Wednesday W1',
            'Wednesday W2',
            'Any',
          ]"
          placeholder="Select Days"
          @change="updateSelectedDays"
        />
        <div class="flex justify-evenly items-center">
          <Button
            button-text="Update"
            button-color="bg-gold"
            type="Submit"
            class="m-5 ml-8"
            :loading="modalLoading"
          />
        </div>
      </form>
    </div>
    <div v-else>
      <p class="text-3xl heading-montserrat font-bold px-6 py-3 text-center">
        Add Venue
      </p>
      <form class="px-10" @submit.prevent="createVenue">
        <FormField v-model="formInput.name" label="Venue Name" />
        <div class="grid grid-cols-2 gap-x-4">
          <div>
            <FormField v-model="formInput.roomNo" label="Room Number" />
          </div>
          <div>
            <FormField v-model="formInput.capacity" label="Team Capacity" />
          </div>
        </div>
        <label class="heading-montserrat">Days</label>
        <Multiselect
          :selected-chips="formInput.days"
          :items="[
            'Tuesday W1',
            'Tuesday W2',
            'Wednesday W1',
            'Wednesday W2',
            'Any',
          ]"
          placeholder="Select Days"
          @change="updateSelectedDays"
        />
        <div class="flex justify-evenly items-center">
          <Button
            button-text="Submit"
            button-color="bg-gold"
            type="Submit"
            class="m-5 ml-8"
            :loading="modalLoading"
          />
        </div>
      </form>
    </div>
  </Modal>
</template>
