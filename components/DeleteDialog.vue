<template>
  <Modal
    :modal-visibility="modalVisibility"
    @close="
      () => {
        modalVisibility = false;
      }
    "
  >
    <div>
      <h1>Test Data To Be Displayed</h1>
    </div>
  </Modal>
</template>

<script setup>
import { ref } from "vue";

const modalVisibility = ref(true);
</script>
