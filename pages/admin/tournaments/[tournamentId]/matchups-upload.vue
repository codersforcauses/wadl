<template>
  <div class="flex justify-center items-center h-[calc(100vh-72px)]">
    <form submit.prevent="" class="">
      <input
        type="file"
        accept="application/json"
        multiple
        capture
        @change="onFileChanged($event)"
      />
      <Button
        button-text="Upload Matchups"
        button-color="bg-gold"
        text-color="text-black"
        size="medium"
        class="m-4 w-48"
        @click="uploadFiles()"
      />
    </form>
  </div>
</template>

<script setup>
import { useMatchupStore } from "../../../../stores/matchups";

const store = useMatchupStore();
const files = [];

const onFileChanged = (event) => {
  console.log(event.target.files);
  for (let i = 0; i < event.target.files.length; i++) {
    const file = event.target.files[i];
    const reader = new FileReader();
    reader.readAsDataURL(file);
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
    await store.uploadMatchups(files);
  } catch (error) {
    console.log(error);
  }
};
</script>
