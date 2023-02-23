<template>
  <Modal
    :modal-visibility="modalVisibility"
    size="w-full h-full md:w-2/3 md:h-4/5"
    @close="emit('close')"
  >
    <Header
      title-text="Registered Teams"
      :subtitle-text="level ? level.toUpperCase() : null"
    />
    <Table
      class="mx-12 h-1/2 md:mx-11 md:h-3/4 md:w-10/12 lg:w-11/12"
      :headers="headers"
      :render-headers="false"
      :data="teams"
      :can-edit="false"
      no-data-text="No teams registered"
    />
  </Modal>
</template>

<script setup>
defineProps({
  modalVisibility: { type: Boolean, default: false },
  teams: { type: Array, required: true },
  level: { type: String, default: null },
});

const emit = defineEmits(["close"]);

const headers = [
  {
    key: "name",
    title: "Name",
  },
];
</script>
