<script setup>
import { useAdminStore } from "../../stores/admin";
import { onMounted, onUnmounted, ref } from "vue";

const searchTerm = ref("");
const handleFilter = (s) => {
  searchTerm.value = s;
};

// pinia
const adminStore = useAdminStore();

onMounted(() => {
  adminStore.fetchUsers();
});

onUnmounted(() => {
  adminStore.clearStore();
});

const filterUsers = (searchTerm) => {
  if (searchTerm === "") return adminStore.requestingUsers;

  return adminStore.requestingUsers.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm) ||
      user.lastName?.toLowerCase().includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm) ||
      user.role?.toLowerCase().includes(searchTerm)
  );
};
const handleDelete = (user) => {
  console.log("delete", user);
};
// modal
const modalVisibility = ref(false);
</script>

<template>
  <Header title-text="Sign Up Requests" />
  <SearchBar @handle-filter="handleFilter" />
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
            <select id="role" v-model="user.role" name="role">
              <option value="Adjudicator">Adjudicator</option>
              <option value="Adjudicator Coordinator">
                Adjudicator Coordinator
              </option>
              <option value="Team Coordinator">Team Coordinator</option>
            </select>
          </td>
          <td class="flex flex-row justify-evenly">
            <Button
              button-text="Approve"
              button-color="bg-light-green"
              text-color="text-white"
              size="small"
              @click="adminStore.acceptUser(user)"
            />
            <Button
              button-text="Reject"
              button-color="bg-light-red"
              text-color="text-dark-red"
              size="small"
              @click="
                //  TODO ADD FUNCTONALITY modalVisibility = true
                adminStore.deleteUser(user)
              "
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
        // todo fix
        handleDelete();
        modalVisibility = false;
      }
    "
    @no="
      () => {
        modalVisibility = false;
      }
    "
  />
</template>
