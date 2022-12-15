<!-- A page that demo's how to use different components. -->
<!-- This is to be removed before production -->
<!-- If you have a component that will be used across multiple pages add it here -->
<template>
  <!-- Header Component -->
  <Header title-text="Website Components" />
  <SearchBar @handle-filter="handleFilter" />
  <!-- Button Component -->
  <div class="flex flex-row gap-4 justify-center mt-8 mx-2">
    <Button
      button-text="Create Tournament"
      button-color="bg-gold"
      @click="handleSave"
    />
    <Button
      button-text="Delete"
      button-color="bg-light-red"
      text-color="text-dark-red"
      @click="handleDelete"
    />
  </div>
  <div class="flex flex-row gap-4 justify-center mt-8 mx-2">
    <Button
      button-text="Save"
      button-color="bg-gold"
      @click="handleSave"
      size="medium"
    />
    <Button
      button-text="Delete"
      button-color="bg-light-red"
      text-color="text-dark-red"
      @click="handleDelete"
      size="medium"
    />
  </div>
  <div class="flex flex-row gap-4 justify-center mt-8 mx-2">
    <Button
      button-text="Approve"
      button-color="bg-light-green"
      text-color="text-white"
      @click="handleSave"
      size="small"
    />
    <Button
      button-text="Reject"
      button-color="bg-light-red"
      text-color="text-dark-red"
      @click="handleDelete"
      size="small"
    />
  </div>
</template>

<script setup>
const handleUndo = () => {
  console.log("Undoing");
};
const handleSave = () => {
  console.log("Saving");
};
const handleDelete = () => {
  console.log("Deleting");
};
const handleFilter = () => {
  console.log("Filtering");
};
</script>
