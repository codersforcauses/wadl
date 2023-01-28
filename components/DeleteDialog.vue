<template>
  <Modal :modal-visibility="modalVisibility" @close="emit('close')">
    <div class="w-full h-48">
      <div class="font-montserrat text-2xl text-center font-bold pt-10">
        Are You Sure?
      </div>
      <hr class="mx-8" />
      <div class="p-5 flex justify-evenly">
        <Button
          class="mx-5 mt-4 font-semibold"
          button-text="Yes"
          button-color="bg-light-green"
          text-color="text-white"
          size="medium"
          @click="emit('yes')"
        />
        <Button
          class="mx-5 mt-4 font-semibold"
          button-text="No"
          button-color="bg-light-red"
          text-color="text-dark-red"
          size="medium"
          @click="emit('no')"
        />
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref } from "vue";

const modalVisibility = ref(false);

const emit = defineEmits(["yes", "no", "close"]);
</script>
