<template>
  <div class="flex flex-col">
    <div class="h-max-full overflow-y-auto md:flex md:justify-center">
      <table class="table-fixed overflow-scroll md:w-11/12 w-100">
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
            @click="handleRowClick(row.id)"
          >
            <td
              v-for="(object, ind) in headers"
              :key="ind"
              class="font-montserrat p-2"
            >
              <p v-if="object.key === 'division' && !row[object.key]">
                Not Allocated
              </p>
              <p
                v-if="
                  (object.key === 'allocatedTue' ||
                    object.key === 'allocatedWed') &&
                  row[object.key]
                "
              >
                <CheckIcon class="w-6 h-6" />
              </p>
              <p
                v-else-if="
                  (object.key === 'allocatedTue' ||
                    object.key === 'allocatedWed') &&
                  !row[object.key]
                "
              >
                <XMarkIcon class="w-6 h-6" />
              </p>
              <p
                v-for="(ven, idx) in row[object.key]"
                v-else-if="object.key === 'venuePreference'"
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
              <button
                @click.prevent="
                  (e) => {
                    handleEmit(row);
                    e.stopPropagation();
                  }
                "
              >
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
      class="mx-auto text-lg text-light-grey py-16 flex justify-center"
    >
      {{ noDataText }}
    </div>
  </div>
</template>

<script setup>
import { PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/vue/24/solid";

const emit = defineEmits(["edit", "getId"]);

const handleRowClick = (id) => {
  emit("getId", id);
};

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
  noDataText: {
    type: String,
    default: "No teams registered",
  },
});
</script>
