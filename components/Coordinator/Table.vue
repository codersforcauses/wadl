<script setup>
defineProps({
  headings: {
    type: Array,
    default: [],
  },
  content:{
    type: Array,
    default: [[]],
  },
});
</script>

<template>
  <div class="flex justify-center">
    <div class="w-2/3">
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th v-for="({ heading }, index) in headings" class="text-4xl text-black">
              {{ headings[index] }}
              <!-- {{ index }} -->
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cont in content">
            <td v-for="con in cont" class="p-2 m-1 text-2xl border-t border-black solid">
              {{ con }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div></div>
  </div>
</template>
