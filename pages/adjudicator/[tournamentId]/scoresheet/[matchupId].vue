<template>
  <Header title-text="Scoresheet" />

  <div class="flex justify-start ml-14 my-4">
    <p class="mr-4 text-mid-grey">
      Division: <span class="text-dark-grey">{{ divsion }} </span>
    </p>
    <p class="mr-4 text-mid-grey">
      Round: <span class="text-dark-grey">{{ round }}</span>
    </p>
    <p class="mr-4 text-mid-grey">
      Date: <span class="text-dark-grey">{{ date }}</span>
    </p>
    <p class="mr-4 text-mid-grey">
      Time: <span class="text-dark-grey">{{ time }}</span>
    </p>
    <p class="text-mid-grey">
      Level: <span class="text-dark-grey">{{ level }}</span>
    </p>
  </div>

  <!-- TODO LOAD ADJUDICATORS THAT ARE ATTACHED TO FIREBASE SCORESHEET-->
  <div class="flex justify-evenly">
    <p class="pt-1">Adjudicators</p>
    <Multiselect
      :items="adminStore.getAdjudicators"
      placeholder="Select Adjudicators"
      class="w-7/12"
      @change="updateSelectedLevels"
    />
  </div>

  <p class="flex justify-center text-xl my-4">
    Affirmative Team: <span>{{ affirmativeTeam }}</span>
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
      <!-- Affirmative Student 1 -->
      <tr class="border-b">
        <td class="text-center pt-2">
          <FormField
            v-model="scoresheet.affirmativeTeam.student1.name"
            placeholder="Student Name"
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.affirmativeTeam.student1.manner"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.affirmativeTeam.student1,
                scoresheet.affirmativeTeam
              )
            "
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.affirmativeTeam.student1.matter"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.affirmativeTeam.student1,
                scoresheet.affirmativeTeam
              )
            "
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.affirmativeTeam.student1.method"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.affirmativeTeam.student1,
                scoresheet.affirmativeTeam
              )
            "
          />
        </td>

        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.affirmativeTeam.student1.poi"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.affirmativeTeam.student1,
                scoresheet.affirmativeTeam
              )
            "
          />
        </td>
        <td class="text-center">
          {{ scoresheet.affirmativeTeam.student1.total }}
        </td>
      </tr>
      <!-- Affirmative Student 2 -->
      <tr class="border-b">
        <td class="text-center pt-2">
          <FormField
            v-model="scoresheet.affirmativeTeam.student2.name"
            placeholder="Student Name"
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.affirmativeTeam.student2.manner"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.affirmativeTeam.student2,
                scoresheet.affirmativeTeam
              )
            "
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.affirmativeTeam.student2.matter"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.affirmativeTeam.student2,
                scoresheet.affirmativeTeam
              )
            "
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.affirmativeTeam.student2.method"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.affirmativeTeam.student2,
                scoresheet.affirmativeTeam
              )
            "
          />
        </td>

        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.affirmativeTeam.student2.poi"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.affirmativeTeam.student2,
                scoresheet.affirmativeTeam
              )
            "
          />
        </td>
        <td class="text-center">
          {{ scoresheet.affirmativeTeam.student2.total }}
        </td>
      </tr>
      <!-- Affirmative Student 3 -->
      <tr class="border-b">
        <td class="text-center pt-2">
          <FormField
            v-model="scoresheet.affirmativeTeam.student3.name"
            placeholder="Student Name"
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.affirmativeTeam.student3.manner"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.affirmativeTeam.student3,
                scoresheet.affirmativeTeam
              )
            "
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.affirmativeTeam.student3.matter"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.affirmativeTeam.student3,
                scoresheet.affirmativeTeam
              )
            "
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.affirmativeTeam.student3.method"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.affirmativeTeam.student3,
                scoresheet.affirmativeTeam
              )
            "
          />
        </td>

        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.affirmativeTeam.student3.poi"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.affirmativeTeam.student3,
                scoresheet.affirmativeTeam
              )
            "
          />
        </td>
        <td class="text-center">
          {{ scoresheet.affirmativeTeam.student3.total }}
        </td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="text-center border-b py-2">
          {{ scoresheet.affirmativeTeam.total }}
        </td>
      </tr>
    </table>
  </div>

  <p class="flex justify-center text-xl mb-4">
    Negative Team: <span>{{ negativeTeam }}</span>
  </p>
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
          <FormField
            v-model="scoresheet.negativeTeam.student1.name"
            placeholder="Student Name"
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.negativeTeam.student1.manner"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.negativeTeam.student1,
                scoresheet.negativeTeam
              )
            "
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.negativeTeam.student1.matter"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.negativeTeam.student1,
                scoresheet.negativeTeam
              )
            "
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.negativeTeam.student1.method"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.negativeTeam.student1,
                scoresheet.negativeTeam
              )
            "
          />
        </td>

        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.negativeTeam.student1.poi"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.negativeTeam.student1,
                scoresheet.negativeTeam
              )
            "
          />
        </td>
        <td class="text-center">
          {{ scoresheet.negativeTeam.student1.total }}
        </td>
      </tr>
      <tr class="border-b">
        <td class="text-center pt-2">
          <FormField
            v-model="scoresheet.negativeTeam.student2.name"
            placeholder="Student Name"
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.negativeTeam.student2.manner"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.negativeTeam.student2,
                scoresheet.negativeTeam
              )
            "
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.negativeTeam.student2.matter"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.negativeTeam.student2,
                scoresheet.negativeTeam
              )
            "
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.negativeTeam.student2.method"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.negativeTeam.student2,
                scoresheet.negativeTeam
              )
            "
          />
        </td>

        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.negativeTeam.student2.poi"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.negativeTeam.student2,
                scoresheet.negativeTeam
              )
            "
          />
        </td>
        <td class="text-center">
          {{ scoresheet.negativeTeam.student2.total }}
        </td>
      </tr>
      <tr class="border-b">
        <td class="text-center pt-2">
          <FormField
            v-model="scoresheet.negativeTeam.student3.name"
            placeholder="Student Name"
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.negativeTeam.student3.manner"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.negativeTeam.student3,
                scoresheet.negativeTeam
              )
            "
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.negativeTeam.student3.matter"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.negativeTeam.student3,
                scoresheet.negativeTeam
              )
            "
          />
        </td>
        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.negativeTeam.student3.method"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.negativeTeam.student3,
                scoresheet.negativeTeam
              )
            "
          />
        </td>

        <td class="px-4 pt-2">
          <FormField
            v-model="scoresheet.negativeTeam.student3.poi"
            placeholder="0"
            type="number"
            @update="
              updateTotal(
                scoresheet.negativeTeam.student3,
                scoresheet.negativeTeam
              )
            "
          />
        </td>
        <td class="text-center">
          {{ scoresheet.negativeTeam.student3.total }}
        </td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="text-center border-b py-2">
          {{ scoresheet.negativeTeam.total }}
        </td>
      </tr>
    </table>
  </div>

  <div class="w-11/12 flex justify-end pt-6">
    <Button size="large" button-text="Submit" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useAdminStore } from "../../../../stores/admin";

const adminStore = useAdminStore();

onMounted(async () => {
  await adminStore.fetchAdjudicators();
});

const initalState = {
  adjudicators: [],
  affirmativeTeam: {
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

  negativeTeam: {
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
};

const scoresheet = ref(initalState);

const updateSelectedLevels = (adjs) => {
  scoresheet.value.adjudicators = adjs;
};

const updateTotal = (s, team) => {
  const manner = Number(s.manner);
  const matter = Number(s.matter);
  const method = Number(s.method);
  const poi = Number(s.poi);

  if (!isNaN(manner) && !isNaN(matter) && !isNaN(method) && !isNaN(poi)) {
    s.total = manner + matter + method + poi;
  } else {
    s.total = 0;
  }

  team.total =
    Number(team.student1.total) +
    Number(team.student2.total) +
    Number(team.student3.total);
};

const props = defineProps({
  divsion: {
    type: Number,
    default: 0,
  },
  round: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
    default: "NaN",
  },
  time: { type: String, default: "NaN" },
  level: { type: String, default: "NaN" },
  affirmativeTeam: {
    type: String,
    default: "NaN",
  },
  negativeTeam: { type: String, default: "NaN" },
});
</script>
