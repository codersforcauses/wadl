<template>
  <Modal
    :modal-visibility="modalVisibility"
    size="w-full h-full md:w-2/3 md:h-4/5"
    @close="emit('close')"
  >
    <div class="w-full h-48">
      <Header title-text="Registered Teams" subtitle-text="JUNIOR" />
    </div>
  </Modal>
</template>

<script setup>
defineProps({
  modalVisibility: { type: Boolean, default: false },
});

const emit = defineEmits(["close"]);
</script>
