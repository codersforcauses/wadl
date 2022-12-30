<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <Header titleText="Venues" />
  <SearchBar @handle-filter="handleFilter" />
  <div class="flex content-center justify-center h-[calc(74vh-72px)] px-2">
    <Table :headers="headers" :data="venues" />
  </div>
  <div class="inset-x-0 hottom-0 w-full bg-white">
    <Button
      button-text="Add Venue"
      button-color="bg-gold"
      class="m-5 ml-8"
      @click="show = !show"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import data from "../../data/venues.json";

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
