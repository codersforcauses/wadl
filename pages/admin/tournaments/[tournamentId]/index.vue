<template>
  <Header
    title-text="Manage Tournament"
    :subtitle-text="currTournClone.name"
    class=""
  />

  <!-- Loading -->
  <div v-if="loading" class="h-full flex justify-center align-middle">
    <Loading />
  </div>

  <!-- Content -->
  <div v-else>
    <div class="mx-32 pt-5">
      <!--//?: can include "changes list" which just broadly lists what elements have been edited. -->
      <div class="justify-end flex rounded-md bg-gray-100 w-full h-full">
        <div v-if="!edited.changesMade" class="justify-end flex">
          <Button
            button-text="No Changes Made"
            button-color="bg-gray-300"
            text-color="text-gray-500"
            size="Large"
            class="m-4"
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
            class="m-4"
            @click="
              () => {
                applyChanges();
              }
            "
          />
          <!-- revert -->
          <Button
            button-text="Revert Changes"
            button-color="bg-dark-red/20"
            text-color="text-dark-red"
            size="medium"
            class="m-4"
            @click="
              () => {
                revertChanges();
              }
            "
          />
        </div>
      </div>

      <!-- Registered Teams -->
      <div class="flex flex-row items-center text-center gap-4 h-7 mt-5 mb-1">
        <p class="font-montserrat font-semibold text-mid-grey min-w-max">
          Registered Teams
        </p>
        <p
          v-if="edited.registeredTeams"
          class="text-dark-red/60 font-medium min-w-max"
        >
          Changes are not final until "Apply Changes" button at top is pushed
        </p>
      </div>

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
      <div class="flex flex-row items-center text-center gap-4 h-7 mt-5 mb-1">
        <p class="font-montserrat font-semibold text-mid-grey min-w-max">
          Information
        </p>
        <p
          v-if="edited.information"
          class="text-dark-red/60 font-medium min-w-max"
        >
          Changes are not final until "Apply Changes" button at top is pushed
        </p>
      </div>

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
        <p
          v-if="edited.venueInfo"
          class="text-dark-red/60 font-medium min-w-max"
        >
          Changes are not final until "Apply Changes" button at top is pushed
        </p>
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
        v-if="currTournClone.venues && venueInfoVisible"
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
          <p
            v-if="edited.roundDates"
            class="text-dark-red/60 font-medium min-w-max"
          >
            Changes are not final until "Apply Changes" button at top is pushed
          </p>

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
        v-if="currTournClone.roundDates && roundDatesVisible"
        class="flex flex-row flex-wrap"
      >
        <adminTournamentDateRounds
          v-for="(dates, index) in currTournClone.roundDates"
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
      <Dropdown
        label="Week"
        :items="['1', '2']"
        placeholder="Select round week"
        v-model="venueForm.week"
      />
      <Dropdown
        label="Day"
        :items="['Tuesday', 'Wednesday']"
        placeholder="Select round day"
        v-model="venueForm.day"
      />
      <label class="heading-montserrat">Venues</label>
      <Multiselect
        :items="['a', 'b', 'c']"
        placeholder="Select round venues"
        :selected="venueForm.venues"
        v-model="venueForm.venue"
      />
      <div class="flex flex-row">
        <!-- apply -->
        <Button
          :button-text="editMode ? 'Edit Venue' : 'Create Venue'"
          button-color="bg-light-green"
          text-color="text-white"
          size="medium"
          class="my-2 mx-2"
          @click="
            (e) => {
              modalVenueVisibility = false;
              edited.venueInfo = true;
              e.stopPropagation();
            }
          "
        />
        <!-- revert -->
        <Button
          button-text="Clear"
          button-color="bg-dark-red/20"
          text-color="text-dark-red"
          size="medium"
          class="my-2 mx-2"
          @click="
            (e) => {
              resetVenueFormState();
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
      <div class="flex flex-row">
        <!-- apply -->
        <Button
          :button-text="editMode ? 'Edit Round' : 'Create Round'"
          button-color="bg-light-green"
          text-color="text-white"
          size="medium"
          class="my-2 mx-2"
          @click="
            (e) => {
              modalRoundVisibility = false;
              edited.roundDates = true;
              addVenue(VenueForm);
              e.stopPropagation();
            }
          "
        />
        <!-- revert -->
        <Button
          button-text="Clear"
          button-color="bg-dark-red/20"
          text-color="text-dark-red"
          size="medium"
          class="my-2 mx-2"
          @click="
            (e) => {
              resetRoundFormState();
              e.stopPropagation();
            }
          "
        />
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
const defaultVenueInput = {
  week: null,
  day: null,
  venues: [],
};
const defaultRoundInput = {
  round: null,
  tueWeek1: null,
  wedWeek1: null,
  tueWeek2: null,
  wedWeek2: null,
};

const route = useRoute();
const tournamentStore = await useTournamentStore();
const venueStore = await useVenueStore();
const teamStore = await useTeamStore();
const loading = ref(true);
const venueForm = ref({ ...defaultVenueInput });
const roundForm = ref({ ...defaultRoundInput });
const modalRoundVisibility = ref(false);
const modalVenueVisibility = ref(false);
const teamsModalVisibility = ref(false);
const teamsModalLevel = ref(null);
const editMode = ref(false);

const edited = ref({
  changesMade: false,
  registeredTeams: false,
  information: false,
  venueInfo: false,
  roundDates: false,
});

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

const addVenue = () => {
  for (let i = 0; i < venueForm.value.venues.length; i++) {
    currTournClone.venues.push({
      day: venueForm.value.day,
      name: venueForm.value.venues[i].name,
      week: venueForm.value.week,
    });
  }
  resetVenueFormState();
  setDayVenues();
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

const resetVenueFormState = () => {
  venueForm.value = { ...defaultVenueInput };
};

const resetRoundFormState = () => {
  roundForm.value = { ...defaultRoundInput };
};

await tournamentStore.getTournaments();

await tournamentStore.getTournament(route.params.tournamentId);

// clone tournament -- simplifies revertChanges.
let currTournClone = { ...tournamentStore.currentTournament };

const stageList = ["Open", "Closed", "Running", "Complete"];
const stage = ref(1);

const changesMade = ref(false);
const dayVenues = ref([]);

const status = currTournClone.status;
const drawStatus = "INCOMPLETE";
const currentRound = currTournClone.currentRound;
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
  edited.value.changesMade = true;
  edited.value.venueInfo = true;
  currTournClone.venues = currTournClone.venues.filter((venue) => {
    return !(venue.name === name && venue.week === week && venue.day === day);
  });
  currTournClone.venues.map(combineVenues);
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

  if (currTournClone.venues) {
    currTournClone.venues.map(combineVenues);
  }
};

const venueEdited = () => {
  edited.value.venueInfo = true;
};

const roundEdited = () => {
  edited.value.roundDates = true;
};

const applyChanges = () => {
  edited.value = {
    changesMade: false,
    registeredTeams: false,
    information: false,
    venueInfo: false,
    roundDates: false,
  };
  tournamentStore.editTournament(currTournClone);
  setDayVenues();
};

const revertChanges = async () => {
  edited.value = {
    changesMade: false,
    registeredTeams: false,
    information: false,
    venueInfo: false,
    roundDates: false,
  };
  resetVenueFormState();
  resetRoundFormState();

  for (let i = 0; i < stageList.length; i++) {
    if (stageList[i] === status) {
      stage.value = i + 1;
    }
  }

  currTournClone = { ...tournamentStore.currentTournament };

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

  let origVal =
    stageList[stage.value - 1] === tournamentStore.currentTournament.status;

  // note : multiple vals affect changes made
  // TODO: make changes made more reactive based upon variables themselves rather than functions.
  edited.value.changesMade = true;
  edited.value.information = !origVal;

  currTournClone.status = stageList[stage.value - 1];
};

const print = (val) => {
  console.log(val);
};
</script>
