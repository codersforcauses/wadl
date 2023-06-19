<template>
  <!-- <div v-if="divisions.length > 0"> -->
  <!-- <div class="pt-4" v-for="item in divisions" :key="item">
            {{ item }}
        </div> -->
  <div v-for="matchup in data" :key="matchup">
    <div class="py-4 mt-4 bg-cyan-200 border">
      <div v-for="team in matchup" :key="team">
        {{ team }}
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup>
// const emit = defineEmits(["close"]);
const props = defineProps({
  divisions: {
    type: Object,
    default: () => { },
  },
  data: {
    type: Object,
    default: () => { },
  },
});
</script>
