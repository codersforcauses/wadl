<!-- This is the be removed before production -->
<!-- A page that demo's how to use different components. -->
<!-- If you have a component that will be used across multiple pages add it here -->
<template>
  <Header title-text="Website Components" />
  <div class="flex flex-row gap-4 justify-center mt-8 mx-2">
    <Button button-text="Undo" button-color="bg-gray-400" @click="handleUndo" />
    <Button button-text="Save" button-color="bg-gold" @click="handleDelete" />
    <Button
      button-text="Delete"
      button-color="bg-red-500"
      @click="handleClick"
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
</script>
