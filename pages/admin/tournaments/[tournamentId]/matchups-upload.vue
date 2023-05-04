<template>
  <div class="flex justify-center items-center h-[calc(100vh-72px)]">
    <p>
      <span class="text-orange-600">Warning: </span>This will delete the old
      matchups that are assinged for a tournament.
    </p>
    <p>
      Please make sure to name the files by the level they represent: eg
      Junior.csv
    </p>
    <form @submit.prevent="">
      <input type="file" accept="text/csv" multiple @change="onFileChanged($event)" />
      <Button button-text="Upload Matchups" button-color="bg-gold" text-color="text-black" size="medium"
        class="m-4 w-48 mt-8" @click="uploadFiles()" />
    </form>
  </div>
</template>

<script setup>
import { useMatchupStore } from "../../../../stores/matchups";
import { useRoute, useRouter } from "#imports";

const route = useRoute();

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
    console.log(error);
  }
};
</script>
