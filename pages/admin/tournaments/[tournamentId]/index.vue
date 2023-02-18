<template>
  <Header
    title-text="Manage Tournament"
    :subtitle-text="tournamentStore.currentTournament.name"
  />
  <div class="mx-32">
    <p class="pt-2 pb-1 divide-y-4 font-montserrat font-semibold text-mid-grey">
      Registered Teams
    </p>
    <div
      class="grid grid-cols-1 lg:grid-cols-4 gap-8 text-center sm:grid-cols-2"
    >
      <Frame
        :title="noviceNum"
        subtitle="Novice"
        button-size="small"
        :is-horizontal-buttons="false"
        @button-clicked="handleLevelButtons"
      />
      <Frame
        :title="juniorNum"
        subtitle="Junior"
        button-size="small"
        :is-horizontal-buttons="false"
        @button-clicked="handleLevelButtons"
      />
      <Frame
        :title="seniorNum"
        subtitle="Senior"
        button-size="small"
        :is-horizontal-buttons="false"
        @button-clicked="handleLevelButtons"
      />
      <div class="bg-yellow-200 rounded py-6">
        <div class="flex flex-col justify-center items-center">
          <h1
            class="text-4xl pt-10 text-center divide-y-4 font-montserrat font-semibold"
          >
            {{ noviceNum + juniorNum + seniorNum }}
          </h1>
          <p class="text-mid-grey font-montserrat">TOTAL</p>
        </div>
      </div>
    </div>
    <p class="pt-5 pb-1 divide-y-4 font-montserrat font-semibold text-mid-grey">
      Information
    </p>
    <div class="grid grid-cols-8 gap-4 text-center">
      <div class="lg:col-span-3 md:col-span-5 col-span-8">
        <div class="bg-lighter-grey rounded-md py-6 px-2">
          <div class="flex items-center justify-center">
            <Stepper :stage="stage" />
          </div>
          <div class="flex flex-row items-center justify-center mt-4">
            <Button
              button-text="Previous Stage"
              button-color="bg-dark-red/20"
              text-color="text-dark-red"
              size="medium"
              class="mr-[30px] transition duration-200 ease-in-out hover:bg-dark-red/50 hover:shadow-lg"
              @click="stage--"
            />
            <Button
              button-text="Next Stage"
              button-color="bg-light-green"
              text-color="text-white"
              size="medium"
              class="transition duration-200 ease-in-out hover:bg-light-green/70 hover:shadow-lg"
              @click="stage++"
            />
          </div>
        </div>
      </div>
      <!-- <div class="col-span-2">
        <Frame
          :title="drawStatus"
          subtitle="DRAW STATUS"
          :button-texts="['Generate Draw']"
          @button1-clicked="
            () => {
              print('Generate Draw');
            }
          "
        />
      </div>
      <div class="col-span-1">
        <Frame
          :title="currentRound + '/' + totalRound"
          subtitle="CURRENT ROUND"
          button-size="medium"
          :button-texts="['Advance']"
          @button1-clicked="
            () => {
              print('Advance');
            }
          "
        />
      </div>
      <div class="col-span-2 bg-slate-200 rounded">
        <Frame
          :title="results"
          subtitle="PREVIOUS ROUND"
          :button-texts="['Release Results']"
          @button1-clicked="
            () => {
              print('Release Results');
            }
          "
        />
      </div> -->
    </div>
    <!-- table -->
    <!-- header1 -->
    <!-- <div class="items-center bg-white flex">
      <div
        class="m-2 pt-5 pb-5 font-montserrat font-semibold text-mid-grey text-left text-lg"
      >
        Round Dates
      </div>
      <div>
        <button
          class="bg-amber-300 p-1 rounded-full text-black"
          @click="
            () => {
              print('Add New Info Round Dates');
            }
          "
        >
          <PlusIcon class="w-7 h-7" />
        </button>
      </div>
    </div> -->
    <!-- 3grid -->
    <!-- <div class="grid grid-cols-3 gap-4"> -->
    <!-- col1 -->
    <!-- <div class="h-96 rounded-xl shadow-lg bg-slate-200 items-center"> -->
    <!-- head -->
    <!-- <div class="grid grid-cols-4 rounded-xl p-5">
          <div class="m-auto">
            <div class="flex flex-col items-center"></div>
          </div>
          <div class="m-auto col-span-2">
            <h1 class="font-montserrat text-3xl font-semibold">ROUND 1</h1>
          </div>
          <div class="m-auto items-center">
            <button
              @click="
                () => {
                  print('Edit Round Date');
                }
              "
            >
              <PencilIcon class="w-10 h-10" />
            </button>
          </div>
          <hr class="h-px my-3 bg-mid-grey border-0 col-span-4" />
        </div>-->
    <!-- week table -->
    <!-- <div class="grid grid-cols-3 gap-4 px-10">
          <div>
            <div class="flex flex-col items-center">
              <h1 class="text-center font-montserrat font-semibold text-3xl">
                15/03
              </h1>
              <p class="font-montserrat">TUESDAY</p>
            </div>
          </div>
          <div class="m-auto">
            <h1 class="font-montserrat">WEEK 1</h1>
          </div>
          <div>
            <div class="flex flex-col items-center">
              <h1 class="text-center font-montserrat font-semibold text-3xl">
                17/03
              </h1>
              <p class="font-montserrat">WEDNESDAY</p>
            </div>
          </div>
          <div>
            <div class="flex flex-col items-center">
              <h1 class="text-center font-montserrat font-semibold text-3xl">
                15/03
              </h1>
              <p class="font-montserrat">TUESDAY</p>
            </div>
          </div>
          <div class="m-auto">
            <h1 class="font-montserrat">WEEK 2</h1>
          </div>
          <div>
            <div class="flex flex-col items-center">
              <h1 class="text-center font-montserrat font-semibold text-3xl">
                17/03
              </h1>
              <p class="font-montserrat">WEDNESDAY</p>
            </div>
          </div>
        </div>
      </div>
      
    </div> -->
    <!-- header2 -->
    <!-- <div class="items-center bg-white flex">
      <div
        class="m-2 pt-5 pb-5 font-montserrat font-semibold text-mid-grey text-left text-lg"
      >
        Venues Information
      </div>
      <div>
        <button
          class="bg-amber-300 p-1 rounded-full text-black"
          @click="
            () => {
              print('Add New Info Venue Information');
            }
          "
        >
          <PlusIcon class="w-7 h-7" />
        </button>
      </div>
    </div> -->
    <!-- 3 grid -->
    <!-- <div class="grid grid-cols-3 gap-4"> -->
    <!-- col1 -->
    <!-- <div class="h-96 rounded-xl shadow-lg bg-slate-200 items-center"> -->
    <!-- head -->
    <!-- <div class="grid grid-cols-4 rounded-xl p-5">
          <div class="m-auto">
            <div class="flex flex-col items-center">
              <h1 class="text-center font-montserrat font-semibold text-3xl">
                1
              </h1>
              <p class="font-montserrat">WEEK</p>
            </div>
          </div>
          <div class="m-auto col-span-2">
            <h1 class="font-montserrat text-3xl font-semibold">TUESDAY</h1>
          </div>
          <div class="m-auto items-center">
            <button
              @click="
                () => {
                  print('Edit Venue Information');
                }
              "
            >
              <PencilIcon class="w-10 h-10" />
            </button>
          </div>

          <hr class="h-px my-3 bg-mid-grey border-0 col-span-4" />
        </div> -->
    <!-- subhead -->
    <!-- <div class="max-h-56 overflow-scroll overflow-x-hidden">
          <div
            class="w-full sticky top-0 pl-6 pb-5 font-montserrat font-semibold text-mid-grey text-left text-lg bg-slate-200"
          >
            VENUES
          </div> -->
    <!-- table -->
    <!-- <table class="w-11/12 m-auto">
            <tbody>
              <tr
                v-for="(row, index) in venue"
                :key="index"
                class="even:bg-slate-200 odd:bg-white hover:bg-light-yellow transition duration-150 ease-in-out font-montserrat"
              >
                <td
                  v-for="(object, ind) in headersVenues"
                  :key="ind"
                  class="p-2"
                >
                  {{ row[object.key] }}
                </td>
                <td class="text-right p-2">
                  <button
                    @click="
                      () => {
                        print('Delete Row');
                      }
                    "
                  > 
                    <XMarkIcon class="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { useTournamentStore } from "../../../../stores/tournaments";
import { useTeamStore } from "../../../../stores/teams";
import { ref } from "vue";

// eslint-disable-next-line no-undef
const router = useRouter();
// eslint-disable-next-line no-undef
const route = useRoute();

const tournamentStore = useTournamentStore();
const teamStore = useTeamStore();

const stage = ref(1);

// const status = "CLOSED";
// const drawStatus = "INCOMPLETE";
// const currentRound = 0;
// const totalRound = "8";
// const results = "UNRELEASED";

// const headersVenues = [
//   {
//     key: "venue",
//     title: "Venue",
//   },
// ];

const handleLevelButtons = (button, level) => {
  console.log(button, level);
  if (button === "Division") {
    router.push({
      path: `/admin/tournaments/${route.params.tournamentId}/division/${level}`,
    });
  }
};

tournamentStore.getTournament(route.params.tournamentId);

await teamStore.getTeamsbyTournament(route.params.tournamentId);

const noviceNum = teamStore.getNumberTeams("Novice");
const juniorNum = teamStore.getNumberTeams("Junior");
const seniorNum = teamStore.getNumberTeams("Senior");

// const changeStage = (value) => {
//   if (value === -1) {
//     stage--;
//   } else {
//     stage++;
//   }
// };
</script>
