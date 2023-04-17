<template>
</template>

<script setup>
import { useMatchupStore } from "../stores/matchups";
import { onMounted } from "vue";
const store = await useMatchupStore();
onMounted(async () => {
    console.log("getting data");
    await store.getMatchups();
    console.log("done");
});
</script>
