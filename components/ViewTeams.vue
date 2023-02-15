<template>
  <Modal
    :modal-visibility="modalVisibility"
    size="md:1/3"
    @close="emit('close')"
  >
    <div class="w-full h-48">
      <div class="font-montserrat text-2xl text-center pt-10 px-10">
        Registered Teams
      </div>
      <div class="font-monsterrat text-xl text-center">Junior</div>
      <hr class="mx-8" />
    </div>
  </Modal>
</template>

<script setup>
defineProps({
  modalVisibility: { type: Boolean, default: false },
});

const emit = defineEmits(["close"]);
</script>
