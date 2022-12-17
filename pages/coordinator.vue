<script setup>
import ProfileInfo from "~/components/admin/ProfileInfo.vue";
import Table from "~/components/coordinator/table.vue";
</script>

<template>
  <div>
    <div>
      <ProfileInfo username="Carmen Leong" role="Admin" />
    </div>
    <div>
      <Table :headings="['Teams', 'Level', 'Division']" />
    </div>
    <div class="fixed inset-x-0 bottom-0 w-full bg-white">
      <div class="flex flex-row gap-4 m-5 justify-left">
        <Button button-text="Create Team" button-color="bg-gold" />
      </div>
    </div>
  </div>
</template>
