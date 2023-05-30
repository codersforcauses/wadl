<template>
  <div v-for="matchup in information" :key="matchup.id">
    {{ matchup }}
  </div>
  <Notification
    :modal-visibility="notification.isVisible"
    :is-success="notification.isSuccess"
    :body="notification.message"
    @close="handleClose()"
  />
</template>

<script setup>
import { useMatchupStore } from "../../../../stores/matchups";
import { onMounted } from "vue";
import { useRoute, useRouter } from "#imports";
import useNotification from "../../../../composables/useNotification";

const notification = useNotification();
const route = useRoute();
const router = useRouter();
const matchupStore = useMatchupStore();
onMounted(async () => {
  try {
    // console.log(route.params.tournamentId);
    await matchupStore.getMatchups(route.params.tournamentId);
    handleMatchups();
  } catch (error) {
    console.log(error);
    // notification.notifyError(error);
  }
});

const information = matchupStore.sortMatchups;

const handleMatchups = () => {
  if (information.length === 0) {
    console.log("nothing");
    notification.notifySuccess("No Matchups to approve");
  }
  console.log(information);
};

const handleClose = () => {
  notification.dismiss();
  router.back();
};
</script>
