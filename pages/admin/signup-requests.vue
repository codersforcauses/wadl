<script setup>
import { useAdminStore } from "../../stores/admin";
import { onMounted, onUnmounted, ref } from "vue";
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

const filterUsers = (searchTerm) => {
  if (searchTerm === "") return adminStore.getRequestingUsers;

  return adminStore.getRequestingUsers.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm) ||
      user.lastName?.toLowerCase().includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm) ||
      user.role?.toLowerCase().includes(searchTerm)
  );
};
const handleDelete = (user) => {
  currentUser.value = user;
  modalVisibility.value = true;
};
</script>

<template>
  <Header title-text="Sign Up Requests" />
  <div class="flex items-center justify-center w-full">
    <SearchBar @handle-filter="handleFilter" />
  </div>
  <div class="flex justify-center">
    <table class="w-10/12 table-fixed">
      <thead>
        <tr class="bg-white border-b">
          <th>
            <p class="text-xl heading-montserrat font-bold px-6 py-3">
              First Name
            </p>
          </th>
          <th>
            <p class="text-xl heading-montserrat font-bold px-6 py-3">
              Last Name
            </p>
          </th>
          <th>
            <p class="text-xl heading-montserrat font-bold px-6 py-3">Email</p>
          </th>
          <th>
            <p class="text-xl heading-montserrat font-bold px-6 py-3">Role</p>
          </th>
          <th>
            <p class="text-xl heading-montserrat font-bold px-6 py-3">
              Approval
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in filterUsers(searchTerm)"
          :key="user.email"
          class="py-md bg-white border-b h-10"
        >
          <td>
            <p>{{ user.firstName }}</p>
          </td>
          <td>
            <p>{{ user.lastName }}</p>
          </td>
          <td>
            <p>{{ user.email }}</p>
          </td>
          <td>
            <div class="flex items-center mx-2">
              <Dropdown id="role" v-model="user.role" name="role" />
            </div>
          </td>
          <td class="flex flex-row justify-evenly">
            <Button
              button-text="Approve"
              button-color="bg-light-green"
              text-color="text-white"
              size="small"
              @click="
                try {
                  adminStore.acceptUser(user);
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
              @click="handleDelete(user)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
