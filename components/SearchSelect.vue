<template>
  <label class="heading-montserrat">{{ label }}</label>
  <div
    class="border border-light-grey flex items-center w-full rounded-md pr-2 mb-2.5"
  >
    <input
      v-model="searchText"
      v-on-click-outside="
        () => {
          isOpen = false;
        }
      "
      :placeholder="placeholder"
      class="p-1 pl-2.5 w-full border-solid focus:outline-none rounded-md font-montserrat placeholder:heading-montserrat heading-montserrat"
      @input="filterOptions"
      @focus="isOpen = true"
    />
    <ChevronUpIcon v-if="isOpen" class="h-5 w-5" @click="isOpen = false" />
    <ChevronDownIcon v-else class="h-5 w-5" @click="isOpen = true" />
  </div>
  <ul
    v-if="isOpen"
    class="absolute z-10 bg-white rounded-lg shadow-lg transition w-full"
  >
    <li
      v-for="option in filteredOptions"
      :key="option.id"
      class="px-5 py-3 hover:bg-gold cursor-pointer"
      @click="selectOption(option)"
    >
      {{ option.name }}
    </li>
  </ul>
</template>

<script setup>
import { ref, computed } from "vue";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";
import { vOnClickOutside } from "@vueuse/components";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  placeholder: { type: String, default: "School Name" },
  label: { type: String, default: "School Name" },
});
const emit = defineEmits(["info", "searchText"]);

const searchText = ref("");
const isOpen = ref(false);

const filteredOptions = computed(() => {
  emit("searchText", searchText.value);
  return props.items.filter((option) =>
    option.name.toLowerCase().includes(searchText.value.toLowerCase())
  );
});

function selectOption(option) {
  searchText.value = option.name;
  isOpen.value = false;
  emit("info", option);
}
</script>
