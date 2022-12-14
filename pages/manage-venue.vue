<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <Header titleText="Venues" />
  <div class="flex content-center justify-center">
    <Table :config="config" :venues="venues" />
  </div>
  <Button
      button-text="Add Venue"
      button-color="bg-gold"
      @click="(show =! show)"
    />
  <Modal v-show="show">
    <h1>Add Venue</h1>
  </Modal>
</template>
<script setup>

import { ref } from 'vue';
import Modal from '../components/Modal.vue';

const venues = [
  {
    index: "1",
    venue: "South Street",
    day: "Wednesday",
    roomNum: "024",
  },
  {
    index: "2",
    venue: "Adjacent Avenue",
    day: "Wednesday",
    roomNum: "96",
  },
  {
    index: "3",
    venue: "Rightmost Road",
    day: "Wednesday",
    roomNum: "111",
  },
];
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
