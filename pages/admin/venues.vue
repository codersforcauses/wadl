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
  <section class="flex flex-col items-center">
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

    <Loading v-if="loading" />
    <Table
      v-else
      :headers="headers"
      :data="filtering ? store.filteredVenues : store.venues"
      no-data-text="No venues registered"
      :loading="loading"
      @edit="handleEdit"
    />
  </section>

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
