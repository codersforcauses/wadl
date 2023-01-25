<template>
  <div class="flex py-6 justify-center mx-20">
    <span
      class="inline-flex items-center rounded-l-md border-2 border-r-0 px-2 py-2"
    >
      <MagnifyingGlassIcon class="h-5 w-5 text-gray-600" />
    </span>
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search"
      class="px-2 border-2 border-l-0 border-grey-300 rounded-r-md w-11/12 focus:outline-none"
    />
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { useAdminStore } from "../stores/admin";

const adminStore = useAdminStore();
const { searchTerm } = storeToRefs(adminStore);
</script>
