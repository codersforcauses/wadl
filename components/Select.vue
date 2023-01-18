<template>
  <div>
    <label class="heading-montserrat">{{ label }}</label>
    <select
      id="role"
      name="role"
      :class="`pt-1.5 pb-1.5 pl-2 border border-solid border-light-grey rounded-md mb-1.5 w-full heading-montserrat ${color} 
      ${disabled ? 'cursor-not-allowed bg-stone-100' : ''}`"
      :value="modelValue"
      :disabled="disabled"
      @input="updateInput"
    >
      <!-- <option selected disabled hidden>Select Role</option>
      <option>Adjudicator Coordinator</option>
      <option>Adjudicator</option>
      <option>Team Coordinator</option> -->
      <option v-for="(option, index) in options" :key="index">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue", "update"]);

const updateInput = (e) => {
  emit("update:modelValue", e.target.value);
  emit("update");
};

defineProps({
  color: { type: String, default: "" },
  modelValue: { type: String, default: "" },
  label: { type: String, default: "Role" },
  disabled: { type: Boolean, default: false },
  options: {
    type: Array,
    default: () => [
      "Adjudicator Coordinator",
      "Adjudicator",
      "Team Coordinator",
    ],
  },
});
</script>
