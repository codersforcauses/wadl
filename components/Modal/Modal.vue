<template>
  <div
    v-show="modalVisibility"
    class="flex justify-center items-center fixed top-0 z-50 left-0 w-full h-full bg-slate-300 bg-opacity-60"
  >
    <div class="bg-white min-w-[50%] min-h-[50%] rounded-2xl">
      <header
        class="flex justify-end items-center pt-2 pr-2 pb-2 bg-gold rounded-t-2xl"
      >
        <XMarkIcon class="h-6 w-6 cursor-pointer" @click="close" />
      </header>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
defineProps({
  modalVisibility: { type: Boolean, default: false },
});
const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};
</script>
