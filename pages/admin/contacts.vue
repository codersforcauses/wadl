<template>
  <Header title-text="Contacts" />
  <SearchBar />
  <Tabs
    :tabs="['Team Coordinator', 'Adjudicator', 'Adjudicator Coordinator']"
    @handleTabClicked="handleTabClicked"
  />
  <div class="mx-6">
    <Table :headers="headers" :data="contacts" :canEdit="false" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import data from "../../data/users.json";

const contacts = ref(data);

const handleTabClicked = (tab) => {
  contacts.value = data.filter((contact) => contact.role === tab);
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
</script>
