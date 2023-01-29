<template>
  <button
    :class="`px-4 py-1 ${width} ${buttonColor} ${textColor} rounded-md font-medium flex justify-center`"
  >
    <div v-if="loading">
      <svg
        width="25px"
        height="100%"
        viewBox="0 0 24 24"
        class="fill-yellow-100 animate-spin"
      >
        <path
          d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
        ></path>
      </svg>
    </div>
    <div v-else>
      {{ buttonText }}
    </div>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  buttonText: { type: String, default: "Button" },
  buttonColor: { type: String, default: "primary" },
  size: { type: String, default: "large" },
  textColor: { type: String, default: "black" },
  loading: { type: Boolean, default: false },
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
