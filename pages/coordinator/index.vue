<script setup>
import ProfileInfo from "~/components/admin/ProfileInfo.vue";
import Table from "~/components/Coordinator/Table.vue";
import sideBar from "../../components/Coordinator/sideBar.vue";
</script>

<template>
  <div class="flex">
    <div class="flex-none">
      <sideBar />
    </div>
    <div class="flex-auto">
      <ProfileInfo username="Carmen Leong" role="Admin" />
      <Table :headings="['Teams', 'Level', 'Division']" />
      <div class="fixed inset-x-0 bottom-0 w-full">
        <div class="flex flex-row gap-4 m-5 justify-left">
          <Button
            button-text="Team Registration"
            button-color="bg-gold"
            class="transition duration-200 ease-in-out hover:bg-light-gold hover:shadow-lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>
