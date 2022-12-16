<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <Header titleText="Venues" />
  <SearchBar @handle-filter="filterVenues" />
  <div class="flex content-center justify-center">
    <Table :config="config" :venues="venues" />
  </div>
  <Button
    button-text="Add Venue"
    button-color="bg-gold"
    @click="show = !show"
  />
  <Modal v-show="show">
    <h1>Add Venue</h1>
  </Modal>
</template>
<script setup>
import { ref } from "vue";
import Modal from "../components/Venues/Modal.vue";
import data from "../data/venues.json";

const venues = ref(data);

const filterVenues = (value) => {
  console.log(value);
};

const config = [
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

const show = ref(false);
// const handleAdd = () => {
//   show = !show;
// };
</script>
