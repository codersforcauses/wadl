<template>
  <Header title-text="Contacts" />
  <SearchBar @handle-filter="handleFilter" />
  <Tabs :tabs="tabs" @handle-tab="handleTabClicked" />
  <div class="mx-8">
    <Table
      :headers="headers"
      :data="contacts"
      :can-edit="false"
      no-data-text="No users registered"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import data from "../../data/users.json";

const currentTab = ref("Adjudicator");
const contacts = ref(
  data.filter((contact) => contact.role === currentTab.value)
);

const handleTabClicked = (tab) => {
  contacts.value = data.filter((contact) => contact.role === tab);
  currentTab.value = tab;
};

const handleFilter = (searchTerm) => {
  contacts.value = data.filter(
    (contact) =>
      (contact.firstName.toLowerCase().includes(searchTerm) ||
        contact.lastName.toLowerCase().includes(searchTerm)) &&
      contact.role === currentTab.value
  );
};

const headers = [
  {
    key: "firstName",
    title: "First Name",
  },
  {
    key: "lastName",
    title: "Last Name",
  },
  {
    key: "phoneNumber",
    title: "Number",
  },
  {
    key: "email",
    title: "Email",
  },
];

const tabs = [
  { label: "Team Coordinator", active: false },
  { label: "Adjudicator", active: true },
  { label: "Adjudicator Coordinator", active: false },
];
</script>
