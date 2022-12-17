<!-- eslint-disable vue/require-valid-default-prop -->
<template>
  <div
    class="h-max-full overflow-y-scroll overscroll-contain flex justify-center content-center"
  >
    <table class="table-fixed overflow-scroll w-11/12">
      <thead class="sticky top-0 bg-white">
        <tr>
          <th
            v-for="(object, index) in headers"
            :key="index"
            class="py-3 text-xl text-left font-carterone h-10"
          >
            {{ object.title }}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in venues" :key="index" class="border-b-2 h-10">
          <td
            v-for="(object, ind) in headers"
            :key="ind"
            class="font-montserrat py-2"
          >
            {{ row[object.key] }}
          </td>
          <td class="w-48 text-right">
            <button><PencilIcon class="w-4 h-4" /></button>
          </td>
        </tr>
        <tr class="h-auto border-none" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { PencilIcon } from "@heroicons/vue/24/solid";

defineProps({
  headers: {
    type: Object,
    default: () => ({}),
  },
  venues: {
    type: Object,
    default: () => ({}),
  },
});
</script>
