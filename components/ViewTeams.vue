<template>
  <Modal
    :modal-visibility="modalVisibility"
    size="md:1/3"
    @close="emit('close')"
  >
    <div class="w-full h-48"></div>
  </Modal>
</template>

<script setup>
import { ref } from "vue";

const modalVisibility = ref(false);

const emit = defineEmits(["close"]);
</script>
