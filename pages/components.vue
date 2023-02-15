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
  <div class="flex flex-row gap-4 justify-center mt-8 mx-2">
    <Button
      button-text="Success Notification"
      button-color="bg-light-green"
      text-color="text-white"
      @click="
        isSuccess = true;
        notificationMessage = 'Successfully created new tournament.';
        notificationVisibility = !notificationVisibility;
      "
    />
    <Button
      button-text="Error Notification"
      button-color="bg-light-red"
      text-color="text-dark-red"
      @click="
        isSuccess = false;
        notificationMessage = 'Failed to create tournament, please try again.';
        notificationVisibility = !notificationVisibility;
      "
    />
  </div>

  <ViewTeams
    :modal-visibility="teamsVisibility"
    @close="
      () => {
        teamsVisibility = false;
      }
    "
  />

  <DeleteDialog
    :modal-visibility="modalVisibility"
    @close="
      () => {
        modalVisibility = false;
      }
    "
    @yes="
      () => {
        handleSave();
      }
    "
    @no="
      () => {
        handleDelete();
      }
    "
  />

  <Button
    button-text="Dialog Test"
    button-color="bg-gold"
    type="button"
    class="m-5 ml-8"
    @click="modalVisibility = true"
  />
  <Button
    button-text="Get Teams"
    button-color="bg-gold"
    type="button"
    class="m-5 ml-8"
    @click="teamsVisibility = true"
  />
  <Tabs :tabs="tabs" font-size="text-xl" @handle-tab="handleTabClicked" />
  <!-- Multiselect -->
  <label class="heading-montserrat">Level</label>
  <Multiselect
    placeholder="I'm placeholder text"
    :items="['Item 1', 'item 2', 'item 3']"
    @change="updateSelectedLevels"
  />

  <div class="mx-8">
    <SearchSelect
      :items="institutions"
      @info="getInfo"
      @search-text="getName"
    />
  </div>

  <div class="mx-8">
    <Dropdown v-model="option" />
  </div>

  <!-- Notification Modal -->
  <Notification
    :modal-visibility="notificationVisibility"
    :is-success="isSuccess"
    :body="notificationMessage"
    @close="
      () => {
        notificationVisibility = false;
      }
    "
  />
</template>

<script setup>
import { ref } from "vue";
import { useInstitutionStore } from "../stores/institutions";
import { useTeamStore } from "../stores/teams";

const store = useInstitutionStore();
const team = useTeamStore();
const institutions = ref(store.institutions);
const modalVisibility = ref(false);
const teamsVisibility = ref(false);
const option = ref("");

team.getTeams();

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

const getInfo = (data) => {
  console.log("DATA:", data);
};
const getName = (name) => {
  console.log("name:", name);
};

const checkThing = () => {
  console.log(team.teams);
};

// Notification Modal
const notificationVisibility = ref(false);
const isSuccess = ref(false);
const notificationMessage = ref("");
</script>
