<script setup>
import { useAdminStore } from "../../stores/admin";
import { onMounted, onUnmounted } from "vue";

// pinia
const adminStore = useAdminStore();

onMounted(() => {
  adminStore.fetchUsers();
});

onUnmounted(() => {
  adminStore.clearStore();
});
</script>

<template>
  <Header title-text="Sign Up Requests" />
  <SearchBar search-term="searchTerm" />
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
          v-for="user in adminStore.getUsers"
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
              @click="adminStore.denyUser(user)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
