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
        class="flex flex-col items-center p-10 justify-center bg-white rounded-2xl"
      >
        <CheckCircleIcon v-if="isSuccess" class="h-20 w-20 text-green-500" />
        <XCircleIcon v-else class="h-20 w-20 text-red-500" />
        <div
          class="m-2 0"
          :class="{ 'text-green-500': isSuccess, 'text-red-500': !isSuccess }"
        >
          <Header
            :title-text="header || (isSuccess ? 'Success!' : 'Oh Snap!')"
            :has-line="false"
          ></Header>
        </div>
        <p class="m-2">{{ body }}</p>
        <Button
          :button-color="isSuccess ? 'bg-green-500' : 'bg-red-500'"
          button-text="Okay"
          text-color="text-white m-5"
          @click="$emit('close')"
        ></Button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/24/solid";
import { vOnClickOutside } from "@vueuse/components";

defineProps({
  modalVisibility: { type: Boolean, default: false },
  header: { type: String, default: "" },
  body: { type: String, default: "New tournament successfully created" },
  isSuccess: { type: Boolean, default: false },
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
