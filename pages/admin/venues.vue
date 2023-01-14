<script setup>
import { ref } from "vue";
import { useVenueStore } from "../../stores/venues";
import Modal from "../../components/Modal/Modal.vue";

const defaultInputState = {
  id: null,
  name: null,
  roomNo: null,
  capacity: null,
  days: [],
};

const formInput = ref({ ...defaultInputState });
const modalVisibility = ref(false);
const editMode = ref(false);
const store = useVenueStore();

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

const handleFilter = (searchTerm) => {
  store.filteredVenues = store.venues.filter(
    (venue) =>
      venue.name.toLowerCase().includes(searchTerm) ||
      venue.roomNo.toLowerCase().includes(searchTerm)
  );
};

const updateVenue = () => {
  store.editVenue(formInput.value);
  resetFormState();
};

const createVenue = () => {
  store.createVenue(formInput.value);
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
  <SearchBar @handle-filter="handleFilter" />
  <div class="flex content-center justify-center h-[calc(74vh-72px)] px-2">
    <Table :headers="headers" :data="store.filteredVenues" @edit="handleEdit" />
  </div>
  <div class="fixed inset-x-0 bottom-0 w-full bg-white">
    <Button
      button-text="Add Venue"
      button-color="bg-gold"
      class="m-5 ml-8"
      @click="modalVisibility = true"
    />
  </div>

  <Modal
    :modal-visibility="modalVisibility"
    @close="
      () => {
        modalVisibility = false;
        resetFormState();
      }
    "
  >
    <div v-if="editMode">
      <Header title-text="Edit Venue" />
      <form
        class="px-10"
        @submit.prevent="
          () => {
            modalVisibility = false;
            updateVenue();
          }
        "
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
        <div class="flex justify-evenly items-center">
          <Button
            button-text="Update"
            button-color="bg-gold"
            type="Submit"
            class="m-5 ml-8"
          />
          <!-- <Button
            button-text="Delete"
            button-color="bg-red"
            type="Submit"
            class="m-5 ml-8"
          /> -->
        </div>
      </form>
    </div>
    <div v-else>
      <p class="text-3xl heading-montserrat font-bold px-6 py-3 text-center">
        Add Venue
      </p>
      <form
        class="px-10"
        @submit.prevent="
          () => {
            modalVisibility = false;
            createVenue();
          }
        "
      >
        <FormField v-model="formInput.name" label="Venue Name" />
        <FormField v-model="formInput.roomNo" label="Room Number" />
        <FormField v-model="formInput.capacity" label="Team Capacity" />
        <FormField v-model="formInput.days" label="Days" />
        <div class="flex justify-evenly items-center">
          <Button
            button-text="Submit"
            button-color="bg-gold"
            type="Submit"
            class="m-5 ml-8"
          />
        </div>
      </form>
    </div>
  </Modal>
</template>
