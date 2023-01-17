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
      size="medium"
      @click="handleSave"
    />
    <Button
      button-text="Delete"
      button-color="bg-light-red"
      text-color="text-dark-red"
      size="medium"
      @click="handleDelete"
    />
  </div>
  <div class="flex flex-row gap-4 justify-center mt-8 mx-2">
    <Button
      button-text="Approve"
      button-color="bg-light-green"
      text-color="text-white"
      size="small"
      @click="handleSave"
    />
    <Button
      button-text="Reject"
      button-color="bg-light-red"
      text-color="text-dark-red"
      size="small"
      @click="handleDelete"
    />
  </div>

  <DeleteDialog />

  <Tabs :tabs="tabs" font-size="text-xl" @handle-tab="handleTabClicked" />
  <!-- Multiselect -->
  <label class="heading-montserrat">Level</label>
  <Multiselect
    placeholder="I'm placeholder text"
    :items="['Item 1', 'item 2', 'item 3']"
    @change="updateSelectedLevels"
  />
</template>

<script setup>
const tabs = [
  { label: "Novice", active: false },
  { label: "Junior", active: true },
  { label: "Senior", active: false },
];
const handleSave = () => {
  console.log("Saving");
};
const handleDelete = () => {
  console.log("Deleting");
};
const handleFilter = () => {
  console.log("Filtering");
};
const handleTabClicked = (tab) => {
  console.log("Filter data here based on the tab:", tab);
};

const updateSelectedLevels = (chips) => {
  console.log("Chips selected", chips);
};
</script>
