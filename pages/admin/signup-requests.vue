<script setup>
import { useAdminStore } from "../../stores/admin";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useHead } from "#imports";
import useNotification from "../../composables/useNotification";
useHead({
  title: "Signup Requests",
});
const currentUser = ref(null);
const searchTerm = ref("");
const modalVisibility = ref(false);

const notification = useNotification();

const handleFilter = (s) => {
  searchTerm.value = s;
};

// pinia
const adminStore = useAdminStore();

onMounted(async () => {
  try {
    await adminStore.fetchUsers();
  } catch (error) {
    notification.notifyError(error);
  }
});

onUnmounted(() => {
  adminStore.clearStore();
});

const filteredUsers = computed(() => {
  const query = searchTerm.value;
  if (query === "") return adminStore.requestingUsers;

  return adminStore.getRequestingUsers.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(query) ||
      user.lastName?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.role?.toLowerCase().includes(query)
  );
});

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
    key: "email",
    title: "Email",
  },
  {
    key: "role",
    title: "Role",
  },
  {
    key: "approval",
    title: "Approval",
  },
];
const handleDelete = (user) => {
  currentUser.value = user;
  modalVisibility.value = true;
};
</script>

<template>
  <section
    class="flex flex-col items-center justify-center max-w-screen max-h-screen"
  >
    <Header title-text="Sign Up Requests" />
    <SearchBar @handle-filter="handleFilter" />
    <Table
      :headers="headers"
      :data="filteredUsers"
      :can-edit="false"
      no-data-text="No sign up requests registered"
    >
      <template #role="{ rowId }">
        <Dropdown id="role" v-model="filteredUsers[rowId].role" name="role" />
      </template>
      <template #approval="{ row }">
        <td class="flex flex-row gap-4">
          <Button
            button-text="Approve"
            button-color="bg-light-green"
            text-color="text-white"
            size="small"
            @click="
              try {
                adminStore.acceptUser(row);
              } catch (error) {
                notification.notifyError(error);
              }
            "
          />
          <Button
            button-text="Reject"
            button-color="bg-light-red"
            text-color="text-dark-red"
            size="small"
            @click="handleDelete(row)"
          />
        </td>
      </template>
    </Table>
  </section>

  <DeleteDialog
    :modal-visibility="modalVisibility"
    @close="
      () => {
        modalVisibility = false;
      }
    "
    @yes="
      () => {
        try {
          adminStore.denyUser(currentUser);
        } catch (error) {
          notification.notifyError(error);
        }
        modalVisibility = false;
      }
    "
    @no="
      () => {
        modalVisibility = false;
      }
    "
  />
  <Notification
    :modal-visibility="notification.isVisible"
    :is-success="notification.isSuccess"
    :body="notification.message"
    @close="notification.dismiss()"
  />
</template>
