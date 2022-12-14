<script setup>
import { ref } from "vue";
import data from "../data/pretendpeople.json";

// Reference to list of pretend people
const people = ref(data);

// Filters people on first,last & email match
const filterPeople = (searchTerm) => {
  people.value = data.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.last.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Not sure how the backend API works -> is there an ID for each person or is it based off email?
const approvePerson = (email) => {
  console.log(`Approving applicant with email ${email}`);
};

const rejectPerson = (email) => {
  console.log(`Rejecting applicant with email ${email}`);
};
</script>

<template>
  <Header title-text="Sign Up Requests" />
  <SearchBar @handle-filter="filterPeople" />
  <div class="flex justify-center">
    <table>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Approval</th>
      </tr>
      <tr v-for="person in people" :key="person.email">
        <td>
          <p>{{ person.first }}</p>
        </td>
        <td>
          <p>{{ person.last }}</p>
        </td>
        <td>
          <p>{{ person.email }}</p>
        </td>
        <td>
          <select name="role" id="role">
            <option
              value="Adjudicator"
              :selected="person.role === 'Adjudicator' ? true : false"
            >
              Adjudicator
            </option>
            <option
              value="Adjudicator Coordinator"
              :selected="
                person.role === 'Adjudicator Coordinator' ? true : false
              "
            >
              Adjudicator Coordinator
            </option>
          </select>
        </td>
        <td>
          <button @click="approvePerson(person.email)">Approve</button>
          <button @click="rejectPerson(person.email)">Reject</button>
        </td>
      </tr>
    </table>
  </div>
</template>
