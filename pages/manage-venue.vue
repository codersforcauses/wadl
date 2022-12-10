<template>
  
  <pageHeader titleText="Venues" />
  
  <div v-for="venue in venues">
    <venue :venue="venue" />
  </div>

</template>
<script setup>
import venue from "../components/Manage-Venue/venue.vue"
import pageHeader from "../components/Header/index.vue"

const venues = [
        {
            index: "1",
            venue: "South Street",
            roomNum: "024",
            day: "Wednesday"
        },
        {
            index: "2",
            venue: "Adjacent Avenue",
            roomNum: "96",
            day: "Wednesday"
        },
        {
            index: "3",
            venue: "Rightmost Road",
            roomNum: "111",
            day: "Wednesday"
        },
    ]
</script>