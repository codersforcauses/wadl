<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <!-- long logo -->
  <img class="mx-auto" src="../assets/logos/TransparentLongLogo.png" />
  <!-- competitions -->
  <Header title-text="Competitions" />
  <main
    class="mx-auto h-screen pt-5 place-items-center justify-center grid grid-cols-3 grid-rows-6 gap-6"
  >
    <!-- replace key with item.key when final data exists -->
    <div v-for="item in tournaments" :key="item">
      <LevelButton
        :text="item.name"
        @click="$router.push(`/fixtures/${item.id}`)"
      />
    </div>
  </main>
</template>

<script setup>
import LevelButton from "../components/HomePage/LevelButton.vue";

const tournaments = [
  { id: "11d3495f-7931-4333-a2be-d153ec893dd5", name: "Junior" },
  { id: "784685d1-eec4-4041-ab89-9c4c79a48d96", name: "Novice" },
  { id: "4cd2804b-a3f1-455f-b32e-302dcc8f76c4", name: "Senior" },
  { id: "8b7083ee-e892-4ad0-8027-2b5127500e2c", name: "SDC" },
  { id: "dcd8bbcc-aa9e-49e8-89d5-6faaa900cf4b", name: "AIHSA" },
  { id: "1c9b4a1d-a4f6-4373-a037-0503daff6765", name: "RDC" },
]; // Dummy Data to be replaced
</script>
