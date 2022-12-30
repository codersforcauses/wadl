<script setup>
defineProps({
  tabs: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(["handleTabClicked"]);
</script>
<template>
  <ul class="flex flex-col sm:flex-row flex-wrap list-none mx-4">
    <li v-for="(tab, idx) in tabs" :key="idx" class="flex-auto text-center">
      <button
        class="w-full block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
        @click="emit('handleTabClicked', tab)"
      >
        {{ tab }}
      </button>
    </li>
  </ul>
</template>
