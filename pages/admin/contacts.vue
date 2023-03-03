<template>
  <section class="flex flex-col items-center">
    <Header title-text="Contacts" />
    <SearchBar
      @handle-filter="
        (searchString) => {
          searchTerm = searchString;
        }
      "
    />
    <Tabs class="md:w-11/12" :tabs="tabs" @handle-tab="handleTabClicked" />
    <Table
      :headers="headers"
      :data="contacts"
      :can-edit="false"
      no-data-text="No users registered"
    />
  </section>
</template>

<script setup>
import { useAdminStore } from "../../stores/admin";
import { onMounted, onUnmounted, ref, computed } from "vue";
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
      contact.lastName.toLowerCase().includes(query) ||
      contact.phoneNumber.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query)
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
  { label: "Team Coordinator", active: true },
  { label: "Adjudicator", active: false },
  { label: "Adjudicator Coordinator", active: false },
  { label: "Admin", active: false },
];
</script>
