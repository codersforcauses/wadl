<script setup>
import { computed } from "vue";
import { XMarkIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  bgColor: {
    type: String,
    default: "bg-gold",
  },
  textColor: {
    type: String,
    default: "text-black",
  },
  size: {
    type: String,
    default: "medium",
  },
});
defineEmits(["removeChip"]);
// Computes the size based on the given prop and the device size
const chipSize = computed(() => {
  switch (props.size) {
    case "small":
      return "px-2 py-1 mr-1 text-xs font-small";
    case "medium":
      return "px-2 py-1 mr-1 text-xs font-small sm:px-3 sm:py-1 sm:mr-3 sm:text-sm sm:font-medium";
    case "large":
      return "px-3 py-1 mr-3 text-sm font-medium lg:px-4 lg:py-2 lg:mr-4 lg:text-medium lg:font-large";
    default:
      return "px-2 py-1 mr-1 text-xs font-small sm:px-3 sm:py-1 sm:mr-3 sm:text-sm sm:font-medium";
  }
});
</script>

<template>
  <span class="rounded-lg" :class="`${bgColor} ${textColor} ${chipSize}`">
    {{ text }}
    <button
      class="pb-1 pl-2 align-middle"
      @click.prevent="
        (e) => {
          $emit('removeChip', text);
          e.stopPropagation();
        }
      "
    >
    <div class="hover:bg-amber-500 transition rounded-lg">
      <XMarkIcon
        class="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5"
        :class="`${buttonSize}`"
      />
      </div>
    </button>
  </span>
</template>
