<script setup>
import { ref } from "vue";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";
import { vOnClickOutside } from "@vueuse/components";
const props = defineProps({
  items: {
    type: Array,
    default: () => ["Team Coordinator"], // Not MVP: "Adjudicator", "Head Adjudicator"],
  },
  placeholder: {
    type: String,
    default: "Select Role",
  },
  selected: {
    type: String,
    default: "Team Coordinator",
  },
  label: {
    type: String,
    default: "",
  },
  color: { type: String, default: "" },
  modelValue: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
});

console.log(props.modelValue);

const isOpen = ref(false);
const selected = ref(props.modelValue);
console.log(selected.value);
const emit = defineEmits(["change", "update:modelValue"]);

const handleClick = (item) => {
  if (!props.disabled) {
    selected.value = item;
    isOpen.value = false;
    emit("update:modelValue", item);
  }
};
</script>
<template>
  <div
    v-on-click-outside="
      () => {
        isOpen = false;
      }
    "
    class="relative w-full"
  >
    <label class="heading-montserrat">{{ label }}</label>
    <div
      :class="`rounded-md border ${
        props.disabled ? 'bg-stone-100' : ''
      } border-light-grey p-1 ${color}`"
    >
      <div
        :class="`${props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`"
        @click="isOpen = !isOpen"
      >
        <div class="flex items-center w-full">
          <span
            v-if="!selected || selected.length == 0"
            class="text-gray-400 font-montserrat pl-2"
          >
            {{ placeholder }}
          </span>
          <span
            v-if="selected && selected.length !== 0"
            class="font-montserrat pl-2"
            >{{ selected }}</span
          >

          <div class="flex items-center ml-auto" v-if="!props.disabled">
            <ChevronUpIcon v-if="isOpen" class="h-5 w-5" />
            <ChevronDownIcon v-else class="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
    <Transition name="drop-down" v-if="!props.disabled">
      <div
        v-if="isOpen"
        class="absolute z-10 rounded-b-md bg-white shadow-md w-full transition"
      >
        <ul class="divide-y divide-gray-200">
          <li
            v-for="(item, index) in items"
            :key="index"
            :class="`px-4 py-2 text-sm leading-5 ${
              props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            } hover:bg-gray-50 focus:outline-none focus:bg-gray-50 accent-gold`"
            @click="handleClick(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
<style>
.drop-down-enter-from,
.drop-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>