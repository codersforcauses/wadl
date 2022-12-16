<!-- eslint-disable vue/require-valid-default-prop -->
<template>
  <table class="table-fixed">
    <thead class="w-full">
      <tr>
        <th
          v-for="(object, index) in config"
          :key="index"
          class="py-3 w-64 text-5xl"
        >
          {{ object.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in venues" :key="index">
        <td
          v-for="(object, ind) in config"
          :key="ind"
          class="font-montserrat text-2xl text-center"
        >
          {{ row[object.key] }}
        </td>
        <td>
          <button><PencilIcon class="w-4 h-4" /></button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { PencilIcon } from "@heroicons/vue/24/solid";

defineProps({
  config: {
    type: Object,
    default: [],
  },
  venues: {
    type: Object,
    default: [],
  },
});
</script>
