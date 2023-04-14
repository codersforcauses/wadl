<template>
  <div
    v-if="data.length > 0"
    class="block overflow-auto w-full md:w-11/12 max-w-7xl"
  >
    <table class="w-full">
      <thead v-if="renderHeaders">
        <tr class="border-b font-montserrat text-left">
          <th
            v-for="(object, index) in headers"
            :key="index"
            class="py-1 h-10 pl-2 font-medium"
          >
            {{ object.title }}
          </th>
        </tr>
      </thead>

      <tbody class="font-montserrat">
        <tr
          v-for="(row, index) in data"
          :key="index"
          :class="`py-10 odd:bg-white even:bg-light-grey/10 hover:bg-light-yellow transition duration-150 ease-in-out ${
            clickableRows ? 'cursor-pointer' : ''
          }`"
          @click="handleRowClick(row.id)"
        >
          <td v-for="(object, ind) in headers" :key="ind" class="p-2">
            <slot
              :name="object.key"
              :header="object.title"
              :value="row[object.key]"
              :row="row"
              :row-id="index"
            >
              <p v-if="object.title === 'Topic'">
                <Button
                  button-text="View Topic"
                  size="medium"
                  button-color="bg-light-orange-gold"
                  @click.prevent="
                    (e) => {
                      handleEmit(row);
                      e.stopPropagation();
                    }
                  "
                />
              </p>
              <p v-else>{{ row[object.key] }}</p>
            </slot>
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
          <td v-if="scoreBoard" class="place-content-center items-center">
            <TableCellsIcon class="w-5 h-5" />
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
import { TableCellsIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits(["edit", "clickRow"]);

const handleRowClick = (id) => {
  if (props.clickableRows) {
    emit("clickRow", id);
  }
};

const handleEmit = (info) => {
  emit("edit", {
    editMode: true,
    modalVisibility: true,
    data: { ...info },
  });
};

const props = defineProps({
  headers: {
    type: Object,
    default: () => {},
  },
  renderHeaders: {
    type: Boolean,
    default: true,
  },
  data: {
    type: Object,
    default: () => {},
  },
  clickableRows: {
    type: Boolean,
    default: false,
  },
  canEdit: {
    type: Boolean,
    default: true,
  },
  noDataText: {
    type: String,
    default: "No data available",
  },
  scoreBoard: {
    type: Boolean,
    default: false,
  },
});
</script>
