<script setup>
defineProps({
  headings: Array,
  Default: [],
});
</script>

<template>
  <div class="flex justify-center">
    <div class="w-full">
      <table class="w-full table-auto">
        <thead>
          <tr class="w-full">
            <th
              v-for="({ heading }, index) in headings"
              class="text-2xl text-black"
            >
              {{ headings[index] }}
              <!-- {{ index }} -->
            </th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
    <div></div>
  </div>
</template>
