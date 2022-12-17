<script setup>
  import teamData from "~/data/teams.json";

  defineProps({
    headings: {
      type: Array,
      default: [],
    },
  });

  const teams = ref(teamData);
</script>

<template>
  <div class="flex justify-center">
    <div class="w-2/3">
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th v-for="({ heading }, index) in headings" class="text-4xl text-dark-grey">
              {{ headings[index] }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team, index) in teams">
            <td class="p-2 m-1 text-2xl border-t border-solid border-dark-grey">
              {{ teams[index].team }}
            </td>
            <td class="p-2 m-1 text-2xl border-t border-solid border-dark-grey">
              {{ teams[index].level }}
            </td>
            <td class="p-2 m-1 text-2xl border-t border-solid border-dark-grey">
              {{ teams[index].division }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
  .datarow{
    margin: 5px;
    padding: 5px;
    border-top: 1px solid;
    text-align: left;
    border-color: dark-grey;
  }
</style>