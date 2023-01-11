<template>
  <div
    class="h-max-full overflow-y-scroll overscroll-contain flex justify-center content-center"
  >
    <table class="table-fixed overflow-scroll w-11/12">
      <thead class="">
        <tr>
          <th
            v-for="(object, index) in headers"
            :key="index"
            class="py-3 text-left font-carterone h-10 border-b pl-2"
          >
            {{ object.title }}
          </th>
          <th v-if="canEdit" class="border-b"></th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="index"
          class="h-10 odd:bg-white even:bg-light-grey/10"
        >
          <td
            v-for="(object, ind) in headers"
            :key="ind"
            class="font-montserrat p-2"
          >
            {{ row[object.key] }}
          </td>
          <td v-if="canEdit" class="w-48 text-right p-2">
            <button @click="handleEmit(row)">
              <PencilIcon class="w-4 h-4" />
            </button>
          </td>
        </tr>
        <tr class="h-auto border-none" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { PencilIcon } from "@heroicons/vue/24/solid";

const emit = defineEmits(["edit"]);

const handleEmit = (info) => {
  console.log();
  emit("edit", {
    editMode: true,
    modalVisibility: true,
    data: { ...info },
  });
};

defineProps({
  headers: {
    type: Object,
    default: () => {},
  },
  data: {
    type: Object,
    default: () => {},
  },
  canEdit: {
    type: Boolean,
    default: true,
  },
});
</script>
