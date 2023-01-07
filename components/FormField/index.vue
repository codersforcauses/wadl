<template>
  <label class="heading-montserrat">{{ label }}</label>
  <input
    :type="type"
    :placeholder="placeholder"
    required
    class="p-1 pl-2.5 mb-2.5 border border-solid border-light-grey rounded-md w-full placeholder:heading-montserrat heading-montserrat"
    @input="updateInput"
    :value="modelValue"
  />
</template>
<script setup>
defineProps({
  label: { type: String, default: "" },
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  type: { type: String, default: "text" },
});
const emit = defineEmits(["update:modelValue"]);

const updateInput = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>
