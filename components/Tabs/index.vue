<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    default: [],
  },
  fontSize: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["handleTabClicked"]);
const tabs = ref(props.tabs);

const handleClick = (tab) => {
  tabs.value.forEach((t) => {
    t.active = false;
  });
  tab.active = true;
  emit("handleTabClicked", tab.label);
};
</script>
<template>
  <ul class="flex flex-col sm:flex-row flex-wrap list-none mx-8">
    <li v-for="(tab, idx) in tabs" :key="idx" class="flex-auto text-center">
      <button
        :class="[
          tab.active ? ' bg-light-yellow rounded-t-md' : 'text-gray-400',
          `w-full heading-montserrat px-6 py-3 my-2 border-b-2 border-b-light-yellow ${fontSize}`,
        ]"
        @click="handleClick(tab)"
      >
        {{ tab.label }}
      </button>
    </li>
  </ul>
</template>
