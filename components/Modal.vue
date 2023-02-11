<template>
  <Transition name="modal">
    <div
      v-if="modalVisibility"
      class="flex justify-center items-center fixed top-0 z-50 left-0 w-full h-full bg-stone-300 bg-opacity-60 backdrop-blur transition"
    >
      <section
        v-on-click-outside="
          () => {
            emit('close');
          }
        "
        :class="`bg-white rounded-2xl ${size}`"
      >
        <nav
          class="flex justify-end items-center pt-2 pr-2 pb-2 bg-gold rounded-t-2xl"
        >
          <XMarkIcon class="h-6 w-6 cursor-pointer" @click="$emit('close')" />
        </nav>
        <Header :title-text="header" />
        <form class="my-8 px-10">
          <slot />
          <slot name="submitButton">
            <Button
              :button-text="buttonText"
              button-color="bg-gold"
              type="Submit"
              class="my-5 mx-auto"
            />
          </slot>
        </form>
      </section>
    </div>
  </Transition>
</template>

<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { vOnClickOutside } from "@vueuse/components";
import Header from "./Header.vue";

defineProps({
  modalVisibility: { type: Boolean, default: false },
  size: { type: String, default: "w-7/12" },
  header: { type: String, default: "" },
  buttonText: { type: String, default: "Submit" },
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
