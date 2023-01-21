<script setup>
import { ref } from "vue";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";
import { vOnClickOutside } from "@vueuse/components";
const props = defineProps({
  items: {
    type: Array,
    default: () => ["Novice", "Junior", "Senior"],
  },
  placeholder: {
    type: String,
    default: "Select levels",
  },
  selectedChips: {
    type: Array,
    default: () => [],
  },
});

const isOpen = ref(false);
const selectedChips = ref([...props.selectedChips]);
const emit = defineEmits(["change"]);

const toggleSelection = (item) => {
  if (selectedChips.value.includes(item)) {
    selectedChips.value = selectedChips.value.filter((i) => i !== item);
  } else {
    selectedChips.value.push(item);
  }
  emit("change", selectedChips.value);
};

const removeChip = (item) => {
  selectedChips.value = selectedChips.value.filter((i) => i !== item);
  emit("change", selectedChips.value);
};
</script>
<template>
  <div
    v-on-click-outside="
      () => {
        isOpen = false;
      }
    "
    class="relative mb-2"
  >
    <div class="rounded-md border border-light-grey p-1">
      <div class="cursor-pointer" @click="isOpen = !isOpen">
        <div class="flex items-center w-full">
          <span
            v-if="selectedChips.length == 0"
            class="text-gray-400 font-montserrat pl-2"
          >
            {{ placeholder }}
          </span>
          <div class="flex-1 pl-2">
            <Chip
              v-for="(item, index) in selectedChips"
              :key="index"
              :text="item"
              @remove-chip="removeChip"
            />
          </div>
          <div class="flex items-center">
            <ChevronUpIcon v-if="isOpen" class="h-5 w-5" />
            <ChevronDownIcon v-else class="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
    <Transition name="drop-down">
      <div
        v-if="isOpen"
        class="absolute z-10 rounded-b-md bg-white shadow-md w-full transition"
      >
        <ul class="divide-y divide-gray-200">
          <li
            v-for="(item, index) in items"
            :key="index"
            class="px-4 py-2 text-sm leading-5 cursor-pointer hover:bg-gray-50 focus:outline-none focus:bg-gray-50 accent-gold"
            @click="toggleSelection(item)"
          >
            <div class="flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-4 w-4 mr-4"
                :checked="selectedChips.includes(item)"
              />
              <span class="ml-2">{{ item }}</span>
            </div>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
<style>
.drop-down-enter-from,
.drop-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
