<script setup>
import { useadminStore } from "../../stores/admin";
import { onMounted, onUnmounted } from "vue";

// pinia
const adminStore = useadminStore();

const approveUser = async (id) => {
  adminStore.acceptUser(id);
};
const rejectUser = async (id) => {
  adminStore.denyUser(id);
};
onMounted(() => {
  adminStore.getUsers();
});
onUnmounted(() => {
  adminStore.clearStore();
});
// Filters people on first,last & email match
const filterUser = (searchTerm) => {
  adminStore.filteredUsers = adminStore.requestingUsers.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
</script>

<template>
  <Header title-text="Sign Up Requests" />
  <SearchBar @handle-filter="filterUser" />
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
          v-for="user in adminStore.filteredUsers"
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
              <option value="Admin">Admin</option>
            </select>
          </td>
          <td class="flex flex-row justify-evenly">
            <Button
              button-text="Approve"
              button-color="bg-light-green"
              text-color="text-white"
              size="small"
              @click="approveUser(user)"
            />
            <Button
              button-text="Reject"
              button-color="bg-light-red"
              text-color="text-dark-red"
              size="small"
              @click="rejectUser(user)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
