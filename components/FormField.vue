<template>
  <label class="heading-montserrat">{{ label }}</label>
  <input
    :type="type"
    :placeholder="placeholder"
    required
    :class="`
      p-1
      pl-2.5
      mb-2.5
      border border-solid border-light-grey
      rounded-md
      w-full
      placeholder:heading-montserrat
      heading-montserrat
      ${color}
      ${props.disabled ? 'cursor-not-allowed bg-stone-100' : ''}
      `"
    :value="modelValue"
    min="0"
    :disabled="disabled"
    :pattern="pattern"
    @input="updateInput"
  />
</template>
<script setup>
const props = defineProps({
  label: { type: String, default: "" },
  modelValue: { type: [String, Number], default: "" },
  placeholder: { type: String, default: "" },
  type: { type: String, default: "text" },
  disabled: { type: Boolean, default: false },
  color: { type: String, default: "" },
  pattern: { type: String, default: "*" },
});
const emit = defineEmits(["update:modelValue", "update"]);

const updateInput = (e) => {
  emit("update:modelValue", e.target.value);
  emit("update");
};
</script>
