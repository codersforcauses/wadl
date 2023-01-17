<script setup>
import { ref } from "vue";
import ProfileInfo from "~/components/admin/ProfileInfo.vue";
import Table from "~/components/Coordinator/Table.vue";
</script>

<template>
  <ProfileInfo username="John Doe" role="Admin" />
  <Table :headings="['Teams', 'Level', 'Division']" />
  <div class="fixed inset-x-0 bottom-0 w-full bg-white">
    <div class="flex flex-row gap-4 m-5 justify-left">
      <NuxtLink to="coordinator/team-registration">
        <Button
          button-text="Team Registration"
          button-color="bg-gold"
          class="transition duration-200 ease-in-out hover:bg-light-gold hover:shadow-lg"
        />
      </NuxtLink>
    </div>
  </div>
</template>
