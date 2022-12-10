<template>
  <div>
    <h1 class="text-center text-4xl pt-5">Venues</h1>
  </div>
  
  <hr class="my-5 w-4/5 h-px mx-auto bg-black border-0" />

  <div>
    <venue />
  </div>

</template>
<script setup>
import venue from '../components/Manage-Venue/venue.vue';

const venues = [
        {
            venue: "South Street",
            roomNum: '024',
            day: "Wednesday"
        },
        {
            venue: "Adjacent Avenue",
            roomNum: '96',
            day: "Wednesday"
        },
        {
            venue: "Rightmost Road",
            roomNum: '111',
            day: "Wednesday"
        },
    ]
    </script>