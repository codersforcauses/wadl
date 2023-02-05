<script setup>
import { ref, onMounted } from "vue";
import { useVenueStore } from "../../stores/venues";
import { useHead } from "#imports";
import useNotification from "../../composables/useNotification";

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

const notification = useNotification();

onMounted(async () => {
  try {
    await store.getVenues();
  } catch (error) {
    notification.notifyError(error);
  }
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
  try {
    await store.editVenue(formInput.value);
  } catch (error) {
    notification.notifyError(error);
    modalLoading.value = false;
    return;
  }
  modalVisibility.value = false;
  modalLoading.value = false;
  notification.notifySuccess("Updated venue successfully");
  resetFormState();
};

const createVenue = async () => {
  modalLoading.value = true;
  try {
    await store.createVenue(formInput.value);
  } catch (error) {
    notification.notifyError(error);
    modalLoading.value = false;
    return;
  }
  modalVisibility.value = false;
  modalLoading.value = false;
  notification.notifySuccess("Created a new venue successfully");
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
      <Loading />
    </div>
    <Table
      v-else
      :headers="headers"
      :data="filtering ? store.filteredVenues : store.venues"
      no-data-text="No venues registered"
      :loading="loading"
      @edit="handleEdit"
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
  <Notification
    :modal-visibility="notification.isVisible"
    :is-success="notification.isSuccess"
    :body="notification.message"
    @close="notification.dismiss()"
  />
</template>
