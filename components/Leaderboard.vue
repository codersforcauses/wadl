<template>
  <section class="px-12">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <table class="min-w-full text-left text-sm font-light">
          <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" class="px-6 py-4">Place</th>
              <th scope="col" class="px-6 py-4">Team</th>
              <th scope="col" class="px-6 py-4">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="team in data"
              :key="team.name"
              class="border-y-2 border-gray-200"
            >
              <td class="whitespace-nowrap px-6 py-4">{{ team.place }}</td>
              <td class="whitespace-nowrap px-6 py-4">
                {{ team.name }}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                {{ team.points }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  noDataText: {
    type: String,
    default: "No data available",
  },
});
</script>
