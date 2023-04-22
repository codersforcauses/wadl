<template>
  <Header title-text="Scoresheet" />

  <div class="flex justify-start ml-14 my-4">
    <p class="mr-4 text-mid-grey">
      Division: <span class="text-dark-grey">1 </span>
    </p>
    <p class="mr-4 text-mid-grey">
      Round: <span class="text-dark-grey">3</span>
    </p>
    <p class="mr-4 text-mid-grey">
      Date: <span class="text-dark-grey">28 March</span>
    </p>
    <p class="mr-4 text-mid-grey">
      Time: <span class="text-dark-grey">5:15pm</span>
    </p>
    <p class="text-mid-grey">
      Level: <span class="text-dark-grey">Junior</span>
    </p>
  </div>

  <!-- TODO LOAD ADJUDICATORS THAT ARE ATTACHED TO FIREBASE SCORESHEET-->
  <div class="flex justify-evenly">
    <p class="pt-1">Adjudicators</p>
    <Multiselect
      :items="adminStore.getAdjudicators"
      @change="updateSelectedLevels"
      placeholder="Select Adjudicators"
      class="w-7/12"
    />
  </div>

  <p class="flex justify-center text-xl my-4">
    Affirmative Team: Perth College 4
  </p>
  <div class="flex justify-center mx-6">
    <table class="w-full max-w-7xl">
      <tr>
        <th>Names</th>
        <th class="w-36">Manner(40)</th>
        <th class="w-36">Matter(40)</th>
        <th class="w-36">Method(20)</th>
        <th class="w-36">POIs</th>
        <th>Total</th>
      </tr>
      <tr class="border-b">
        <td class="text-center pt-2">
          <FormField placeholder="Student Name" />
        </td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>

        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="text-center">75</td>
      </tr>
      <tr class="border-b">
        <td class="text-center pt-2">
          <FormField placeholder="Student Name" />
        </td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>

        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="text-center">75</td>
      </tr>
      <tr class="border-b">
        <td class="text-center pt-2">
          <FormField placeholder="Student Name" />
        </td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>

        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="text-center">75</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="text-center border-b py-2">75</td>
      </tr>
    </table>
  </div>

  <p class="flex justify-center text-xl mb-4">Negative Team: Mercy College 2</p>
  <div class="flex justify-center mx-6">
    <table class="w-full max-w-7xl">
      <tr class="border-b">
        <th>Names</th>
        <th class="w-36">Manner(40)</th>
        <th class="w-36">Matter(40)</th>
        <th class="w-36">Method(20)</th>
        <th class="w-36">POIs</th>
        <th>Total</th>
      </tr>
      <tr class="border-b">
        <td class="text-center pt-2">
          <FormField placeholder="Student Name" />
        </td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>

        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="text-center">75</td>
      </tr>
      <tr class="border-b">
        <td class="text-center pt-2">
          <FormField placeholder="Student Name" />
        </td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>

        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="text-center">75</td>
      </tr>
      <tr class="border-b">
        <td class="text-center pt-2">
          <FormField placeholder="Student Name" />
        </td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>

        <td class="px-4 pt-2"><FormField placeholder="0" type="number" /></td>
        <td class="text-center">75</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="text-center border-b py-2">75</td>
      </tr>
    </table>
  </div>

  <div class="w-11/12 flex justify-end pt-6">
    <Button size="large" button-text="Submit" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAdminStore } from "../stores/admin";
import { onMounted } from "vue";

const adminStore = useAdminStore();

onMounted(async () => {
  await adminStore.fetchAdjudicators();
});

const initalState = {
  adjudicators: [],
  affirmativeTeam: [
    {
      student1: {
        name: "",
        manner: 0,
        matter: 0,
        method: 0,
        poi: 0,
        total: 0,
      },
      student2: {
        name: "",
        manner: 0,
        matter: 0,
        method: 0,
        poi: 0,
        total: 0,
      },
      student3: {
        name: "",
        manner: 0,
        matter: 0,
        method: 0,
        poi: 0,
        total: 0,
      },
      total: 0,
    },
  ],
  negativeTeam: [
    {
      student1: {
        name: "",
        manner: 0,
        matter: 0,
        method: 0,
        poi: 0,
        total: 0,
      },
      student2: {
        name: "",
        manner: 0,
        matter: 0,
        method: 0,
        poi: 0,
        total: 0,
      },
      student3: {
        name: "",
        manner: 0,
        matter: 0,
        method: 0,
        poi: 0,
        total: 0,
      },
      total: 0,
    },
  ],
};

const scoresheet = ref(initalState);

const updateSelectedLevels = (adjs) => {
  scoresheet.adjudicators = adjs;
};
</script>
