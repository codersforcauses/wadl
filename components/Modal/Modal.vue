<template>
  <Transition name="modal">
    <div
      v-if="modalVisibility"
      class="flex justify-center items-center fixed top-0 z-50 left-0 w-full h-full bg-slate-300 bg-opacity-60 transition"
    >
      <div
        v-on-click-outside="
          () => {
            emit('close');
          }
        "
        class="bg-white rounded-2xl"
      >
        <header
          class="flex justify-end items-center pt-2 pr-2 pb-2 bg-gold rounded-t-2xl"
        >
          <XMarkIcon class="h-6 w-6 cursor-pointer" @click="$emit('close')" />
        </header>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { vOnClickOutside } from "@vueuse/components";

defineProps({
  modalVisibility: { type: Boolean, default: false },
});
const emit = defineEmits(["close"]);
</script>
<style>
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from,
.modal-leave-to {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
