<template>
  <section class="flex justify-center items-center h-[calc(100vh-72px)]">
    <form class="" @submit.prevent="">
      <div>
        <p class="py-2">
          <span class="text-orange-600">Warning: </span>This will delete the old
          matchups that are assinged for a tournament.
        </p>
        <p class="py-2">
          <span class="text-orange-600">Warning: </span>Please make sure to name
          the files by the level they represent: eg Junior.csv
        </p>
      </div>
      <input
        class="py-2"
        type="file"
        accept="text/csv"
        multiple
        @change="onFileChanged($event)"
      />
      <div class="flex flex-col items-center">
        <Button
          button-text="Upload Matchups"
          button-color="bg-gold"
          text-color="text-black"
          size="medium"
          class="w-48 mt-4 content-center"
          @click="handleDelete()"
        />
      </div>
    </form>
  </section>
  <DeleteDialog
    :modal-visibility="modalVisibility"
    @close="
      () => {
        modalVisibility = false;
      }
    "
    @yes="
      () => {
        try {
          uploadFiles();
        } catch (error) {
          notification.notifyError(error);
        }
        modalVisibility = false;
      }
    "
    @no="
      () => {
        modalVisibility = false;
      }
    "
  />
  <Notification
    :modal-visibility="notification.isVisible"
    :is-success="notification.isSuccess"
    :body="notification.message"
    @close="handleClose()"
  />
</template>

<script setup>
import { useMatchupStore } from "../../../../stores/matchups";
import { useRoute, useRouter, useHead } from "#imports";
import useNotification from "../../../../composables/useNotification";
import { ref } from "vue";

useHead({
  title: "Matchups Upload",
});

const notification = useNotification();
const route = useRoute();
const router = useRouter();
const modalVisibility = ref(false);

const store = useMatchupStore();
const files = [];

const onFileChanged = (event) => {
  for (let i = 0; i < event.target.files.length; i++) {
    const file = event.target.files[i];
    const reader = new FileReader();
    reader.readAsText(file);
    if (reader.error) {
      console.log(reader.error);
      break;
    }
    reader.onload = () => {
      files.push({ fileMetaData: file, fileData: reader.result });
    };
  }
};
const uploadFiles = async () => {
  try {
    await store.uploadMatchups(files, route.params.tournamentId);
  } catch (error) {
    notification.notifyError(
      "Error uploading matchups, please try again or contact support."
    );
    console.log(error);
  }
  notification.notifySuccess("Matchups uploaded successfully");
};

const handleClose = () => {
  notification.dismiss();
  router.back();
};

const handleDelete = () => {
  modalVisibility.value = true;
};
</script>
