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
        <div class="w-11/12">
            <table class="w-full mt-2 mb-20 table-auto">
                <thead>
                    <tr>
                        <th v-for="(heading, index) in headings" :key="heading"
                            class="p-2 text-xl border-b border-dark-grey text-dark-grey">
                            {{ headings[index] }}
                        </th>
                    </tr>
                </thead>
                <tbody v-if="teams.length != 0">
                    <tr v-for="team in teams" :key="team.name"
                        class="justify-center transition duration-150 ease-in-out odd:bg-white even:bg-light-grey/10 hover:bg-light-gold hover:shadow-lg rounded-xl focus:bg-light-gold focus:shadow-lg focus:outline-none focus:ring-0 active:bg-light-gold active:shadow-lg">
                        <td v-for="field in team" :key="field" class="p-2 m-2 text-center">
                            {{ field }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="teams.length == 0" class="flex justify-center text-lg text-light-grey">
                No teams registerd
            </div>
        </div>
    </div>
</template>
