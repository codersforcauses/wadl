<!-- eslint-disable vue/require-valid-default-prop -->
<template>
  <div class="h-max-full overflow-auto">
    <table class="table-fixed overflow-scroll">
      <thead class="position-relative sticky top-0 bg-white">
        <tr>
          <th
            v-for="(object, index) in config"
            :key="index"
            class="py-3 w-64 text-5xl text-left font-carterone"
          >
            {{ object.title }}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in venues" :key="index" class="border-b-2">
          <td
            v-for="(object, ind) in config"
            :key="ind"
            class="font-montserrat text-2xl py-2"
          >
            {{ row[object.key] }}
          </td>
          <td class="w-48 text-center">
            <button><PencilIcon class="w-4 h-4" /></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { PencilIcon } from "@heroicons/vue/24/solid";

defineProps({
  config: {
    type: Object,
    default: () => ({}),
  },
  venues: {
    type: Object,
    default: () => ({}),
  },
});
</script>
