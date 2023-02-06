<template>
  <div class="bg-light-grey/10 mt-4 p-2 px-5 rounded-md h-64">
    <div class="flex justify-between">
      <div class="flex">
        <p class="text-sm my-auto">Division {{ division }}</p>
        <p class="text-[9px] text-mid-grey font-montserrat">(8 teams)</p>
      </div>
      <PlusIcon class="w-6 h-6" />
    </div>
    <Dropdown class="my-4" />
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
</script>
