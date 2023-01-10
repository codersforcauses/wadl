<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <Header titleText="Venues" />
  <SearchBar @handle-filter="handleFilter" />
  <div class="flex content-center justify-center h-[calc(74vh-72px)] px-2">
    <Table :headers="headers" :venues="venues" />
  </div>
  <div class="inset-x-0 hottom-0 w-full bg-white">
    <Button
      button-text="Add Venue"
      button-color="bg-gold"
      class="m-5 ml-8"
      @click="showModal"
    />
  </div>

  <!-- Modal -->
  <div
    v-show="modalVisibility"
    class="flex justify-center items-center fixed top-0 z-50 left-0 w-full h-full bg-slate-300 bg-opacity-60"
  >
    <div class="bg-white max-w-[40%] min-w-[320px] rounded-2xl">
      <header
        class="flex justify-end items-center pt-2 pr-2 pb-2 bg-gold rounded-t-2xl"
      >
        <XMarkIcon class="h-6 w-6 cursor-pointer" @click="closeModal" />
      </header>
      <p class="text-3xl heading-montserrat font-bold px-6 py-3 text-center">
        Add Venue
      </p>
      <!-- <form class="px-10">
        <FormField v-model="form.institutionName" label="Institution Name" />
        <FormField v-model="form.code" label="Code" />
        <FormField v-model="form.abbreviation" label="Abbreviation" />
      </form> -->
      <div class="flex justify-evenly items-center">
        <Button
          button-text="Submit"
          button-color="bg-gold"
          type="button"
          class="m-5 ml-8"
          @click="addVenue"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import data from "../../data/venues.json";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const venues = ref(data);

const handleFilter = (searchTerm) => {
  venues.value = data.filter(
    (venue) =>
      venue.day.toLowerCase().includes(searchTerm) ||
      venue.id.toLowerCase().includes(searchTerm) ||
      venue.roomNum.toLowerCase().includes(searchTerm) ||
      venue.venue.toLowerCase().includes(searchTerm)
  );
};

// Modal
const modalVisibility = ref(false);
const showModal = () => {
  modalVisibility.value = true;
};
const closeModal = () => {
  modalVisibility.value = false;
};

const headers = [
  {
    key: "venue",
    title: "Venue",
  },
  {
    key: "day",
    title: "Day",
  },
  {
    key: "roomNum",
    title: "Room No.",
  },
];
</script>
