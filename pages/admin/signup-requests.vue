<script setup>
import { useadminStore } from "../../stores/admin";
import { ref, onMounted, onUnmounted } from "vue";
import data from "../../data/pretendpeople.json";
// Reference to list of pretend people
const people = ref(data);

// pinia
const adminStore = useadminStore();

const approvePerson = async (id) => {
  adminStore.acceptUser(id);
};

const rejectPerson = async (id) => {
  adminStore.denyUser(id);
};
onMounted( () => {
   adminStore.getUsers();
  adminStore.filterUsers();
});
onUnmounted(() => {
  adminStore.clearStore();
});
console.log(adminStore.filteredUsers);

// Filters people on first,last & email match
const filterPeople = (searchTerm) => {
  adminStore.requestingUsers = adminStore.requestingUsers.filter(
    (person) =>
      person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
</script>

<template>
  <Header title-text="Sign Up Requests" />
  <SearchBar @handle-filter="filterPeople" />
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
        <tr v-for="person in adminStore.requestingUsers" :key="person.email" class="py-md bg-white border-b h-10">
          <td>
            <p>{{ person.firstName }}</p>
          </td>
          <td>
            <p>{{ person.lastName }}</p>
          </td>
          <td>
            <p>{{ person.email }}</p>
          </td>
          <td>
            <select id="role" v-model="person.role" name="role">
              <option value="Adjudicator">Adjudicator</option>
              <option value="Adjudicator Coordinator">
                Adjudicator Coordinator
              </option>
              <option value="Team Coordinator">Team Coordinator</option>
              <option value="Admin">Admin</option>
            </select>
          </td>
          <td class="flex flex-row justify-evenly">
            <Button button-text="Approve" button-color="bg-light-green" text-color="text-white" size="small"
              @click="approvePerson(person)" />
            <Button button-text="Reject" button-color="bg-light-red" text-color="text-dark-red" size="small"
              @click="rejectPerson(person)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
