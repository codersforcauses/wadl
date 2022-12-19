<template>
  <div>
    <label class="mb-1">Role</label>
    <select
      id="role"
      name="role"
      class="pt-1.5 pb-1.5 pl-2.5 border border-solid border-light-grey rounded-md mb-1.5 w-full heading-montserrat"
      @input="updateInput"
    >
      <option selected disabled hidden>Select Role</option>
      <option>Adjudicator Coordinator</option>
      <option>Adjudicator</option>
      <option>Team Coordinator</option>
    </select>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);

const updateInput = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>
