<template>
  <button
    :class="`px-4 py-1 ${width} ${buttonColor} ${textColor} rounded-md font-medium`"
  >
    {{ buttonText }}
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  buttonText: { type: String, default: "Button" },
  buttonColor: { type: String, default: "primary" },
  size: { type: String, default: "large" },
  textColor: { type: String, default: "black" },
});

const width = computed(() => {
  switch (props.size) {
    case "small":
      return "w-24";
    case "medium":
      return "w-40";
    case "large":
      return "w-48";
    default:
      return "w-44";
  }
});
</script>
