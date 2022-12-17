<script setup>
import { ref } from "vue";
import teamData from "~/data/teams.json";

defineProps({
  headings: {
    type: Array,
    default: () => [],
  },
});

const teams = ref(teamData);
</script>

<template>
  <div class="flex justify-center">
    <div class="w-2/3">
      <table class="w-full mt-2 mb-20 table-auto">
        <thead>
          <tr>
            <th
              v-for="(heading, index) in headings"
              :key="heading"
              class="p-2 text-4xl border-b border-dark-grey text-dark-grey"
            >
              {{ headings[index] }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(team, index) in teams"
            :key="team.name"
            class="justify-center transition duration-150 ease-in-out odd:bg-white even:bg-light-grey/10 hover:bg-light-gold hover:shadow-lg rounded-xl focus:bg-light-gold focus:shadow-lg focus:outline-none focus:ring-0 active:bg-light-gold active:shadow-lg"
          >
            <td class="p-2 m-2 text-2xl text-center">
              {{ team.name }}
            </td>
            <td class="p-2 m-2 text-2xl text-center">
              {{ teams[index].level }}
            </td>
            <td class="p-2 m-2 text-2xl text-center">
              {{ teams[index].division }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.datarow {
  margin: 5px;
  padding: 5px;
  border-top: 1px solid;
  text-align: left;
  border-color: dark-grey;
}
</style>
