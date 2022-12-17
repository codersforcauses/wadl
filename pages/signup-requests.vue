<script setup>
import { ref } from "vue";
import data from "../data/pretendpeople.json";

// Reference to list of pretend people
const people = ref(data);

// Filters people on first,last & email match
const filterPeople = (searchTerm) => {
  people.value = data.filter(
    (person) =>
      person.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.last.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

const approvePerson = (id) => {
  console.log(`Approving applicant with email ${id}`);
};

const rejectPerson = (id) => {
  console.log(`Rejecting applicant with email ${id}`);
};
</script>

<template>
  <Header title-text="Sign Up Requests" />
  <SearchBar data-test="searchBar" @handle-filter="filterPeople" />
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
          v-for="person in people"
          :key="person.email"
          data-test="signUpRequest"
          class="py-md bg-white border-b h-10"
        >
          <td>
            <p data-test="signUpRequestFirstName">{{ person.first }}</p>
          </td>
          <td>
            <p data-test="signUpRequestLastName">{{ person.last }}</p>
          </td>
          <td>
            <p data-test="signUpRequestEmail">{{ person.email }}</p>
          </td>
          <td>
            <select
              id="role"
              v-model="person.role"
              data-test="signUpRequestRole"
              name="role"
            >
              <option
                data-test="signUpRequestRoleAbjudicator"
                value="Adjudicator"
              >
                Adjudicator
              </option>
              <option
                data-test="signUpRequestRoleAbjudicatorCoordinator"
                value="Adjudicator Coordinator"
              >
                Adjudicator Coordinator
              </option>
              <option
                data-test="signUpRequestTeamCoordinator"
                value="Team Coordinator"
              >
                Team Coordinator
              </option>
            </select>
          </td>
          <td class="flex flex-row justify-between">
            <Button
              data-test="signUpRequestApprove"
              button-text="Approve"
              button-color="bg-green-500"
              @click="approvePerson(person.id)"
            />
            <Button
              data-test="signUpRequestReject"
              button-text="Reject"
              button-color="bg-red-500"
              @click="rejectPerson(person.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
