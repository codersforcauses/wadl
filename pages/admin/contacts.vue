<template>
  <Header title-text="Contacts" />
  <div class="flex items-center justify-center w-full">
    <SearchBar
      @handle-filter="
        (searchString) => {
          searchTerm = searchString;
        }
      "
    />
  </div>
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
import { useAdminStore } from "../../stores/admin";
import { onMounted, onUnmounted, ref } from "vue";
import { useHead } from "#imports";
useHead({
  title: "Contacts",
});

// pinia
const adminStore = useAdminStore();

onMounted(() => {
  adminStore.fetchUsers();
});

onUnmounted(() => {
  adminStore.clearStore();
});

const currentTab = ref("Adjudicator");
const searchTerm = ref(null);
const contacts = computed(() => {
  const tabContacts = adminStore.getApprovedUsers.filter(
    (contact) => contact.role === currentTab.value
  );

  const query = searchTerm.value;
  const results = tabContacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(query) ||
      contact.lastName.toLowerCase().includes(query)
  );
  return query !== null ? results : tabContacts;
});

const handleTabClicked = (tab) => {
  currentTab.value = tab;
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
