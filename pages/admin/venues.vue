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
  {
    key: "capacity",
    title: "Capacity",
  },
];
</script>

<template>
  <section
    class="flex flex-col items-center justify-center max-w-screen max-h-screen"
  >
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
    v-if="editMode"
    :modal-visibility="modalVisibility"
    size="w-7/12"
    header="Edit Venue"
    button-text="Update"
    @close="
      () => {
        modalVisibility = false;
        resetFormState();
      }
    "
    @submit.prevent="updateVenue"
  >
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
  </Modal>
  <Modal
    v-else
    :modal-visibility="modalVisibility"
    size="w-7/12"
    header="Add Venue"
    @close="
      () => {
        modalVisibility = false;
        resetFormState();
      }
    "
    @submit.prevent="createVenue"
  >
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
  </Modal>
  <Notification
    :modal-visibility="notification.isVisible"
    :is-success="notification.isSuccess"
    :body="notification.message"
    @close="notification.dismiss()"
  />
</template>
