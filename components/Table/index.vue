<!-- eslint-disable vue/require-valid-default-prop -->
<template>
  <table>
    <thead>
      <tr>
        <th v-for="(object, index) in config" :key="index" class="py-3">
          {{ object.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in venues" :key="index">
        <td v-for="(object, ind) in config" :key="ind">
          {{ row[object.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  config: {
    type: Object,
    default: [],
  },
  venues: {
    type: Object,
    default: [],
  },
});
</script>
