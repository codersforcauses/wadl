<template>
  <div v-if="!loading">
    <Header title-text="Scoresheet" />

    <div class="flex justify-start ml-14 my-4">
      <p class="mr-4 text-mid-grey">
        Division: <span class="text-dark-grey">{{ matchup.division }} </span>
      </p>
      <p class="mr-4 text-mid-grey">
        Round: <span class="text-dark-grey">{{ matchup.round }}</span>
      </p>
      <p class="mr-4 text-mid-grey">
        Date: <span class="text-dark-grey">{{ matchup.date }}</span>
      </p>
      <p class="mr-4 text-mid-grey">
        Time: <span class="text-dark-grey">{{ matchup.time }}</span>
      </p>
      <p class="text-mid-grey">
        Level: <span class="text-dark-grey">{{ matchup.level }}</span>
      </p>
    </div>
    <div class="flex justify-evenly">
      <p class="pt-1">Adjudicators</p>
      <Multiselect
        :items="adjudicatorStore.getAdjudicators"
        :selected-chips="scoresheet.adjudicators"
        placeholder="Select Adjudicators"
        class="w-7/12"
        @change="updateSelectedLevels"
      />
    </div>
    <form @submit.prevent="handleSubmit">
      <p class="flex justify-center text-xl my-4">
        Affirmative Team:
        <span class="pl-2">{{ matchup.affirmativeTeam }}</span>
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
        Negative Team: <span class="pl-2">{{ matchup.negativeTeam }}</span>
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
    </form>
  </div>
  <Notification
    :modal-visibility="notification.isVisible"
    :is-success="notification.isSuccess"
    :body="notification.message"
    @close="handleClose()"
  />
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useMatchupStore } from "~/stores/matchups";
import { useAdjudicatorStore } from "~/stores/adjudicator";
import { useRoute, useHead, useRouter } from "#imports";
import useNotification from "~/composables/useNotification";
useHead({
  title: "Scoresheet",
});
const route = useRoute();
const router = useRouter();
const loading = ref(true);
const notification = useNotification();

const matchupStore = useMatchupStore();
const adjudicatorStore = useAdjudicatorStore();
let matchupInfo = {};

const matchup = reactive({
  id: route.params.matchupId,
  affirmativeTeam: "",
  negativeTeam: "",
  round: "",
  division: "",
  level: "",
  date: "",
  time: "",
});

const addInfo = async (matchupInfo) => {
  matchup.affirmativeTeam = matchupInfo.affirmativeTeam;
  matchup.negativeTeam = matchupInfo.negativeTeam;
  matchup.round = matchupInfo.round;
  matchup.division = matchupInfo.division;
  matchup.date = matchupInfo.date;
  matchup.time = matchupInfo.time;
};

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

const handleSubmit = () => {
  try {
    matchupStore.addScoreSheet(
      scoresheet.value,
      matchupInfo,
      route.params.tournamentId
    );
  } catch (e) {
    notification.notifyError("Error submitting scoresheet, Please try again!");
  }
  notification.notifySuccess("Scoresheet submitted successfully");
};

const handleClose = () => {
  notification.dismiss();
  router.back();
};

onMounted(async () => {
  try {
    await adjudicatorStore.fetchAdjudicators();
    for (let i = 0; i < matchupStore.junior[0].length; i++) {
      if (matchupStore.junior[0][i].id === route.params.matchupId) {
        if (matchupStore.junior[0][i].scoresheet) {
          scoresheet.value = { ...matchupStore.junior[0][i].scoresheet };
        }
        matchupInfo = { ...matchupStore.junior[0][i], level: "junior" };
        matchup.level = "junior";
        break;
      }
    }

    for (let i = 0; i < matchupStore.novice[0].length; i++) {
      if (matchupStore.novice[0][i].id === route.params.matchupId) {
        if (matchupStore.novice[0][i].scoresheet) {
          scoresheet.value = { ...matchupStore.novice[0][i].scoresheet };
        }
        matchupInfo = { ...matchupStore.junior[0][i], level: "novice" };
        matchup.level = "novice";
        break;
      }
    }
    for (let i = 0; i < matchupStore.senior[0].length; i++) {
      if (matchupStore.senior[0][i].id === route.params.matchupId) {
        if (matchupStore.senior[0][i].scoresheet) {
          scoresheet.value = { ...matchupStore.senior[0][i].scoresheet };
        }
        matchupInfo = { ...matchupStore.junior[0][i], level: "senior" };
        matchup.level = "senior";
        break;
      }
    }
    await addInfo(matchupInfo);
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
</script>
