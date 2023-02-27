<template>
  <Header
    title-text="Manage Tournament"
    :subtitle-text="managedTournament.name"
    class=""
  />

  <!-- Loading -->
  <div v-if="loading" class="h-full flex justify-center align-middle">
    <Loading />
  </div>

  <!-- Content -->
  <div v-else>
    <div class="mx-32">
      <div v-if="!editted.changesMade">
        <Button
          button-text="No Changes Made"
          button-color="bg-gray-200"
          text-color="text-gray-500"
          size="Large"
          class="my-2 mx-2"
          @click="() => {}"
        />
      </div>
      <div v-else class="flex flex-row">
        <!-- apply -->
        <Button
          button-text="Apply Changes"
          button-color="bg-light-green"
          text-color="text-white"
          size="medium"
          class="my-2 mx-2"
          @click="
            () => {
              applyChanges();
            }
          "
        />
        <!-- revert -->
        <Button
          button-text="Revert Changes"
          button-color="bg-gray-300"
          text-color="text-gray-800"
          size="medium"
          class="my-2 mx-2"
          @click="
            () => {
              revertChanges();
            }
          "
        />
      </div>

      <!-- Registered Teams -->
      <p
        class="pt-2 pb-1 divide-y-4 font-montserrat font-semibold text-mid-grey"
      >
        Registered Teams
      </p>
      <p v-if="editted.registeredTeams" class="text-gray-400 min-w-max"> Changes are not final until "Apply Changes" button at top is pushed </p>
      
      <div
        class="grid grid-cols-1 lg:grid-cols-4 gap-8 text-center sm:grid-cols-2"
      >
        <Frame
          :title="noviceNum.toString()"
          subtitle="Novice"
          button-size="small"
          :is-horizontal-buttons="false"
          @button-clicked="handleLevelButtons"
        />
        <Frame
          :title="juniorNum.toString()"
          subtitle="Junior"
          button-size="small"
          :is-horizontal-buttons="false"
          @button-clicked="handleLevelButtons"
        />
        <Frame
          :title="seniorNum.toString()"
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
      <!-- End Registered Teams-->

      <!-- Information -->
      <p
        class="pt-5 pb-1 divide-y-4 font-montserrat font-semibold text-mid-grey"
      >
        Information
      </p>
      <p v-if="editted.venueInfo.information" class="text-gray-400 min-w-max"> Changes are not final until "Apply Changes" button at top is pushed </p>
        
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
                @click="changeStage(-1)"
              />
              <Button
                button-text="Next Stage"
                button-color="bg-light-green"
                text-color="text-white"
                size="medium"
                class="transition duration-200 ease-in-out hover:bg-light-green/70 hover:shadow-lg"
                @click="changeStage(1)"
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
      <!-- End Information -->

      <!-- Venue Information -->
      <!-- Header -->
      <div class="flex flex-row items-center text-center gap-4 h-7 mt-5 mb-1">
        <p class="font-montserrat font-semibold text-mid-grey min-w-max">
          Venue Information
        </p>
        <div class="mb-1">
          <button>
            <div class="bg-amber-300 p-0.5 rounded-full text-black">
              <PlusIcon class="w-6 h-6" @click="modalVenueVisibility = true" />
            </div>
          </button>
        </div>
        <p v-if="editted.venueInfo" class="text-gray-400 min-w-max"> Changes are not final until "Apply Changes" button at top is pushed </p>
        <AdminTournamentExpandBtn
          :showPlus="!venueInfoVisible"
          :expandFunc="
            () => {
              venueInfoVisible = !venueInfoVisible;
            }
          "
        />
      </div>
      <!-- End Header -->

      <div
        v-if="managedTournament.venues && venueInfoVisible"
        class="flex flex-row flex-wrap"
      >
        <AdminTournamentDayVenues
          v-for="(day, index) in dayVenues"
          :key="index"
          :day="day.day"
          :week="day.week"
          :venues="day.venues"
          :handleEdit="
            () => {
              editMode = true;
              modalVenueVisibility = true;
            }
          "
          :handleDelete="
            (venueName) => deleteVenue(venueName, day.week, day.day)
          "
        />
      </div>
      <!-- End Venue Information-->

      <!-- Round Dates -->
      <div>
        <!-- Header -->
        <div class="flex flex-row items-center text-center gap-4 h-7 mt-5 mb-1">
          <p class="font-montserrat font-semibold text-mid-grey min-w-max">
            Round Dates
          </p>
          <div class="mb-1">
            <button>
              <div class="bg-amber-300 p-0.5 rounded-full text-black">
                <PlusIcon
                  class="w-6 h-6"
                  @click="modalRoundVisibility = true"
                />
              </div>
            </button>
          </div>
          <p v-if="editted.roundDates" class="text-gray-400 min-w-max"> Changes are not final until "Apply Changes" button at top is pushed </p>
      
          <AdminTournamentExpandBtn
            :showPlus="!roundDatesVisible"
            :expandFunc="
              () => {
                roundDatesVisible = !roundDatesVisible;
              }
            "
          />
        </div>
      </div>
      <!-- End Header -->

      <div
        v-if="managedTournament.roundDates && roundDatesVisible"
        class="flex flex-row flex-wrap"
      >
        <adminTournamentDateRounds
          v-for="(dates, index) in managedTournament.roundDates"
          :key="index"
          :dates="dates"
          :handleEdit="
            () => {
              editMode = true;
              modalRoundVisibility = true;
            }
          "
        />
      </div>
      <!-- End Round Dates-->
    </div>
    <div class="pb-10"><!--Padding--></div>
    <!-- End Content-->
  </div>
  <!-- Modals -->
  <Modal
    :modal-visibility="modalVenueVisibility"
    size="w-7/12"
    @close="
      () => {
        modalVenueVisibility = false;
        resetFormState();
      }
    "
  >
    <div v-if="!editMode">
      <Header title-text="Venue Information" />
    </div>
    <div v-else>
      <Header title-text="Edit Venue Information" />
    </div>
    <form @submit.prevent="" class="px-10">
      <label class="heading-montserrat">Week</label>
      <Multiselect :items="[1, 2]" placeholder="Select round week" />
      <label class="heading-montserrat">Day</label>
      <Multiselect
        :items="['Tuesday', 'Wednesday']"
        placeholder="Select round day"
      />
      <label class="heading-montserrat">Venues</label>
      <Multiselect :items="['a', 'b', 'c']" placeholder="Select round venue" />
      
    <div v-if="false">
        <Button
          button-text="Input required fields"
          button-color="bg-gray-200"
          text-color="text-gray-500"
          size="xlarge"
          class="my-2 mx-2"
          @click="() => { }"
        />
      </div>
      <div v-else class="flex flex-row">
        <!-- apply -->
        <Button
          :button-text="editMode ? 'Edit Round' : 'Create Round'"
          button-color="bg-light-green"
          text-color="text-white"
          size="medium"
          class="my-2 mx-2"
          @click="
            () => {}
          "
        />
        <!-- revert -->
        <Button
          button-text="Reset"
          button-color="bg-gray-300"
          text-color="text-gray-800"
          size="medium"
          class="my-2 mx-2"
          @click="
            (e) => { 
              e.stopPropagation();
            }
          "
        />
      </div>
    </form>
  </Modal>
  <Modal
    :modal-visibility="modalRoundVisibility"
    size="w-7/12"
    @close="
      () => {
        modalRoundVisibility = false;
        resetFormState();
      }
    "
  >
    <div v-if="!editMode">
      <Header title-text="Round Dates" />
    </div>
    <div v-else>
      <Header title-text="Edit Round Dates" />
    </div>
    <form class="px-10">
      <FormField label="Round" placeholder="Enter the round" />
      <div class="grid grid-cols-2 gap-x-4">
        <div>
          <FormField label="Tuesday Week 1" placeholder="DD/MM" />
        </div>
        <div>
          <FormField label="Wednesday Week 1" placeholder="DD/MM" />
        </div>
        <div>
          <FormField label="Tuesday Week 2" placeholder="DD/MM" />
        </div>
        <div>
          <FormField label="Wednesday Week 2" placeholder="DD/MM" />
        </div>
      </div>
    </form>
  </Modal>
  <ViewTeams
    :modal-visibility="teamsModalVisibility"
    :teams="teamsByLevel"
    :level="teamsModalLevel"
    @close="teamsModalVisibility = false"
  />
  <!-- End Modal -->
</template>

<script setup>
import { PlusIcon } from "@heroicons/vue/24/solid";
import { useTournamentStore } from "../../../../stores/tournaments";
import { useVenueStore } from "../../../../stores/venues";
import { useTeamStore } from "../../../../stores/teams";
import { useRoute } from "#imports";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "#imports";

const router = useRouter();
const defaultRoundInput = {
  id: null,
  levels: [],
  name: null,
  numRounds: null,
  shortName: null,
  status: "Open",
};
const defaultVenueInput = {
  id: null,
  levels: [],
  name: null,
  numRounds: null,
  shortName: null,
  status: "Open",
};

const route = useRoute();
const tournamentStore = await useTournamentStore();
const venueStore = await useVenueStore();
const teamStore = await useTeamStore();
const loading = ref(true);
const roundForm = { ...defaultRoundInput };
const venueForm = { ...defaultVenueInput };
const modalRoundVisibility = ref(false);
const modalVenueVisibility = ref(false);
const teamsModalVisibility = ref(false);
const teamsModalLevel = ref(null);
const editMode = ref(false);

const editted = ref({
  registeredTeams: false,
  information: false,
  venueInfo: false,
  roundDates: false,
})
const venueInfoChanged = ref(true);

onMounted(async () => {
  try {
    await venueStore.getVenues();
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});

const defaultInputState = {
  id: "",
  form: "",
  num: 9,
};

const handleLevelButtons = (button, level) => {
  switch (button) {
    case "Division":
      router.push({
        path: `/admin/tournaments/${route.params.tournamentId}/division/${level}`,
      });
      break;
    case "Teams":
      teamsModalVisibility.value = true;
      teamsModalLevel.value = level;
      break;
    default:
      throw new Error(`Unknown Frame button: ${button}`);
  }
};
const teamsByLevel = computed(() => {
  return teamStore.teams.filter((team) => {
    return team.level === teamsModalLevel.value;
  });
});

const resetFormState = () => {
  roundForm.value = { ...defaultRoundInput };
  venueForm.value = { ...defaultVenueInput };
  editMode.value = false;
};

await tournamentStore.getTournaments();

// clone tournament -- allows revertchanges to work easier.
await tournamentStore.getTournament(route.params.tournamentId)

let managedTournament = Object.assign(
  {},
  tournamentStore.currentTournament
);

console.log(managedTournament)

const stageList = ["Open", "Closed", "Running", "Complete"];
const stage = ref(1);

const dayVenues = ref([]);

const status = managedTournament.status;
const drawStatus = "INCOMPLETE";
const currentRound = managedTournament.currentRound;
const totalRound = "8";
const results = "UNRELEASED";
const roundDatesVisible = ref(true);
const venueInfoVisible = ref(true);

for (let i = 0; i < stageList.length; i++) {
  if (stageList[i] === status) {
    stage.value = i + 1;
  }
}

/** functions */
const deleteVenue = async (name, week, day) => {
  editted.value.changesMade = true;
  editted.value.venueInfo = true;
  managedTournament.venues = managedTournament.venues.filter((venue) => {
    return !(venue.name === name && venue.week === week && venue.day === day);
  });
  managedTournament.venues.map(combineVenues);
  setDayVenues();
};

await teamStore.getTeamsbyTournament(route.params.tournamentId);

const combineVenues = (venue) => {
  let findDayIndex = dayVenues.value.findIndex(
    (day) => day.day == venue.day && day.week == venue.week
  );

  if (findDayIndex == -1) {
    // day was not found
    dayVenues.value.push({
      day: venue.day,
      week: venue.week,
      venues: [venue.name],
    });
  } else {
    dayVenues.value[findDayIndex].venues.push(venue.name);
  }
};

const setDayVenues = () => {
  dayVenues.value = [
    {
      day: "Tuesday",
      week: 1,
      venues: [],
    },
    {
      day: "Wednesday",
      week: 1,
      venues: [],
    },
    {
      day: "Tuesday",
      week: 2,
      venues: [],
    },
    {
      day: "Wednesday",
      week: 2,
      venues: [],
    },
  ];
  console.log(managedTournament)
  if (managedTournament.venues) {
    managedTournament.venues.map(combineVenues);
  }
};

const applyChanges = () => {
  editted.value = {
    changesMade: false,
    registeredTeams: false,
    information: false,
    venueInfo: false,
    roundDates: false,
  }
  tournamentStore.editTournament(managedTournament);
  setDayVenues();
};

const revertChanges = async () => {
  editted.value = {
    changesMade: false,
    registeredTeams: false,
    information: false,
    venueInfo: false,
    roundDates: false,
  }
  tournamentStore.getTournament(route.params.tournamentId)
  managedTournament = Object.assign(
    {},
    tournamentStore.currentTournament
  );
  setDayVenues();
};
/** end Functions */

setDayVenues();

const noviceNum = teamStore.getNumberTeams("Novice");
const juniorNum = teamStore.getNumberTeams("Junior");
const seniorNum = teamStore.getNumberTeams("Senior");

const changeStage = (value) => {
  if (value === -1 && stage.value > 1) {
    stage.value--;
  } else if (value === 1 && stage.value < 4) {
    stage.value++;
  } else {
    return;
  }
  tournamentStore.currentTournament.status = stageList[stage.value - 1];
  tournamentStore.editTournament(tournamentStore.currentTournament);
};

const print = (val) => {
  console.log(val);
}
</script>
