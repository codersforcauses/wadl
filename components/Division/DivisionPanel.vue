<template>
  <div class="bg-light-grey/10 mt-4 p-2 px-5 rounded-md h-64">
    <div class="flex justify-between">
      <div class="flex">
        <p class="text-xl my-auto">Division {{ division.division }}</p>
        <p class="text-xs text-mid-grey font-montserrat flex items-center px-2">
          (8 teams)
        </p>
      </div>
      <PlusIcon class="w-6 h-6 bg-light-orange-gold rounded-full" />
    </div>
    <Dropdown class="my-4" placeholder="Select Venue" />
    <!-- TODO: Add Chip based on teams in division-->
    <Chip text="PM 1" size="small" bg-color="bg-light-green/20" />
    <Chip text="BCC 1" size="small" bg-color="bg-light-orange-gold/40" />
    <Chip text="MC 1" size="small" bg-color="bg-danger-red/20" />
    <Chip text="MC 1" size="small" bg-color="bg-white" />
  </div>
</template>
<script setup>
import { PlusIcon } from "@heroicons/vue/24/solid";

defineProps({
  division: {
    type: Number,
    default: 1,
  },
});

/* TODO:
  - Load venues into dropdown. combine venue name and week, day available
  - Create function in store to get teams by tournamentId, level, and division
  - Load team name in chips returned from that function


*/
</script>
