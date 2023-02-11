<template>
  <Modal
    :modal-visibility="modalVisibility"
    size="md:1/3"
    header="Are You Sure?"
    @close="emit('close')"
  >
    <template #form>
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
    </template>
  </Modal>
</template>

<script setup>
import { ref } from "vue";

const modalVisibility = ref(false);

const emit = defineEmits(["yes", "no", "close"]);
</script>
