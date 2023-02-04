<template>
  <div v-if="data.length > 0" class="block overflow-auto w-full md:w-11/12">
    <table class="table-fixed w-full">
      <thead>
        <tr class="border-b font-carterone text-left">
          <th
            v-for="(object, index) in headers"
            :key="index"
            class="py-1 h-10 pl-2"
          >
            {{ object.title }}
          </th>
        </tr>
      </thead>

      <tbody class="font-montserrat">
        <tr
          v-for="(row, index) in data"
          :key="index"
          class="py-10 odd:bg-white even:bg-light-grey/10 hover:bg-light-yellow transition duration-150 ease-in-out"
        >
          <td v-for="(object, ind) in headers" :key="ind" class="p-2">
            <slot
              :name="object.key"
              :header="object.title"
              :value="row[object.key]"
              :row="row"
              :row-id="index"
            >
              <p>
                {{ row[object.key] }}
              </p>
            </slot>
          </td>
          <td v-if="canEdit" class="text-right p-2">
            <button @click="handleEmit(row)">
              <PencilIcon class="w-4 h-4" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <span v-else class="text-lg text-light-grey block w-full py-16 text-center">
    {{ noDataText }}
  </span>
</template>

<script setup>
import { PencilIcon } from "@heroicons/vue/24/solid";

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
  noDataText: {
    type: String,
    default: "No data available",
  },
});
</script>
