<template>
  <Modal :modal-visibility="modalVisibility" @close="emit('close')">
    <div class="w-96 h-48">
      <div class="font-montserrat text-2xl text-center font-bold pt-10">
        Are You Sure?
      </div>
      <hr class="mx-8" />
      <div class="p-5">
        <Button
          class="m-2 mt-5 font-semibold"
          button-text="Accept"
          button-color="bg-light-green"
          text-color="text-white"
          size="medium"
          @click="emit('accept')"
        />
        <Button
          class="font-semibold"
          button-text="Reject"
          button-color="bg-light-red"
          text-color="text-dark-red"
          size="medium"
          @click="emit('reject')"
        />
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref } from "vue";

const modalVisibility = ref(false);

const emit = defineEmits(["accept", "reject", "close"]);
</script>
