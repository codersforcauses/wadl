<template>
  <div class="relative mb-2.5">
    <label class="heading-montserrat">{{ label }}</label>
    <div
      class="border border-light-grey flex items-center w-full rounded-md pr-2"
    >
      <input
        v-on-click-outside="
          () => {
            isOpen = false;
          }
        "
        :value="modelValue"
        :placeholder="placeholder"
        class="p-1 pl-2.5 w-full border-solid focus:outline-none rounded-md font-montserrat placeholder:heading-montserrat heading-montserrat"
        @input="filter"
        @focus="isOpen = true"
      />
      <ChevronUpIcon v-if="isOpen" class="h-5 w-5" @click="isOpen = false" />
      <ChevronDownIcon v-else class="h-5 w-5" @click="isOpen = true" />
    </div>
    <ul
      v-if="isOpen"
      class="absolute z-10 bg-white rounded-b-md shadow-md transition w-full overflow-y-scroll max-h-64 divide-y divide-gray-200"
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
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";
import { vOnClickOutside } from "@vueuse/components";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  placeholder: { type: String, default: "School Name" },
  label: { type: String, default: "School Name" },
  modelValue: { type: String, default: "" },
});
const emit = defineEmits(["info", "update:modelValue"]);

const isOpen = ref(false);
const query = ref(null);
const filteredOptions = computed(() => {
  if (query.value === null) {
    return props.items;
  }
  return props.items.filter((option) =>
    option.name.toLowerCase().includes(query.value.toLowerCase())
  );
});
function filter(e) {
  const value = e.target.value;
  emit("update:modelValue", value);
  query.value = value;
}

function selectOption(option) {
  isOpen.value = false;
  emit("info", option);
}
</script>
