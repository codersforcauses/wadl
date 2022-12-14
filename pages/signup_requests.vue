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
    <table class="w-10/12 table-fixed">
      <tr class="bg-white border-b">
        <th><p class="text-xl heading-montserrat font-bold px-6 py-3">First Name</p></th>
        <th><p class="text-xl heading-montserrat font-bold px-6 py-3">Last Name</p></th>
        <th><p class="text-xl heading-montserrat font-bold px-6 py-3">Email</p></th>
        <th><p class="text-xl heading-montserrat font-bold px-6 py-3">Role</p></th>
        <th><p class="text-xl heading-montserrat font-bold px-6 py-3">Approval</p></th>
      </tr>
      <tr v-for="person in people" :key="person.email" class="py-md bg-white border-b h-10">
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
        <td class="flex flex-row justify-between">
          <Button @click="approvePerson(person.email)" buttonText="Approve" buttonColor="bg-green-500"/>
          <Button @click="rejectPerson(person.email)" buttonText="Reject" buttonColor="bg-red-500"/>
        </td>
      </tr>
    </table>
  </div>
</template>
