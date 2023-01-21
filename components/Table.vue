<template>
  <div class="h-max-full overflow-y-scroll overscroll-contain content-center">
    <table class="table-fixed overflow-scroll md:w-11/12 w-100 mx-1">
      <thead class="">
        <tr>
          <th
            v-for="(object, index) in headers"
            :key="index"
            class="py-1 text-left font-carterone h-10 border-b pl-2"
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
          class="h-10 odd:bg-white even:bg-light-grey/10 hover:bg-light-yellow transition duration-150 ease-in-out"
        >
          <td
            v-for="(object, ind) in headers"
            :key="ind"
            class="font-montserrat p-2"
          >
            <p
              v-if="
                (object.key === 'tuesdayAllocation' ||
                  object.key === 'wednesdayAllocation') &&
                row[object.key]
              "
            >
              <CheckIcon class="w-6 h-6" />
            </p>
            <p
              v-else-if="
                (object.key === 'tuesdayAllocation' ||
                  object.key === 'wednesdayAllocation') &&
                !row[object.key]
              "
            >
              <XMarkIcon class="w-6 h-6" />
            </p>
            <p
              v-for="(ven, idx) in row[object.key]"
              v-else-if="object.key === 'venuePreferences'"
              :key="idx"
              class="text-xs"
            >
              {{ idx + 1 }}. {{ ven }}
            </p>
            <p v-else>
              {{ row[object.key] }}
            </p>
          </td>
          <td v-if="canEdit" class="text-right p-2">
            <button @click="handleEmit(row)">
              <PencilIcon class="w-4 h-4" />
            </button>
          </td>
        </tr>
        <tr class="h-auto border-none" />
      </tbody>
    </table>
  </div>
  <div
    v-if="data.length == 0"
    class="flex justify-center text-lg text-light-grey py-16"
  >
    No teams registered
  </div>
</template>

<script setup>
import { PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/vue/24/solid";

const emit = defineEmits(["edit"]);

const handleEmit = (info) => {
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
